import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Code, Globe, ChevronRight, Heart, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const slides = [
        {
            id: 1,
            title: "Community First",
            description: "Empowering locals to lead the change.",
            icon: Users,
            color: "bg-navy",
            textColor: "text-white",
            accent: "text-yellow"
        },
        {
            id: 2,
            title: "Action Oriented",
            description: "Real solutions for real problems.",
            icon: Zap,
            color: "bg-red",
            textColor: "text-white",
            accent: "text-white"
        },
        {
            id: 3,
            title: "Healing & Justice",
            description: "Restoring balance through mediation.",
            icon: Heart,
            color: "bg-yellow",
            textColor: "text-navy",
            accent: "text-navy"
        }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Moving Background Element */}
            <div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                    backgroundSize: '100% 100%'
                }}
            />
            <motion.div
                style={{ y: backgroundY }}
                className="absolute top-0 right-0 w-1/2 h-full bg-yellow/10 -skew-x-12 z-0 transform origin-top-right translate-x-1/4"
            />

            {/* Hero Section */}
            <section className="relative z-10 min-h-[90vh] flex items-center pt-10">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-2xl"
                        >
                            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-red/10 text-red font-medium text-sm tracking-wide">
                                UBUNTU NEXUS
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-navy leading-tight mb-6">
                                Building Peace Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-yellow">Community Action</span> and Healing.
                            </h1>
                            <p className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
                                We reduce harm and prevent conflict by working directly with people. Addressing root causes through education, empowerment, and restorative justice.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 bg-navy text-white rounded-full font-semibold text-lg hover:bg-navy/90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-navy/20"
                                >
                                    Get Involved
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/initiatives"
                                    className="px-8 py-4 bg-white text-navy border border-navy/10 rounded-full font-semibold text-lg hover:bg-cream transition-all flex items-center justify-center"
                                >
                                    Our Pillars
                                </Link>
                            </div>
                        </motion.div>

                        {/* Animated Slideshow */}
                        <div className="hidden lg:block relative h-[500px] w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className={`absolute inset-0 rounded-3xl shadow-2xl overflow-hidden ${slides[currentSlide].color} p-10 flex flex-col justify-between`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className={`p-4 rounded-2xl bg-white/20 backdrop-blur-md ${slides[currentSlide].accent}`}>
                                            {React.createElement(slides[currentSlide].icon, { size: 40 })}
                                        </div>
                                        <div className={`text-6xl font-black opacity-20 ${slides[currentSlide].textColor}`}>
                                            0{slides[currentSlide].id}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className={`text-4xl font-bold mb-4 ${slides[currentSlide].textColor}`}>
                                            {slides[currentSlide].title}
                                        </h2>
                                        <p className={`text-xl opacity-90 ${slides[currentSlide].textColor}`}>
                                            {slides[currentSlide].description}
                                        </p>
                                    </div>

                                    {/* Decorative Circles */}
                                    <div className="absolute top-1/2 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Slide Indicators */}
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
                                {slides.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-navy w-10' : 'bg-navy/30 hover:bg-navy/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Split Section */}
            <section className="py-24 bg-white/50 backdrop-blur-sm relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        {/* Public/SMEs Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-navy/5"
                        >
                            <div className="w-14 h-14 bg-red/10 rounded-2xl flex items-center justify-center mb-6 text-red">
                                <Users className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4">Community & Prevention</h2>
                            <p className="text-navy/70 mb-6 text-lg">
                                We believe crime stems from exclusion and lack of opportunity. We organize community forums, safety groups, and advocacy efforts to tackle these root causes together.
                            </p>
                            <Link to="/initiatives" className="text-red font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                See our work <ChevronRight className="w-5 h-5" />
                            </Link>
                        </motion.div>

                        {/* Research/Partners Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-navy p-10 rounded-3xl shadow-xl text-white"
                        >
                            <div className="w-14 h-14 bg-navy/50 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-yellow">
                                <Globe className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Education & Healing</h2>
                            <p className="text-white/70 mb-6 text-lg">
                                From youth leadership training to restorative justice circles, we focus on healing harm and building future leaders. We empower individuals to transform their own narratives.
                            </p>
                            <Link to="/initiatives" className="text-yellow font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                Explore Programs <ChevronRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-20 border-t border-navy/5 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { number: "3", label: "Core Pillars" },
                            { number: "Countless", label: "Lives Impacted" },
                            { number: "1", label: "Shared Mission" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="p-6"
                            >
                                <div className="text-5xl font-bold text-slate-900 mb-2">{stat.number}</div>
                                <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Insights (Static) */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-navy mb-2">Latest Insights</h2>
                            <p className="text-navy/60">Thinking and writing from our team.</p>
                        </div>
                        <Link to="/insights" className="hidden md:flex items-center gap-2 text-navy font-medium hover:text-red transition-colors">
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="bg-slate-200 aspect-[4/3] rounded-2xl mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                                        Article Image {i}
                                    </div>
                                </div>
                                <div className="text-sm text-red font-medium mb-2">Opinion</div>
                                <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-red transition-colors">
                                    Understanding Root Causes of Conflict
                                </h3>
                                <p className="text-slate-500 line-clamp-2">
                                    Why punitive measures fail and how community-led interventions create lasting safety.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
