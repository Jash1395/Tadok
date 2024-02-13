import { createClient } from '@supabase/supabase-js'

export const createSupabaseClient = () => {
    const supabaseUrl = process.env['SUPABASE_URL']
    const supabaseKey = process.env['SUPABASE_KEY']

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Incorrect or missing supabase credentials')
    }

    return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
    })
}
