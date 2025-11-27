import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import DonationMap from '../components/DonationMap';

// Counter component for animated numbers
const Counter = ({ from, to, duration = 2 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const [count, setCount] = useState(from);

    useEffect(() => {
        if (inView) {
            let start = from;
            const end = to;
            const step = Math.ceil((end - start) / (duration * 60));

            const timer = setInterval(() => {
                setCount(prev => {
                    const next = prev + step;
                    if (next >= end) {
                        clearInterval(timer);
                        return end;
                    }
                    return next;
                });
            }, 16); // ~60fps

            return () => clearInterval(timer);
        }
    }, [inView, from, to, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function Home() {
    const [drivers, setDrivers] = useState([]);
    const [givers, setGivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(${import.meta.env.VITE_BACKEND_HOST}+'/api/data');
                setDrivers(response.data.drivers || []);
                setGivers(response.data.givers || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-background overflow-x-hidden font-sans">

            {/* 1) HOOK: Full-viewport Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#34495E] to-[#2C3E50] opacity-90"></div>

                {/* Subtle Animated Background Elements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-[100vw] h-[100vw] border border-white/5 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -right-1/2 w-[80vw] h-[80vw] border border-white/5 rounded-full"
                />

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight leading-tight text-white">
                            Kilómetros <br />
                            <span className="text-secondary">de Esperanza</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-2xl font-light max-w-2xl mx-auto mb-12 text-text-light/90"
                    >
                        Conectando la abundancia con la necesidad.
                        <br />
                        <span className="font-semibold text-accent">1/3 de la comida se desperdicia</span> mientras miles duermen con hambre.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            to="/volunteer"
                            className="bg-secondary text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg hover:bg-white hover:text-secondary transition-all duration-300"
                        >
                            Únete al Movimiento
                        </Link>
                        <Link
                            to="/about"
                            className="bg-transparent border border-white text-white font-semibold text-lg px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-all duration-300"
                        >
                            Conoce Más
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </motion.div>
            </section>

            {/* 2) PROBLEM: The Reality (Clean White Section) */}
            <section className="py-24 bg-surface relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight text-primary"
                            >
                                La Realidad <br />
                                <span className="text-secondary">Invisible</span>
                            </motion.h2>
                            <p className="text-lg text-text-muted mb-6 leading-relaxed">
                                En nuestra propia ciudad, toneladas de alimentos perfectamente buenos terminan en la basura todos los días. Al mismo tiempo, comedores comunitarios luchan por servir un plato caliente.
                            </p>
                            <p className="text-lg text-text-main font-medium">
                                No es un problema de escasez. Es un problema de <strong className="text-accent">logística</strong>.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-background p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-5xl font-bold text-secondary mb-2">
                                    <Counter from={0} to={30} />%
                                </h3>
                                <p className="text-text-muted uppercase tracking-wider text-xs font-semibold">Alimento Desperdiciado</p>
                            </div>
                            <div className="bg-background p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-5xl font-bold text-primary mb-2">
                                    <Counter from={0} to={1200} />+
                                </h3>
                                <p className="text-text-muted uppercase tracking-wider text-xs font-semibold">Familias en Espera</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3) SOLUTION: 3-Step Process */}
            <section className="py-24 bg-background relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">Cómo Funciona</h2>
                        <div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
                    </motion.div>

                    <div className="space-y-24">
                        {/* Step 1 */}
                        <div className="relative grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative z-10">
                                <div className="flex items-center mb-4">
                                    <span className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold mr-4">1</span>
                                    <h3 className="text-2xl font-bold text-primary">Recolectamos</h3>
                                </div>
                                <p className="text-text-muted text-lg leading-relaxed pl-14">
                                    Nuestros "Givers" (restaurantes, mercados, tiendas) nos notifican cuando tienen excedentes de alimentos de calidad.
                                </p>
                            </div>
                            <div className="order-1 md:order-2 flex justify-center relative">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative z-10 bg-white p-2 rounded-xl shadow-xl"
                                >
                                    <img src="/images/lotsOfDonations.webp" alt="Donations" className="w-full max-w-md h-64 object-cover rounded-lg" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-1 flex justify-center relative">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative z-10 bg-white p-2 rounded-xl shadow-xl"
                                >
                                    <img src="/images/bluetruck.jpg" alt="Transport" className="w-full max-w-md h-64 object-cover rounded-lg" />
                                </motion.div>
                            </div>
                            <div className="order-2 relative z-10">
                                <div className="flex items-center mb-4">
                                    <span className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold mr-4">2</span>
                                    <h3 className="text-2xl font-bold text-primary">Distribuimos</h3>
                                </div>
                                <p className="text-text-muted text-lg leading-relaxed pl-14">
                                    Nuestra red de conductores voluntarios recoge los alimentos y los transporta inmediatamente a donde más se necesitan.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative z-10">
                                <div className="flex items-center mb-4">
                                    <span className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold mr-4">3</span>
                                    <h3 className="text-2xl font-bold text-primary">Alimentamos</h3>
                                </div>
                                <p className="text-text-muted text-lg leading-relaxed pl-14">
                                    La comida llega a comedores y familias, convirtiendo lo que iba a ser desperdicio en nutrición y esperanza.
                                </p>
                            </div>
                            <div className="order-1 md:order-2 flex justify-center relative">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative z-10 bg-white p-2 rounded-xl shadow-xl"
                                >
                                    <img src="/images/littleBoyWithSoup.jpg" alt="Feeding" className="w-full max-w-md h-64 object-cover rounded-lg" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3.5) SDGs Section */}
            <section className="py-24 bg-surface">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Objetivos de Desarrollo Sostenible</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            Nuestro trabajo contribuye directamente a las metas globales de la ONU para el 2030.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* SDG 2 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-[#D3A029] text-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
                        >
                            <div className="text-6xl font-bold mb-4 font-sans">2</div>
                            <h3 className="text-2xl font-bold mb-4 font-serif uppercase tracking-wider">Hambre Cero</h3>
                            <p className="text-white/90 text-sm">
                                Ponemos fin al hambre logrando la seguridad alimentaria y la mejora de la nutrición.
                            </p>
                        </motion.div>

                        {/* SDG 12 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-[#BF8B2E] text-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
                        >
                            <div className="text-6xl font-bold mb-4 font-sans">12</div>
                            <h3 className="text-2xl font-bold mb-4 font-serif uppercase tracking-wider">Producción y Consumo</h3>
                            <p className="text-white/90 text-sm">
                                Garantizamos modalidades de consumo y producción sostenibles, reduciendo el desperdicio.
                            </p>
                        </motion.div>

                        {/* SDG 11 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-[#FD9D24] text-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
                        >
                            <div className="text-6xl font-bold mb-4 font-sans">11</div>
                            <h3 className="text-2xl font-bold mb-4 font-serif uppercase tracking-wider">Ciudades Sostenibles</h3>
                            <p className="text-white/90 text-sm">
                                Logramos que las ciudades sean más inclusivas, seguras, resilientes y sostenibles.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3.6) MAP: Live Impact */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-4">Impacto en Tiempo Real</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            Explora dónde se están realizando las donaciones y cómo estamos cubriendo la ciudad.
                        </p>
                    </div>
                    <div className="shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
                        <DonationMap donations={givers} />
                    </div>
                </div>
            </section>

            {/* 4) PROOF: Minimal Impact Section */}
            <section className="py-24 bg-surface">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16 font-serif">
                            El Impacto es Real
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                            <div className="p-6 border-r border-gray-100 last:border-0">
                                <div className="text-4xl font-bold text-secondary mb-2 font-serif">
                                    {loading ? "..." : drivers.length}
                                </div>
                                <div className="text-text-muted text-xs uppercase tracking-widest font-semibold">Conductores</div>
                            </div>
                            <div className="p-6 border-r border-gray-100 last:border-0">
                                <div className="text-4xl font-bold text-secondary mb-2 font-serif">
                                    {loading ? "..." : givers.length}
                                </div>
                                <div className="text-text-muted text-xs uppercase tracking-widest font-semibold">Donantes</div>
                            </div>
                            <div className="p-6 border-r border-gray-100 last:border-0">
                                <div className="text-4xl font-bold text-secondary mb-2 font-serif">5k+</div>
                                <div className="text-text-muted text-xs uppercase tracking-widest font-semibold">Comidas Salvadas</div>
                            </div>
                            <div className="p-6">
                                <div className="text-4xl font-bold text-secondary mb-2 font-serif">10+</div>
                                <div className="text-text-muted text-xs uppercase tracking-widest font-semibold">Comedores</div>
                            </div>
                        </div>

                        <div className="bg-primary text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                            <h3 className="text-3xl font-bold mb-8 relative z-10 font-serif">¿Listo para ser parte del cambio?</h3>
                            <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                                <Link
                                    to="/volunteer"
                                    className="bg-secondary text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-secondary transition-colors shadow-lg"
                                >
                                    Quiero ser Voluntario
                                </Link>
                                <Link
                                    to="/donate"
                                    className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors"
                                >
                                    Quiero Donar Alimentos
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
