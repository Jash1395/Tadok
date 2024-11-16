// @ts-nocheck
// TODO

export const transformStatistics = (data: any): Statistics => {
    const result: Statistics = []

    data.forEach((item: any) => {
        // Ensure item.date is a Date object
        const date = new Date(item.date)

        let dateEntry = result.find(
            (entry) => entry.date === date.toISOString()
        )

        if (!dateEntry) {
            dateEntry = { date: date.toISOString(), levels: {} }
            result.push(dateEntry)
        }

        if (!dateEntry.levels[item.sentence_level]) {
            dateEntry.levels[item.sentence_level] = {
                hard: { count: 0, duration: 0 },
                okay: { count: 0, duration: 0 },
                easy: { count: 0, duration: 0 },
            }
        }

        const difficulty =
            dateEntry.levels[item.sentence_level][item.answer_difficulty]
        // Ensure each difficulty level is initialized properly
        difficulty.count = item.count ?? 0
        difficulty.duration = item.duration ?? 0
    })

    return result
}
