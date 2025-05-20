import { useEffect, useState } from "react";
import { openingHours, services } from "./variable";
import { useStepStore } from "../zustand/store";
import { formDatas } from "./variable";
import { insertrendezvous } from "../bdd/insert/insertrendezvous";
import { checkSlotAvailability, getAvailableSlots } from "../bdd/queries/getAvailableSlots";
import { useFormStore } from "../zustand/formStore";
import { useAuthStore } from "../zustand/authStore";
import { sendConfirmationEmails } from "../email/sendemail";
import { useActiveTabStore } from "../zustand/store";
import { toast } from "react-toastify";
import { insertreserver } from "../bdd/queries/crenaux";

export const ReservationPage = () => {
    const { step, setStep } = useStepStore();
    const { formData, updateFormData } = useFormStore();
    const { user, checkAuth } = useAuthStore();
    const { setActiveTab } = useActiveTabStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setActiveTab('auth');
            return;
        }

        // Vérifier si la date est passée
        if (step === 2) {
            const selectedDate = new Date(`${formData.date}T${formData.time}`);
            const currentDate = new Date();
            if (selectedDate < currentDate) {

                toast.error('Impossible de réserver dans le passé');
                return;
            }

            const isAvailable = await checkSlotAvailability(formData.date, formData.time);
            if (!isAvailable) {
                toast.error('Ce créneau est déjà réservé');
                return;
            }
        }

        if (step < 3) {
            setStep(step + 1);
        } else {
            const result = await insertrendezvous(formData);
            const result2 = await insertreserver(formData);

            if (result ) {
                sendConfirmationEmails(formData);
                setStep(1);
            }
        }
    };

    const handleChange = async (e) => {
        if (verifyForm(e.target.name)) {
            setStep(1);
            return;
        }

        if (e.target.name === 'date') {
            // Récupérer les créneaux disponibles pour la date sélectionnée
            const availableSlots = await getAvailableSlots(e.target.value);


            // Mettre à jour le select des heures
            const timeSelect = document.getElementById('time');
            timeSelect.innerHTML = '<option value="">Sélectionnez une heure</option>';

            // Ajouter uniquement les créneaux disponibles
            availableSlots.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                timeSelect.appendChild(option);
            });
        }

        updateFormData(e.target.name, e.target.value);
    };

    const verifyForm = (targetName) => {
        if (!(targetName in formDatas)) {
            return true;
        }
        return false;
    }
    useEffect(() => {
        if (user) {
            updateFormData("email", user.email)
            updateFormData("phone", user.profile.phone)
            updateFormData("name", user.profile.first_name + " " + user.profile.last_name)
        }
    }, [user])

    return (
        <div className="reserve container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Réservation</h1>

            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    {[1, 2, 3].map((number) => (
                        <div key={number} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= number ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {number}
                            </div>
                            {number < 3 && (
                                <div className={`w-24 h-0.5 ${step > number ? 'bg-[#D4AF37]' : 'bg-gray-200'
                                    }`}></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Choisissez votre service</h2>
                                <div className="space-y-4">
                                    {services.map((service, index) => (
                                        <label key={index} className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#D4AF37]">
                                            <input
                                                type="radio"
                                                name="service"
                                                value={service.name + " " + service.price + "FCFA"}
                                                onChange={handleChange}
                                                className="mr-3"
                                                required
                                            />
                                            <div>
                                                <h3 className="font-medium">{service.name}</h3>
                                                <p className="text-sm text-gray-600">À partir de {service.price} FCFA</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Choisissez votre date et heure</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                                        <select
                                            name="time"
                                            id="time"
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                                            required
                                        >
                                            <option value="">Sélectionnez une heure</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Vos informations</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between mt-8">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="cursor-pointer px-6 py-2 border border-[#1B264F] text-[#1B264F] font-medium rounded-button hover:bg-gray-100 transition-colors"
                                >
                                    Retour
                                </button>
                            )}
                            <button
                                type="submit"
                                className="cursor-pointer px-6 py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors ml-auto"
                            >
                                {step === 3 ? 'Confirmer' : 'Suivant'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};