import { PieChart, Pie, Cell, Legend } from 'recharts'
import { ChartContainer } from './ChartContainer'

interface Props {
    data: TimeSeriesData
}

export const PieChartGraph = ({ data }: Props) => {
    const renderColorfulLegendText = (
        value: string
        // , entry: any
    ) => {
        return (
            <span
                style={{ color: '#596579', fontWeight: 500, padding: '10px' }}
            >
                {value}
            </span>
        )
    }

    return (
        <ChartContainer>
            <PieChart
            // onMouseEnter={this.onPieEnter}
            >
                <Pie
                    data={data}
                    cx={80}
                    cy={90}
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="yval"
                >
                    {data.map(
                        (
                            // entry,
                            index
                        ) => (
                            <Cell key={`cell-${index}`} fill={'#0088FE'} />
                        )
                    )}
                </Pie>
                <Legend
                    height={0}
                    iconType="circle"
                    layout="vertical"
                    verticalAlign="middle"
                    iconSize={10}
                    // padding={5}
                    formatter={renderColorfulLegendText}
                />
            </PieChart>
        </ChartContainer>
    )
}
