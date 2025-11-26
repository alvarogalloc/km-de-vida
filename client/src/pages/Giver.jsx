import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Giver() {
    const [formData, setFormData] = useState({
        orgName: '',
        contactPerson: '',
        donorEmail: '',
        donorPhone: '',
        foodType: '',
        pickupTime: ''
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
            const response = await axios.post('/join/giver', formData);
            setStatus({ type: 'success', message: response.data.message });
            setFormData({ orgName: '', contactPerson: '', donorEmail: '', donorPhone: '', foodType: '', pickupTime: '' });
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
        // page for people who want to give food
        <div className="min-h-screen bg-bg-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-chestnut py-6 px-8">
                    <h2 className="text-3xl font-bold text-white text-center font-header">Donar Alimentos</h2>
                    <p className="text-nyanza/80 text-center mt-2">Ayúdanos a combatir el hambre</p>
                </div>

                {/* form to sign up */}
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
                        <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organización / Empresa</label>
                        <input
                            type="text"
                            name="orgName"
                            id="orgName"
                            required
                            value={formData.orgName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Persona de Contacto</label>
                        <input
                            type="text"
                            name="contactPerson"
                            id="contactPerson"
                            required
                            value={formData.contactPerson}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            name="donorEmail"
                            id="donorEmail"
                            required
                            value={formData.donorEmail}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="donorPhone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="tel"
                            name="donorPhone"
                            id="donorPhone"
                            required
                            value={formData.donorPhone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">Tipo de Alimentos</label>
                        <input
                            type="text"
                            name="foodType"
                            id="foodType"
                            placeholder="Ej. Pan, Frutas, Comida preparada..."
                            required
                            value={formData.foodType}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <div>
                        <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Horario de Recolección</label>
                        <input
                            type="text"
                            name="pickupTime"
                            id="pickupTime"
                            placeholder="Ej. Lunes a Viernes 9am - 5pm"
                            required
                            value={formData.pickupTime}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rosy-brown hover:bg-golden-brown hover:text-rosy-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chestnut transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Enviando...' : 'Registrar Donación'}
                    </button>
                </form>
            </div>
        </div>
    );
}
