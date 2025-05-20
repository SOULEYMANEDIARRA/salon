import { supabase } from "../supabase";

export const getAvailableSlots = async (formData) => {
    const times = await supabase
        .from('reserver') 
        .select('time')
        .eq('date', formData.date)

    if (times.error) throw times.error;

    return times.data;
};
export const insertreserver = async (formData) => {
    const { data, error } = await supabase.from('reserver').insert({
        date: formData.date,
        time: formData.time,
    })
    if (error) {
        return false;
    }

    return true;
} 