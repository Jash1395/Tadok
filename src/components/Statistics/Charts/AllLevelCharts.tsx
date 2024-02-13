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
        data,
        type: 'count' | 'duration'
    ): TimeSeriesData => {
        const timeSeriesData = data.map((item) => ({
            xval: item.date,
            yval: item[type],
        }))

        return timeSeriesData
    }

    const extractCrossSecData = (
        data,
        type: 'count' | 'duration'
    ): CrossSecData => {
        const last = data[data.length - 1]

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
                        <AreaChartGraph
                            data={extractTimeSeriesData(
                                filteredTotalData,
                                'count'
                            )}
                        />
                        <AreaChartGraph
                            data={extractTimeSeriesData(
                                filteredTotalData,
                                'duration'
                            )}
                        />
                    </StatCard>
                </>
            ) : null}
            <StatCard>
                <BarChartGraph
                    data={extractCrossSecData(filteredTotalData, 'count')}
                />
                <BarChartGraph
                    data={extractCrossSecData(filteredTotalData, 'duration')}
                />
            </StatCard>
            <StatCard>
                <PieChartGraph
                    data={extractCrossSecData(filteredTotalData, 'count')}
                />
                <PieChartGraph
                    data={extractCrossSecData(filteredTotalData, 'duration')}
                />
            </StatCard>
        </Container>
    )
}
