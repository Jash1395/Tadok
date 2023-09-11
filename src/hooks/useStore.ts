import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { userSlice } from '../state/user'
import { statsSlice } from '../state/stats'
import { withLenses } from '@dhmk/zustand-lens'

const store = create(
    devtools(
        withLenses({
            user: userSlice,
            stats: statsSlice,
        })
    )
)

export const useStore = () => {
    return {
        ...store((props) => props.stats),
        ...store((props) => props.user),
    }
}
