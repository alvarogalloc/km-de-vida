import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '/images/logo.svg';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="font-header bg-chestnut shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="mr-4">
                            <img src={logo} alt="Logo" className="h-10" />
                        </Link>
                        <Link to="/" className="text-nyanza text-xl font-bold hover:text-nyanza/80 transition-colors">
                            Kilometros de Vida
                        </Link>
                    </div>

                    {/* button for phones */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-nyanza hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* menu for big screens */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/" className="text-nyanza hover:text-white hover:-translate-y-0.5 transition-all font-medium">
                            Inicio
                        </Link>
                        <Link to="/about" className="text-nyanza hover:text-white hover:-translate-y-0.5 transition-all font-medium">
                            Quiénes somos
                        </Link>
                        <Link to="/volunteer" className="text-nyanza hover:text-white hover:-translate-y-0.5 transition-all font-medium">
                            Sé voluntario
                        </Link>
                        <Link to="/donate" className="text-nyanza hover:text-white hover:-translate-y-0.5 transition-all font-medium">
                            Donar Alimentos
                        </Link>
                    </div>
                </div>

                {/* menu that shows up on phones */}
                {isOpen && (
                    <div className="lg:hidden mt-4 pb-4">
                        <Link to="/" className="block py-2 text-nyanza hover:text-white" onClick={() => setIsOpen(false)}>
                            Inicio
                        </Link>
                        <Link to="/about" className="block py-2 text-nyanza hover:text-white" onClick={() => setIsOpen(false)}>
                            Quiénes somos
                        </Link>
                        <Link to="/volunteer" className="block py-2 text-nyanza hover:text-white" onClick={() => setIsOpen(false)}>
                            Sé voluntario
                        </Link>
                        <Link to="/donate" className="block py-2 text-nyanza hover:text-white" onClick={() => setIsOpen(false)}>
                            Donar Alimentos
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
