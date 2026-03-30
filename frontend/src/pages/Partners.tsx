import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';

const Partners: React.FC = () => {
    return (
        <div className="bg-cream min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Organisations We've Worked With</h1>
                    <p className="text-xl text-navy/70">
                        While we are a growing organization building formal partnerships, we are proud to have collaborated alongside inspiring local organizations, schools, and community leaders to create lasting change.
                    </p>
                </div>
                {/* Partner with Us Section */}
                <section className="bg-navy rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Collaborate With Us</h2>
                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                Whether you are a community organization, a school, or a donor, your collaboration helps us build a safer, more just society.
                            </p>
                            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-white text-navy rounded-full font-semibold hover:bg-cream transition-colors">
                                Get In Touch <ArrowUpRight className="ml-2 w-5 h-5" />
                            </a>
                        </div>

                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                            <h3 className="text-xl font-bold mb-6">Why Collaborate?</h3>
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
