import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'

const userStateStore = (set: SetState, get: GetState): UserState => ({
    // milliseconds
    durationCutoff: 30000,
    level: null,
    theme: 'light',

    setLevel: (level: Level | null) => set(() => ({ level: level })),
    setTheme: (theme: Theme) => {
        document.documentElement.dataset.theme = theme
        set(() => ({ theme: theme }))
    },
    toggleTheme: () => {
        const otherTheme = get().theme === 'light' ? 'dark' : 'light'
        document.documentElement.dataset.theme = otherTheme
        set(() => ({ theme: otherTheme }))
    },
})

export const userSlice: UserState = lens(
    persist(userStateStore, {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage),
    })
)
