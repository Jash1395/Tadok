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
    theme: Theme
    setLevel: (level: Level | null) => void
    setTheme: () => void
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

// Zustand internal
type SetStateInternal<T> = {
    _(
        partial:
            | T
            | Partial<T>
            | {
                  _(state: T): T | Partial<T>
              }['_'],
        replace?: boolean | undefined
    ): void
}['_']

interface StoreApi<T> {
    setState: SetStateInternal<T>
    getState: () => T
    subscribe: (listener: (state: T, prevState: T) => void) => () => void
    /**
     * @deprecated Use `unsubscribe` returned by `subscribe`
     */
    destroy: () => void
}

type SetState = SetStateInternal<T>
type GetState = StoreApi<T>['getState']

// App / General
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
type Difficulty = 'hard' | 'okay' | 'easy'
type Lang = 'english' | 'korean'
type Theme = 'light' | 'dark'

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
