import { onAuthStateChanged, User } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useEffect, useState } from 'react'

export const useAuth = () => {
    // TODO remove isAuthenticted, only use user
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const user = getAuth().currentUser
        setUser(user)
    }, [isAuthenticated])

    return { isAuthenticated, user }
}
