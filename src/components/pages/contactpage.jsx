import { useState } from 'react';
import { EMAIL, openingHours, PHONE, SALON_ADDRESS } from './variable';

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="contact container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Contactez-nous</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Informations</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt text-[#D4AF37] w-8"></i>
                                <p>{SALON_ADDRESS}</p>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-phone-alt text-[#D4AF37] w-8"></i>
                                <p>{PHONE}</p>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-envelope text-[#D4AF37] w-8"></i>
                                <p>{EMAIL}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Horaires d'ouverture</h2>
                        <div className="space-y-2">
                            {openingHours.map((day, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{day.day}</span>
                                    <span className="font-medium">{day.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Envoyez-nous un message</h2>
                    <form onSubmit={handleSubmit}>
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
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-button focus:outline-none focus:border-[#1B264F]"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer w-full py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors"
                        >
                            Envoyer
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    );
};