import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Twitter, Send, Instagram, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        type: 'Community Member',
        message: ''
    });

    const [status, setStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // NOTE: Replace "YOUR_ACCESS_KEY_HERE" with a free key from https://web3forms.com/
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access_key: "4d1b10cf-1a41-4fe5-b58c-c6eaa1d752f0",
                    subject: `New Contact Submission from ${formData.name}`,
                    ...formData
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', organization: '', type: 'Community Member', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-cream min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Let's Connect</h1>
                        <p className="text-xl text-navy/70 mb-12">
                            Have questions, want to partner, or just want to say hi? We'd love to hear from you.
                        </p>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red/10 text-red rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy text-lg">Email Us</h3>
                                    <a href="mailto:ubuntunexusafrica@gmail.com" className="text-navy/60 hover:text-red transition-colors">ubuntunexusafrica@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow/20 text-yellow rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy text-lg">Location</h3>
                                    <p className="text-navy/60">Nairobi, Kenya</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-navy text-lg mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/company/ubuntu-justice-and-peace-nexus/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-navy/10 rounded-full flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white hover:border-navy transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://www.instagram.com/ubuntunexus/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-navy/10 rounded-full flex items-center justify-center text-navy/40 hover:bg-red hover:text-white hover:border-red transition-all">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://www.facebook.com/UbuntuNexus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-navy/10 rounded-full flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white hover:border-navy transition-all">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://x.com/ubuntunexus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-navy/10 rounded-full flex items-center justify-center text-navy/40 hover:bg-yellow hover:text-white hover:border-yellow transition-all">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-cream border border-navy/10 rounded-xl focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-cream border border-navy/10 rounded-xl focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-navy mb-2">Organization (Optional)</label>
                                    <input
                                        type="text"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-cream border border-navy/10 rounded-xl focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all"
                                        placeholder="Company Ltd"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-navy mb-2">I am a...</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-cream border border-navy/10 rounded-xl focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="Community Member">Community Member</option>
                                        <option value="Volunteer">Volunteer</option>
                                        <option value="Partner Organization">Partner Organization</option>
                                        <option value="Donor">Donor / Supporter</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-cream border border-navy/10 rounded-xl focus:ring-2 focus:ring-red focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg hover:bg-navy/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10 disabled:opacity-70"
                            >
                                {status === 'submitting' ? 'Sending...' : (
                                    <>Send Message <Send className="w-5 h-5" /></>
                                )}
                            </button>
                            {status === 'success' && (
                                <p className="text-green-600 text-center font-medium mt-4">
                                    Message sent successfully! We'll be in touch soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-red text-center font-medium mt-4">
                                    Something went wrong. Please try again or email us directly.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
