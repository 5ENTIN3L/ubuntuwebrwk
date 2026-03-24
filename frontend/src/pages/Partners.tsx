import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';

const Partners: React.FC = () => {
    const partners = [
        { name: "Local School A", type: "Education" },
        { name: "Community Center B", type: "Outreach" },
        { name: "Legal Aid Clinic C", type: "Justice" },
        { name: "Youth Group D", type: "Empowerment" },
        { name: "Corporate Donor E", type: "Funding" },
        { name: "Gov Agency F", type: "Policy" },
    ];

    return (
        <div className="bg-cream min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Our Network</h1>
                    <p className="text-xl text-navy/70">
                        We work alongside local organizations, schools, and leaders to create lasting change.
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-24">
                    {partners.map((partner, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="aspect-square bg-white border border-navy/5 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-red/20 hover:bg-red/5 transition-colors group cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-navy/5 rounded-full mb-3 group-hover:bg-red/10 transition-colors" />
                            <div className="text-center">
                                <div className="font-semibold text-navy text-sm">{partner.name}</div>
                                <div className="text-xs text-navy/50 mt-1">{partner.type}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Partner with Us Section */}
                <section className="bg-navy rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Movement</h2>
                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                Whether you are a community organization, a school, or a donor, your partnership helps us build a safer, more just society.
                            </p>
                            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-white text-navy rounded-full font-semibold hover:bg-cream transition-colors">
                                Get In Touch <ArrowUpRight className="ml-2 w-5 h-5" />
                            </a>
                        </div>

                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                            <h3 className="text-xl font-bold mb-6">Why Partner?</h3>
                            <ul className="space-y-4">
                                {[
                                    "Collaborate on community safety initiatives.",
                                    "Support youth mentorship programs.",
                                    "Access to restorative justice resources.",
                                    "Direct impact on reducing local crime."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-yellow flex-shrink-0" />
                                        <span className="text-white/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Partners;
