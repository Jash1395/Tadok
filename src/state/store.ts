import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { placeholderSlice } from './placeholder'
import { statsSlice } from './stats'

// lens used to namespace sub-stores
// this avoids name collisions
import { withLenses } from '@dhmk/zustand-lens'

export const useStore = create(
    devtools(
        withLenses({
            place: placeholderSlice,
            stats: statsSlice,
        })
    )
)
