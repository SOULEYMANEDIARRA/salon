// export const sendemail = async (formData) => {
//     try {
//         const html = `<p><strong>${formData.name}</strong> vient de prendre rendez-vous sur le site prevu le ${formData.date} a ${formData.time} pour le service ${formData.service} avec le numero de telephone ${formData.phone} ! </p>`;
//         const subject = "Nouveau Rendez-vous";

//         const response = await fetch( import.meta.env.VITE_EMAIL_URL , {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 to: import.meta.env.VITE_EMAIL_DEV,
//                 subject: subject,
//                 html: html,
//             }),
//         }); 

//         if (!response.ok) {
//             throw new Error("Échec de l'envoi de l'email.");
//         }

//         return true;
//     } catch (error) {
//         throw new Error("verifier votre connexion internet et réessayez");
//     }
// };

export const sendConfirmationEmails = async (formData) => {
    try {
        // Email pour le propriétaire
        const ownerEmailOptions = {
            to: import.meta.env.VITE_EMAIL_ADMIN,
            subject: 'Nouveau Rendez-vous !',
            html: `
                <h2>Nouveau Rendez-vous</h2>
                <p>Un nouveau rendez-vous a été pris dans votre salon :</p>
                <ul>
                    <li><strong>Client :</strong> ${formData.name}</li>
                    <li><strong>Service :</strong> ${formData.service}</li>
                    <li><strong>Date :</strong> ${formData.date}</li>
                    <li><strong>Heure :</strong> ${formData.time}</li>
                </ul>
                <p>Merci de préparer votre salon pour cet horaire.</p>
            `
        };

        // Email pour le client
        const clientEmailOptions = {
            to: formData.email,
            subject: 'Confirmation de Rendez-vous',
            html: `
                <h2>Votre Rendez-vous a été confirmé !</h2>
                <p>Voici les détails de votre rendez-vous :</p>
                <ul>
                    <li><strong>Service :</strong> ${formData.service}</li>
                    <li><strong>Date :</strong> ${formData.date}</li>
                    <li><strong>Heure :</strong> ${formData.time}</li>
                </ul>
                <p>Nous vous attendons avec plaisir à ce rendez-vous.</p>
            `
        };

        // Envoyer les deux emails via l'API
        const responses = await Promise.all([
            fetch( import.meta.env.VITE_EMAIL_URL , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ownerEmailOptions)
            }),
            fetch( import.meta.env.VITE_EMAIL_URL , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientEmailOptions)
            })
        ]);

        // Vérifier que les deux requêtes ont réussi
        const results = await Promise.all(responses.map(res => res.ok ? true : res.json().then(() => false)));
        
        if (!results.every(Boolean)) {
            console.log(results);
            throw new Error("Une ou plusieurs tentatives d'envoi d'email ont échoué");
        }

        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi des emails :', error);
        return false;
    }
};





