import { create } from "zustand";

export const useInfoStore = create((set) => {
    const SALON_ADDRESS = "HXHV+GJ2 Bamako";

    return {
        title1: "SENTANA",
        title2: "BARBER",
        title: "SENTANA BARBERSHOP",
        phone: "79 89 25 87 / 96 53 99 54",
        address: "Golf près de FitiniMarket",
        email: "abdoulayesidibe26@gmail.com",
        SALON_COORDS: [12.578766, -8.005986], // Remplace par la localisation exacte si besoin
        SALON_ADDRESS,
        GOOGLE_MAPS_URL: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SALON_ADDRESS)}`
    };
});
