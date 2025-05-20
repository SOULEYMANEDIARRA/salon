import zakaria from "../../../public/zakaria.jpg";
import sentana from "../../../public/sentana.jpg";
import lassine from "../../../public/lassine.jpg";


export const AboutPage = () => {
    const team = [
        {
            name: "Zakaria",
            role: "Maître Barbier",
            experience: "3 ans d'expérience",
            image: zakaria
        },
        {
            name: "Sentana",
            role: "Barbier Senior",
            experience: "8 ans d'expérience",
            image: sentana
        },
        {
            name: "Lassine",
            role: "Barbier Styliste",
            experience: "2 ans d'expérience",
            image: lassine
        }
    ];

    const milestones = [
        {
            year: "2025",
            title: "Ouverture",
            description: "Inauguration de notre premier salon au cœur de Bamako"
        },
        {
            year: "2025",
            title: "Excellence",
            description: "Reconnaissance comme l'un des meilleurs salons de la capitale"
        },
        {
            year: "2024",
            title: "Partenariats",
            description: "Collaboration avec des marques locales pour proposer des produits de qualité supérieure"
        },
        {
            year: "2024",
            title: "Reconnaissance",
            description: "Recommandé par nos premiers clients pour notre professionnalisme"
        }
    ];



    return (
        <div className="about container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-12">Notre Histoire</h1>

            <div className="mb-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Depuis notre création en 2025  , nous nous engageons à offrir des services de coiffure et de barbier d’exception. Animés par une passion profonde pour l’art de la coiffure masculine et un souci constant de l’excellence, nous aspirons à devenir une référence incontournable dans notre domaine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <div className="text-[#D4AF37] text-2xl font-bold mb-2">{milestone.year}</div>
                                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                                <p className="text-gray-600">{milestone.description}</p>
                            </div>
                            {index < milestones.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#D4AF37]"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-8">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-80 overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                            <p className="text-[#D4AF37] font-medium mb-2">{member.role}</p>
                            <p className="text-gray-600">{member.experience}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-[#1B264F] text-white rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Nos Valeurs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <i className="fas fa-award text-[#D4AF37] text-3xl mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                        <p>Nous visons l'excellence dans chaque service</p>
                    </div>
                    <div>
                        <i className="fas fa-heart text-[#D4AF37] text-3xl mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Passion</h3>
                        <p>Notre passion se reflète dans notre travail</p>
                    </div>
                    <div>
                        <i className="fas fa-users text-[#D4AF37] text-3xl mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Service</h3>
                        <p>Votre satisfaction est notre priorité</p>
                    </div>
                </div>
            </div>
        </div>
    );
};