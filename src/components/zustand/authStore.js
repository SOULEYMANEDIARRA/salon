import { create } from 'zustand';
import { supabase } from '../bdd/supabase';
export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    // ✅ Vérifier l'état de connexion et récupérer toutes les données
    checkAuth: async () => {
        set({ isLoading: true, error: null });

        // 1. Récupère l'utilisateur authentifié via Supabase Auth
        const {
            data: { user: authUser },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
            set({
                user: null,
                isLoading: false,
                error: authError ? authError.message : 'Utilisateur non connecté',
            });
            return;
        }

        // 2. Récupère les données de ta table personnalisée `users`
        const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();

        if (profileError) {
            set({
                user: null,
                isLoading: false,
                error: profileError.message,
            });
            return;
        }

        // 3. Fusionne les données dans un seul objet
        const fullUser = {
            ...authUser,
            profile: userProfile, // tu peux aussi faire un spread si tu veux tout au même niveau
        };

        // 4. Met à jour le state global
        set({ user: fullUser, isLoading: false });
    },

    // ✅ Déconnexion
    signOut: async (setActiveTab) => {
        setActiveTab('auth');
        set({ isLoading: true });
        const { error } = await supabase.auth.signOut();
        if (error) {
            set({ error: error.message });
        }
        set({ user: null, isLoading: false });
    },
}));
