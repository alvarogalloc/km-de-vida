import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-chestnut text-nyanza pt-16 pb-4 font-sans">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-header">Kilometros de Vida</h3>
                        <p className="text-sm opacity-90">
                            Conectando alimentos con quienes los necesitan en Guadalajara.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-header">Enlaces</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Quiénes somos</Link></li>
                            <li><Link to="/volunteer" className="hover:text-white transition-colors">Sé voluntario</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-header">Contacto</h4>
                        <p className="text-sm opacity-90">Guadalajara, México</p>
                        <a href="mailto:contact@kmdevida.org" className="text-sm hover:text-white transition-colors">contact@kmdevida.org</a>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
                    <p>&copy; {new Date().getFullYear()} Kilometros de Vida. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
