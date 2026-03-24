import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, BookOpen, UserCheck, ArrowRight } from 'lucide-react';

const Initiatives: React.FC = () => {
    return (
        <div className="bg-cream min-h-screen pt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Our Initiatives</h1>
                    <p className="text-xl text-navy/70">
                        Our work is organized around three big pillars designed to address root causes, empower youth, and heal communities.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Section 1: Public Front */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-red/10 text-red rounded-xl flex items-center justify-center mb-6">
                                <Monitor className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4">Crime Prevention & Social Justice</h2>
                            <p className="text-navy/70 text-lg leading-relaxed mb-8">
                                We help communities understand why crime happens and give them tools to respond. This means addressing root causes like unemployment and social exclusion through collective action.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Community Forums & Dialogue', 'Legal & Mental Health Resources', 'Policy Advocacy'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-navy">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-xl p-4 md:p-8 rotate-2 hover:rotate-0 transition-transform duration-500"
                        >
                            {/* Mockup Placeholder */}
                            <div className="aspect-[16/10] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center relative">
                                <div className="text-slate-400 font-medium">Website Mockup UI</div>
                                {/* Abstract UI Elements */}
                                <div className="absolute top-4 left-4 right-4 h-4 bg-slate-200 rounded-full w-1/3"></div>
                                <div className="absolute top-12 left-4 right-4 h-32 bg-slate-200 rounded-lg"></div>
                                <div className="absolute bottom-4 left-4 h-20 w-20 bg-slate-200 rounded-lg"></div>
                                <div className="absolute bottom-4 left-28 right-4 h-20 bg-slate-200 rounded-lg"></div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 2: Research Front (OKRI) */}
                    <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="md:order-2"
                        >
                            <div className="w-12 h-12 bg-yellow/20 text-yellow rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-3xl font-bold text-slate-900">Education & Empowerment</h2>
                            </div>
                            <p className="text-navy/70 text-lg leading-relaxed mb-6">
                                We focus on young people—from early childhood to young adults—to build a culture of peace. Through skills development, leadership training, and mentorship, we turn youth into confident leaders.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-yellow font-semibold hover:gap-3 transition-all">
                                View Programs <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="md:order-1 bg-navy rounded-2xl shadow-xl p-8"
                        >
                            <div className="space-y-4">
                                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                <div className="h-32 bg-slate-800 rounded w-full border border-slate-700/50 flex items-center justify-center text-slate-600">
                                    Repository Interface Preview
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Section 3: Internal Front (SCAP) */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-navy/10 text-navy rounded-xl flex items-center justify-center mb-6">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4">Restorative Justice</h2>
                            <h3 className="text-xl font-medium text-navy/80 mb-4">Conflict Transformation</h3>
                            <p className="text-navy/70 text-lg leading-relaxed mb-6">
                                Instead of punishment-first approaches, we support methods that focus on accountability, healing, and reintegration. We facilitate mediation and peace circles to repair relationships and reduce repeat harm.
                            </p>
                        </motion.div>
                        <div className="bg-white rounded-2xl p-10 flex items-center justify-center border border-navy/10">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-navy mb-2">Top 1%</div>
                                <div className="text-navy/60 font-medium">Talent Verification</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Initiatives;
