import { useMemo } from 'react'
import { prefixSumData } from '../utils/prefixSumData'
import { filterData } from '../utils/filterData'

export const useStatistics = (
    data: TestStats[],
    timescale: Timescale,
    level: Level
) => {
    const summedData = useMemo(() => prefixSumData(data), [data])
    const totalStats = summedData[summedData.length - 1]

    // TEMP TEST DATA
    const todayStats: SummedStats = {
        date: '10/02/2023 00:00:00',
        count: 32,
        duration: 64,
        levels: {
            A1: {
                easy: {
                    count: 75,
                    duration: 12,
                },
                okay: {
                    count: 49,
                    duration: 88,
                },
                hard: {
                    count: 46,
                    duration: 91,
                },
                count: 92,
                duration: 15,
            },
            A2: {
                easy: {
                    count: 18,
                    duration: 100,
                },
                okay: {
                    count: 57,
                    duration: 40,
                },
                hard: {
                    count: 3,
                    duration: 29,
                },
                count: 71,
                duration: 30,
            },
            B1: {
                easy: {
                    count: 17,
                    duration: 94,
                },
                okay: {
                    count: 23,
                    duration: 5,
                },
                hard: {
                    count: 44,
                    duration: 72,
                },
                count: 99,
                duration: 76,
            },
            B2: {
                easy: {
                    count: 51,
                    duration: 59,
                },
                okay: {
                    count: 9,
                    duration: 50,
                },
                hard: {
                    count: 33,
                    duration: 25,
                },
                count: 24,
                duration: 22,
            },
            C1: {
                easy: {
                    count: 2,
                    duration: 53,
                },
                okay: {
                    count: 28,
                    duration: 43,
                },
                hard: {
                    count: 97,
                    duration: 68,
                },
                count: 14,
                duration: 37,
            },
            C2: {
                easy: {
                    count: 87,
                    duration: 55,
                },
                okay: {
                    count: 66,
                    duration: 77,
                },
                hard: {
                    count: 56,
                    duration: 8,
                },
                count: 79,
                duration: 4,
            },
        },
    }

    const filteredTotalData = useMemo(() => {
        if (timescale === 'Today') return [todayStats]
        return filterData(summedData, timescale)
    }, [summedData, timescale])

    const filteredByLevelData: SummedLevelStats[] = useMemo(() => {
        return filteredTotalData.map((item) => ({
            date: item.date,
            ...item.levels[level],
        }))
    }, [filteredTotalData, level])

    return { todayStats, totalStats, filteredTotalData, filteredByLevelData }
}
