export const validSearchParams = ['level'] as const
export const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export const validDifficulty = ['easy', 'okay', 'hard'] as const

// TODO rename types
export interface AnswerData {
    easy?: number
    okay?: number
    hard?: number
}

export interface DefinitionData {
    [definition: string]: AnswerData
}

export interface LevelData {
    [word: string]: DefinitionData
}

export interface UserWordData {
    beginner?: LevelData
    intermediate?: LevelData
    advanced?: LevelData
    custom?: LevelData
}
