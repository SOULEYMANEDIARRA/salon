import { create } from "zustand";

export const useActiveTabStore = create((set) => ({
    activeTab: 'accueil',
    setActiveTab: (tab) => set({ activeTab: tab }),
}));

export const useStepStore = create((set) => ({
    step: 1,
    setStep: (step) => set({ step: step }),
}));

export const useServiceStore = create((set) => ({
    service: null,
    setService: (service) => {
        set({ service: service })
        console.log(service);
    },
}));

export const useFormDataStore = create((set) => ({
    formData: {
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        price: '',
    } 
    
}));
