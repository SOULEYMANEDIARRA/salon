export const sendConfirmationEmails = async (formData, email) => {
    try {
        // Email pour le propriétaire
        const ownerEmailOptions = {
            to: email,
            subject: 'Nouveau message depuis le salon !',
            html: `
              <h2>📬 Nouveau message reçu</h2>
              <p>Un visiteur a envoyé un message via le formulaire du salon :</p>
              <ul>
                <li><strong>Nom :</strong> ${formData.name}</li>
                <li><strong>Email :</strong> ${formData.email}</li>
                <li><strong>Téléphone :</strong> ${formData.phone}</li>
              </ul>
              <p><strong>Message :</strong></p>
              <p style="padding: 10px; background-color: #f4f4f4; border-left: 4px solid #ccc;">
                ${formData.message}
              </p>
              <hr/>
              <p style="font-size: 0.9em; color: #777;">Ce message a été généré automatiquement depuis le formulaire du salon.</p>
            `
        };

        // Email pour le client
        const clientEmailOptions = {
            to: formData.email,
            subject: 'Confirmation de votre message',
            html: `
                <h2>Votre message a été envoyé avec succès !</h2>
                <p>Voici les détails de votre message :</p>
                <ul>
                    <li><strong>Nom :</strong> ${formData.name}</li>
                    <li><strong>Email :</strong> ${formData.email}</li>
                <li><strong>Téléphone :</strong> ${formData.phone}</li>
                </ul>
                <p>Nous vous remercions pour votre message.</p>
            `
        };

        // Envoyer les deux emails via l'API
        const responses = await Promise.all([
            fetch(import.meta.env.VITE_EMAIL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ownerEmailOptions)
            }),
            fetch(import.meta.env.VITE_EMAIL_URL, {
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