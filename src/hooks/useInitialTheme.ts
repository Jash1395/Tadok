import { httpsCallable } from 'firebase/functions'
import { getFunctions } from 'firebase/functions'
import { useEffect } from 'react'
import { useStore } from './useStore'
import { useAuth } from './useAuth'

const fetchTheme = async (): Promise<Theme> => {
    const functions = getFunctions()
    const getUserTheme = httpsCallable(functions, 'getUserTheme')

    try {
        const response: any = await getUserTheme()
        return response.data.theme
    } catch (error) {
        console.error('Error fetching theme:', error)
        throw new Error('Failed to fetch theme')
    }
}

export const useInitialTheme = () => {
    const { theme, setTheme } = useStore()

    // TODO get theme from localstorage
    setTheme(theme)
    const { user } = useAuth()

    useEffect(() => {
        ;(async () => {
            if (!user) return
            const userTheme = await fetchTheme()
            setTheme(userTheme)
        })()
    }, [user])
}
