import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'
import 'node_modules/zustand/vanilla.d.ts'

const userStateStore = (set: SetState, get: GetState): UserState => ({
    // milliseconds
    durationCutoff: 30000,
    level: null,
    theme: 'light',

    setLevel: (level: Level | null) => set(() => ({ level: level })),
    setTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light'
        document.documentElement.dataset.theme = newTheme
        set(() => ({ theme: newTheme }))
    },
})

export const userSlice: UserState = lens(
    persist(userStateStore, {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage),
    })
)
