import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Users, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { articlesData } from '../utils/data';

// Auto-discover every image from public/images/slideshow/ at build time via Vite glob.
// Simply drop any image into public/images/slideshow/ and it auto-appears in the slideshow.
// Staff photos go in public/images/staff/ — they are never included here.
const imageModules = import.meta.glob('/public/images/slideshow/*', { eager: true, query: '?url', import: 'default' });
const allSlideImages: string[] = Object.keys(imageModules)
    .map((path) => path.replace('/public', ''))
    .sort();   // stable alphabetic order so slides don't shuffle on every render

const Home: React.FC = () => {
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const navigate = useNavigate();

    // Use all detected images; fall back to a placeholder if folder is empty
    const slides = allSlideImages.length > 0
        ? allSlideImages.map((src, i) => ({ id: i, bgImage: src, alt: `Ubuntu Nexus photo ${i + 1}` }))
        : [{ id: 0, bgImage: '', alt: 'Ubuntu Nexus' }];

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
                                Building Peace Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-red to-yellow">Shared Humanity</span> and Collective Action.
                            </h1>
                            <p className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed font-medium">
                                Empowering Youth. Amplifying Voices. Transforming Communities.
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

                        {/* Animated Slideshow — pure image cycle */}
                        <div className="hidden lg:block relative h-[500px] w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
                                >
                                    <img
                                        src={slides[currentSlide].bgImage}
                                        alt={slides[currentSlide].alt}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Prev / Next arrows */}
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-navy" />
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-navy" />
                            </button>

                            {/* Dot indicators */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-navy w-8' : 'bg-navy/30 w-2.5 hover:bg-navy/50'
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
                            <h2 className="text-3xl font-bold text-navy mb-4">Core Paradigm</h2>
                            <p className="text-navy/70 mb-6 text-lg">
                                Many of the challenges young people and their communities face—violence, exclusion, mistrust—are systemic. We work across multiple entry points because no single intervention alone produces sustainable change.
                            </p>
                            <Link to="/initiatives" className="text-red font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                See our flow <ChevronRight className="w-5 h-5" />
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
                            <h2 className="text-3xl font-bold mb-4">Justice & Peace</h2>
                            <p className="text-white/70 mb-6 text-lg">
                                Justice and peace are outcomes of quality education, meaningful participation, and working together. We build inclusive, resilient communities by strengthening people, relationships, and systems — together.
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
                        {/*<Link
                            to="/insights"
                            className="flex items-center gap-2 text-navy font-semibold hover:text-red transition-colors border border-navy/20 hover:border-red/40 px-4 py-2 rounded-full text-sm"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>*/}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {articlesData.slice(0, 3).map((article) => (
                            <a href={article.link} target="_blank" rel="noopener noreferrer" key={article.id} className="group cursor-pointer block">
                                <div className="aspect-[4/3] rounded-2xl mb-6 overflow-hidden relative bg-slate-200 border border-slate-100 group-hover:shadow-md transition-all duration-300">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="text-sm text-red font-medium mb-2 uppercase tracking-wide">{article.category}</div>
                                <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-red transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-slate-500 line-clamp-2">
                                    {article.excerpt}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
