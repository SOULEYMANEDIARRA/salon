export const validateInput = {
    // Vérifie si une chaîne contient des caractères potentiellement dangereux
    isSafeString: (str) => {
        if(str.trim().length === 0) return false;
        if (!str) return false;
        const unsafePatterns = /['";()]/;
        return !unsafePatterns.test(str);
    },

    // Vérifie si l'email est valide
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Vérifie si le numéro de téléphone est valide (entre 50000000 et 99999999)
    isValidPhone: (phone) => {
        const phoneRegex = /^(5|6|7|8|9)\d{7}$/;
        return phoneRegex.test(phone);
    },

    // Valide les données de connexion
    validateLogin: (email, password) => {
        const errors = [];
        
        if (!validateInput.isValidEmail(email)) {
            errors.push('Email invalide');
        }
        
        if (!validateInput.isSafeString(password)) {
            errors.push('Le mot de passe contient des caractères non autorisés');
        }

        return errors;
    },

    // Valide les données d'inscription
    validateRegister: (email, password, firstName, lastName, phone) => {
        const errors = [];

        if (!validateInput.isValidEmail(email)) {
            errors.push('Email invalide');
        }

        if (!validateInput.isSafeString(password)) {
            errors.push('Le mot de passe contient des caractères non autorisés');
        }

        if (!firstName || !validateInput.isSafeString(firstName)) {
            errors.push('Prénom invalide');
        }

        if (!lastName || !validateInput.isSafeString(lastName)) {
            errors.push('Nom invalide');
        }

        if (!phone || !validateInput.isValidPhone(phone)) {
            errors.push('Numéro de téléphone invalide');
        }

        return errors;
    }
};
