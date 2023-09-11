import { useEffect } from 'react'
import { useStore } from './useStore'

export const useInitialTheme = () => {
    const { theme, setTheme } = useStore()
    useEffect(() => {
        setTheme(theme)
    }, [])
}
