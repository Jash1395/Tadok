import { Handler } from '@netlify/functions'
const testStats: TestStats[] = require('../assets/testStats.json')

export const handler: Handler = async () => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify(testStats),
        }
    } catch (error) {
        console.error('Error:', error)

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'An error occurred',
            }),
        }
    }
}
