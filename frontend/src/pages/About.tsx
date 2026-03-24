import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Github, Linkedin, Twitter } from 'lucide-react';

const About: React.FC = () => {
    const team = [
        {
            name: "Member Name 1",
            role: "Program Director",
            bio: "Leading initiatives in crime prevention and social justice advocacy.",
            image: "bg-slate-300" // Placeholder class
        },
        {
            name: "Member Name 2",
            role: "Community Lead",
            bio: "Focusing on youth mentorship and education pathways.",
            image: "bg-slate-400"
        },
        {
            name: "Member Name 3",
            role: "Restorative Justice Specialist",
            bio: "Facilitating peace circles and conflict transformation.",
            image: "bg-slate-500"
        }
    ];

    return (
        <div className="bg-cream min-h-screen">
            {/* Hero */}
            <section className="bg-navy text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        The Human Element
                    </motion.h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We are a community-driven initiative reducing harm, preventing crime, and building peace by working directly with people.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl"
                        >
                            <div className="w-12 h-12 bg-red/10 text-red rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4">Our Mission</h2>
                            <p className="text-navy/70 leading-relaxed text-lg">
                                To reduce harm and build peace by addressing the root causes of crime and conflict—inequality, exclusion, and lack of opportunity—through education, action, and healing.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-navy p-10 rounded-3xl text-white shadow-xl"
                        >
                            <div className="w-12 h-12 bg-navy/50 border border-white/10 text-yellow rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-white/70 leading-relaxed text-lg">
                                A society where justice heals, youth lead with confidence, communities are safe, and every person has the dignity and opportunity to thrive.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Squad */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet The Squad</h2>
                        <p className="text-slate-500">The minds behind Ubuntu Nexus.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                {/* Photo Placeholder - Grayscale to Color on Hover */}
                                <div className={`h-80 w-full ${member.image} filter grayscale group-hover:grayscale-0 transition-all duration-500 relative`}>
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
                                    <div className="text-red font-medium text-sm mb-4">{member.role}</div>
                                    <p className="text-navy/60 mb-6 text-sm leading-relaxed">
                                        {member.bio}
                                    </p>

                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={18} /></a>
                                        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
                                        <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><Twitter size={18} /></a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Story</h2>
                    <div className="prose prose-lg mx-auto text-slate-600">
                        <p>
                            Ubuntu Nexus was born from a simple but powerful realization:
                            <strong> Crime and conflict don't appear out of nowhere.</strong>
                        </p>
                        <p className="mt-4">
                            They grow out of broken systems and unresolved harm. We saw that reactive measures weren't enough. We needed to focus on prevention, healing, and opportunity.
                            Today, we work in schools, community halls, and forums to build a safer, more just society together.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
