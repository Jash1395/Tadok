const filterDataLastWeek = (data: SummedStats[]) => {
    const currentDate = new Date()
    const oneWeekAgo = new Date()
    const oneDay = 24 * 60 * 60 * 1000

    // set to start and end of days to ensure current and last day are included
    currentDate.setHours(23, 59, 59, 999)
    oneWeekAgo.setHours(0, 0, 0, 0)
    oneWeekAgo.setTime(oneWeekAgo.getTime() - 7 * oneDay)

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= oneWeekAgo && itemDate <= currentDate
    })

    return filteredData
}

const filterDataLastMonth = (data: SummedStats[]) => {
    const currentDate = new Date()
    const oneMonthAgo = new Date()

    // set to start and end of days to ensure current and last day are included
    currentDate.setHours(23, 59, 59, 999)
    oneMonthAgo.setHours(0, 0, 0, 0)
    oneMonthAgo.setMonth(currentDate.getMonth() - 1)

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= oneMonthAgo && itemDate <= currentDate
    })

    return filteredData
}

const filterDataLastYear = (data: SummedStats[]) => {
    const currentDate = new Date()
    const oneYearAgo = new Date()

    // set to start and end of days to ensure current and last day are included
    currentDate.setHours(23, 59, 59, 999)
    oneYearAgo.setHours(0, 0, 0, 0)
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1)

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= oneYearAgo && itemDate <= currentDate
    })

    return filteredData
}

export const filterData = (data: SummedStats[], timescale: Timescale) => {
    const timescaleFilteredData = {
        All: (data: SummedStats[]) => data,
        Year: filterDataLastYear,
        Month: filterDataLastMonth,
        Week: filterDataLastWeek,
        Today: () => [],
    }[timescale](data)

    return timescaleFilteredData
}

export const convertToLocalTimeZone = (
    data: TestStats[],
    timeZone: string = 'Asia/Seoul'
): TestStats[] => {
    return data.map((item) => {
        const date = new Date(item.date)
        const convertedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timeZone,
        }).format(date)
        return { ...item, date: convertedDate }
    })
}
