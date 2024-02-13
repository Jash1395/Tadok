import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'
import { setThemeDocumentRoot } from '../utils/setThemeDocumentRoot'

const userStateStore = (set: SetState, get: GetState): UserState => ({
    // milliseconds
    durationCutoff: 60000,
    level: null,
    theme: 'light',

    setLevel: (level: Level | null) => set(() => ({ level: level })),
    setTheme: (theme: Theme) => {
        set(() => ({ theme: theme }))
        setThemeDocumentRoot(theme)
    },
    toggleTheme: () => {
        const otherTheme = get().theme === 'light' ? 'dark' : 'light'
        set(() => ({ theme: otherTheme }))
        setThemeDocumentRoot(otherTheme)
    },
})

export const userSlice: UserState = lens(
    persist(userStateStore, {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage),
    })
)
