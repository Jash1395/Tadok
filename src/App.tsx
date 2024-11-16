import './styles/themes.css'
import { User } from 'firebase/auth'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { useInitialTheme } from './hooks/useInitialTheme'
import { useAuth } from './hooks/useAuth.ts'
import { useEffect, useRef } from 'react'

const useUserInfo = (user: User | null) => {
    // Twice for strict mode
    const isInitialRender = useRef(2)

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current--
            return
        }
        console.log(
            user
                ? `Logged in as: ${user.displayName} ${user.uid}`
                : 'Not logged in.'
        )
    }, [user])
}

import { getFunctions, httpsCallable } from 'firebase/functions'
const App = () => {
    const { user } = useAuth()
    useInitialTheme()
    useUserInfo(user)

    // test

    useEffect(() => {
        const functions = getFunctions()
        const getAllWordsData = httpsCallable(functions, 'test')

        getAllWordsData()
            .then((result) => console.log(result.data))
            .catch((error) => console.error(error.message))
    }, [])

    // test

    return (
        <RouterProvider
            // React Router Future Flag
            future={{
                v7_startTransition: true,
            }}
            router={router}
        />
    )
}

export default App
