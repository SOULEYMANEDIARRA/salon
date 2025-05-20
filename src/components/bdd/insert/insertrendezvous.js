import { toast } from "react-toastify";
import { supabase } from "../supabase";
/**
 * 
 * @param {Object} formData 
 * @returns {boolean}
 */
export const insertrendezvous = async (formData) => {
    const { data, error } = await supabase.from('rendezvous').insert({
        service: formData.service,
        date: formData.date,
        time: formData.time,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
    })
    if (error) {
        console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
        toast.error('Erreur lors de l\'enregistrement du rendez-vous');
        return false;
    }
    console.log('Rendez-vous enregistré avec succès');
    toast.success('Rendez-vous enregistré avec succès');
    return true;
}   