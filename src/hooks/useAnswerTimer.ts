import { useEffect, useState } from 'react'

export const useAnswerTimer = (currentSentence: Sentence | undefined) => {
    const [startUnixTime, setStartUnixTime] = useState<number | undefined>()

    useEffect(() => {
        if (!currentSentence) return
        // console.log('resetTimer')
        const currentUnixTime = Date.now()
        setStartUnixTime(currentUnixTime)
    }, [currentSentence])

    return startUnixTime
}
