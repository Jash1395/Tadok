export const isToday = (isoDateString: string | undefined) => {
    if (!isoDateString) return false

    const parsedDate = new Date(isoDateString)

    const currentDate = new Date()
    const currentYear = currentDate.getUTCFullYear()
    const currentMonth = currentDate.getUTCMonth()
    const currentDay = currentDate.getUTCDate()

    return (
        parsedDate.getUTCFullYear() === currentYear &&
        parsedDate.getUTCMonth() === currentMonth &&
        parsedDate.getUTCDate() === currentDay
    )
}
