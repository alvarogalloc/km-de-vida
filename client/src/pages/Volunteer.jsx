import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import axios from 'axios';

export default function Volunteer() {
    const { user } = useUser();
    const [donations, setDonations] = useState([]);
    const [myShifts, setMyShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        fetchDonations();
        if (user) {
            fetchMyShifts();
        }
    }, [user]);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('/api/data');
            setDonations(response.data.givers || []);
        } catch (error) {
            console.error("Error fetching donations:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyShifts = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`/api/my-assigned-shifts?email=${user.email}`);
            setMyShifts(response.data);
        } catch (error) {
            console.error("Error fetching my shifts:", error);
        }
    };

    const handleAssignShift = async (donationId) => {
        if (!user) {
            setStatus({
                type: 'error',
                message: 'Debes iniciar sesión para asignarte a un turno.'
            });
            return;
        }

        try {
            await axios.post('/api/shifts/assign', {
                donationId: donationId,
                volunteerEmail: user.email,
                volunteerName: user.name
            });

            setStatus({
                type: 'success',
                message: '¡Turno asignado exitosamente!'
            });

            // Refresh the shifts
            fetchMyShifts();
            fetchDonations();
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.error || 'Error al asignar el turno.'
            });
        }
    };

    const handleUnassignShift = async (donationId) => {
        if (!user) return;

        if (!confirm("¿Estás seguro de que quieres cancelar este turno?")) return;

        try {
            await axios.delete(`/api/shifts/unassign/${donationId}`, {
                data: { volunteerEmail: user.email }
            });

            setStatus({
                type: 'success',
                message: 'Turno cancelado exitosamente.'
            });

            // Refresh the shifts
            fetchMyShifts();
            fetchDonations();
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Error al cancelar el turno.'
            });
        }
    };

    const isAssignedToShift = (donationId) => {
        return myShifts.some(shift => shift._id === donationId);
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-6 text-center">
                            Únete como Voluntario
                        </h1>
                        <p className="text-text-muted text-center mb-6 text-lg">
                            Tu tiempo puede cambiar vidas. Selecciona los turnos de recolección que mejor se ajusten a tu horario.
                        </p>

                        {!user && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
                                <p className="text-yellow-800 font-medium">
                                    Inicia sesión para poder asignarte a turnos específicos
                                </p>
                            </div>
                        )}

                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`p-4 rounded-lg mb-6 text-center ${
                                    status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                                    status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                                    'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                            >
                                {status.message}
                            </motion.div>
                        )}
                    </div>

                    {/* My Assigned Shifts Section */}
                    {user && myShifts.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary font-serif mb-4">Mis Turnos Asignados</h2>
                            <div className="grid gap-4">
                                {myShifts.map(shift => (
                                    <motion.div
                                        key={shift._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-green-50 border border-green-200 p-6 rounded-xl"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-green-900">{shift.orgName}</h3>
                                                    <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                                                        Asignado
                                                    </span>
                                                </div>
                                                <p className="text-green-800"><strong>Tipo de alimento:</strong> {shift.foodType}</p>
                                                <p className="text-green-800"><strong>Horario de recolección:</strong> {shift.pickupTime}</p>
                                                <p className="text-green-800"><strong>Dirección:</strong> {shift.address}</p>
                                                <p className="text-green-700 text-sm mt-2">
                                                    <strong>Contacto:</strong> {shift.contactPerson} - {shift.donorPhone}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleUnassignShift(shift._id)}
                                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                                            >
                                                Cancelar Turno
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Donations Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary font-serif mb-4">
                            Donaciones Disponibles para Recolección
                        </h2>

                        {loading ? (
                            <p className="text-center py-8">Cargando donaciones...</p>
                        ) : donations.length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-text-muted">No hay donaciones disponibles en este momento.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {donations.map(donation => {
                                    const isAssigned = isAssignedToShift(donation._id);
                                    const volunteerCount = donation.assignedVolunteers?.length || 0;

                                    return (
                                        <motion.div
                                            key={donation._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`p-6 rounded-xl shadow-sm border transition-all ${
                                                isAssigned
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-white border-gray-100 hover:shadow-md'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-xl font-bold text-primary">{donation.orgName}</h3>
                                                        {volunteerCount > 0 && (
                                                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                                                {volunteerCount} voluntario{volunteerCount !== 1 ? 's' : ''}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-text-muted mt-1">
                                                        <strong>Tipo de alimento:</strong> {donation.foodType}
                                                    </p>
                                                    <p className="text-text-muted">
                                                        <strong>Horario de recolección:</strong> {donation.pickupTime}
                                                    </p>
                                                    <p className="text-text-muted">
                                                        <strong>Dirección:</strong> {donation.address}
                                                    </p>
                                                    <p className="text-text-muted text-sm mt-2">
                                                        <strong>Contacto:</strong> {donation.contactPerson}
                                                    </p>
                                                </div>
                                                <div className="ml-4">
                                                    {isAssigned ? (
                                                        <button
                                                            onClick={() => handleUnassignShift(donation._id)}
                                                            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAssignShift(donation._id)}
                                                            disabled={!user}
                                                            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {user ? 'Asignarme' : 'Inicia sesión'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
