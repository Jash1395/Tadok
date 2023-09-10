import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { userSlice } from './user'
import { statsSlice } from './stats'
import { withLenses } from '@dhmk/zustand-lens'

export const useStore = create(
    devtools(
        withLenses({
            user: userSlice,
            stats: statsSlice,
        })
    )
)
