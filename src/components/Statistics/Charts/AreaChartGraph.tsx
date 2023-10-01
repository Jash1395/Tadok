import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'
import { ChartContainer } from './ChartContainer'

interface Props {
    data: TimeSeriesData
}

export const AreaChartGraph = ({ data }: Props) => {
    return (
        <ChartContainer>
            <AreaChart
                // height={100}
                // width={100}
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#00405f"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#00405f"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="xval" />
                <YAxis dataKey="yval" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="yval"
                    stroke="#00405f"
                    fillOpacity={0.7}
                    fill="url(#colorPv)"
                />
            </AreaChart>
        </ChartContainer>
    )
}
