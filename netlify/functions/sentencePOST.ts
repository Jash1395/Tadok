import { createClient } from '@supabase/supabase-js'

export const handler = async (event: any) => {
    const supabaseUrl = process.env['SUPABASE_URL']
    const supabaseKey = process.env['SUPABASE_KEY']

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        }
    }

    if (!supabaseUrl || !supabaseKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Supabase credentials are not properly set.',
            }),
        }
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
    })

    try {
        const data = JSON.parse(event.body)

        const sentenceQueryData = {
            p_answer_time_ms: data.duration,
            p_definition: data.definition,
            p_difficulty_level: data.difficulty,
            p_sentence: data.sentence,
            p_word: data.word,
        }

        console.log(sentenceQueryData)

        const { data: insertedData, error } = await supabase.rpc(
            'insert_sentence',
            sentenceQueryData
        )

        console.log(insertedData)

        if (error) {
            console.log(error)
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ insertedData }),
        }
    } catch (error) {
        console.error('Error handling request:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        }
    }
}
