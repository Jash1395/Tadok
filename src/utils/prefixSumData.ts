import { validLevels, validDifficulty } from '../typesExported'
export const prefixSumData = (data: TestStats[]): SummedStats[] => {
    const initialAgg: SummedStats = {
        date: '',
        count: 0,
        duration: 0,
        levels: {
            A1: {
                easy: {
                    count: 0,
                    duration: 0,
                },
                okay: {
                    count: 0,
                    duration: 0,
                },
                hard: {
                    count: 0,
                    duration: 0,
                },
                count: 0,
                duration: 0,
            },
            A2: {
                easy: {
                    count: 0,
                    duration: 0,
                },
                okay: {
                    count: 0,
                    duration: 0,
                },
                hard: {
                    count: 0,
                    duration: 0,
                },
                count: 0,
                duration: 0,
            },
            B1: {
                easy: {
                    count: 0,
                    duration: 0,
                },
                okay: {
                    count: 0,
                    duration: 0,
                },
                hard: {
                    count: 0,
                    duration: 0,
                },
                count: 0,
                duration: 0,
            },
            B2: {
                easy: {
                    count: 0,
                    duration: 0,
                },
                okay: {
                    count: 0,
                    duration: 0,
                },
                hard: {
                    count: 0,
                    duration: 0,
                },
                count: 0,
                duration: 0,
            },
            C1: {
                easy: {
                    count: 0,
                    duration: 0,
                },
                okay: {
                    count: 0,
                    duration: 0,
                },
                hard: {
                    count: 0,
                    duration: 0,
                },
                count: 0,
                duration: 0,
            },
            C2: {
                easy: {
                    count: 0,
                    duration: 0,
                },
                okay: {
                    count: 0,
                    duration: 0,
                },
                hard: {
                    count: 0,
                    duration: 0,
                },
                count: 0,
                duration: 0,
            },
        },
    }

    // reduce is producing an array of prefix sums
    // deep copy (structuredClone) must be made to update nested values properly
    const summedData: SummedStats[] = data.reduce<SummedStats[]>(
        (acc, entry) => {
            const { levels, date } = entry

            const previousStats = acc[acc.length - 1] as SummedStats
            const currentTotal: SummedStats =
                acc.length === 0
                    ? { ...initialAgg }
                    : { ...structuredClone(previousStats) }

            currentTotal.date = date

            validLevels.forEach((levelKey) => {
                const level = levels[levelKey]
                if (!level) return

                validDifficulty.forEach((difficulty) => {
                    const diff = level[difficulty]
                    const currentLevel = currentTotal.levels[levelKey]
                    const currentDifficulty = currentLevel[difficulty]
                    if (!diff) return

                    // add to difficulty sum
                    currentDifficulty.count += diff.count
                    currentDifficulty.duration += diff.duration

                    // add to level sum
                    currentLevel.count += diff.count
                    currentLevel.duration += diff.duration

                    // add to total sum
                    currentTotal.count += diff.count
                    currentTotal.duration += diff.duration
                })
            })

            acc.push({ ...structuredClone(currentTotal) })
            return acc
        },
        []
    )

    return summedData
}
