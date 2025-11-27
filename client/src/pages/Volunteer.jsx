import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Volunteer() {
    const [formData, setFormData] = useState({
        volunteerName: '',
        volunteerEmail: '',
        volunteerPhone: '',
        availability: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: '' });

        // Simulación de envío
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus({
                type: 'success',
                message: '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.'
            });
            setFormData({
                volunteerName: '',
                volunteerEmail: '',
                volunteerPhone: '',
                availability: ''
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.'
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
