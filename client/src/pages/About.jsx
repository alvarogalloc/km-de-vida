import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-bg-light py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-chestnut font-header mb-6">Quiénes Somos</h1>
                    <p className="text-xl text-gray-600 italic">
                        "No podemos ayudar a todos, pero todos pueden ayudar a alguien."
                    </p>
                </motion.div>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img className="h-48 w-full object-cover md:w-48 md:h-full" src="/images/volunteersHandlingDonations.jpg" alt="Team" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-rosy-brown font-semibold">Nuestra Historia</div>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Kilómetros de Vida nació de una observación simple pero dolorosa: mientras los restaurantes y supermercados tiraban comida al final del día,
                                había personas a pocas cuadras que se iban a dormir con hambre. Decidimos ser el puente entre estos dos mundos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-chestnut"
                    >
                        <h3 className="text-2xl font-bold text-chestnut mb-4 font-header">Nuestra Visión</h3>
                        <p className="text-gray-600">
                            Imaginamos un Guadalajara donde el desperdicio de alimentos sea cosa del pasado y la solidaridad sea la norma.
                            Queremos crear una red logística comunitaria tan eficiente que ningún alimento comestible termine en la basura.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-rosy-brown"
                    >
                        <h3 className="text-2xl font-bold text-rosy-brown mb-4 font-header">Nuestros Valores</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-golden-brown mr-2">●</span> Solidaridad
                            </li>
                            <li className="flex items-center">
                                <span className="text-golden-brown mr-2">●</span> Responsabilidad Ambiental
                            </li>
                            <li className="flex items-center">
                                <span className="text-golden-brown mr-2">●</span> Transparencia
                            </li>
                            <li className="flex items-center">
                                <span className="text-golden-brown mr-2">●</span> Comunidad
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
