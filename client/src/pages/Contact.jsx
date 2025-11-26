import { motion } from 'framer-motion';

export default function Contact() {
    return (
        // page to get in touch
        <div className="min-h-screen bg-bg-light py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-chestnut font-header mb-6">Contáctanos</h1>
                    <p className="text-xl text-gray-600">
                        ¿Tienes preguntas? ¿Quieres colaborar? Estamos aquí para escucharte.
                    </p>
                </motion.div>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                {/* contact info section */}
                                <h3 className="text-2xl font-bold text-chestnut mb-6 font-header">Información de Contacto</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-rosy-brown mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium text-gray-900">Dirección</p>
                                            <p className="text-gray-600">Guadalajara, Jalisco, México</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-6 h-6 text-rosy-brown mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium text-gray-900">Email</p>
                                            <a href="mailto:contact@kmdevida.org" className="text-chestnut hover:text-rosy-brown transition-colors">contact@kmdevida.org</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* message form */}
                                <h3 className="text-2xl font-bold text-chestnut mb-6 font-header">Envíanos un Mensaje</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                                        <textarea id="message" rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-chestnut focus:border-chestnut"></textarea>
                                    </div>
                                    <button type="button" className="w-full bg-rosy-brown text-white py-2 px-4 rounded-md hover:bg-golden-brown hover:text-rosy-brown transition-colors font-medium">
                                        Enviar Mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
