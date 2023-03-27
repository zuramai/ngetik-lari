import { supabase } from '@/composables/useSupabase'
export const getScores = async (map: string, mode: string) => {
    const query = supabase.from('leaderboard')
        .select('*')
        .filter('mode', 'eq', mode)
        .order('score', {ascending: true})
        .limit(10)
    if(map !== 'all') {
        query.filter('map', 'eq', map)
    }
    return await query
}

export const getScoresFromUser = async (userId: string) => {
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