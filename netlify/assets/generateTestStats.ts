import fs from 'fs'
import { performance } from 'perf_hooks'

const countMin = 10
const countMax = 50

// seconds
const durationMin = 50
const durationMax = 200

//
// TO RUN USE:
// npm run gen 10
//

const generateData = (numObjects: number, currentDate: Date) =>
    Array.from({ length: numObjects }, (_, i) => {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].reduce(
            (acc, level) => ({
                ...acc,
                [level]: {
                    hard: {
                        count: Math.floor(Math.random() * countMin + countMax),
                        duration: Math.floor(
                            Math.random() * durationMin + durationMax
                        ),
                    },
                    okay: {
                        count: Math.floor(Math.random() * countMin + countMax),
                        duration: Math.floor(
                            Math.random() * durationMin + durationMax
                        ),
                    },
                    easy: {
                        count: Math.floor(Math.random() * countMin + countMax),
                        duration: Math.floor(
                            Math.random() * durationMin + durationMax
                        ),
                    },
                },
            }),
            {}
        )

        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() - i)
        newDate.setHours(0, 0, 0, 0)

        return {
            date: newDate.toISOString(),
            levels,
        }
    })

const main = () => {
    const t0 = performance.now()

    const numObjects = process.argv[2] as unknown as number | undefined
    if (!numObjects) {
        console.log(`Aborted: No length specified`)
        return
    }

    const currentDate = new Date() // Use the current date
    const generatedData = generateData(numObjects, currentDate)

    fs.writeFileSync(
        'netlify/assets/testStats.json',
        JSON.stringify(generatedData, null, 2),
        {
            encoding: 'utf-8',
            flag: 'w',
        }
    )

    const t1 = performance.now()
    console.log(
        `Data successfully written to 'testStats.json' with ${numObjects} objects.`
    )
    console.log(`Time taken: ${((t1 - t0) / 1000).toFixed(4)} seconds.`)
}

main()
