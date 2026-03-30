import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Lightbulb, Github, Linkedin } from 'lucide-react';

const About: React.FC = () => {
    const team = [
        {
            id: 'director',
            name: "Stacie Mwangi",
            role: "Founder & Executive Director",
            bio: "Visionary leader driving the core mission of Ubuntu Nexus with a deep commitment to youth empowerment and systemic justice.",
            fullBio: "Stacie Mwangi is the founder and driving force behind Ubuntu Nexus. With a deep commitment to youth empowerment, systemic justice, and community resilience, she channels her leadership into building an organization that amplifies marginalized voices and creates spaces where young people can lead meaningful change. She oversees strategic direction, partnerships, and organizational growth.",
            image: "/images/staff/stacie_mwangi.jpeg",
            socials: { linkedin: "https://www.linkedin.com/in/stacie-njoki-mwangi-697015250/" }
        },
        {
            id: 'programs',
            name: "Mercy Tania",
            role: "Programs Officer",
            bio: "Mercy Tania is the Programs Manager at Ubuntu and a dedicated advocate for social justice, peacebuilding, and community empowerment.",
            fullBio: "Mercy Tania is the Programs Manager at Ubuntu and a dedicated advocate for social justice, peacebuilding, and community empowerment. She holds a Bachelor's degree in Criminal Justice from United States International University - Africa (USIU-Africa), and is a certified mediator through Amani Communities Africa. Mercy brings a unique blend of grassroots engagement and strategic leadership, having worked with organizations such as Amnesty International Kenya where she led initiatives focused on youth development, human rights education, and sustainable peace.\n\nHer work spans mentorship of young girls through the Kibera Girls’ Scholarship Programme, facilitating civic engagement and restorative justice dialogues, and designing community-based programs that address systemic injustice. She has also served as a Human Rights and Peacebuilding Educator, equipping youth with knowledge and tools to drive positive change.\n\nMercy is trained in cybersecurity, youth leadership, and governance, and continues to use her interdisciplinary skills to bridge community needs with policy action. With a deep commitment to restorative justice and social transformation, she is passionate about building inclusive systems that uphold dignity, healing, and empowerment, especially for marginalized communities.",
            image: "/images/staff/mercy_tania.jpg",
            socials: { linkedin: "https://www.linkedin.com/in/mercytania/" }
        },
        {
            id: 'dev',
            name: "William Rui",
            role: "Digital Operations Lead",
            bio: "Software Engineer | Cybersecurity Specialist | Creative Technologist",
            fullBio: "William is a multi-disciplinary software engineer based in Nairobi, currently pursuing a Degree in Software Engineering alongside his CEH (Certified Ethical Hacker) certification. He approaches development with a security-first mindset, bridging the gap between robust backend systems and immersive digital experiences.\n\nAs a core lead for Ubuntu Nexus, William spearheads digital operations and creative systems, architecting the organization’s internal digital infrastructure. His work focuses on creating scalable, resilient platforms that streamline complex organizational workflows. His technical portfolio includes Project Nocturne—an AI-driven SIEM/EDR solution—and AidConnect, a web platform focused on humanitarian coordination.\n\nA vocal advocate for open-source tools, William often incorporates a distinct \"High-Tech Low-Life\" aesthetic into his technical work. He is particularly interested in developing gamified, interactive environments that challenge traditional web boundaries through puzzles and non-linear exploration, maintaining a commitment to technical transparency and functional art.",
            image: "/images/staff/william_rui.jpg",
            socials: { github: "https://github.com/5ENTIN3L", linkedin: "https://www.linkedin.com/in/5entinel/" }
        },
        {
            id: 'research',
            name: "Benjamin Kitonga",
            role: "Research Lead",
            bio: "Grounding Ubuntu Nexus's work in rigorous evidence, impact assessments, and policy-relevant analysis.",
            fullBio: "Benjamin Kitonga is the Research Lead at Ubuntu Nexus and a Master’s student in International Relations, with a background in International Relations and Criminal Justice. He is passionate about governance, diplomacy, and youth advocacy, with a focus on advancing inclusive institutions and meaningful youth participation across Africa.",
            image: "/images/staff/benjamin_kitonga.jpg",
            socials: { linkedin: "https://www.linkedin.com/in/benjamin-kitonga-9ab38824a/" }
        },
    ];

    const volunteers = [
        {
            id: 'vol-david',
            name: "David Diah",
            role: "Volunteer — Digital Operations",
            bio: "Software Engineer, builder, and entrepreneur. One of the volunteering members of Ubuntu Nexus and the mind behind multiple tech products solving real problems across East Africa.",
            fullBio: "David Diah is a Software Engineer, builder, and entrepreneur based in Nairobi. A final-year student at USIU-Africa, he turns ideas into products that actually matter — and is one of the volunteering members of Ubuntu Nexus.\n\nHe is the mind behind FarmConnect, GestureIQ (making sign language accessible, offline-first), and eMotion — a hiker-centric platform. He is also co-founder of Team Yadi and part of the crew at yadi.live, connecting people to events across Kenya and the UK. When he's not shipping code, he runs Dee's Prints or helps coordinate mountain climbs and wildlife safaris through his family's Tanzania travel agency.\n\nHis toolkit spans React, TypeScript, full-stack development, and Git workflows — but the real mission is building digital ecosystems that solve real problems across East Africa.\n\nCar enthusiast. Mountain trekker. Probably already planning the next summit.",
            image: "/images/staff/david_diah.jpeg",
            socials: { github: "https://github.com/DavidDiah23", linkedin: "https://www.linkedin.com/in/david-diah-ab0077255?utm_source=share_via&utm_content=profile&utm_medium=member_ios" }
        },
        {
            id: 'vol-lina',
            name: "Lina Mukashumbusho",
            role: "Volunteer — Digital Operations",
            bio: "Software engineering student with a passion for leveraging technology for social impact, community development, and youth empowerment.",
            fullBio: "Lina Mukashumbusho is a software engineering student with a strong interest in leveraging technology for social impact and community development. She is passionate about creating digital solutions that improve access to services, enhance communication, and support youth empowerment.\n\nShe is currently developing her skills in software and web development and is eager to contribute to mission-driven organizations working toward sustainable and inclusive development.",
            image: "",   // Add to public/images/staff/lina.jpg when available
            socials: { github: "https://github.com/lial03", linkedin: "https://www.linkedin.com/in/lina-mukashumbusho-6068b5188?utm_source=share_via&utm_content=profile&utm_medium=member_ios" }
        },
    ];

    const fsbMembers = [
        {
            id: 'fsb-1',
            name: "FSB Member 1",
            role: "Founding Strategic Board",
            bio: "Bringing strategic direction, partnerships, and organizational guidance.",
            fullBio: "Member of the Founding Strategic Board at Ubuntu Nexus. Works on outreach, helps with finding partners, funding, and provides general strategic advice.",
            image: "",
            socials: {}
        },
        {
            id: 'fsb-2',
            name: "FSB Member 2",
            role: "Founding Strategic Board",
            bio: "Bringing strategic direction, partnerships, and organizational guidance.",
            fullBio: "Member of the Founding Strategic Board at Ubuntu Nexus. Works on outreach, helps with finding partners, funding, and provides general strategic advice.",
            image: "",
            socials: {}
        }
    ];

    const [selectedId, setSelectedId] = useState<string | null>(null);

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
                                To strengthen youth and community agency by advancing inclusive justice, peacebuilding, and resilience through community engagement, learning, and systems-focused action rooted in the spirit of Ubuntu.
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
                                A unified world where shared humanity, inclusion, and dignity shape how communities live, govern, and thrive.
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                onClick={() => setSelectedId(member.id)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <div
                                    className={`h-80 w-full filter grayscale group-hover:grayscale-0 transition-all duration-500 relative ${member.image ? 'bg-slate-100' : 'bg-slate-200'
                                        }`}
                                >
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <span className="text-5xl font-bold opacity-20">{member.name.split(' ').map(n => n[0]).join('')}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
                                    <div className="text-red font-medium text-sm mb-4">{member.role}</div>
                                    <p className="text-navy/60 mb-6 text-sm leading-relaxed line-clamp-2">
                                        {member.bio}
                                    </p>

                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {(member.socials as Record<string, string>).github && (
                                            <a href={(member.socials as Record<string, string>).github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={18} /></a>
                                        )}
                                        {(member.socials as Record<string, string>).linkedin && (
                                            <a href={(member.socials as Record<string, string>).linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Fullscreen Overlay Modal */}
                    <AnimatePresence>
                        {selectedId && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedId(null)}
                                    className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 cursor-pointer"
                                />
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                                    {[...team, ...volunteers, ...fsbMembers].filter(m => m.id === selectedId).map(member => (
                                        <motion.div
                                            key={member.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row pointer-events-auto overflow-y-auto md:overflow-y-visible"
                                        >
                                            <div
                                                className={`md:w-2/5 h-64 md:h-auto relative ${member.image ? 'bg-slate-100' : 'bg-navy/10'
                                                    }`}
                                            >
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-7xl font-black text-navy/20">{member.name.split(' ').map(n => n[0]).join('')}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                                                <button
                                                    onClick={() => setSelectedId(null)}
                                                    className="absolute top-4 right-4 text-slate-400 hover:text-navy bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                                >
                                                    ✕
                                                </button>
                                                <h3 className="text-3xl md:text-4xl font-bold text-navy mb-2">{member.name}</h3>
                                                <div className="text-red font-bold tracking-wide uppercase text-sm mb-6">{member.role}</div>
                                                <div className="text-navy/70 text-base leading-relaxed mb-10 space-y-4 overflow-y-auto max-h-[40vh] md:max-h-none pr-1">
                                                    {member.fullBio.split('\n\n').map((para, i) => (
                                                        <p key={i}>{para}</p>
                                                    ))}
                                                </div>
                                                <div className="flex gap-6 mt-auto">
                                                    {(member.socials as Record<string, string>).github && (
                                                        <a href={(member.socials as Record<string, string>).github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={24} /></a>
                                                    )}
                                                    {(member.socials as Record<string, string>).linkedin && (
                                                        <a href={(member.socials as Record<string, string>).linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </AnimatePresence>
                    {/* Volunteers */}
                    <div className="mt-20 pt-16 border-t border-slate-100">
                        <div className="mb-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Volunteers</h3>
                            <p className="text-slate-500 text-sm">Community members contributing their skills to our mission. Click a card to learn more.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {volunteers.map((vol, idx) => (
                                <motion.div
                                    key={vol.id}
                                    onClick={() => setSelectedId(vol.id)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
                                >
                                    {/* Volunteer badge strip */}
                                    <div className="h-1.5 w-full bg-gradient-to-r from-navy/30 to-navy/10" />
                                    <div
                                        className={`h-52 w-full relative flex items-center justify-center ${vol.image ? 'bg-slate-100' : 'bg-slate-50'
                                            } filter grayscale group-hover:grayscale-0 transition-all duration-500`}
                                    >
                                        {vol.image ? (
                                            <img src={vol.image} alt={vol.name} className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <span className="text-5xl font-black text-navy/15 select-none">{vol.name.split(' ').map((n: string) => n[0]).join('')}</span>
                                        )}
                                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="p-5">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-1">Volunteer</div>
                                        <h4 className="font-bold text-navy text-base">{vol.name}</h4>
                                        <p className="text-xs text-red font-medium mb-2">{vol.role}</p>
                                        <p className="text-navy/60 text-xs leading-relaxed line-clamp-2">{vol.bio}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Founding Strategic Board (FSB) */}
                    <div className="mt-20 pt-16 border-t border-slate-100">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Founding Strategic Board</h3>
                            <p className="text-slate-500 text-sm">Working on outreach, partnerships, funding, and general advice.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {fsbMembers.map((fsb, idx) => (
                                <motion.div
                                    key={fsb.id}
                                    onClick={() => setSelectedId(fsb.id)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col sm:flex-row"
                                >
                                    <div
                                        className={`w-full sm:w-2/5 h-48 sm:h-auto relative flex items-center justify-center ${
                                            fsb.image ? 'bg-slate-100' : 'bg-slate-50'
                                        } filter grayscale group-hover:grayscale-0 transition-all duration-500`}
                                    >
                                        {fsb.image ? (
                                            <img src={fsb.image} alt={fsb.name} className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <span className="text-5xl font-black text-navy/15 select-none">{fsb.name.split(' ').map((n: string) => n[0]).join('')}</span>
                                        )}
                                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="p-6 sm:w-3/5 flex flex-col justify-center relative">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-1">FSB</div>
                                        <h4 className="font-bold text-navy text-xl mb-1">{fsb.name}</h4>
                                        <p className="text-xs text-red font-medium mb-3">{fsb.role}</p>
                                        <p className="text-navy/60 text-sm leading-relaxed line-clamp-3">{fsb.bio}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Paradigm / Our Story */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">How We Understand Our Work</h2>
                    <div className="prose prose-lg mx-auto text-slate-600">
                        <p>
                            Ubuntu Nexus is grounded in the understanding that:
                            <strong> Many of the challenges young people and their communities face are systemic and relational.</strong>
                        </p>
                        <p className="mt-4">
                            Violence, exclusion, mistrust, digital harm, unemployment, disengagement, and marginalization are not individual failures. They are systemic and relational challenges with far-reaching human and societal consequences. Justice and peace, in our view, are not starting points. They are outcomes of inclusive education, meaningful participation, accountable systems, social cohesion, and empowered communities.
                        </p>
                        <p className="mt-6 text-xl font-medium text-navy">
                            "Ubuntu Nexus is a youth-led organization building inclusive, resilient communities by strengthening people, relationships, and systems — together."
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
