import { supabase } from "../supabase";

export const createUserTable = async () => {
    const { data, error } = await supabase
        .rpc('create_users_table');

    if (error) throw error;
    return data;
};

export const createUser = async (userId, datas) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{
            id: userId,
            first_name: datas.first_name,
            last_name: datas.last_name,
            phone: datas.phone,
            email: datas.email
        }]);

    if (error) throw error;
    return data;
};

