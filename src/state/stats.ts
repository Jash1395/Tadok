import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'
import { newWordList } from '../utils/newWordList'
import { newSentenceHistory } from '../utils/newSentenceHistory'

const statsStateStore = (set: SetState<StatsState>): StatsState => ({
    sentenceHistory: [],
    wordList: [],
    sentenceCount: 0,
    totalTime: 0,

    incSentenceCount: () =>
        set((state: StatsState) => ({
            sentenceCount: state.sentenceCount + 1,
        })),

    addTotalTime: (duration: number) =>
        set((state: StatsState) => ({ totalTime: state.totalTime + duration })),

    addWordList: (word: string, difficulty: Difficulty) =>
        set((state: StatsState) => ({
            wordList: newWordList(state.wordList, word, difficulty),
        })),

    addSentenceHistory: (
        sentence: Sentence,
        answerTime: number,
        difficulty: Difficulty,
        level: Level
    ) =>
        set((state: StatsState) => ({
            sentenceHistory: newSentenceHistory(
                state.sentenceHistory,
                sentence,
                answerTime,
                difficulty,
                level
            ),
        })),
})

export const statsSlice: StatsState = lens(
    persist(statsStateStore, {
        name: 'stats-store',
        storage: createJSONStorage(() => sessionStorage),
    })
)
