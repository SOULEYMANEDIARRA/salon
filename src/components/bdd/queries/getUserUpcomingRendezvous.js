import { supabase } from "../supabase";

/**
 * Récupère les rendez-vous à venir d'un utilisateur (date/heure future)
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Array>} Liste des rendez-vous à venir
 */
export const getUserUpcomingRendezvous = async (email) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0,5);

    const { data, error } = await supabase
        .from('rendezvous')
        .select('*')
        .eq('email', email)
        .or(`date.gt.${today},and(date.eq.${today},time.gte.${currentTime})`)
        .order('date', { ascending: true })
        .order('time', { ascending: true });

    if (error) {
        console.error('Erreur lors de la récupération des rendez-vous à venir:', error);
        return [];
    }
    return data;
};
