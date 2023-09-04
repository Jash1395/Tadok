import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { levelPrompts } from './levelPromps'

import A_words from './assets/A_words.json'
import B_words from './assets/B_words.json'
import C_words from './assets/C_words.json'

export const buildPrompt = (level: level): ChatCompletionMessageParam => {
    const aword = A_words[Math.floor(Math.random() * A_words.length)].word

    const bword = B_words[Math.floor(Math.random() * B_words.length)].word
    const bword1 = B_words[Math.floor(Math.random() * B_words.length)].word
    const bword2 = B_words[Math.floor(Math.random() * B_words.length)].word

    const cword = C_words[Math.floor(Math.random() * C_words.length)].word
    const cword1 = C_words[Math.floor(Math.random() * C_words.length)].word
    const cword2 = C_words[Math.floor(Math.random() * C_words.length)].word

    const one = level === 'C1' || level === 'C2' ? cword : bword
    const two = level === 'C1' || level === 'C2' ? cword1 : bword1
    const three = level === 'C1' || level === 'C2' ? cword2 : bword2

    console.log(cword, cword1, cword2)

    const BasePrompt = `
    YOU MUST USE THE WORD ${one}, ${two}, or ${three}. This is the most important.
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
