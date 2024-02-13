import { createSupabaseClient } from '../statistics/createSupabaseClient'

export const handler = async (event: any) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        }
    }

    try {
        const supabase = createSupabaseClient()

        const sentenceData = JSON.parse(event.body)

        const sentenceQueryData = {
            p_answer_time_ms: sentenceData.duration,
            p_definition: sentenceData.definition,
            p_sentence_level: sentenceData.level,
            p_answer_difficulty: sentenceData.difficulty,
            p_sentence: sentenceData.sentence,
            p_word: sentenceData.word,
        }

        console.log(sentenceQueryData)

        const { data, error } = await supabase.rpc(
            'insert_sentence',
            sentenceQueryData
        )

        console.log(data)

        if (error) {
            console.log(error)
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ data }),
        }
    } catch (error) {
        console.error('Error handling request:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        }
    }
}
