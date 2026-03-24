import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Calendar, User, ArrowRight } from 'lucide-react';

const Insights: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Social Justice', 'Education', 'Restorative Justice', 'Community Stories'];

    const articles = [
        {
            id: 1,
            title: "Understanding Root Causes of Conflict",
            category: "Social Justice",
            author: "Program Director",
            date: "Oct 24, 2023",
            image: "bg-blue-100",
            excerpt: "Why punitive measures fail and how community-led interventions create lasting safety."
        },
        {
            id: 2,
            title: "Peace Education in Schools",
            category: "Education",
            author: "Community Lead",
            date: "Nov 12, 2023",
            image: "bg-cyan-100",
            excerpt: "Building a culture of peace early: How our mentorship programs are transforming youth mindsets."
        },
        {
            id: 3,
            title: "The Power of Restorative Circles",
            category: "Restorative Justice",
            author: "Restoration Specialist",
            date: "Dec 05, 2023",
            image: "bg-purple-100",
            excerpt: "A look at how facilitated dialogue helps heal relationships and reintegrate offenders."
        },
        {
            id: 4,
            title: "Community Safety: Beyond Policing",
            category: "Community Stories",
            author: "Program Director",
            date: "Jan 15, 2024",
            image: "bg-emerald-100",
            excerpt: "Strategies for local protection and trust-building that rely on community solidarity."
        }
    ];

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

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
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid md:grid-cols-2"
                    >
                        <div className="bg-slate-200 min-h-[300px] md:min-h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">Featured Image</div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-red/10 text-red rounded-full text-xs font-bold uppercase tracking-wide">Featured</span>
                                <span className="text-navy/50 text-sm flex items-center gap-1"><Calendar size={14} /> Oct 24, 2023</span>
                            </div>
                            <h2 className="text-3xl font-bold text-navy mb-4 group-hover:text-red transition-colors">
                                Understanding Root Causes of Conflict
                            </h2>
                            <p className="text-navy/70 mb-8 leading-relaxed">
                                Why do we see cycles of violence in our communities? We explore the systemic issues—unemployment, exclusion, and trauma—and how we can address them together.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-300" />
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Author Name</div>
                                    <div className="text-xs text-slate-500">Lead Researcher</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

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

                            <div className="bg-navy text-white p-6 rounded-2xl">
                                <h3 className="font-bold mb-2">Subscribe</h3>
                                <p className="text-white/60 text-sm mb-4">Get the latest insights delivered to your inbox.</p>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 bg-navy/50 border border-white/10 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-yellow outline-none text-white"
                                />
                                <button className="w-full py-2 bg-red hover:bg-red/90 rounded-lg text-sm font-medium transition-colors">
                                    Join Newsletter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Article Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 gap-8">
                            {filteredArticles.map((article) => (
                                <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                                    <div className={`h-48 ${article.image} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-semibold text-red uppercase tracking-wider">{article.category}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-red transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-navy/60 text-sm leading-relaxed mb-4 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <User size={14} /> {article.author}
                                            </div>
                                            <a href="#" className="flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                                                Read <ArrowRight size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </article>
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
