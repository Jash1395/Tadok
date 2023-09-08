import { levelPrompts } from './levelPromps'

import A_words from './assets/A_words.json'
import B_words from './assets/B_words.json'
import C_words from './assets/C_words.json'

const wordlists = {
    A1: A_words as Wordlist,
    A2: A_words as Wordlist,
    B1: B_words as Wordlist,
    B2: B_words as Wordlist,
    C1: C_words as Wordlist,
    C2: C_words as Wordlist,
}

const getRandomWord = (wordlist: Wordlist) => {
    if (wordlist.length === 0) {
        throw Error('Empty wordlist')
    }

    const randomIndex = Math.floor(Math.random() * wordlist.length)
    return wordlist[randomIndex]
}

function getRandomTense() {
    const tense = ['past', 'present', 'future']
    const randomIndex = Math.floor(Math.random() * tense.length)
    return tense[randomIndex]
}

export const buildPrompt = (level: Level): PromptData => {
    const seedWord = getRandomWord(wordlists[level])
    const tense = getRandomTense()
    console.log(seedWord.word, tense, seedWord.definition)

    const userPrompt = `
    Make exactly one sentencnces in Korean using the word "${seedWord.word}", where ${seedWord.word} has the meaning "${seedWord.definition}"
    Translate each sentence to english.
    ${levelPrompts[level]}
    
    `
    // Use the ${tense} tense.

    const promptData = {
        chatCompletionMessageParam: {
            role: 'user',
            content: userPrompt,
        },
        inputs: {
            seedWord: seedWord,
            tense: tense,
        },
    }

    return promptData
}
