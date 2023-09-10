// Zustand / State
interface StatsState {
    sentenceHistory: SentenceHistoryEntry[]
    wordList: WordListEntry[]
    sentenceCount: number
    totalTime: number
    incSentenceCount: () => void
    addTotalTime: (duration: number) => void
    addWordList: (word: string, difficulty: Difficulty) => void
    addSentenceHistory: (
        sentence: Sentence,
        answerTime: number,
        difficulty: Difficulty,
        level: Level
    ) => void
}

interface UserState {
    durationCutoff: number
    level: Level | null
    setLevel: (level: Level | null) => void
}

interface SentenceHistoryEntry {
    sentence: Sentence
    answerTime: number
    dateTime: string
    difficulty: Difficulty
    level: Level
}

interface WordListEntry {
    word: string
    count: number
    answers: Answer<Difficulty, number>
}

interface Answer<T, U> {
    easy: U
    okay: U
    hard: U
}

// this type is needed to remove the 'set' function from Zustand
type SetState<S> = <R extends keyof S>(
    updateFunction: (state: Pick<S, R>) => Partial<S>
) => void

// App / General
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
type Difficulty = 'hard' | 'okay' | 'easy'
type Lang = 'english' | 'korean'

interface Sentence {
    [questionLang: string]: string
    [answerLang: string]: string
    inputs: Inputs
}

// OPENAI / API
interface Inputs {
    seedWord: WordEntry
    tense: string
}

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
