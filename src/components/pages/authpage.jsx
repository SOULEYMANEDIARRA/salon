import { useEffect, useState } from "react";
import { useFormStore } from "../zustand/formStore";
import { supabase } from "../bdd/supabase";
import { useAuthStore } from "../zustand/authStore";
import { useActiveTabStore } from "../zustand/store";
import { createUser } from "../bdd/insert/createUser";
import { handleAuth } from "../controler/signup";

export const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { updateFormData } = useFormStore();
    const { setUser } = useAuthStore();
    const { setActiveTab } = useActiveTabStore();
    const { checkAuth, user } = useAuthStore();
    useEffect(() => {
        if (user) {
            setActiveTab('accueil');
            return;
        }
    }, [user]);

    const handleAuthForm = async (e) => {
        handleAuth(e, isSignUp, setLoading, setError, updateFormData, setActiveTab, setUser, createUser, supabase, checkAuth)
    };

    return (
        <div className="auth container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isSignUp ? "Créer un compte" : "Se connecter"}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleAuthForm}>
                    <div className="rounded-md  -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                required
                            />
                        </div>

                        {isSignUp && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="first_name" className="block text-gray-700 text-sm font-medium mb-2">
                                        Prénom
                                    </label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="last_name" className="block text-gray-700 text-sm font-medium mb-2">
                                        Nom
                                    </label>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                                        Téléphone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error }
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#D4AF37] hover:bg-[#D4AF37]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Chargement..." : isSignUp ? "S'inscrire" : "Se connecter"}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="connecter text-sm text-[#D4AF37] hover:text-[#D4AF37]/80"
                    >
                        {isSignUp ? "Déjà inscrit ? Se connecter" : "Pas encore inscrit ? S'inscrire"}
                    </button>
                </div>
            </div>
        </div>
    );
};
