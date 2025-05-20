import image2 from "../../../public/image2.jpg";
import image3 from "../../../public/image3.jpg";
import image4 from "../../../public/image4.jpg";
import image5 from "../../../public/image5.jpg";
import souleymane from "../../../public/souleymane.jpg";
import lamine from "../../../public/lamine.jpg";
import lafkaid from "../../../public/lafkaid.jpg";


// import image6 from "../../../public/image6.jpg"
export const services = [
    {
        name: "Coupe Classique",
        price: "1000",
        image: image2
    },
    {
        name: "Barbe Complète",
        price: "1000",
        image: image3
    },
    {
        name: "Coupe & Barbe",
        price: "1500",
        image: image4
    },
    {
        name: "Soin Visage",
        price: "2000",
        image: image5
    }
];
export const testimonials = [
    {
        name: "Souleymane",
        rating: "5.0",
        comment: "Service impeccable, ambiance détendue et résultat parfait. Je recommande vivement ce salon pour tous les hommes qui cherchent une coupe de qualité.",
        avatar: souleymane,
        since: "2022"
    },
    {
        name: "Lafkaid",
        rating: "5.0",
        comment: "Les barbiers sont de vrais artistes. J'ai enfin trouvé mon salon attitré après des années de recherche. Prix raisonnable pour la qualité du service.",
        avatar: lafkaid,
        since: "2022"
    },
    {
        name: "Lamine",
        rating: "4.9",
        comment: "Excellente expérience à chaque visite. L'équipe prend le temps de comprendre ce que vous voulez et donne de bons conseils. Le café offert est un plus appréciable.",
        avatar: lamine,
        since: "2022"
    }
];
export const openingHours = [
    { day: "Lundi", hours: "Fermé" },
    { day: "Mardi", hours: "11h00 - 23h00" },
    { day: "Mercredi", hours: "11h00 - 23h00" },
    { day: "Jeudi", hours: "11h00 - 23h00" },
    { day: "Vendredi", hours: "11h00 - 23h00" },
    { day: "Samedi", hours: "11h00 - 23h00" },
    { day: "Dimanche", hours: "11h00 - 23h00" }
];

export const formDatas = {
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
};
export const PHONE = "79 89 25 87  /  96 53 99 54 " ;
export const EMAIL = "sentana@gmail.com";
export const SALON_ADDRESS = "Golf prét de FitiniMarket";