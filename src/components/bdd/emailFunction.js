// import { supabase } from './supabase';

// // Fonction pour envoyer un email via Supabase Functions
// export const sendEmail = async (to, subject, html) => {
//     try {
//         const { data, error } = await supabase.functions.invoke('send-email', {
//             body: {
//                 to,
//                 subject,
//                 html
//             }
//         });

//         if (error) throw error;
//         return data;
//     } catch (error) {
//         console.error('Erreur lors de l\'envoi de l\'email :', error);
//         throw error;
//     }
// };
