import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'

export const placeholderSlice: PlaceholderState = lens(
    persist(
        (set): PlaceholderState => ({
            placeholderCount: 0,
            increment: () =>
                set((state) => ({
                    placeholderCount: state.placeholderCount + 1,
                })),
        }),
        {
            name: 'placeholder-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
