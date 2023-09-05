type level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
type difficulty = 'hard' | 'okay' | 'easy'
type lang = 'english' | 'korean'

interface Sentence {
    [questionLang: string]: string
    [answerLang: string]: string
    inputs: Inputs
}

// interface SentenceText {

// }

interface Card {}

interface SentenceList {
    sentences: Sentence[]
}

// OPENAI

interface WordEntry {
    word: string
    definition: string
    phrase: string
}

type Wordlist = WordEntry[]

interface PromptData {
    chatCompletionMessageParam: ChatCompletionMessageParam
    inputs: Inputs
}

interface Inputs {
    seedWord: WordEntry
    tense: string
}
