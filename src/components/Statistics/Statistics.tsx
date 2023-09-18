import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { StatWindow } from './StatWindow'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'
import { getStatistics } from '../../api/getStatistics'

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
        margin-top: 2rem;
    }
`

const GraphContainer = styled.div`
    height: 30rem;
    width: 30rem;
`
interface Props {}

export const Statistics = ({}: Props) => {
    const [data, setData] = useState<LevelStats[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const stats = await getStatistics()
                if (!stats) throw Error('Error')

                setData(stats)
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, [])

    const transformData = (data: any[]): any[] => {
        let aggregatedCount = 0

        return data.map((entry) => {
            const { time, levels } = entry

            // Sum up 'count' from all nested layers
            Object.values(levels).forEach((level) => {
                Object.values(level).forEach((category) => {
                    aggregatedCount += category.count
                })
            })

            // Convert ISO time to dd/mm
            const formattedTime = new Date(time).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
            })

            return { date: formattedTime, count: aggregatedCount }
        })
    }

    const transformedData = transformData(data)
    console.log(transformedData)

    const winHight = 15
    const winWidth = '100%'

    return (
        <Container>
            <StatWindow height={`${winHight}rem`} width={winWidth}>
                <GraphContainer>
                    <AreaChart
                        width={500}
                        height={250}
                        data={transformedData}
                        margin={{ top: 10, right: 0, left: 20, bottom: 10 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorPv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
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
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#00405f"
                            fillOpacity={0.7}
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </GraphContainer>
            </StatWindow>
            <StatWindow height={`${winHight}rem`} width={winWidth} />
            <StatWindow height={`${winHight}rem`} width={winWidth} />
        </Container>
    )
}
