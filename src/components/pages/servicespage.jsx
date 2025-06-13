import { useState } from "react";
import { useStepStore } from "../zustand/store";
import { useActiveTabStore } from "../zustand/store";
import { useFormStore } from "../zustand/formStore";
import { useAuthStore } from "../zustand/authStore";
import { toast } from "react-toastify";
import { useServicesStore } from "../zustand/servicesStore";

export const ServicesPage = () => {
    const { setStep } = useStepStore();
    const { setActiveTab } = useActiveTabStore();
    const { updateFormData } = useFormStore();
    const { allServices } = useServicesStore();
    const { user } = useAuthStore();

    const handleSubmit = (service) => {
        if (!user) {
            setActiveTab('auth');
            return;
        }

        if (user.profile.banned) {
            toast.error('Votre compte a été banni. Vous ne pouvez pas réserver de rendez-vous.');
            return;
        }
        // updateFormData('service', service.name + " " + service.price);
        setActiveTab('reservation');
        // setStep(2);
    };


    const [selectedCategory, setSelectedCategory] = useState(allServices[0].category);

    return (
        <div className="service container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Nos Services</h1>

            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg border border-[#1B264F] p-1">
                    {allServices.map((category) => (
                        <button
                            key={category.category}
                            onClick={() => setSelectedCategory(category.category)}
                            className={`px-4 py-2 rounded-button transition-colors ${selectedCategory === category.category
                                ? 'bg-[#1B264F] text-white'
                                : 'text-[#1B264F] hover:bg-gray-100'
                                }`}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices
                    .find((category) => category.category === selectedCategory)
                    ?.items.map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span><i className="far fa-clock mr-2"></i>{service.duration}</span>
                                    <span className="text-lg font-semibold text-[#1B264F]">{service.price}</span>
                                </div>
                                {/* <button onClick={() => handleSubmit(service)} className="cursor-pointer w-full py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors">
                                    Réserver
                                </button> */}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};