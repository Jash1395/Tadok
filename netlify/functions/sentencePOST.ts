import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env['SUPABASE_URL'] as string
const supabaseKey = process.env['SUPABASE_KEY'] as string
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
})

export const handler = async (
    event: any
    // , context: any
) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        }
    }

    const data = JSON.parse(event.body)

    const queryData = { sentence_text: data.sentence, word_text: data.word }

    const { data: insertedData, error } = await supabase.rpc(
        'insert_sentence',
        queryData
    )

    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ insertedData }),
    }
}
