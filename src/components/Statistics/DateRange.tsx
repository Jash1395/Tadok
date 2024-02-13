import styled from 'styled-components'

const Text = styled.div`
    padding: 0.1rem 0.6rem;
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--card-text);
    background-color: var(--soft-bg-theme);
    border-radius: 9999rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DateText = styled.p`
    padding: 0 0.3rem;
    font-weight: 700;
`

const monthNames: Month[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

const extractDateParts = (dateString: string): DateParts => {
    const date = new Date(dateString)
    const year = date.getUTCFullYear().toString()
    const monthNum = date.getUTCMonth()
    const month = monthNames[monthNum] as Month
    const day = date.getUTCDate().toString()

    return { day, month, year }
}

// don't show year if the year is the same
const formatDate = (date: DateParts, isDifferentYear: boolean) => {
    const dateTextMonthDay = `${date.month} ${date.day}`
    const dateTextYear = `, ${date.year}`
    const dateText = `${dateTextMonthDay}${isDifferentYear ? dateTextYear : ''}`
    return dateText
}

interface Props {
    timerange: { start: string | undefined; end: string | undefined }
}

export const DateRange = ({ timerange }: Props) => {
    if (!timerange.start || !timerange.end) return <Text>...</Text>

    const startDate = extractDateParts(timerange.start)
    const endDate = extractDateParts(timerange.end)
    const isDifferentYear = startDate.year !== endDate.year
    const formattedStartDate = `${formatDate(startDate, isDifferentYear)}`
    const formattedEndDate = `${formatDate(endDate, isDifferentYear)}`
    const isToday = formattedStartDate === formattedEndDate

    return (
        <Text>
            <DateText>{formattedStartDate}</DateText>
            {!isToday ? (
                <>
                    to <DateText>{formattedEndDate}</DateText>
                </>
            ) : null}
        </Text>
    )
}
