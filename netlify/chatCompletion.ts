import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { buildPrompt } from './buildPrompt'
import { schema } from './schema'

const openAI = new OpenAI({
    apiKey: `${process.env.OPENAI}`,
})

// models
const models = {
    m3: 'gpt-3.5-turbo',
    m316: 'gpt-3.5-turbo-16k',
    m4: 'gpt-4',
}

const system: ChatCompletionMessageParam = {
    role: 'system',
    content:
        'You create native-like Korean sentences that are as close to natural as possible.',
}

export const getChatCompletion = async (level: level) => {
    const promptData = buildPrompt(level)

    const chatCompletion = await openAI.chat.completions.create({
        model: models.m3,
        messages: [system, promptData.chatCompletionMessageParam],
        functions: [{ name: 'get_sentences', parameters: schema }],
        function_call: { name: 'get_sentences' },
    })

    return {
        chatCompletion: chatCompletion,
        inputs: promptData.inputs,
    }
}
