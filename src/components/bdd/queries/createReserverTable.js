import { supabase } from '../supabase';

export const createReserverTable = async () => {
    try {
        const { error } = await supabase
            .rpc('create_reserver_table', {});

        if (error) throw error;
        console.log('Table reserver créée avec succès');
    } catch (error) {
        console.error('Erreur lors de la création de la table reserver:', error);
    }
};
