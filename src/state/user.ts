import { lens } from '@dhmk/zustand-lens'
import { persist, createJSONStorage } from 'zustand/middleware'

const userStateStore = (set: SetState<UserState>): UserState => ({
    // milliseconds
    durationCutoff: 30000,
    level: null,

    setLevel: (level: Level | null) => set(() => ({ level: level })),
})

export const userSlice: UserState = lens(
    persist(userStateStore, {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage),
    })
)
