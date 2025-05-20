export const handleAuth = async (e, isSignUp, setLoading, setError, updateFormData, setActiveTab, setUser, createUser, supabase, checkAuth) => {
    e.preventDefault();
    const { email, password, first_name, last_name, phone } = e.target;
    setLoading(true);
    setError(null);    

    try {
        if (isSignUp) {
            const { data, error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value
            });

            if (error) throw error;

            // Stocker aussi dans ta table `users`
            const userId = data.user.id;
            await createUser(userId, {
                first_name: first_name.value,
                last_name: last_name.value,
                phone: phone.value,
                email: email.value
            });
            checkAuth();
            updateFormData('email', email.value);
            setActiveTab('confirmation')
            setUser(data.user);
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value
            });

            if (error) throw error;
            checkAuth();
            updateFormData('email', email.value);
            setUser(data.user);
            setActiveTab('accueil')
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};