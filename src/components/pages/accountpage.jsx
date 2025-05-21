import { useState, useEffect } from "react";
import { useAuthStore } from "../zustand/authStore";
import { supabase } from "../bdd/supabase";
import { useActiveTabStore } from "../zustand/store";
import { getUserUpcomingRendezvous } from "../bdd/queries/getUserUpcomingRendezvous";
import { FaUserCircle, FaCalendarAlt, FaClock, FaCut } from "react-icons/fa";
import { sendConfirmationEmails } from "../email/sendemail";

export const AccountPage = () => {
    const { setActiveTab } = useActiveTabStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthStore();
    const { checkAuth } = useAuthStore();   
    const { signOut } = useAuthStore(); 
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [upcomingRendezvous, setUpcomingRendezvous] = useState([]);
    const [rendezvousLoading, setRendezvousLoading] = useState(true);
    // Pour la popup d'annulation
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRdv, setSelectedRdv] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);


    // Sécurité : accès interdit si non connecté
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded shadow text-center">
                    <p className="text-lg font-semibold mb-4">Veuillez vous connecter pour accéder à votre compte.</p>
                    <button onClick={() => setActiveTab('auth')} className="cursor-pointer px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] rounded hover:bg-[#D4AF37]/90">Se connecter</button>
                </div>
            </div>
        );
    }
    // Sécurité : accès interdit si banni
    if (user.banned) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded shadow text-center">
                    <p className="text-lg font-semibold text-red-600 mb-2">Votre compte a été banni.</p>
                    <p className="text-gray-600">Contactez l'administrateur pour plus d'informations.</p>
                </div>
            </div>
        );
    }


    useEffect(() => {
        if (user) {
            setId(user.id);
            setFirstName(user.profile.first_name);
            setLastName(user.profile.last_name);
            setPhone(user.profile.phone);
            setEmail(user.email);
            // Charger les rendez-vous à venir
            setRendezvousLoading(true);
            getUserUpcomingRendezvous(user.email).then((data) => {
                setUpcomingRendezvous(data);
                setRendezvousLoading(false);
            });
        }
    }, [user]);

    

    const handleUpdate = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const { data, error } = await supabase
                .from('users')
                .update({
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name'),
                    phone: formData.get('phone')
                })
                .eq('id', id);

            if (error) throw error;
            checkAuth();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // if (!user) {
    //     return <div className="text-center py-20">Veuillez vous connecter pour accéder à votre compte.</div>;
    // }

    return (
        <div className="account min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profil utilisateur */}
                <div className="col-span-1 bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
                    <FaUserCircle className="text-6xl text-[#D4AF37] mb-4" />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{first_name} {last_name}</h2>
                        <p className="text-gray-600 mb-1">{email}</p>
                        <p className="text-gray-600 mb-4">{phone}</p>
                    </div>
                    <form onSubmit={handleUpdate} className="w-full space-y-4">
                        <div>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                required
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm mb-2"
                                placeholder="Prénom"
                            />
                        </div>
                        <div>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                required
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm mb-2"
                                placeholder="Nom"
                            />
                        </div>
                        <div>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm mb-2"
                                placeholder="Téléphone"
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#D4AF37] hover:bg-[#D4AF37]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Chargement..." : "Mettre à jour"}
                        </button>
                    </form>
                    <button
                        onClick={() => signOut(setActiveTab)}
                        className="cursor-pointer mt-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1A1A1A] hover:bg-[#111]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                    >
                        Se déconnecter
                    </button>
                </div>

                {/* Rendez-vous à venir */}
                <div className="col-span-2 bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                        <FaCalendarAlt className="inline-block mr-1" /> Mes rendez-vous à venir
                    </h3>
                    {rendezvousLoading ? (
                        <div className="text-gray-500 text-center py-8">Chargement...</div>
                    ) : upcomingRendezvous.length === 0 ? (
                        <div className="text-gray-400 text-center py-8">Aucun rendez-vous à venir.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {upcomingRendezvous.map((rdv) => (
    <div key={rdv.id} className="rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col gap-2 bg-gray-50 hover:shadow-lg transition">
        <div className="flex items-center gap-2 mb-2">
            <FaCut className="text-[#D4AF37]" />
            <span className="font-semibold">{rdv.service}</span>
        </div>
        <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span>{rdv.date}</span>
        </div>
        <div className="flex items-center gap-2">
            <FaClock className="text-gray-500" />
            <span>{rdv.time}</span>
        </div>
        {rdv.status !== 'cancelled' && (
            <button
                className="mt-4 text-xs text-red-600 hover:underline self-end"
                onClick={() => {
                    setShowCancelModal(true);
                    setSelectedRdv(rdv);
                }}
            >
                Annuler
            </button>
        )}
        {rdv.status === 'cancelled' && (
            <span className="mt-4 text-xs text-gray-400 self-end">Annulé</span>
        )}
    </div>
))}

{/* Popup de confirmation d'annulation */}
{showCancelModal && selectedRdv && (
    <div className="pop fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h4 className="text-lg font-semibold mb-4 text-center">Confirmer l'annulation</h4>
            <p className="mb-4 text-center">Voulez-vous vraiment annuler le rendez-vous du <span className="font-semibold">{selectedRdv.date}</span> à <span className="font-semibold">{selectedRdv.time}</span> pour <span className="font-semibold">{selectedRdv.service}</span> ?</p>
            <div className="flex justify-between gap-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => {
                        setShowCancelModal(false);
                        setSelectedRdv(null);
                    }}
                >
                    Non
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={async () => {
                        setCancelLoading(true);
                        await supabase
                            .from('rendezvous')
                            .update({ status: 'cancelled' })
                            .eq('id', selectedRdv.id);
                        setUpcomingRendezvous(upcomingRendezvous.filter(r => r.id !== selectedRdv.id));
                        // Envoi email après annulation
                        await sendConfirmationEmails({
                            ...selectedRdv,
                            email: user.email,
                            name: first_name + ' ' + last_name
                        });
                        setCancelLoading(false);
                        setShowCancelModal(false);
                        setSelectedRdv(null);
                    }}
                    disabled={cancelLoading}
                >
                    {cancelLoading ? 'Annulation...' : 'Oui, annuler'}
                </button>
            </div>
        </div>
    </div>
)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );                            
}