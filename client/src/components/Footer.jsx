import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h3 className="text-2xl font-bold font-serif mb-2">Kilometros de Vida</h3>
                        <p className="text-text-light/70 text-sm max-w-xs">
                            Conectando la abundancia con la necesidad en Guadalajara.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
                        <Link to="/" className="text-text-light/80 hover:text-secondary transition-colors">Inicio</Link>
                        <Link to="/about" className="text-text-light/80 hover:text-secondary transition-colors">Quiénes somos</Link>
                        <Link to="/volunteer" className="text-text-light/80 hover:text-secondary transition-colors">Sé voluntario</Link>
                        <Link to="/contact" className="text-text-light/80 hover:text-secondary transition-colors">Contacto</Link>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm text-text-light/50">
                    <p>&copy; {new Date().getFullYear()} Kilometros de Vida. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
