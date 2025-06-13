export const inputCheck = (formData) => {
    if (formData.name.trim().length < 3) {
        return 'Le nom doit contenir au moins 3 lettres';
    }
    // le numéro de téléphone est optionnel
    if (formData.phone) {
        if (!Number.isInteger(Number(formData.phone))) {
            return 'Le numéro de téléphone invalide.';
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return 'Adresse email invalide.';
    }
    if (formData.message.trim().length < 10) {
        return 'Le message doit contenir au moins 10 lettres';
    }
    return null;
}