import { levelPrompts } from './levelPromps'

const A_words: Wordlist = require('../assets/A_words.json')
const B_words: Wordlist = require('../assets/B_words.json')
const C_words: Wordlist = require('../assets/C_words.json')

const wordlists = {
    A1: A_words,
    A2: A_words,
    B1: B_words,
    B2: B_words,
    C1: C_words,
    C2: C_words,
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

    if (!seedWord || !tense) {
        throw Error(
            `Failed to get ${!seedWord && 'seedWord'} ${!tense && 'tense'}`
        )
    }

    // console.log(seedWord.word, tense, seedWord.definition)

    const userPrompt = `
    Make exactly one sentencnces in Korean using the word "${seedWord.word}", where ${seedWord.word} has the meaning "${seedWord.definition}"
    Translate each sentence to english.
    Use the ${tense} tense.
    ${levelPrompts[level]}
    `

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

//messages

// List all words used.
// Put verbs (in the word list only) in infinitive form, meaning ending with -다.
// Put adjectives (in the word list only) in infinitive form, meaning ending with -다.
// Remove particles such as 는 은 를 을 도 에 이 가 from all nouns (in the word list only)
// Remove all proper nouns for example, people's names (from the word list only). All words should be in a single array, not sorted or seperated.
// Remove all arabic numbers (from the word list only).
