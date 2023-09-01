import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
    console.log('test')
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `${process.env.OPENAI}!`,
        }),
    }
}
