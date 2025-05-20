import { supabase } from "../supabase";

export const getUserInfo = async () => {
    // 🔹 1. Récupère l'utilisateur connecté
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) throw authError;
    if (!user) throw new Error("Aucun utilisateur connecté");

    const userId = user.id;

    // 🔹 2. Récupère les infos dans ta table personnalisée `users`
    const { data: profile, error: profileError } = await supabase
        .from('users') // ou 'public.users'
        .select('*')
        .eq('id', userId)
        .single();

    if (profileError) throw profileError;

    // 🔹 3. Fusionne les deux objets dans un seul
    const fullUser = {
        ...user,        // Données de `auth.users` (email, id, user_metadata, etc.)
        profile         // Données de ta table personnalisée
    };

    return fullUser;
};
