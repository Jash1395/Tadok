import { useState, useEffect } from 'react'

export const useFlashAnswer = () => {
    const [isFlashAnswer, setIsFlashAnswer] = useState<Difficulty | false>(
        false
    )

    const flashAnswer = (difficulty: Difficulty) => {
        // toggle isFlashAnswer to reset any active animations
        setIsFlashAnswer(false)
        setTimeout(() => {
            setIsFlashAnswer(difficulty)
        }, 1)
    }

    useEffect(() => {
        // Clean up the isFlashAnswer after a certain time (e.g., 2 seconds)
        const timer = setTimeout(() => {
            setIsFlashAnswer(false)
        }, 2000)

        // Return a cleanup function to clear the timer when the component unmounts
        return () => clearTimeout(timer)
    }, [])

    return { isFlashAnswer, flashAnswer }
}
