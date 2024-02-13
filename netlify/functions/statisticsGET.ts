import { Handler } from '@netlify/functions'
import { createSupabaseClient } from '../statistics/createSupabaseClient'
import { transformStatistics } from '../statistics/transformStatistics'

export const handler: Handler = async () => {
    try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase.rpc('get_statistics')

        const statistics = transformStatistics(data)

        if (error) {
            console.log(error)
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(statistics),
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
