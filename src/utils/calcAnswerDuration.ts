export const calcAnswerDuration = (
    startUnixTime: number | undefined,
    durationCutoff: number
) => {
    // return 0 in the case that time cannot be calculated
    // this is better than not sending the card data / sending incomplete data
    if (!startUnixTime) {
        console.error('startTime not set')
        return 0
    }

    const currentUnixTime = Date.now()
    const duration = currentUnixTime - startUnixTime

    if (duration > durationCutoff) return durationCutoff
    return duration
}
