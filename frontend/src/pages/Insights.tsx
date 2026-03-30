import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Calendar, User, ArrowRight } from 'lucide-react';

import { articlesData as articles } from '../utils/data';

const Insights: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [email, setEmail] = useState('');
    const [subStatus, setSubStatus] = useState<'' | 'submitting' | 'success' | 'error'>('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubStatus('submitting');
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: "4d1b10cf-1a41-4fe5-b58c-c6eaa1d752f0",
                    subject: "New Newsletter Subscription",
                    email: email
                })
            });
            if (response.ok) {
                setSubStatus('success');
                setEmail('');
                setTimeout(() => setSubStatus(''), 5000);
            } else {
                setSubStatus('error');
            }
        } catch (error) {
            setSubStatus('error');
        }
    };

    const categories = ['All', 'Youth, Peace & Security', 'Crime Prevention', 'Restorative Justice', 'Education'];


    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    const featuredArticle = filteredArticles[0];
    const gridArticles = filteredArticles.slice(1);

    return (
        <div className="bg-cream min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-navy mb-4">Insights & Thoughts</h1>
                    <p className="text-navy/70 text-lg">
                        Sharing our journey, research findings, and technical deep dives. This is the precursor to our OKRI knowledge base.
                    </p>
                </div>

                {/* Featured Article */}
                {featuredArticle && (
                    <div className="mb-20">
                        <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer" className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-white rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 grid md:grid-cols-2"
                            >
                                <div className="min-h-[300px] md:min-h-full relative overflow-hidden bg-slate-100">
                                    <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-navy/10 transition-colors duration-700 pointer-events-none" />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-red/10 text-red rounded-full text-xs font-bold uppercase tracking-wide">Featured Insight</span>
                                        <span className="text-navy/50 text-sm flex items-center gap-1"><Calendar size={14} /> {featuredArticle.date}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-navy mb-4 group-hover:text-red transition-colors">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-navy/70 mb-8 leading-relaxed text-lg">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{featuredArticle.author}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">Read on LinkedIn <ArrowRight size={12} /></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </a>
                    </div>
                )}

                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Sidebar / Filters */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                                <div className="relative mb-6">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="w-full pl-10 pr-4 py-2 bg-cream border-none rounded-lg text-sm text-navy focus:ring-2 focus:ring-red outline-none"
                                    />
                                </div>
                                <h3 className="font-bold text-navy mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat
                                                ? 'bg-red/5 text-red font-medium'
                                                : 'text-navy/70 hover:bg-cream'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubscribe} className="bg-navy text-white p-6 rounded-2xl">
                                <h3 className="font-bold mb-2">Subscribe</h3>
                                <p className="text-white/60 text-sm mb-4">Get the latest insights delivered to your inbox.</p>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 bg-navy/50 border border-white/10 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-yellow outline-none text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={subStatus === 'submitting'}
                                    className="w-full py-2 bg-red hover:bg-red/90 rounded-lg text-sm font-medium transition-colors disabled:opacity-70"
                                >
                                    {subStatus === 'submitting' ? 'Joining...' : 'Join Newsletter'}
                                </button>
                                {subStatus === 'success' && <p className="text-green-400 text-xs mt-2 text-center">Subscribed successfully!</p>}
                                {subStatus === 'error' && <p className="text-red-400 text-xs mt-2 text-center">Failed to subscribe.</p>}
                            </form>
                        </div>
                    </div>

                    {/* Article Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 gap-8">
                            {gridArticles.map((article) => (
                                <a href={article.link} target="_blank" rel="noopener noreferrer" key={article.id} className="block group">
                                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col h-full group-hover:shadow-md transition-all duration-300 border border-transparent group-hover:border-navy/5">
                                        <div className="h-48 relative overflow-hidden bg-slate-100 flex items-center justify-center text-slate-500/50 text-sm">
                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-slate-900/5 transition-colors pointer-events-none" />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-bold text-red uppercase tracking-wider">{article.category}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-red transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-navy/60 text-sm leading-relaxed mb-4 flex-grow">
                                                {article.excerpt}
                                            </p>
                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                    <User size={14} className="text-slate-400" /> {article.author}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                                                    LinkedIn Post <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </a>
                            ))}
                        </div>

                        {filteredArticles.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                                No articles found in this category.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
