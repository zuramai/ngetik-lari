import { supabase } from '@/composables/useSupabase'
export const getScores = async (map: string, mode: string) => {
    const query =  supabase.from('scores')
        .select('*, users:users(raw_user_meta_data)')
        .filter('mode', 'eq', mode)
        .limit(10)
    if(map !== 'all') {
        query.filter('map', 'eq', map)
    }
    return await query
}

export const getScoresFromUser = async (userId: number) => {
    return await supabase.from('scores').select('*').filter('user_id', 'eq', userId).order('created_at', { ascending: false })
}

export const saveScore = async(userId: string, mode: string, map: string, score: number) => {
    const { error } = await supabase.from('scores').insert({
        user_id: userId,
        mode, 
        score, 
        map
    })

    return error
}