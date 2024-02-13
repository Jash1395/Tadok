// General
type Month =
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug'
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec'

type DateParts = {
    day: string
    month: Month
    year: string
}

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
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
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

const validSearchParams = ['level'] as const
type ValidSearchParamAll = (typeof validSearchParams)[number]
type ValidSearchParam = Partial<ValidSearchParamAll>

interface SearchParamsState extends Partial<SearchParamsState> {
    [level: string]: Level
}

type UnvalidatedParam = {
    [k: string]: string
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
    destroy: () => void
}

type SetState = SetStateInternal<T>
type GetState = StoreApi<T>['getState']

// App / General

const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
const validDifficulty = ['easy', 'okay', 'hard'] as const
type Level = (typeof validLevels)[number]
type Difficulty = (typeof validDifficulty)[number]

type Lang = 'english' | 'korean'
type Theme = 'light' | 'dark'
type MainWindow = 'reader' | 'statistics' | 'browser'
type Timescale = 'All' | 'Year' | 'Month' | 'Week' | 'Today'

interface Sentence {
    [questionLang: string]: string
    [answerLang: string]: string
    inputs: Inputs
}

// OPENAI
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

// Statistics

type Stat = {
    count: number
    duration: number
}

type LevelTestStats = Partial<Record<Level, Record<Difficulty, Stat>>>

interface TestStats {
    date: string
    levels: LevelTestStats
}

type Statistics = TestStats[]

type Diff = {
    [key in Difficulty]: Stat
} & Stat

type LevelStats = {
    [key in Level]: Diff
}

interface SummedStats extends Stat {
    date: string
    levels: LevelStats
}

interface SummedLevelStats extends Diff {
    date: string
}

type TimeSeriesDataPoint = { xval: string; yval: number }
type TimeSeriesData = TimeSeriesDataPoint[]

type CrossSecDataPoint = {
    xval: Level[number]
    yval: number
}
type CrossSecData = CrossSecDataPoint[]
