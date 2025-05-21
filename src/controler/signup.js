import { validateInput } from '../utils/validation';

export const handleAuth = async (e, isSignUp, setLoading, setError, updateFormData, setActiveTab, setUser, createUser, supabase, checkAuth) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validation des données
    const errors = isSignUp
        ? validateInput.validateRegister(data.email, data.password, data.first_name, data.last_name, data.phone)
        : validateInput.validateLogin(data.email, data.password);

    if (errors.length > 0) {
        setError(errors.join('\n'));
        setLoading(false);
        return;
    }

    try {
        if (isSignUp) {
            // Création du compte
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });

            if (authError) throw authError;

            // Création du profil utilisateur
            await createUser(authData.user.id,{
                id: authData.user.id,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
            });

            // Mise à jour des données dans le store
            updateFormData({
                'email': data.email,
                'name': data.first_name + " " + data.last_name,
                'phone': data.phone,
            });
            checkAuth();
            setActiveTab('confirmation')
            setUser(data.user);
        } else {
            // Connexion
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (authError) throw authError;
            checkAuth();
            setActiveTab('accueil');
            setUser(data.user);
        }

    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}
