import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import { ChartContainer } from './ChartContainer'

interface Props {
    data: TimeSeriesData
}

export const BarChartGraph = ({ data }: Props) => {
    return (
        <ChartContainer>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="yval" fill="#82ca9d" />
            </BarChart>
        </ChartContainer>
    )
}
