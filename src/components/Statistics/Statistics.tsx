import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { getStatistics } from '../../api/getStatistics'
import { ShortStats } from './ShortStats.tsx'
import { TimescaleRadio } from './TimescaleRadio.tsx'
import { LevelRadio } from './LevelRadio.tsx'
import { convertToLocalTimeZone } from '../../utils/filterData.ts'
import { useStatistics } from '../../hooks/useStatistics.ts'
import { AllLevelCharts } from './Charts/AllLevelCharts.tsx'
import { ByLevelCharts } from './Charts/ByLevelCharts.tsx'

const Container = styled.div`
    padding-bottom: 3vw;
    width: 94%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CardContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > :nth-child(1) {
        margin-top: 0.6rem;
    }
`

const Text = styled.p`
    margin-top: 2rem;
    margin-bottom: 0.3rem;
    color: var(--card-text);
    font-weight: 700;
    font-size: 1.3rem;
`

interface Props {}

export const Statistics = ({}: Props) => {
    const [data, setData] = useState<TestStats[]>([])
    const [timescale, setTimeScale] = useState<Timescale>('Week')
    const [level, setLevel] = useState<Level>('A1')

    // Test data for todayStats in useStatistics()
    const { todayStats, totalStats, filteredTotalData, filteredByLevelData } =
        useStatistics(data, timescale, level)

    useEffect(() => {
        ;(async () => {
            try {
                const stats = await getStatistics()
                if (!stats) throw Error('Error')
                const convertedStats = convertToLocalTimeZone(stats)
                setData(convertedStats)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <Container>
            <CardContainer>
                <Text>Today</Text>
                <ShortStats data={todayStats} />
                <Text>Total</Text>
                <ShortStats data={totalStats} />
            </CardContainer>
            <Text>Detailed</Text>
            <TimescaleRadio
                timescale={timescale}
                filteredTotalData={filteredTotalData}
                setTimeScale={setTimeScale}
            />
            <AllLevelCharts
                filteredTotalData={filteredTotalData}
                timescale={timescale}
            />
            <Text>By Level</Text>
            <LevelRadio level={level} setLevel={setLevel} />
            <ByLevelCharts
                filteredByLevelData={filteredByLevelData}
                timescale={timescale}
            />
        </Container>
    )
}
