import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-primary font-serif mb-8 text-center">
                        Contáctanos
                    </h1>

                    <div className="space-y-6 text-center mb-12">
                        <p className="text-lg text-text-muted">
                            ¿Tienes preguntas? ¿Quieres colaborar? Estamos aquí para escucharte.
                        </p>
                        <div className="flex flex-col gap-4 items-center">
                            <a href="mailto:hola@kmdevida.org" className="text-xl font-medium text-secondary hover:text-primary transition-colors">
                                hola@kmdevida.org
                            </a>
                            <p className="text-text-main font-medium">Guadalajara, Jalisco, México</p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="name">
                                Nombre
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="message">
                                Mensaje
                            </label>
                            <textarea
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all h-32"
                                id="message"
                                placeholder="¿En qué podemos ayudarte?"
                            ></textarea>
                        </div>
                        <button
                            className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-secondary transition-colors shadow-lg"
                            type="button"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
