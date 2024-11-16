// import styled from 'styled-components'
// import { useState, useEffect } from 'react'
// import { getStatistics } from '../../api/getStatistics'
// import { ShortStats } from './ShortStats.tsx'
// import { TimescaleRadio } from './TimescaleRadio.tsx'
// import { LevelRadio } from './LevelRadio.tsx'
// // import { convertToLocalTimeZone, filterData } from '../../utils/filterData.ts'
// import { useStatistics } from '../../hooks/useStatistics.ts'
// import { AllLevelCharts } from './Charts/AllLevelCharts.tsx'
// import { ByLevelCharts } from './Charts/ByLevelCharts.tsx'
// // import { prefixSumData } from '../../utils/prefixSumData.ts'
// // import { totalSumData } from '../../utils/totalSumData'

// // @ts-nocheck
// // TODO

// const Container = styled.div`
//     padding-bottom: 3vw;
//     width: 94%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

// const CardContainer = styled.div`
//     margin-top: 2rem;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     > :nth-child(1) {
//         margin-top: 0.6rem;
//     }
// `

// const Text = styled.p`
//     margin-top: 2rem;
//     margin-bottom: 0.3rem;
//     color: var(--card-text);
//     font-weight: 700;
//     font-size: 1.3rem;
// `

// interface Props {}

// export const Statistics = ({}: Props) => {
//     const [data, setData] = useState<TestStats[]>([])
//     const [timescale, setTimeScale] = useState<Timescale>('Week')
//     const [level, setLevel] = useState<Level>('A1')

//     const { todayStats, totalStats, filteredTotalData, filteredByLevelData } =
//         useStatistics(data, timescale, level)

//     useEffect(() => {
//         ;(async () => {
//             try {
//                 const stats = await getStatistics()
//                 if (!stats) throw Error('No stats found')
//                 // console.log(stats)
//                 // NEED NO CONVERT
//                 // const convertedStats = convertToLocalTimeZone(stats)
//                 setData(stats)
//             } catch (error) {
//                 console.error(error)
//             }
//         })()
//     }, [])

//     console.log(filteredTotalData)

//     return (
//         <Container>
//             <CardContainer>
//                 <Text>Today</Text>
//                 {todayStats ? <ShortStats data={todayStats} /> : null}
//                 <Text>Total</Text>
//                 {totalStats ? <ShortStats data={totalStats} /> : null}
//             </CardContainer>
//             <Text>Detailed</Text>
//             {filteredTotalData ? (
//                 <TimescaleRadio
//                     timescale={timescale}
//                     filteredTotalData={filteredTotalData}
//                     setTimeScale={setTimeScale}
//                 />
//             ) : null}
//             {filteredTotalData ? (
//                 <AllLevelCharts
//                     filteredTotalData={filteredTotalData}
//                     timescale={timescale}
//                 />
//             ) : null}
//             <Text>By Level</Text>
//             <LevelRadio level={level} setLevel={setLevel} />
//             {filteredByLevelData ? (
//                 <ByLevelCharts
//                     filteredByLevelData={filteredByLevelData}
//                     timescale={timescale}
//                 />
//             ) : null}
//         </Container>
//     )
// }
