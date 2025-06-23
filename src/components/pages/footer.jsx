import { useInfoStore } from "../zustand/info";

export const Footer = () => {
    const { title1, title2, title, Maker, portfolio } = useInfoStore();
    return (
        <footer className="bg-[#1A1A1A] text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-8 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">{title1} {title2}</h3>
                        <p className="text-gray-400 max-w-md">
                            {title} est un salon de coiffure professionnel spécialisé dans la coupe masculine.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-gray-400 text-sm">Make by <a className="text-gray-400 hover:text-white transition-colors cursor-pointer" href={portfolio} target="_blank" rel="noopener noreferrer">{Maker}</a></p>
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} {title}. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}