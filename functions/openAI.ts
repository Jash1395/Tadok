import { Handler } from '@netlify/functions'
import { performance } from 'perf_hooks'
import OpenAI from 'openai'
import { ChatCompletionMessage } from 'openai/resources/chat'

const openAI = new OpenAI({
    apiKey: `${process.env.OPENAI}`,
})

export const handler: Handler = async (event) => {
    try {
        const level = event.queryStringParameters?.level as level

        if (!level || !['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
            throw Error('No level specified')
        }

        const user = buildPrompt(level)
        const startTime = performance.now()

        // call to openAI
        const chatCompletion = await openAI.chat.completions.create({
            model: m3,
            messages: [system, user],
            functions: [{ name: 'get_sentences', parameters: schema }],
            function_call: { name: 'get_sentences' },
        })

        const endTime = performance.now()

        // convert miliseconds to seconds at 2 sig fig
        const seconds = parseFloat(
            ((endTime - startTime) / 1000).toPrecision(2)
        )
        console.log(
            `[Generated in ${seconds}s][${chatCompletion.usage?.total_tokens} tokens used][Model: ${chatCompletion.model}]`
        )

        return {
            statusCode: 200,
            body: JSON.stringify({
                message:
                    chatCompletion.choices[0].message.function_call?.arguments,
            }),
        }
    } catch (error) {
        console.error('Error:', error)

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'An error occurred',
            }),
        }
    }
}

const buildPrompt = (level: level): ChatCompletionMessage => {
    const BasePrompt = `
    Make ${sentenceCount} sentences in Korean.
    Translate each sentence to english.
    `
    return {
        role: 'user',
        content: levelPrompts[level] + BasePrompt,
    }
}

const levelPrompts = {
    A1: `
      Generate highly natural sentences in Korean at CEFR level A1.
      For example, something a 3-4 year old child could understand, or might say.
      Sentences should be roughly 3-6 words, very short.
      Sentences should use common vocabulary.
      Use a mix of past, present, and future tense.
    `,
    A2: `
      Generate highly natural sentences in Korean at CEFR level A2.
      For example, something a 4-6 year old child could understand, or might say.
      Sentences should be roughly 5-9 words, short.
      Sentences should use common vocabulary, with occasional less frequent words.
      Use a mix of past, present, and future tense.
    `,
    B1: `
      Generate highly natural sentences in Korean at CEFR level B1.
      For example, something a 6-7 year old child could understand, or might say.
      Sentences should be roughly 8-12 words, and may be one or two clauses.
      Sentences should use a mix of frequent words and less frequent words.
      Use a mix of past, present, and future tense.
    `,
    B2: `
      Generate highly natural sentences in Korean at CEFR level B2.
      For example, something a 7-10 year old child could understand, or might say.
      Sentences should be roughly 10-15 words, longish, and should be a mix of one or two clause sentences.
      Sentences should use common vocabulary, with occasional less frequent words.
      Use a mix of past, present, and future tense.
    `,
    C1: `
      Generate highly natural sentences in Korean at CEFR level C1.
      For example, something a 10-15 year old child could understand, or might say.
      Sentences should be roughly 12-20 words.
      Sentences Should be multiple clauses.
      Sentences should use less frequent vocabulary.
      Use a wide variety of grammatical tenses.
      Advanced grammar ideas should be used.
    `,
    C2: `
      Generate highly natural sentences in Korean at CEFR level C2.
      Sentences should be roughly 15-25 words.
      For example, something an educated adult could understand, or might say.
      Sentences Should be multiple clauses.
      Sentences should use less frequent vocabulary.
      Use a wide variety of grammatical tenses.
      Advanced grammar ideas should be used.
    `,
}

// models
const m3 = 'gpt-3.5-turbo'
const m316 = 'gpt-3.5-turbo-16k'
const m4 = 'gpt-4'

// output formatting
const sentenceCount = 3
const schema = {
    type: 'object',
    properties: {
        sentences: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    korean: {
                        type: 'string',
                        description: 'The Korean text.',
                    },
                    english: {
                        type: 'string',
                        description: 'The English translation.',
                    },
                },
                required: ['korean', 'english'],
            },
        },
    },
    required: ['sentences'],
}

const system: ChatCompletionMessage = {
    role: 'system',
    content:
        'You create native-like Korean sentences that are as close to natural as possible.',
}

//messages

// List all words used.
// Put verbs (in the word list only) in infinitive form, meaning ending with -다.
// Put adjectives (in the word list only) in infinitive form, meaning ending with -다.
// Remove particles such as 는 은 를 을 도 에 이 가 from all nouns (in the word list only)
// Remove all proper nouns for example, people's names (from the word list only). All words should be in a single array, not sorted or seperated.
// Remove all arabic numbers (from the word list only).
