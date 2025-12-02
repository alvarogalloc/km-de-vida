import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user } = useUser();
    const [donations, setDonations] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [assignedShifts, setAssignedShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const [donationsRes, shiftsRes, assignedShiftsRes] = await Promise.all([
                axios.get(`/api/my-donations?email=${user.email}`),
                axios.get(`/api/my-volunteer-shifts?email=${user.email}`),
                axios.get(`/api/my-assigned-shifts?email=${user.email}`)
            ]);
            setDonations(donationsRes.data);
            setShifts(shiftsRes.data);
            setAssignedShifts(assignedShiftsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este registro?")) return;
        try {
            // Reusing the donation delete endpoint for now, ideally should have separate or generic one
            // Assuming we only have delete for donations implemented in this iteration based on plan
            if (type === 'donation') {
                await axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/api/donations/${id}`);
                setDonations(donations.filter(d => d._id !== id));
            } else {
                alert("La eliminación de turnos de voluntariado contacte al administrador.");
            }
        } catch (error) {
            console.error("Error deleting", error);
            alert("Error al eliminar");
        }
    };

    const startEdit = (item) => {
        setEditingId(item._id);
        setEditForm(item);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/api/donations/${editingId}`, editForm);
            setDonations(donations.map(d => d._id === editingId ? editForm : d));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating", error);
            alert("Error al actualizar");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-center">
                <p>Por favor inicia sesión para ver tu perfil.</p>
            </div>
        );
    }

    const isDonor = donations.length > 0;
    const isVolunteer = shifts.length > 0 || assignedShifts.length > 0;

    const handleUnassignShift = async (donationId) => {
        if (!confirm("¿Estás seguro de que quieres cancelar este turno?")) return;

        try {
            await axios.delete(`/api/shifts/unassign/${donationId}`, {
                data: { volunteerEmail: user.email }
            });
            // Refresh data
            fetchData();
        } catch (error) {
            console.error("Error unassigning shift:", error);
            alert("Error al cancelar el turno");
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* User Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center space-x-6"
                    >
                        <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full border-4 border-secondary/20" />
                        <div>
                            <h1 className="text-3xl font-bold text-primary font-serif">{user.name}</h1>
                            <p className="text-text-muted">{user.email}</p>
                            <div className="mt-4 flex space-x-2">
                                {isDonor && <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Donante Activo</span>}
                                {isVolunteer && <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Voluntario</span>}
                                {!isDonor && !isVolunteer && <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">Nuevo Miembro</span>}
                            </div>
                        </div>
                    </motion.div>

                    {/* Donations Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-primary font-serif mb-6">Mis Donaciones</h2>
                        {loading ? <p>Cargando...</p> : donations.length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-text-muted mb-4">No tienes donaciones activas.</p>
                                <Link to="/donate" className="text-secondary font-bold hover:underline">¡Haz tu primera donación!</Link>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {donations.map(donation => (
                                    <motion.div key={donation._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        {editingId === donation._id ? (
                                            <div className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <input name="orgName" value={editForm.orgName} onChange={handleEditChange} className="border p-2 rounded" placeholder="Organización" />
                                                    <input name="foodType" value={editForm.foodType} onChange={handleEditChange} className="border p-2 rounded" placeholder="Tipo de Alimento" />
                                                    <input name="pickupTime" value={editForm.pickupTime} onChange={handleEditChange} className="border p-2 rounded" placeholder="Horario" />
                                                    <input name="address" value={editForm.address} onChange={handleEditChange} className="border p-2 rounded" placeholder="Dirección" />
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button onClick={saveEdit} className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary">Guardar</button>
                                                    <button onClick={cancelEdit} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancelar</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary">{donation.orgName}</h3>
                                                    <p className="text-text-muted mt-1"><strong>Alimento:</strong> {donation.foodType}</p>
                                                    <p className="text-text-muted"><strong>Horario:</strong> {donation.pickupTime}</p>
                                                    <p className="text-text-muted"><strong>Dirección:</strong> {donation.address || 'No especificada'}</p>
                                                    <p className="text-xs text-gray-400 mt-2">Registrado el: {new Date(donation.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => startEdit(donation)} className="text-blue-500 hover:text-blue-700 font-medium">Editar</button>
                                                    <button onClick={() => handleDelete(donation._id, 'donation')} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Assigned Volunteer Shifts Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-primary font-serif mb-6">Mis Turnos de Recolección Asignados</h2>
                        {loading ? <p>Cargando...</p> : assignedShifts.length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-text-muted mb-4">No tienes turnos asignados.</p>
                                <Link to="/volunteer" className="text-secondary font-bold hover:underline">¡Explora las donaciones disponibles!</Link>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {assignedShifts.map(shift => (
                                    <motion.div key={shift._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-green-900">{shift.orgName}</h3>
                                                    <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                                                        Turno Asignado
                                                    </span>
                                                </div>
                                                <p className="text-green-800 mt-1"><strong>Tipo de alimento:</strong> {shift.foodType}</p>
                                                <p className="text-green-800"><strong>Horario de recolección:</strong> {shift.pickupTime}</p>
                                                <p className="text-green-800"><strong>Dirección:</strong> {shift.address}</p>
                                                <p className="text-green-700 text-sm mt-2">
                                                    <strong>Contacto:</strong> {shift.contactPerson} - {shift.donorPhone}
                                                </p>
                                                <p className="text-xs text-green-600 mt-2">
                                                    Asignado el: {new Date(shift.assignedVolunteers?.find(v => v.email === user.email)?.assignedAt || shift.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleUnassignShift(shift._id)}
                                                className="text-red-600 hover:text-red-800 font-medium ml-4"
                                            >
                                                Cancelar Turno
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* General Volunteer Registration (if exists) */}
                    {shifts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-primary font-serif mb-6">Registro General de Voluntariado</h2>
                            <div className="grid gap-6">
                                {shifts.map(shift => (
                                    <motion.div key={shift._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-primary">Conductor Voluntario</h3>
                                                <p className="text-text-muted mt-1"><strong>Disponibilidad:</strong> {shift.availability}</p>
                                                <p className="text-text-muted"><strong>Teléfono:</strong> {shift.volunteerPhone}</p>
                                                <p className="text-xs text-gray-400 mt-2">Registrado el: {new Date(shift.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
