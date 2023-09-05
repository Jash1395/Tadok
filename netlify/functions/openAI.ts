import { Handler } from '@netlify/functions'
import { performance } from 'perf_hooks'
import { getChatCompletion } from '../chatCompletion'
import { logChatCompletionDetails } from '../logChatCompletionDetails'

export const handler: Handler = async (event) => {
    try {
        const level = event.queryStringParameters?.level as level
        if (!level || !['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
            throw Error('No level specified')
        }

        // call to openAI
        const startTime = performance.now()
        const output = await getChatCompletion(level)
        const endTime = performance.now()
        logChatCompletionDetails(startTime, endTime, output.chatCompletion)

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

//messages

// List all words used.
// Put verbs (in the word list only) in infinitive form, meaning ending with -다.
// Put adjectives (in the word list only) in infinitive form, meaning ending with -다.
// Remove particles such as 는 은 를 을 도 에 이 가 from all nouns (in the word list only)
// Remove all proper nouns for example, people's names (from the word list only). All words should be in a single array, not sorted or seperated.
// Remove all arabic numbers (from the word list only).
