import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'

export const statsSlice: StatsState = lens(
    persist(
        (set): StatsState => ({
            sentenceCount: 0,
            incSentenceCount: () =>
                set((state) => ({ sentenceCount: state.sentenceCount + 1 })),
        }),
        {
            name: 'stats-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
