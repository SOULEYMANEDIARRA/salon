import { useActiveTabStore } from "../zustand/store";
import background from "../../../public/background.jpg";
import { openingHours, services, testimonials } from "./variable";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useInfoStore } from "../zustand/info";

export const HomePage = () => {
    const { setActiveTab } = useActiveTabStore();
    const {phone, address, email, SALON_COORDS, SALON_ADDRESS, GOOGLE_MAPS_URL, title } = useInfoStore();
    return (
        <div className="home flex flex-col">
            {/* Hero Banner */}
            <div className="relative h-[500px] w-full overflow-hidden">
                <img
                    src={background}
                    alt="Barbershop interior"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">L'ART DE LA COIFFURE MASCULINE</h2>
                    <p className="text-lg md:text-xl text-white mb-8">Expertise, style et service d'exception depuis 2022</p>
                    <button onClick={() => setActiveTab('reservation')} className="px-6 py-3 bg-[#D4AF37] text-[#1A1A1A] font-medium text-lg rounded-button hover:bg-opacity-90 transition-colors cursor-pointer">
                        Réserver un rendez-vous
                    </button>
                </div>
            </div>
            {/* Services Highlight */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">NOS SERVICES PREMIUM</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-medium mb-1">{service.name}</h3>
                            <p className="text-sm text-gray-600">À partir de {service.price} FCFA</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button onClick={() => setActiveTab('services')} className="px-5 py-2 border-2 border-[#1B264F] text-[#1B264F] font-medium rounded-button hover:bg-[#1B264F] hover:text-white transition-colors cursor-pointer">
                        Voir tous nos services
                    </button>
                </div>
            </div>
            {/* About Preview */}
            <div className="bg-[#1B264F] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">NOTRE PASSION</h2>
                            <p className="mb-4">
                                Fondé en 2025, notre salon s'est imposé comme une référence dans l'univers de la coiffure masculine à Bamako. Notre équipe de barbiers expérimentés allie techniques traditionnelles et tendances modernes pour vous offrir une expérience unique.
                            </p>
                            <p>
                                Chaque coupe est réalisée avec précision et attention aux détails, dans une ambiance chaleureuse et raffinée où vous pourrez vous détendre et profiter d'un moment privilégié.
                            </p>
                            <button onClick={() => setActiveTab('apropos')} className="mt-6 px-5 py-2 border-2 border-white text-white font-medium rounded-button hover:bg-white hover:text-[#1B264F] transition-colors cursor-pointer">
                                En savoir plus
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={'image1.jpg'}
                                alt="Barbier professionnel"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonials */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">CE QUE DISENT NOS CLIENTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="text-[#D4AF37] text-lg">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <span className="ml-2 text-gray-600">{testimonial.rating}/5</span>
                            </div>
                            <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">Client depuis {testimonial.since}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Opening Hours */}
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">HORAIRES D'OUVERTURE</h2>
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            {openingHours.map((day, index) => (
                                <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                                    <span className="font-medium">{day.day}</span>
                                    <span>{day.hours}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-[#1A1A1A] text-white p-4 text-center">
                            <p className="font-medium">Réservation recommandée</p>
                            <p className="text-sm mt-1">Téléphone: {phone}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Location */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">NOUS TROUVER</h2>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="map md:w-1/2 mb-8 md:mb-0">
                        <div className="h-80 rounded-lg overflow-hidden">
                            <MapContainer center={SALON_COORDS} zoom={16} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={SALON_COORDS}>
                                    <Popup>
                                        {SALON_ADDRESS}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                        <h3 className="text-xl font-bold mb-4">{title}</h3>
                        <div className="mb-4">
                            <p className="flex items-center mb-2">
                                <i className="fas fa-map-marker-alt w-6 text-[#D4AF37]"></i>
                                <span> {address} </span>
                            </p>
                            <p className="flex items-center mb-2">
                                <i className="fas fa-phone-alt w-6 text-[#D4AF37]"></i>
                                <span>{phone}</span>
                            </p>
                            <p className="flex items-center">
                                <i className="fas fa-envelope w-6 text-[#D4AF37]"></i>
                                <span>{email}</span>
                            </p>
                        </div>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                            <button className="px-5 py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors cursor-pointer">
                                Itinéraire <i className="fas fa-directions ml-2"></i>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            {/* CTA */}
            <div className="relative py-16 bg-[#1A1A1A] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">PRÊT POUR UNE NOUVELLE COUPE?</h2>
                    <p className="mb-8 max-w-2xl mx-auto">Réservez dès maintenant votre rendez-vous et profitez de l'expertise de nos barbiers professionnels pour un look impeccable.</p>
                    <button onClick={() => setActiveTab('reservation')} className="px-6 py-3 bg-[#D4AF37] text-[#1A1A1A] font-medium text-lg rounded-button hover:bg-opacity-90 transition-colors cursor-pointer">
                        Réserver un rendez-vous
                    </button>
                </div>
            </div>
        </div>
    );
};