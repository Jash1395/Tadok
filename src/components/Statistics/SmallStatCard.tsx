import React from 'react'
import styled from 'styled-components'
import { StatCard } from './StatCard'

const Container = styled(StatCard)`
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const FlexContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const TextContainer = styled.div`
    height: 2rem;
    display: flex;
    align-items: flex-end;
`

const NameText = styled.p`
    white-space: pre-wrap;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 110%;
`

const ValueText = styled.p`
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 100%;
    color: limegreen;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const DecorationText = styled.p`
    margin-right: 0.2rem;
    color: var(--card-text-light);
    font-weight: 500;
    font-size: 1rem;
    line-height: 0.9;
`

const formatTimeSpent = (
    timeSpentTotalSeconds: number
): [number, number, number] => {
    const secondsInDay = 86400
    const secondsInHour = 3600
    const secondsInMinute = 60

    const timeSpentDays = Math.floor(timeSpentTotalSeconds / secondsInDay)
    const remainingSecondsAfterDay = timeSpentTotalSeconds % secondsInDay

    const timeSpentHours = Math.floor(remainingSecondsAfterDay / secondsInHour)
    const remainingSecondsAfterHour = remainingSecondsAfterDay % secondsInHour

    const timeSpentMinutes = Math.floor(
        remainingSecondsAfterHour / secondsInMinute
    )

    return [timeSpentDays, timeSpentHours, timeSpentMinutes]
}

const noValue = '...'

interface Props {
    name: string
    value: string
}

export const SmallStatCard = ({ name, value }: Props) => {
    return (
        <Container>
            <NameText>{name}</NameText>
            <ValueText>{value}</ValueText>
        </Container>
    )
}

interface PropsCount {
    value: number | undefined
}

export const SmallStatCardCount = ({ value }: PropsCount) => {
    const valueStr = value ? value.toString() : noValue
    const groupedByThousands = ((input: string): string[] => {
        const reversedString = input.split('').reverse().join('')
        const chunks = reversedString.match(/.{1,3}/g) || []
        const arrayGroupedByThousands = chunks
            .map((chunk) => chunk.split('').reverse().join(''))
            .reverse()
        return arrayGroupedByThousands
    })(valueStr)

    return (
        <Container>
            <NameText>{`Sentences\nRead`}</NameText>
            <FlexContainer>
                <TextContainer>
                    {groupedByThousands.map((group, index, array) => (
                        <React.Fragment key={group}>
                            <ValueText>{group}</ValueText>
                            {index !== array.length - 1 ? (
                                <DecorationText>,</DecorationText>
                            ) : null}
                        </React.Fragment>
                    ))}
                </TextContainer>
            </FlexContainer>
        </Container>
    )
}

interface PropsTime {
    value: number | undefined
}

export const SmallStatCardTime = ({ value }: PropsTime) => {
    const [timeSpentDays, timeSpentHours, timeSpentMinutes] = value
        ? formatTimeSpent(value)
        : [noValue, noValue, noValue]
    return (
        <Container>
            <NameText>{`Time\nSpent`}</NameText>
            <FlexContainer>
                <TextContainer>
                    {timeSpentDays ? (
                        <>
                            <ValueText>{timeSpentDays}</ValueText>
                            <DecorationText>d</DecorationText>
                        </>
                    ) : null}

                    {timeSpentHours ? (
                        <>
                            <ValueText>{timeSpentHours}</ValueText>
                            <DecorationText>h</DecorationText>
                        </>
                    ) : null}
                    <ValueText>{timeSpentMinutes}</ValueText>
                    <DecorationText>m</DecorationText>
                </TextContainer>
            </FlexContainer>
        </Container>
    )
}

interface PropsTimePer {
    value: number | undefined
}

export const SmallStatCardTimePer = ({ value }: PropsTimePer) => {
    return (
        <Container>
            <NameText>{`Time per\nSentence`}</NameText>
            <FlexContainer>
                <TextContainer>
                    <ValueText>
                        {value ? value.toFixed(1).toString() : noValue}
                    </ValueText>
                    <DecorationText>s</DecorationText>
                </TextContainer>
            </FlexContainer>
        </Container>
    )
}
