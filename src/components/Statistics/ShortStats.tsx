import styled from 'styled-components'
import {
    SmallStatCardCount,
    SmallStatCardTime,
    SmallStatCardTimePer,
} from './SmallStatCard'

const Container = styled.div`
    display: flex;
    width: 100%;
    > :not(:last-child) {
        margin-right: 0.6rem;
    }
`

interface Props {
    data: Stat | undefined
}

export const ShortStats = ({ data }: Props) => {
    const msInSecond = 1000
    const count = data ? data.count : undefined
    const duration = data ? data.duration : undefined
    const timePer =
        count && duration ? (count / duration) * msInSecond : undefined

    return (
        <Container>
            <SmallStatCardCount value={count} />
            <SmallStatCardTime value={duration} />
            <SmallStatCardTimePer value={timePer} />
        </Container>
    )
}
