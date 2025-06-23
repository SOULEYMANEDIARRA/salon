// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect } from 'react';
import { HomePage } from './components/pages/homepage';
import { ServicesPage } from './components/pages/servicespage';
import { ToastContainer } from 'react-toastify';
import { AboutPage } from './components/pages/aboutpage';
import 'react-toastify/dist/ReactToastify.css';
import { ContactPage } from './components/pages/contactpage';
import { ReservationPage } from './components/pages/reservationpage';
import { AuthPage } from './components/pages/authpage';
import { useActiveTabStore } from './components/zustand/store';
import { useAuthStore } from './components/zustand/authStore';
import { AccountPage } from './components/pages/accountpage';
import { AdminPage } from './components/pages/adminpage';
import Confirmation from './components/pages/confirmation';
import './App.css';
import { useInfoStore } from './components/zustand/info';
import { Footer } from './components/pages/footer';
import { supabase2 } from './components/bdd/supabase';

const App = () => {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { user, checkAuth } = useAuthStore();
  const { title1, title2 } = useInfoStore();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const visitData = {
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      platform: navigator.platform,
      cookie_enabled: navigator.cookieEnabled,
      hardware_cores: navigator.hardwareConcurrency,
    };

    supabase2.functions.invoke("trackVisitor", {
      body: {
        siteName: title1 + title2,
        tableName: "visiteurs_salon",
        data: visitData,
      },
    })
      .then(({ data, error }) => {
        // if (error) {
        //   console.error("❌ Erreur trackVisitor:", error);
        // } else {
        //   console.log("✅ Réponse trackVisitor:", data);
        // }
      });
  }, []);

  const handleAdminTab = () => {
    if (!user || !user.profile.admin) {
      setActiveTab('accueil');
      return;
    }
    setActiveTab('admin');
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Nav Bar */}
      <nav className="nav fixed w-full top-0 z-50 bg-[#1A1A1A] text-white shadow-md">
        {/* ToastContainer pour notifications globales */}

        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 onClick={handleAdminTab} className="sentana text-xl font-bold cursor-pointer">
              <span className="text-[#D4AF37] ">{title1 + title2}</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">

            <button
              onClick={() => setActiveTab('accueil')}
              className={`cursor-pointer hover:text-[#D4AF37] transition-colors ${activeTab === 'accueil' ? 'text-[#D4AF37]' : ''}`}
            >
              Accueil
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`cursor-pointer hover:text-[#D4AF37] transition-colors ${activeTab === 'services' ? 'text-[#D4AF37]' : ''}`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('apropos')}
              className={`cursor-pointer hover:text-[#D4AF37] transition-colors ${activeTab === 'apropos' ? 'text-[#D4AF37]' : ''}`}
            >
              À propos
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`cursor-pointer hover:text-[#D4AF37] transition-colors ${activeTab === 'contact' ? 'text-[#D4AF37]' : ''}`}
            >
              Contact
            </button>
            {user ? (
              <button
                onClick={() => setActiveTab('account')}
                className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'account' ? 'text-[#D4AF37]' : ''}`} >
                Mon compte
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('auth')}
                className="px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors cursor-pointer"
              >
                Connexion
              </button>
            )}
            <button
              onClick={() => setActiveTab('reservation')}
              className="px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors cursor-pointer"
            >
              Réserver
            </button>
          </div>
          {/* <button className="md:hidden text-2xl cursor-pointer">
            <i className="fas fa-bars"></i>
          </button> */}
          {user ? (
            <button
              onClick={() => setActiveTab('account')}
              className={`mon-compte md:hidden flex flex-col items-center justify-center cursor-pointer ${activeTab === 'account' ? 'text-[#D4AF37]' : ''}`} >
              <div className="flex items-center gap-2">
                <i className="fas fa-user-circle text-xl"></i>
                <span>Mon compte</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('auth')}
              className="md:hidden px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-button hover:bg-opacity-90 transition-colors cursor-pointer"
            >
              Connexion
            </button>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <main className="pt-16 pb-20">
        {activeTab === 'accueil' && <HomePage />}
        {activeTab === 'services' && <ServicesPage />}
        {activeTab === 'apropos' && <AboutPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'auth' && <AuthPage />}
        {activeTab === 'reservation' && <ReservationPage />}
        {activeTab === 'account' && <AccountPage />}
        {activeTab === 'admin' && <AdminPage />}
        {activeTab === 'confirmation' && <Confirmation />}
        <Footer />
      </main>
      {/* Tab Bar */}
      <div className="fixed bottom-0 w-full bg-[#1A1A1A] text-white shadow-lg md:hidden">
        <div className="nav2 grid grid-cols-5 h-16">
          <button
            onClick={() => setActiveTab('accueil')}
            className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'accueil' ? 'text-[#D4AF37]' : ''}`}
          >
            <i className="fas fa-home text-lg"></i>
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'services' ? 'text-[#D4AF37]' : ''}`}
          >
            <i className="fas fa-cut text-lg"></i>
            <span className="text-xs mt-1">Services</span>
          </button>
          <button
            onClick={() => setActiveTab('reservation')}
            className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'reservation' ? 'text-[#D4AF37]' : ''}`}
          >
            <i className="fas fa-calendar-alt text-lg"></i>
            <span className="text-xs mt-1">Réserver</span>
          </button>
          <button
            onClick={() => setActiveTab('apropos')}
            className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'apropos' ? 'text-[#D4AF37]' : ''}`}
          >
            <i className="fas fa-info-circle text-lg"></i>
            <span className="text-xs mt-1">À propos</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'contact' ? 'text-[#D4AF37]' : ''}`}
          >
            <i className="fas fa-envelope text-lg"></i>
            <span className="text-xs mt-1">Contact</span>
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />    </div>
  );
};






export default App
