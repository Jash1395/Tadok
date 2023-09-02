import { Handler } from '@netlify/functions'
import { performance } from 'perf_hooks'
import OpenAI from 'openai'
import { ChatCompletionMessage } from 'openai/resources/chat'

const openAI = new OpenAI({
    apiKey: `${process.env.OPENAI}`,
})

export const handler: Handler = async (event, context) => {
    try {
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

        console.log(chatCompletion.choices[0].message.function_call?.arguments)

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

// models
const m3 = 'gpt-3.5-turbo'
const m316 = 'gpt-3.5-turbo-16k'
const m4 = 'gpt-4'

// output formatting
const sentenceCount = 5
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

const A1 = `
Generate highly natural sentences in Korean at CEFR level A1.
Sentences should be roughly 3-6 words.
Sentences should use common vocabulary.
Use a mix of past, present, and future tense.
`

const C2 = `
Generate highly natural sentences in Korean at CEFR level C2.
Sentences should be roughly 15-25 words
Sentences Should be multiple clauses
Sentences should use less frequent vocabulary
Use a wide variety of grammatical tenses.
`

const BasePrompt = `
Make ${sentenceCount} sentences in Korean.
Translate each sentence to english.
`
const system: ChatCompletionMessage = {
    role: 'system',
    content:
        'You create native-like Korean sentences that are as close to natural as possible.',
}
const user: ChatCompletionMessage = {
    role: 'user',
    content: A1 + BasePrompt,
}

//messages

// List all words used.
// Put verbs (in the word list only) in infinitive form, meaning ending with -다.
// Put adjectives (in the word list only) in infinitive form, meaning ending with -다.
// Remove particles such as 는 은 를 을 도 에 이 가 from all nouns (in the word list only)
// Remove all proper nouns for example, people's names (from the word list only). All words should be in a single array, not sorted or seperated.
// Remove all arabic numbers (from the word list only).
