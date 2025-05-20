import { supabase } from "../supabase";

/**
 * Vérifie si un créneau est disponible
 * @param {string} date - La date du rendez-vous (YYYY-MM-DD)
 * @param {string} time - L'heure du rendez-vous (HH:mm)
 * @returns {Promise<boolean>} - true si le créneau est disponible, false sinon
 */
export const checkSlotAvailability = async (date, time) => {
    const { data, error } = await supabase
        .from('rendezvous')
        .select('id')
        .eq('date', date)
        .eq('time', time);

    if (error) {
        console.error('Erreur lors de la vérification du créneau:', error);
        return false;
    }

    return data.length === 0;
};

/**
 * Récupère tous les créneaux disponibles pour une date donnée
 * @param {string} date - La date pour laquelle récupérer les créneaux
 * @returns {Promise<Array<string>>} - Liste des créneaux disponibles
 */
export const getAvailableSlots = async (date) => {
    const { data: bookedSlots, error: bookedError } = await supabase
        .from('rendezvous')
        .select('time')
        .eq('date', date);

    if (bookedError) {
        console.error('Erreur lors de la récupération des créneaux occupés:', bookedError);
        return [];
    }

    // Liste des créneaux de base (par exemple, de 9h à 18h avec 30 minutes d'intervalle)
    const baseSlots = ['11:00:00', '11:30:00',
        '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00',
        '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00', '22:30:00'];

    // Créneaux occupés
    const occupiedSlots = bookedSlots.map(slot => slot.time);
    let availableSlots = baseSlots.filter(slot => !occupiedSlots.includes(slot));

    // Si la date est aujourd'hui, filtrer les créneaux passés
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });


    if (date === today) {
        availableSlots = availableSlots.filter(slot => slot > currentTime);
    }

    // Supprimer les ":00" à la fin de chaque créneau
    availableSlots = availableSlots.map(slot => slot.replace(':00', ''));
    // Retourne les créneaux disponibles en excluant les créneaux occupés
    console.log(availableSlots);
    return availableSlots;
};
