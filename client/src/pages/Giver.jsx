import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Giver() {
    // keep track of all the fields
    const [formData, setFormData] = useState({
        orgName: '',
        contactPerson: '',
        donorEmail: '',
        donorPhone: '',
        foodType: '',
        pickupTime: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Enviando...' });

        try {
            // post to the giver endpoint
            const response = await axios.post('/join/giver', formData);
            setStatus({ type: 'success', message: response.data.message });

            // reset everything
            setFormData({
                orgName: '', contactPerson: '', donorEmail: '',
                donorPhone: '', foodType: '', pickupTime: ''
            });
        } catch (error) {
            // show error message from server if possible
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
                    className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-6 text-center">
                        Dona Alimentos
                    </h1>
                    <p className="text-text-muted text-center mb-10 text-lg">
                        Convierte tus excedentes en esperanza. Únete a nuestra red de donantes.
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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="orgName">
                                    Nombre de la Organización/Empresa
                                </label>
                                <input
                                    type="text"
                                    id="orgName"
                                    name="orgName"
                                    value={formData.orgName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="contactPerson">
                                    Persona de Contacto
                                </label>
                                <input
                                    type="text"
                                    id="contactPerson"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="donorEmail">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="donorEmail"
                                    name="donorEmail"
                                    value={formData.donorEmail}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="donorPhone">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="donorPhone"
                                    name="donorPhone"
                                    value={formData.donorPhone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="foodType">
                                Tipo de Alimentos
                            </label>
                            <textarea
                                id="foodType"
                                name="foodType"
                                value={formData.foodType}
                                onChange={handleChange}
                                placeholder="Ej. Pan, frutas, verduras, comida preparada..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all h-24"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="pickupTime">
                                Horario Preferido de Recolección
                            </label>
                            <input
                                type="text"
                                id="pickupTime"
                                name="pickupTime"
                                value={formData.pickupTime}
                                onChange={handleChange}
                                placeholder="Ej. Lunes a Viernes, 9am - 11am"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status.type === 'loading'}
                            className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-primary transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {status.type === 'loading' ? 'Enviando...' : 'Registrar Donación'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
