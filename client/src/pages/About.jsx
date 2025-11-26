import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif mb-8 text-center">
                        Nuestra Misión
                    </h1>

                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-12">
                        <p className="text-xl text-text-muted leading-relaxed mb-6">
                            En <span className="font-bold text-secondary">Kilometros de Vida</span>, creemos que la comida es un derecho, no un privilegio.
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                            Somos un puente entre la abundancia y la necesidad. Conectamos restaurantes, mercados y tiendas que tienen excedentes de alimentos con comedores comunitarios y familias que los necesitan urgentemente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-primary text-white p-8 rounded-2xl shadow-lg"
                        >
                            <h2 className="text-2xl font-bold font-serif mb-4 text-secondary">Visión</h2>
                            <p className="text-text-light/90 leading-relaxed">
                                Un mundo donde ningún alimento se desperdicia y nadie pasa hambre. Queremos crear una red logística solidaria que opere con la eficiencia de una empresa tecnológica y el corazón de una ONG.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold font-serif mb-4 text-primary">Valores</h2>
                            <ul className="space-y-3 text-text-muted">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                    Solidaridad Inmediata
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                    Transparencia Total
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                    Sostenibilidad Ambiental
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                    Dignidad Humana
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
