import { create } from 'zustand';

export const useFormStore = create((set) => ({
    formData: {
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
    },
    setFormData: (data) => set({ formData: data }),
    updateFormData: (field, value) => set((state) => ({
        formData: {
            ...state.formData,
            [field]: value
        }
    }))
}));
