export const totalSumData = (
    data: TestStats | undefined
): SummedStats | undefined => {
    if (!data) return undefined

    const aggregatedData: SummedStats = {
        date: data.date,
        count: 0,
        duration: 0,
        levels: {},
    }

    Object.keys(data.levels).forEach((level) => {
        const levelData = data.levels[level]
        aggregatedData.levels[level] = { ...levelData, count: 0, duration: 0 }

        Object.keys(levelData).forEach((difficulty) => {
            if (['easy', 'okay', 'hard'].includes(difficulty)) {
                const { count, duration } = levelData[
                    difficulty as keyof LevelDetail
                ] as DifficultyDetail

                aggregatedData.levels[level][difficulty].count = count
                aggregatedData.levels[level][difficulty].duration = duration

                aggregatedData.levels[level].count += count
                aggregatedData.levels[level].duration += duration

                aggregatedData.count += count
                aggregatedData.duration += duration
            }
        })
    })

    return aggregatedData
}
