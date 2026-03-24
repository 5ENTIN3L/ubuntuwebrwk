import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Initiatives', path: '/initiatives' },
        { name: 'Insights', path: '/insights' },
        { name: 'Partners', path: '/partners' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans text-navy bg-cream">
            {/* Navigation */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-navy flex items-center gap-2">
                        <img src="/logo.jpg" alt="Ubuntu Nexus Logo" className="w-10 h-10 rounded-md object-cover" />
                        Ubuntu Nexus
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-red ${location.pathname === link.path ? 'text-red' : 'text-navy/70'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="bg-navy text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-navy/90 transition-colors shadow-lg shadow-navy/10"
                        >
                            Get Involved
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-slate-900"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-xl font-medium text-slate-800">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between border-b border-slate-100 pb-4"
                                >
                                    {link.name}
                                    <ChevronRight size={16} className="text-slate-400" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow pt-24">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-navy text-white/80 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="text-2xl font-bold text-white mb-4 block">
                                Ubuntu Nexus
                            </Link>
                            <p className="text-slate-400 max-w-sm">
                                Reducing harm, preventing crime, and building peace through community action and restorative justice.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Explore</h4>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link to={link.path} className="hover:text-white transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Connect</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                                <li><a href="mailto:hello@ubuntunexus.org" className="hover:text-white transition-colors">hello@ubuntunexus.org</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
                        <p>&copy; {new Date().getFullYear()} Ubuntu Nexus. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
};

export default Layout;
