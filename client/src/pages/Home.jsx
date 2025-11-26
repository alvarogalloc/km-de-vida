import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Home() {
    const [drivers, setDrivers] = useState([]);
    const [givers, setGivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // go get the data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data');
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
        <div className="min-h-screen bg-bg-light">
            {/* the big image at the top */}
            <div className="relative h-[95vh] w-full overflow-hidden shadow-xl">
                <img
                    src="/images/littleBoyWithMango.jpg"
                    alt="Decorative background"
                    className="w-full h-full object-cover brightness-[0.6]"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x400/3a2e2a/eaf4d3?text=IMAGE+NOT+FOUND'; }}
                />
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-nyanza font-header">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
                    >
                        Ningún plato<br />
                        desperdiciado.<br />
                        Ningúna persona<br />
                        olvidada.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-light mb-8 drop-shadow-md"
                    >
                        | Guadalajara Hunger Statistics
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/volunteer">
                            <button className="bg-rosy-brown text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-golden-brown hover:text-rosy-brown transition-all transform hover:-translate-y-1 shadow-lg">
                                Sé Parte del Cambio
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* the main text stuff */}
            <div className="container mx-auto px-4 py-16 relative">
                {/* the box that sits on top of the image */}
                <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 -mt-32 relative z-10 mx-auto max-w-4xl border border-vanilla/10">
                    <h3 className="text-3xl text-center text-chestnut font-bold mb-6 font-header">Amigos de la Comunidad,</h3>
                    <p className="text-lg italic text-vanilla/80 mb-8">
                        Desde el principio, hemos sido impulsados por una realidad crítica: el problema no es la falta de alimentos, sino la falta de conexión.
                        Cada día en Guadalajara, toneladas de comida perfectamente comestible se desperdician, incluso cuando más de un millón de nuestros
                        vecinos enfrentan inseguridad alimentaria.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h6 className="text-xl font-bold text-chestnut mb-3 font-header text-center">Nuestra Misión</h6>
                            <p className="text-gray-600">
                                <strong>Kilómetros de Vida</strong> aborda el doble problema del desperdicio de alimentos y el hambre en Guadalajara resolviendo la brecha de distribución.
                                Nuestra plataforma web conecta el excedente de alimentos comestibles de hogares y empresas locales directamente con refugios e
                                instituciones vulnerables.
                                <br /><br />
                                Este proyecto se basa en la convicción de que todos quieren ayudar. Te empoderamos a ti, el voluntario, para que te conviertas en el eslabón
                                esencial de la cadena de distribución. Todo lo que se necesita es un vehículo, tiempo y la determinación de impulsar el cambio.
                            </p>
                        </div>
                        <div>
                            <h6 className="text-xl font-bold text-chestnut mb-3 font-header text-center">Nuestro Impacto</h6>
                            <p className="text-gray-600">
                                Apoyamos activamente los Objetivos de Desarrollo Sostenible de la ONU, específicamente <strong>Hambre Cero (ODS 2)</strong> y <strong>Producción y
                                    Consumo Responsables (ODS 12)</strong>. Creemos que toda persona merece seguridad alimentaria y todo recurso merece un uso responsable.
                                <br /><br />
                                Cada kilómetro recorrido nos acerca a una comunidad donde el lugar donde vives no dicta tu acceso a la nutrición esencial. Medimos el
                                éxito no solo en comidas entregadas, sino en la comunidad que construimos juntos.
                            </p>
                        </div>
                    </div>

                    <p className="text-center mt-8 italic text-chestnut font-medium">
                        A su servicio,<br />
                        <strong>El Equipo de Kilómetros de Vida</strong><br />
                        GUADALAJARA, MÉXICO
                    </p>
                </div>

                {/* pictures of people helping */}
                <div className="grid md:grid-cols-2 gap-8 mt-16 items-center">
                    <div className="hidden md:block">
                        <img
                            src="/images/littleBoyWithSoup.jpg"
                            alt="Donations"
                            className="rounded-lg shadow-lg w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="hidden md:block">
                        <img
                            src="/images/volunteersHandlingDonations.jpg"
                            alt="Volunteers"
                            className="rounded-lg shadow-lg w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* saying thanks */}
                <div className="py-16 text-center">
                    <h2 className="text-4xl text-chestnut font-display">
                        Muchas gracias a quienes nos ayudan a cumplir esta visión...
                    </h2>
                </div>

                {/* list of drivers */}
                <section className="mb-16">
                    <h2 className="text-3xl text-center mb-8 font-header text-chestnut">Volunteer Drivers</h2>
                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-rosy-brown text-white">
                                    <th className="p-4 rounded-tl-xl">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4 rounded-tr-xl">Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
                                ) : drivers.length > 0 ? (
                                    drivers.map((driver, index) => (
                                        <tr key={index} className="hover:bg-nyanza transition-colors border-b border-gray-100 last:border-0">
                                            <td className="p-4 font-medium">{driver.volunteerName}</td>
                                            <td className="p-4">{driver.volunteerEmail}</td>
                                            <td className="p-4">{driver.volunteerPhone}</td>
                                            <td className="p-4">{driver.availability}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" className="p-4 text-center text-gray-500">No drivers available yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* list of food donors */}
                <section className="mb-16">
                    <h2 className="text-3xl text-center mb-8 font-header text-chestnut">Food Donors</h2>
                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-rosy-brown text-white">
                                    <th className="p-4 rounded-tl-xl">Organization</th>
                                    <th className="p-4">Contact Person</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Food Type</th>
                                    <th className="p-4">Pickup Time</th>
                                    <th className="p-4 rounded-tr-xl">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="7" className="p-4 text-center">Loading...</td></tr>
                                ) : givers.length > 0 ? (
                                    givers.map((giver, index) => (
                                        <tr key={index} className="hover:bg-nyanza transition-colors border-b border-gray-100 last:border-0">
                                            <td className="p-4 font-medium">{giver.orgName}</td>
                                            <td className="p-4">{giver.contactPerson}</td>
                                            <td className="p-4">{giver.donorEmail}</td>
                                            <td className="p-4">{giver.donorPhone}</td>
                                            <td className="p-4">{giver.foodType}</td>
                                            <td className="p-4">{giver.pickupTime}</td>
                                            <td className="p-4">{new Date(giver.createdAt).toLocaleString('es-MX')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="7" className="p-4 text-center text-gray-500">No food donors available yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
