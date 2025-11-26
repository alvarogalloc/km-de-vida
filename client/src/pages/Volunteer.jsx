import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Volunteer() {
    // form state
    const [formData, setFormData] = useState({
        volunteerName: '',
        volunteerEmail: '',
        volunteerPhone: '',
        availability: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    // update form data on change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Enviando...' });

        try {
            // send to backend
            const response = await axios.post('/join/driver', formData);
            setStatus({ type: 'success', message: response.data.message });
            // clear form on success
            setFormData({ volunteerName: '', volunteerEmail: '', volunteerPhone: '', availability: '' });
        } catch (error) {
            // handle errors nicely
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Hubo un error al enviar el formulario.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-6 text-center">
                        Únete como Voluntario
                    </h1>
                    <p className="text-text-muted text-center mb-10 text-lg">
                        Tu tiempo puede cambiar vidas. Ayúdanos a transportar alimentos y esperanza.
                    </p>

                    {status.message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`p-4 rounded-lg mb-8 text-center ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                                status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                                    'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                        >
                            {status.message}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="volunteerName">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                id="volunteerName"
                                name="volunteerName"
                                value={formData.volunteerName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="volunteerEmail">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="volunteerEmail"
                                name="volunteerEmail"
                                value={formData.volunteerEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="volunteerPhone">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="volunteerPhone"
                                name="volunteerPhone"
                                value={formData.volunteerPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="availability">
                                Disponibilidad
                            </label>
                            <select
                                id="availability"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white"
                                required
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="weekday_mornings">Mañanas entre semana</option>
                                <option value="weekday_afternoons">Tardes entre semana</option>
                                <option value="weekends">Fines de semana</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={status.type === 'loading'}
                            className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-primary transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {status.type === 'loading' ? 'Enviando...' : 'Registrarme'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
