import styled from 'styled-components'
import { StatCard } from '../StatCard'
import { AreaChartGraph } from './AreaChartGraph'
import { BarChartGraph } from './BarChartGraph'
import { validDifficulty } from '../../../typesExported'
import { PieChartGraph } from './PieChartGraph'

const Container = styled.div`
    margin-top: 1.4rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > :not(:last-child) {
        margin-bottom: 1.4rem;
    }
`

interface Props {
    filteredByLevelData: SummedLevelStats[]
    timescale: Timescale
}

export const ByLevelCharts = ({ filteredByLevelData, timescale }: Props) => {
    const extractTimeSeriesData = (
        type: 'count' | 'duration'
    ): TimeSeriesData => {
        const timeSeriesData = filteredByLevelData.map((item) => ({
            xval: item.date,
            yval: item[type],
        }))

        return timeSeriesData
    }

    const extractCrossSecData = (type: 'count' | 'duration'): CrossSecData => {
        const last = filteredByLevelData[filteredByLevelData.length - 1]

        const crossSecData: CrossSecData = validDifficulty.map(
            (difficulty) => ({
                xval: difficulty,
                yval: last ? last[difficulty][type] : 0,
            })
        )

        return crossSecData
    }

    return (
        <Container>
            {timescale !== 'Today' ? (
                <>
                    <StatCard>
                        <AreaChartGraph data={extractTimeSeriesData('count')} />
                    </StatCard>
                </>
            ) : null}
            <StatCard>
                <BarChartGraph data={extractCrossSecData('duration')} />
            </StatCard>
            <StatCard>
                <PieChartGraph data={extractCrossSecData('duration')} />
            </StatCard>
        </Container>
    )
}
