import { useMemo } from 'react'
import { prefixSumData } from '../utils/prefixSumData'
import { filterData } from '../utils/filterData'
// import { isToday } from '../utils/isToday'
import { totalSumData } from '../utils/totalSumData'

// @ts-nocheck
// TODO

export const useStatistics = (
    data: TestStats[],
    timescale: Timescale,
    level: Level
) => {
    const summedData = useMemo(() => prefixSumData(data), [data])
    const totalStats = summedData[summedData.length - 1]
    const todayStats = useMemo(() => totalSumData(data[0]), [data])

    const filteredTotalData = useMemo(() => {
        // TODO BUG: WHEN CLICKING ON TODAY SCALE
        // if (timescale === 'Today') return [todayStats]
        return filterData(summedData, timescale, todayStats)
    }, [summedData, timescale])

    const filteredByLevelData: SummedLevelStats[] = useMemo(() => {
        return filteredTotalData.map((item: any) => ({
            date: item?.date,
            ...item?.levels[level],
        }))
    }, [filteredTotalData, level])

    return {
        todayStats,
        totalStats,
        filteredTotalData,
        filteredByLevelData,
    }
}
