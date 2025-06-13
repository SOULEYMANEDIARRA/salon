import { create } from "zustand";
export const useServicesStore = create((set) => ({
    allServices: [
        {
            category: "Coupes",
            items: [
                {
                    name: "Coupe Classique",
                    description: "Coupe traditionnelle avec finitions soignées",
                    duration: "30 min",
                    price: "1000 FCFA",
                    image: 'coupeclassique.jpg'
                },
                {
                    name: "Coupe Tendance",
                    description: "Coupe moderne adaptée aux dernières tendances",
                    duration: "45 min",
                    price: "2000 FCFA",
                    image: 'coupetendance.jpg'
                },
                {
                    name: "Dégradé",
                    description: "Dégradé précis avec transitions parfaites",
                    duration: "30 min",
                    price: "1500 FCFA",
                    image: 'degrade.jpg'
                },
                {
                    name: "Tout service",
                    description: "Rendez-vous à domicile",
                    duration: "1h",
                    price: "5000 FCFA",
                    image: 'barber.jpg'
                }
            ]
        },
        {
            category: "Barbe",
            items: [
                {
                    name: "Taille de Barbe",
                    description: "Taille et entretien de barbe avec finitions",
                    duration: "30 min",
                    price: "1500 FCFA",
                    image: 'tailledebarbe.jpg'
                },
                {
                    name: "Rasage Traditionnel",
                    description: "Rasage à l'ancienne avec serviette chaude",
                    duration: "30 min",
                    price: "1000 FCFA",
                    image: 'rasagetraditionnel.jpg'
                },
                {
                    name: "Tout service",
                    description: "Rendez-vous à domicile",
                    duration: "1h",
                    price: "5000 FCFA",
                    image: 'barber.jpg'
                }
            ]
        },
        {
            category: "Soins",
            items: [
                {
                    name: "Soin Visage",
                    description: "Soin complet avec massage du visage",
                    duration: "45 min",
                    price: "3000 FCFA",
                    image: 'soinvisage.jpg'
                },
                {
                    name: "Massage Crânien",
                    description: "Massage relaxant du cuir chevelu",
                    duration: "20 min",
                    price: "1500 FCFA",
                    image: 'massagecranien.jpg'
                },
                {
                    name: "Tout service",
                    description: "Rendez-vous à domicile",
                    duration: "1h",
                    price: "5000 FCFA",
                    image: 'barber.jpg'
                }
            ]
        }
    ]
}));