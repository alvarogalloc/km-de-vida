import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Volunteer() {
    const [formData, setFormData] = useState({
        volunteerName: '',
        volunteerEmail: '',
        volunteerPhone: '',
        availability: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('/join/driver', formData);
            setStatus({ type: 'success', message: response.data.message });
            setFormData({ volunteerName: '', volunteerEmail: '', volunteerPhone: '', availability: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
            {/* this is the top part with the big title */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-chestnut font-header mb-4">
                    Juntos podemos acabar con el hambre en Guadalajara.
                </h1>
            </div>

            {/* these are the cards that show what you can do */}
            <div className="container mx-auto max-w-6xl mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* card for driving */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-rosy-brown"
                    >
                        <div className="p-8 text-center">
                            <div className="text-rosy-brown mb-4 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.5A1.5 1.5 0 0 1 15 6.5V11h-1v-5a1 1 0 0 0-1-1H3V3.5a.5.5 0 0 0-.5-.5h-1A.5.5 0 0 0 1 3.5v.784L0 3.5zm2.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m12-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M13 10V6.5a.5.5 0 0 0-.5-.5H12V10h1z" />
                                </svg>
                            </div>
                            <h5 className="text-2xl font-bold text-chestnut mb-3 font-header">Volunteer to Transport Food</h5>
                            <p className="text-gray-600 mb-6">Transport food in your car across the city to various distribution centers.</p>
                            <button onClick={() => document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth' })} className="bg-rosy-brown text-white px-6 py-2 rounded-full font-medium hover:bg-golden-brown hover:text-rosy-brown transition-colors">
                                Sign Up to Drive
                            </button>
                        </div>
                    </motion.div>

                    {/* card for businesses giving food */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-chestnut"
                    >
                        <div className="p-8 text-center">
                            <div className="text-chestnut mb-4 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3a.5.5 0 0 0-.5.5V5h-7V4.5a.5.5 0 0 0-.5-.5h-1A1.5 1.5 0 0 0 0 5.5v10A1.5 1.5 0 0 0 1.5 17h13A1.5 1.5 0 0 0 16 15.5v-10A1.5 1.5 0 0 0 14.5 4h-1zM15 5.5v10a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5z" />
                                </svg>
                            </div>
                            <h5 className="text-2xl font-bold text-chestnut mb-3 font-header">Donate Goods</h5>
                            <p className="text-gray-600 mb-6">Sign up your local business to help ensure food does not go to waste.</p>
                            <a href="/donate" className="bg-chestnut text-white px-6 py-2 rounded-full font-medium hover:bg-rosy-brown transition-colors inline-block">
                                Enroll Business
                            </a>
                        </div>
                    </motion.div>

                    {/* card for giving money */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-golden-brown"
                    >
                        <div className="p-8 text-center">
                            <div className="text-golden-brown mb-4 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                    <path d="M4 10.5a.5.5 0 0 0 .5.5h3a.5.5 0 1 0 0-1H4.5a.5.5 0 0 0-.5.5zm5.397-3.045c.465-.246.967-.442 1.353-.642.5-.252.793-.578.793-.956 0-.61-.502-1.007-1.464-1.007-.639 0-1.183.193-1.578.471l-.105.08A2.99 2.99 0 0 0 6 5.82v.228a.4.4 0 0 0 .26.398c.459.26.963.504 1.35.738.528.293.791.64.791 1.103 0 .749-.623 1.157-1.637 1.157-.738 0-1.282-.245-1.667-.534l-.105-.08a2.986 2.986 0 0 0-1.35-.749v-.228a.4.4 0 0 0-.26-.398c-.459-.26-.963-.504-1.35-.738-.528-.293-.791-.64-.791-1.103 0-.749.623-1.157 1.637-1.157.738 0 1.282.245 1.667.534l.105.08a2.986 2.986 0 0 0 1.35.749v.228a.4.4 0 0 0 .26.398z" />
                                </svg>
                            </div>
                            <h5 className="text-2xl font-bold text-chestnut mb-3 font-header">Make a Monetary Donation</h5>
                            <p className="text-gray-600 mb-6">Every dollar helps fuel our operations and directly assists those in need.</p>
                            <button className="bg-golden-brown text-rosy-brown px-6 py-2 rounded-full font-medium hover:bg-rosy-brown hover:text-white transition-colors">
                                Donate Now
                            </button>
                        </div>
                    </motion.div>

                    {/* card for sharing on social media */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-max-blue-purp"
                    >
                        <div className="p-8 text-center">
                            <div className="text-max-blue-purp mb-4 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-megaphone" viewBox="0 0 16 16">
                                    <path d="M13 2.5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z" />
                                    <path d="M10 1.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                                    <path d="M4 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z" />
                                    <path d="M1.5 7.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </div>
                            <h5 className="text-2xl font-bold text-chestnut mb-3 font-header">Spread the Word</h5>
                            <p className="text-gray-600 mb-6">Help us reach more people by sharing our mission and goals on social media.</p>
                            <button className="bg-max-blue-purp text-white px-6 py-2 rounded-full font-medium hover:bg-chestnut transition-colors">
                                Share Our Mission
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div id="volunteer-form" className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-chestnut py-6 px-8">
                    <h2 className="text-3xl font-bold text-white text-center font-header">Sé Voluntario</h2>
                    <p className="text-nyanza/80 text-center mt-2">Únete a nuestra red de conductores</p>
                </div>

                <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                    {status.message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                            {status.message}
                        </motion.div>
                    )}

                    <div>
                        <label htmlFor="volunteerName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            name="volunteerName"
                            id="volunteerName"
                            required
                            value={formData.volunteerName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="volunteerEmail" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            name="volunteerEmail"
                            id="volunteerEmail"
                            required
                            value={formData.volunteerEmail}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="volunteerPhone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="tel"
                            name="volunteerPhone"
                            id="volunteerPhone"
                            required
                            value={formData.volunteerPhone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Disponibilidad</label>
                        <select
                            name="availability"
                            id="availability"
                            required
                            value={formData.availability}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Weekdays Morning">Entre semana (Mañanas)</option>
                            <option value="Weekdays Afternoon">Entre semana (Tardes)</option>
                            <option value="Weekends">Fines de semana</option>
                            <option value="Flexible">Flexible</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rosy-brown hover:bg-golden-brown hover:text-rosy-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chestnut transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Enviando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
}
