import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, BookOpen, UserCheck, ShieldAlert, HeartHandshake, Scale, GraduationCap } from 'lucide-react';

const Initiatives: React.FC = () => {
    return (
        <div className="bg-cream min-h-screen pt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Our Initiatives</h1>
                    <p className="text-xl text-navy/70">
                        Our work is organized around four big pillars designed to address root causes, empower youth, and heal communities.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Pillar 1: Crime Prevention & Social Justice */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-red/10 text-red rounded-xl flex items-center justify-center mb-6">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4">Crime Prevention & Social Justice</h2>
                            <p className="text-navy/70 text-lg leading-relaxed mb-8">
                                We address the root causes of crime and social injustice by focusing on prevention, trust-building, access to justice and related advocacy rather than punishment alone.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Community dialogue & safety conversations', 'Youth engagement around justice & accountability', 'Bridging gaps between communities & institutions', 'Reframing crime as a systems issue & advocacy'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-navy">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <div className="relative group cursor-pointer p-4 md:p-8">
                            <div className="absolute inset-0 bg-red/10 translate-x-4 translate-y-4 rounded-2xl transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <img src="/images/crime_prevention.png" alt="Crime Prevention" className="relative z-10 rounded-2xl shadow-xl w-full object-cover aspect-[4/3] -rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02]" />
                        </div>
                    </section>

                    {/* Pillar 2: Youth, Peace & Security (YPS) */}
                    <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="md:order-2"
                        >
                            <div className="w-12 h-12 bg-yellow/20 text-yellow rounded-xl flex items-center justify-center mb-6">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Youth, Peace & Security (YPS)</h2>
                            <p className="text-navy/70 text-lg leading-relaxed mb-6">
                                We work to position young people as active contributors to peace and security, not passive beneficiaries.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Peace education & peacebuilding initiatives', 'Youth-led dialogue & civic engagement', 'Addressing polarization, violence, and exclusion', 'Supporting youth participation in governance'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-navy">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <div className="relative group cursor-pointer p-8">
                            <div className="absolute inset-0 bg-yellow/10 -translate-x-4 translate-y-4 rounded-2xl transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                            <img src="/images/youth_peace.png" alt="Youth Peace & Security" className="relative z-10 rounded-2xl shadow-xl w-full object-cover aspect-[4/3] rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02]" />
                        </div>
                    </section>

                    {/* Pillar 3: Restorative Justice & Reintegration */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-navy/10 text-navy rounded-xl flex items-center justify-center mb-6">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4">Restorative Justice & Reintegration</h2>
                            <p className="text-navy/70 text-lg leading-relaxed mb-6">
                                We promote approaches that emphasize reconciliation, social healing, responsibility, and reintegration rather than stigma or exclusion.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Restorative dialogue & mediation foundations', 'Community-based conflict resolution', 'Supporting reintegration & second chances', 'Strengthening social cohesion & accountability'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-navy">
                                        <div className="w-1.5 h-1.5 rounded-full bg-navy/60 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative group cursor-pointer p-4 md:p-8">
                                <div className="absolute inset-0 bg-navy/10 translate-x-4 -translate-y-4 rounded-2xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
                                <img src="/images/restorative_justice.png" alt="Restorative Justice" className="relative z-10 rounded-2xl shadow-xl w-full object-cover aspect-[4/3] -rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02]" />
                            </div>
                        </motion.div>
                    </section>

                    {/* Pillar 4: Education & Empowerment */}
                    <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="md:order-2"
                        >
                            <div className="w-12 h-12 bg-yellow/20 text-yellow rounded-xl flex items-center justify-center mb-6">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Education & Empowerment</h2>
                            <p className="text-navy/70 text-lg leading-relaxed mb-6">
                                We view education broadly — not only formal schooling, but access to knowledge, skills and opportunities.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Education & life skills', 'Mentorship & capacity-building', 'Access to information & opportunities', 'Digital literacy & responsible engagement', 'Pathways for growth beyond formal classrooms'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-navy">
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <div className="relative group cursor-pointer p-8">
                            <div className="absolute inset-0 bg-yellow/10 -translate-x-4 -translate-y-4 rounded-2xl transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                            <img src="/images/education_empowerment.png" alt="Education & Empowerment" className="relative z-10 rounded-2xl shadow-xl w-full object-cover aspect-[4/3] rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02]" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Initiatives;
