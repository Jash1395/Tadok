import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { levelPrompts } from './levelPromps'

export const buildPrompt = (level: level): ChatCompletionMessageParam => {
    const BasePrompt = `
    Make sentences in Korean.
    Translate each sentence to english.
    Use a mix of past, present, and future tense.
    `
    const levelPrompt = levelPrompts[level]

    return {
        role: 'user',
        content: levelPrompt + BasePrompt,
    }
}
