import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '/images/logo.svg';
import Login from './Login';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    //If not home, always look "scrolled" (white bg, dark text) or just dark text?
    //Let's force "scrolled" look on non-home pages for consistency and readability
    const isScrolledState = scrolled || !isHome;

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolledState ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <nav className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="mr-4">
                            <img src={logo} alt="Logo" className="h-10" />
                        </Link>
                        <Link to="/" className={`text-xl font-bold font-serif transition-colors ${isScrolledState ? 'text-primary' : 'text-white'}`}>
                            Kilometros de Vida
                        </Link>
                    </div>

                    {/*button for phones*/}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`focus:outline-none ${isScrolledState ? 'text-primary' : 'text-white'}`}
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
                        <Link to="/" className={`font-medium transition-colors hover:text-secondary ${isScrolledState ? 'text-text-main' : 'text-white/90'}`}>
                            Inicio
                        </Link>
                        <Link to="/about" className={`font-medium transition-colors hover:text-secondary ${isScrolledState ? 'text-text-main' : 'text-white/90'}`}>
                            Quiénes somos
                        </Link>
                        <Link to="/volunteer" className={`font-medium transition-colors hover:text-secondary ${isScrolledState ? 'text-text-main' : 'text-white/90'}`}>
                            Sé voluntario
                        </Link>
                        <Link to="/donate" className="bg-secondary text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-secondary transition-all shadow-md">
                            Donar Alimentos
                        </Link>
                        <Login />
                    </div>
                </div>

                {/* menu that shows up on phones */}
                {isOpen && (
                    <div className="lg:hidden mt-4 pb-4 bg-white rounded-xl shadow-xl p-4 absolute top-16 left-4 right-4 text-center">
                        <Link to="/" className="block py-3 text-text-main hover:text-secondary font-medium border-b border-gray-100" onClick={() => setIsOpen(false)}>
                            Inicio
                        </Link>
                        <Link to="/about" className="block py-3 text-text-main hover:text-secondary font-medium border-b border-gray-100" onClick={() => setIsOpen(false)}>
                            Quiénes somos
                        </Link>
                        <Link to="/volunteer" className="block py-3 text-text-main hover:text-secondary font-medium border-b border-gray-100" onClick={() => setIsOpen(false)}>
                            Sé voluntario
                        </Link>
                        <Link to="/donate" className="block py-3 text-secondary font-bold" onClick={() => setIsOpen(false)}>
                            Donar Alimentos
                        </Link>
                        <div className="py-3 flex justify-center">
                            <Login />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
