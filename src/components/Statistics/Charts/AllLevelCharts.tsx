import styled from 'styled-components'
import { StatCard } from '../StatCard'
import { AreaChartGraph } from './AreaChartGraph'
import { BarChartGraph } from './BarChartGraph'
import { validLevels } from '../../../typesExported'
import { PieChartGraph } from './PieChartGraph'
import { ToggleButton } from '../../common/ToggleButton'

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
    filteredTotalData: SummedStats[]
    timescale: Timescale
}

export const AllLevelCharts = ({ filteredTotalData, timescale }: Props) => {
    const extractTimeSeriesData = (
        type: 'count' | 'duration'
    ): TimeSeriesData => {
        const timeSeriesData = filteredTotalData.map((item) => ({
            xval: item.date,
            yval: item[type],
        }))

        return timeSeriesData
    }

    const extractCrossSecData = (type: 'count' | 'duration'): CrossSecData => {
        const last = filteredTotalData[filteredTotalData.length - 1]

        const crossSecData: CrossSecData = validLevels.map((level) => ({
            xval: level,
            yval: last ? last.levels[level][type] : 0,
        }))
        return crossSecData
    }

    return (
        <Container>
            {timescale !== 'Today' ? (
                <>
                    <StatCard>
                        <ToggleButton />
                        <AreaChartGraph data={extractTimeSeriesData('count')} />
                        <AreaChartGraph
                            data={extractTimeSeriesData('duration')}
                        />
                    </StatCard>
                </>
            ) : null}
            <StatCard>
                <BarChartGraph data={extractCrossSecData('count')} />
                <BarChartGraph data={extractCrossSecData('duration')} />
            </StatCard>
            <StatCard>
                <PieChartGraph data={extractCrossSecData('count')} />
                <PieChartGraph data={extractCrossSecData('duration')} />
            </StatCard>
        </Container>
    )
}
