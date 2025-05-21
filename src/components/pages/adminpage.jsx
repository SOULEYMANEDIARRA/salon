import React, { useState, useEffect } from 'react';
import { supabase } from '../bdd/supabase';

const ConfirmationModal = ({ open, title, message, onConfirm, onCancel, loading }) => {
    if (!open) return null;

    return (
        <div className="pop fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Annuler
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Traitement..." : "Confirmer"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [rendezvous, setRendezvous] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({
        open: false,
        type: null,
        id: null,
        extra: null
    });
    const [actionLoading, setActionLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    // Filtrer les données en fonction du filtre actif
    const filteredData = () => {
        const now = new Date();

        switch (activeFilter) {
            case 'active-clients':
                return {
                    users: users.filter(user => !user.banned),
                    rendezvous: []
                };
            case 'banned-clients':
                return {
                    users: users.filter(user => user.banned),
                    rendezvous: []
                };
            case 'cancelled-rdv':
                return {
                    users: [],
                    rendezvous: rendezvous.filter(rdv => rdv.status === 'cancelled')
                };
            case 'past-rdv':
                return {
                    users: [],
                    rendezvous: rendezvous.filter(rdv => new Date(`${rdv.date}T${rdv.time}`) < now)
                };
            case 'available-rdv':
                return {
                    users: [],
                    rendezvous: rendezvous.filter(rdv =>
                        rdv.status !== 'cancelled' && new Date(`${rdv.date}T${rdv.time}`) > now
                    )
                };
            default:
                return {
                    users,
                    rendezvous
                };
        }
    };

    const { users: filteredUsers, rendezvous: filteredRdv } = filteredData();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [
                    { data: usersData, error: usersError },
                    { data: rdvData, error: rdvError }
                ] = await Promise.all([
                    supabase.from('users').select('*'),
                    supabase.from('rendezvous').select('*').order('date', { ascending: false }).order('time', { ascending: false })
                ]);

                if (usersError) throw usersError;
                if (rdvError) throw rdvError;

                setUsers(usersData);
                setRendezvous(rdvData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openBanModal = (user) => setModal({
        open: true,
        type: 'ban',
        id: user.id,
        extra: user.banned
    });

    const openCancelModal = (rdvId) => setModal({
        open: true,
        type: 'cancel',
        id: rdvId
    });

    const closeModal = () => setModal({
        open: false,
        type: null,
        id: null,
        extra: null
    });

    const handleConfirm = async () => {
        setActionLoading(true);
        try {
            if (modal.type === 'ban') {
                const userId = modal.id;
                const banned = modal.extra;
                const { error } = await supabase
                    .from('users')
                    .update({ banned: !banned })
                    .eq('id', userId);

                if (error) throw error;

                setUsers(users.map(u =>
                    u.id === userId ? { ...u, banned: !banned } : u
                ));
            } else if (modal.type === 'cancel') {
                const rdvId = modal.id;
                const { error } = await supabase
                    .from('rendezvous')
                    .update({ status: 'cancelled' })
                    .eq('id', rdvId);

                if (error) throw error;

                setRendezvous(rendezvous.map(r =>
                    r.id === rdvId ? { ...r, status: 'cancelled' } : r
                ));
            }
            closeModal();
        } catch (err) {
            alert(`Erreur lors du traitement: ${err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-16">
            Chargement...
        </div>
    );

    if (error) return (
        <div className="flex justify-center text-red-600 py-16">
            Erreur : {error}
        </div>
    );

    return (
        <div className="admin flex min-h-screen">
            {/* Sidebar */}
            <div className="side-bar w-64 bg-gray-800 text-white p-4 fixed h-full">
                <h2 className="text-xl font-bold mb-6">Filtres</h2>
                <nav className="space-y-2">
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${activeFilter === 'all' ? 'focus' : 'hover:bg-gray-700'}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        Tous
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${activeFilter === 'active-clients' ? 'focus' : 'hover:bg-gray-700'}`}
                        onClick={() => setActiveFilter('active-clients')}
                    >
                        Clients actifs
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${activeFilter === 'banned-clients' ? 'focus' : 'hover:bg-gray-700'}`}
                        onClick={() => setActiveFilter('banned-clients')}
                    >
                        Clients bannis
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${activeFilter === 'cancelled-rdv' ? 'focus' : 'hover:bg-gray-700'}`}
                        onClick={() => setActiveFilter('cancelled-rdv')}
                    >
                        RDV annulés
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${activeFilter === 'past-rdv' ? 'focus' : 'hover:bg-gray-700'}`}
                        onClick={() => setActiveFilter('past-rdv')}
                    >
                        RDV passés
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded ${activeFilter === 'available-rdv' ? 'focus' : 'hover:bg-gray-700'}`}
                        onClick={() => setActiveFilter('available-rdv')}
                    >
                        RDV disponibles
                    </button>
                </nav>
            </div>

            {/* Contenu principal */}
            <div className="espace-admin flex-1 p-8 ml-64">
                <h1 className="text-3xl font-bold mb-8">Espace Administrateur</h1>

                {/* Section Clients - seulement visible pour les filtres clients */}
                {(activeFilter === 'all' || activeFilter.includes('clients')) && (
                    <>
                        <section className="section0 bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Clients</h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 text-left">Nom</th>
                                            <th className="p-2 text-left">Email</th>
                                            <th className="p-2 text-left">Téléphone</th>
                                            <th className="p-2 text-center">Statut</th>
                                            <th className="p-2 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                                    Aucun client trouvé
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map(user => (
                                                <tr key={user.id} className="border-t">
                                                    <td className="p-2">{user.first_name} {user.last_name}</td>
                                                    <td className="p-2">{user.email}</td>
                                                    <td className="p-2">{user.phone}</td>
                                                    <td className="p-2 text-center">
                                                        {user.banned ? (
                                                            <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                                                Banni
                                                            </span>
                                                        ) : (
                                                            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                                                Actif
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-2 text-center">
                                                        <button
                                                            className={`px-3 py-1 rounded text-white ${user.banned
                                                                ? "bg-green-600 hover:bg-green-700"
                                                                : "bg-red-600 hover:bg-red-700"
                                                                }`}
                                                            onClick={() => openBanModal(user)}
                                                            disabled={actionLoading}
                                                        >
                                                            {user.banned ? "Débannir" : "Bannir"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="section1 bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Clients</h2>

                            {filteredUsers.length === 0 ? (
                                <div className="text-center text-gray-500 py-4">Aucun client trouvé</div>
                            ) : (
                                <div className="grid gap-6">
                                    {filteredUsers.map(user => (
                                        <div key={user.id} className="rounded-lg p-4 shadow-sm bg-gray-50">
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    <tr>
                                                        <td className="font-semibold py-2 w-1/3">Nom</td>
                                                        <td className="py-2">{user.first_name} {user.last_name}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Email</td>
                                                        <td className="py-2">{user.email}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Téléphone</td>
                                                        <td className="py-2">{user.phone}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Statut</td>
                                                        <td className="py-2">
                                                            {user.banned ? (
                                                                <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                                                    Banni
                                                                </span>
                                                            ) : (
                                                                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                                                    Actif
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Action</td>
                                                        <td className="py-2">
                                                            <button
                                                                className={`px-4 py-1 rounded text-white ${user.banned
                                                                    ? "bg-green-600 hover:bg-green-700"
                                                                    : "bg-red-600 hover:bg-red-700"
                                                                    }`}
                                                                onClick={() => openBanModal(user)}
                                                                disabled={actionLoading}
                                                            >
                                                                {user.banned ? "Débannir" : "Bannir"}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                    </>
                )}

                {/* Section Rendez-vous - seulement visible pour les filtres RDV */}
                {(activeFilter === 'all' || activeFilter.includes('rdv')) && (
                    <>
                        <section className="section0 bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Rendez-vous</h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 text-left">Client</th>
                                            <th className="p-2 text-left">Service</th>
                                            <th className="p-2 text-left">Date</th>
                                            <th className="p-2 text-left">Heure</th>
                                            <th className="p-2 text-center">Statut</th>
                                            <th className="p-2 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRdv.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                                    Aucun rendez-vous trouvé
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredRdv.map(rdv => (
                                                <tr key={rdv.id} className="border-t">
                                                    <td className="p-2">{rdv.client_name || rdv.email}</td>
                                                    <td className="p-2">{rdv.service}</td>
                                                    <td className="p-2">{new Date(rdv.date).toLocaleDateString()}</td>
                                                    <td className="p-2">{rdv.time}</td>
                                                    <td className="p-2 text-center">
                                                        {rdv.status === 'cancelled' ? (
                                                            <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                                                Annulé
                                                            </span>
                                                        ) : (
                                                            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                                                Confirmé
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-2 text-center">
                                                        {rdv.status !== 'cancelled' && (
                                                            <button
                                                                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                                                onClick={() => openCancelModal(rdv.id)}
                                                                disabled={actionLoading}
                                                            >
                                                                Annuler
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section className="section1 bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Rendez-vous</h2>

                            {filteredRdv.length === 0 ? (
                                <div className="text-center text-gray-500 py-4">Aucun rendez-vous trouvé</div>
                            ) : (
                                <div className="grid gap-6">
                                    {filteredRdv.map(rdv => (
                                        <div key={rdv.id} className="rounded-lg p-4 shadow-sm bg-gray-50">
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    <tr>
                                                        <td className="font-semibold py-2 w-1/3">Client</td>
                                                        <td className="py-2">{rdv.client_name || rdv.email}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Service</td>
                                                        <td className="py-2">{rdv.service}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Date</td>
                                                        <td className="py-2">{new Date(rdv.date).toLocaleDateString()}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Heure</td>
                                                        <td className="py-2">{rdv.time}</td>
                                                    </tr>
                                                    <tr className="border-t">
                                                        <td className="font-semibold py-2">Statut</td>
                                                        <td className="py-2">
                                                            {rdv.status === 'cancelled' ? (
                                                                <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                                                    Annulé
                                                                </span>
                                                            ) : (
                                                                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                                                    Confirmé
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    {rdv.status !== 'cancelled' && (
                                                        <tr className="border-t">
                                                            <td className="font-semibold py-2">Action</td>
                                                            <td className="py-2">
                                                                <button
                                                                    className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                                                    onClick={() => openCancelModal(rdv.id)}
                                                                    disabled={actionLoading}
                                                                >
                                                                    Annuler
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>

            <ConfirmationModal
                open={modal.open}
                title={modal.type === 'ban'
                    ? (modal.extra ? 'Débannir l\'utilisateur' : 'Bannir l\'utilisateur')
                    : 'Annulation du rendez-vous'}
                message={modal.type === 'ban'
                    ? (modal.extra
                        ? 'Voulez-vous vraiment débannir cet utilisateur ?'
                        : 'Voulez-vous vraiment bannir cet utilisateur ?')
                    : 'Voulez-vous vraiment annuler ce rendez-vous ?'}
                onConfirm={handleConfirm}
                onCancel={closeModal}
                loading={actionLoading}
            />
        </div>
    );
};
