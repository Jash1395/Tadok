// Zustand / state
interface State extends StatsState, PlaceholderState {}

interface StatsState {
    sentenceCount: number
    incSentenceCount: () => void
}

interface PlaceholderState {
    placeholderCount: number
    increment: () => void
}

// App / sentences
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
type Difficulty = 'hard' | 'okay' | 'easy'
type Lang = 'english' | 'korean'

interface Sentence {
    [questionLang: string]: string
    [answerLang: string]: string
    inputs: Inputs
}

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
