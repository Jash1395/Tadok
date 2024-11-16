import { Handler } from '@netlify/functions'
// import { performance } from 'perf_hooks'
import { getChatCompletion } from '../openAI/chatCompletion'
// import { logChatCompletionDetails } from '../openAI/logChatCompletionDetails'
import { validateLevel } from '../openAI/validateLevel'

export const handler: Handler = async (event) => {
    try {
        const unvalidatedLevel = event.queryStringParameters?.['level']
        const level = validateLevel(unvalidatedLevel)
        if (!level) {
            throw Error('Valid level not specified')
        }
        // call to openAI
        // const startTime = performance.now()
        const output = await getChatCompletion(level)
        // const endTime = performance.now()
        // logChatCompletionDetails(startTime, endTime, output.chatCompletion)

        if (!output.chatCompletion.choices[0]) {
            throw Error('No message received')
        }

        // when this is stringified, "message" is stringified, but "inputs" is not (hence extra stringify)
        const returnData = {
            message:
                output.chatCompletion.choices[0].message.function_call
                    ?.arguments,
            inputs: JSON.stringify(output.inputs),
        }

        return {
            statusCode: 200,
            body: JSON.stringify(returnData),
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
