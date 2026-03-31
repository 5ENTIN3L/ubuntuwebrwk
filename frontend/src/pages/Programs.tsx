import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, X, Clock, ExternalLink, Image } from 'lucide-react';

// ─── TYPE ────────────────────────────────────────────────────────────────────
interface Speaker {
    name: string;
    title: string;
}

interface Program {
    id: string;
    title: string;
    subtitle?: string;
    category: 'Upcoming' | 'Ongoing' | 'Past';
    date: string;
    startDate?: string;      // ISO string — when reached, status becomes 'Ongoing'
    endDate?: string;        // ISO string — when passed, status becomes 'Past'
    time?: string;
    format?: string;
    location: string;
    moderator?: string;
    speakers?: Speaker[];
    excerpt: string;
    // Full overlay content
    background?: string;
    objectives?: string[];
    structure?: string[];
    themes?: { title: string; points: string[] }[];
    takeaways?: { group: string; points: string[] }[];
    outcomes?: string[];
    nextSteps?: string[];
    conclusion?: string;
    // Media — paste Google Drive direct-download image URLs here
    // Format: https://drive.google.com/uc?export=view&id=FILE_ID
    images?: string[];
    registerLink?: string;
    // When true the meeting/register link is hidden even if date hasn't passed
    linkExpired?: boolean;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const allPrograms: Program[] = [
    // ── UPCOMING (auto-archives after 31 Mar 2026 23:59 EAT) ──────────────────
    {
        id: 'privacy-webinar',
        title: 'Stop Selling Your Data for Free!',
        subtitle: 'Kenyan Youth Hack Privacy Like Pros',
        category: 'Upcoming',
        date: 'March 31, 2026',
        startDate: '2026-03-31T19:00:00+03:00',
        endDate: '2026-03-31T20:30:00+03:00',
        time: '7:00 PM – 8:30 PM EAT',
        format: 'Google Meet',
        location: 'Online',
        excerpt: 'Learn how to protect your personal info, avoid scams, and navigate social media safely — all while staying active online. Grounded in Ubuntu values, this youth-led session empowers you to take control of your digital life.',
        background: `Digital privacy is increasingly at risk for young Kenyans navigating a fast-moving online world. From social media platforms harvesting personal data to targeted scams and phishing attacks, many youth unknowingly expose themselves to serious privacy and security risks every day.\n\nThis session, grounded in Ubuntu values of shared responsibility and communal care, brings together youth voices to demystify data privacy, break down how your information is collected, and give you practical tools to protect yourself — without having to go offline.`,
        objectives: [
            'Understand how personal data is collected and monetized by online platforms.',
            'Identify common scams, phishing attacks, and data traps targeting Kenyan youth.',
            'Learn practical, accessible steps to protect your digital privacy.',
            'Explore how digital privacy connects to broader issues of justice and dignity.',
            'Empower youth to take informed, proactive control of their digital lives.',
        ],
        registerLink: 'https://forms.gle/N85pZXTnBMdG82Bw5',
        images: [
            '/images/posters/data_privacy_poster.jpeg'
        ],
    },

    // ── PAST: Ubuntu Nexus Dialogues Webinar 1 ────────────────────────────────
    {
        id: 'dialogues-webinar-1',
        title: 'Why Are We So Angry Online?',
        subtitle: 'Reclaiming Ubuntu in Digital Spaces',
        category: 'Past',
        date: 'January 28, 2026',
        time: '7:00 PM – 8:30 PM EAT',
        format: 'Google Meet',
        location: 'Online',
        moderator: 'Aisha Ibrahim',
        speakers: [
            { name: 'Justin Mureti', title: 'Creative & Content Producer, Podcaster' },
            { name: 'Sheryl Pheona', title: 'Medical Student' },
            { name: 'Okoth Opondo', title: 'Civic Educator & Lawyer' },
        ],
        excerpt: 'The inaugural Ubuntu Nexus Dialogues webinar explored why anger and hostility have become increasingly dominant in digital spaces — and how Ubuntu values can guide a more humane online culture.',
        background: `Digital spaces have become central to how young people in Kenya communicate, organize, learn, and engage in public life. Social media platforms increasingly function as arenas for civic participation, cultural exchange, identity formation, and political discourse. However, these same spaces are simultaneously marked by rising levels of anger, hostility, harassment, misinformation, and online pile-ons.\n\nDuring the dialogue, panelists and participants repeatedly emphasized that many young people experience social media as emotionally exhausting, unsafe, or psychologically draining, yet feel unable to disengage due to its centrality in social, professional, and civic life. Online anger was not framed as a youth-specific problem, but rather as a broader societal issue that becomes especially visible and amplified in digital spaces.\n\nThis inaugural session intentionally grounded discussions in Ubuntu values — empathy, interconnectedness, dignity, communal accountability, solidarity, and social justice — summarized in the principle "I am because we are."`,
        objectives: [
            'Deepen understanding of why anger and hostility appear more visible and intense online.',
            'Explore how digital harm affects youth mental health, confidence, participation, and trust.',
            'Examine the links between online harm, offline injustice, exclusion, and unmet social and political needs.',
            'Identify practical strategies young people can use to navigate and respond to harmful online interactions.',
            'Encourage intentional, justice-oriented use of digital platforms for dialogue, solidarity, and positive action.',
        ],
        structure: [
            'Introductory reflections from speakers',
            'Guided questions posed by the moderator',
            'Interactive audience engagement through chat responses',
            'Concluding reflections and practical takeaways',
        ],
        themes: [
            {
                title: 'The Visibility & Intensity of Anger Online',
                points: [
                    'Dehumanization of interaction: online interfaces create distance, making it easier to forget real people are on the receiving end.',
                    'Lack of immediate consequences: digital platforms often shield individuals from accountability, emboldening harsher behavior.',
                    'Projection and validation-seeking: many interactions are driven by the need to be right, to be seen, or to project unresolved frustrations.',
                    'Amplification through platform design: algorithms prioritize emotionally charged content, increasing the visibility of anger and outrage.',
                ],
            },
            {
                title: 'Desensitization & Emotional Fatigue',
                points: [
                    'Repeated exposure to disturbing content — violence, abuse, political unrest — dulls emotional responses while increasing underlying stress.',
                    'Even avoiding comment sections, simply witnessing harmful content can contribute to emotional exhaustion.',
                ],
            },
            {
                title: 'Online Anger as a Reflection of Offline Injustice',
                points: [
                    'Online anger is not created by social media itself, but amplified by it.',
                    'Digital hostility reflects political frustration, economic pressure, historical divisions, and feelings of exclusion.',
                    'For many youth, online platforms have become the only accessible civic space when offline participation feels unsafe or chaotic.',
                ],
            },
            {
                title: 'Impact of Digital Harm on Youth',
                points: [
                    'Mental and emotional well-being: anxiety, burnout, withdrawal, and emotional numbness.',
                    'Self-censorship: many young people silence themselves to avoid harassment or pile-ons.',
                    'Erosion of trust and weakened social cohesion.',
                    'Reduced civic participation out of fear of online attacks.',
                ],
            },
            {
                title: 'Ubuntu as a Framework for Digital Engagement',
                points: [
                    'Seeing the human being before the opinion, identity, or disagreement.',
                    'Recognizing interconnectedness and shared dignity.',
                    'Practicing empathy even in disagreement.',
                    'Emphasizing communal accountability rather than individual punishment alone.',
                ],
            },
        ],
        takeaways: [
            {
                group: 'For Young People',
                points: [
                    'Intentionally curate digital feeds to protect mental well-being.',
                    'Pause before responding; consider the humanity of the other person.',
                    'Distinguish between anger toward information and anger toward individuals.',
                    'Set digital boundaries without guilt.',
                ],
            },
            {
                group: 'For Communities & Organizations',
                points: [
                    'Create moderated spaces for constructive dialogue.',
                    'Normalize calling out harmful behavior while upholding dignity.',
                    'Promote storytelling and narratives rooted in justice and shared humanity.',
                ],
            },
            {
                group: 'For Systems & Policymakers',
                points: [
                    'Strengthen accountability mechanisms for online harm.',
                    'Invest in digital literacy and civic education.',
                    'Balance freedom of expression with protection from harassment and abuse.',
                ],
            },
        ],
        outcomes: [
            'Increased awareness of the deeper drivers of online anger.',
            'Honest reflection on the emotional and civic costs of digital harm.',
            'Practical strategies for healthier online engagement.',
            'Strong early-year visibility for Ubuntu Nexus and the Ubuntu Nexus Dialogues series.',
        ],
        nextSteps: [
            'Develop shareable social media content summarizing key insights.',
            'Produce a concise post-dialogue brief for wider dissemination.',
            'Continue the Ubuntu Nexus Dialogues series, expanding discussions on justice, youth agency, and peacebuilding.',
        ],
        images: [
            // Paste Google Drive direct image URLs here
        ],
    },

    // ── PAST: Wezesha Program ───────────────────────────────────────────────────
    {
        id: 'wezesha-mentorship',
        title: 'Wezesha Program',
        category: 'Past',
        date: 'October – December 2025',
        location: 'Kenya',
        excerpt: 'Wezesha, meaning "to empower", is an empowerment program by Ubuntu Nexus designed to create safe, engaging, and transformative spaces for young people to build confidence, discover their potential, and strengthen their connection to community.',
        background: `Wezesha, meaning "to empower", is an empowerment program by Ubuntu Nexus designed to create safe, engaging, and transformative spaces for young people to build confidence, discover their potential, and strengthen their connection to community. Rooted in Ubuntu values, the program emphasizes collective growth, peer support, and the development of socially conscious young people.\n\nThrough structured group sessions, mentorship, and experiential learning, participants engage in reflection, dialogue, and skill-building across communication, problem-solving, conflict resolution, and leadership, while cultivating a deeper sense of responsibility toward themselves and their communities.\n\nTwo phases of Wezesha have been completed. Preparations for phase 3 are currently underway.`,
        outcomes: [
            'Participants built measurable confidence and increased willingness to express ideas and take on active roles.',
            'Strengthened peer networks and mentorship relationships providing ongoing support, guidance, and accountability.',
            'Enhanced skills in communication, leadership, problem-solving, and interpersonal engagement.',
            'Growing participant awareness of and engagement with community-related issues and responsibilities.',
        ],
        images: [
            // Paste Google Drive direct image URLs here
        ],
    },
];

// ─── AUTO-ARCHIVE HELPER ──────────────────────────────────────────────────────
function resolveStatus(program: Program): 'Upcoming' | 'Ongoing' | 'Past' {
    if (program.category === 'Past') return 'Past';

    const now = new Date();

    // If it has explicitly passed the end limit
    if (program.endDate) {
        const end = new Date(program.endDate);
        if (now > end) return 'Past';
    }

    // If we are currently inside the active time window
    if (program.startDate) {
        const start = new Date(program.startDate);
        if (program.endDate) {
            const end = new Date(program.endDate);
            if (now >= start && now <= end) return 'Ongoing';
        } else {
            // No endDate, assume anything after startDate is ongoing
            if (now >= start) return 'Ongoing';
        }
    }

    // Fallback to programmed category (usually 'Upcoming')
    return program.category;
}

function isLinkActive(program: Program): boolean {
    if (program.linkExpired) return false;
    if (program.endDate) {
        const end = new Date(program.endDate);
        if (new Date() > end) return false;
    }
    return true;
}

// ─── OVERLAY CONTENT ──────────────────────────────────────────────────────────
const ProgramOverlay: React.FC<{ program: Program; onClose: () => void }> = ({ program, onClose }) => {
    const status = resolveStatus(program);
    const linkActive = isLinkActive(program);

    const statusStyle = {
        Upcoming: 'bg-green-100 text-green-700',
        Ongoing: 'bg-green-100 text-green-700',
        Past: 'bg-slate-100 text-slate-600',
    }[status];

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-navy/85 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Panel */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.2 } }}
                    className="bg-cream w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
                >
                    {/* Header bar */}
                    <div className="bg-navy px-8 py-6 flex items-start justify-between gap-4 flex-shrink-0">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${statusStyle}`}>
                                    {status}
                                </span>
                                {program.format && (
                                    <span className="text-white/50 text-xs">{program.format}</span>
                                )}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{program.title}</h2>
                            {program.subtitle && (
                                <p className="text-white/60 mt-1">{program.subtitle}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors mt-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Scrollable body */}
                    <div className="overflow-y-auto flex-1 px-6 md:px-10 py-8 space-y-10">

                        {/* Meta row */}
                        <div className="flex flex-wrap gap-6 text-sm text-navy/70">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red" />
                                <span>{program.date}</span>
                            </div>
                            {program.time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-red" />
                                    <span>{program.time}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red" />
                                <span>{program.location}</span>
                            </div>
                            {program.moderator && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-red" />
                                    <span>Moderated by {program.moderator}</span>
                                </div>
                            )}
                        </div>

                        {/* Register CTA — only if link is still active */}
                        {program.registerLink && linkActive && (
                            <a
                                href={program.registerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-red text-white font-bold rounded-xl hover:bg-red/90 transition-colors shadow-md"
                            >
                                Register Now <ExternalLink className="w-4 h-4" />
                            </a>
                        )}

                        {/* Speakers */}
                        {program.speakers && program.speakers.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-red" /> Speakers
                                </h3>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {program.speakers.map((s, i) => (
                                        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm mb-3">
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <p className="font-bold text-navy text-sm">{s.name}</p>
                                            <p className="text-navy/60 text-xs mt-1">{s.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Background */}
                        {program.background && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-3">About Wezesha</h3>
                                {program.background.split('\n\n').map((para, i) => (
                                    <p key={i} className="text-navy/70 leading-relaxed mb-4">{para}</p>
                                ))}
                            </div>
                        )}

                        {/* Objectives */}
                        {program.objectives && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4">Objectives</h3>
                                <ol className="space-y-2">
                                    {program.objectives.map((obj, i) => (
                                        <li key={i} className="flex gap-3 text-navy/70">
                                            <span className="w-6 h-6 rounded-full bg-red/10 text-red text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                            {obj}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {/* Structure */}
                        {program.structure && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4">Session Structure</h3>
                                <ul className="space-y-2">
                                    {program.structure.map((s, i) => (
                                        <li key={i} className="flex items-center gap-3 text-navy/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Key Themes */}
                        {program.themes && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-navy">Key Themes & Discussion Highlights</h3>
                                {program.themes.map((theme, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                        <h4 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">{theme.title}</h4>
                                        <ul className="space-y-2">
                                            {theme.points.map((p, j) => (
                                                <li key={j} className="flex gap-3 text-navy/70 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-navy/30 flex-shrink-0 mt-1.5" />
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Takeaways */}
                        {program.takeaways && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4">Practical Takeaways & Recommendations</h3>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {program.takeaways.map((t, i) => (
                                        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                            <p className="font-bold text-navy text-sm mb-3">{t.group}</p>
                                            <ul className="space-y-2">
                                                {t.points.map((p, j) => (
                                                    <li key={j} className="flex gap-2 text-navy/70 text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0 mt-1.5" />
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Outcomes */}
                        {program.outcomes && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4">Outcomes & Impact</h3>
                                <ul className="space-y-2">
                                    {program.outcomes.map((o, i) => (
                                        <li key={i} className="flex items-start gap-3 text-navy/70">
                                            <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                                            {o}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Next Steps */}
                        {program.nextSteps && (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4">Next Steps</h3>
                                <ul className="space-y-2">
                                    {program.nextSteps.map((s, i) => (
                                        <li key={i} className="flex items-start gap-3 text-navy/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-navy flex-shrink-0 mt-2" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Media Gallery */}
                        {program.images && program.images.length > 0 ? (
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                                    <Image className="w-5 h-5 text-red" /> Event Gallery
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {program.images.map((src, i) => (
                                        <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                                            <img src={src} alt={`${program.title} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {/* Conclusion spacer */}
                        <div className="pb-4" />
                    </div>
                </motion.div>
            </div>
        </>
    );
};

// ─── CARD ─────────────────────────────────────────────────────────────────────
const ProgramCard: React.FC<{ program: Program; variant: 'featured' | 'archive'; onClick: () => void }> = ({ program, variant, onClick }) => {
    const status = resolveStatus(program);
    const statusStyle = {
        Upcoming: 'text-green-700',
        Ongoing: 'text-green-700',
        Past: 'text-slate-500',
    }[status];

    if (variant === 'featured') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={onClick}
                className="bg-white rounded-3xl overflow-hidden shadow-sm group hover:shadow-xl transition-all border border-slate-100 flex flex-col sm:flex-row cursor-pointer"
            >
                <div
                    className={`sm:w-2/5 min-h-[200px] relative flex items-center justify-center bg-cover bg-center ${!(program.images && program.images[0]) ? 'bg-gradient-to-br from-navy/10 to-navy/5' : ''}`}
                    style={(program.images && program.images[0]) ? { backgroundImage: `url('${program.images[0]}')` } : {}}
                >
                    {!(program.images && program.images[0]) && <div className="text-navy/20 text-6xl font-black select-none">UN</div>}
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-bold uppercase tracking-wide ${statusStyle}`}>● {status}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-1 group-hover:text-red transition-colors">{program.title}</h3>
                    {program.subtitle && <p className="text-navy/50 text-sm mb-3">{program.subtitle}</p>}
                    <div className="space-y-1.5 mb-5">
                        <div className="flex items-center gap-2 text-sm text-slate-500"><Calendar className="w-4 h-4" /> {program.date}</div>
                        {program.time && <div className="flex items-center gap-2 text-sm text-slate-500"><Clock className="w-4 h-4" /> {program.time}</div>}
                        <div className="flex items-center gap-2 text-sm text-slate-500"><MapPin className="w-4 h-4" /> {program.location}</div>
                    </div>
                    <p className="text-navy/60 leading-relaxed text-sm mb-6">{program.excerpt}</p>
                    <button className="flex items-center gap-2 font-semibold text-navy group-hover:text-red transition-colors mt-auto w-fit text-sm">
                        View Full Details →
                    </button>
                </div>
            </motion.div>
        );
    }

    // archive card
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onClick}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 group cursor-pointer"
        >
            <div
                className={`h-36 rounded-xl mb-5 flex items-center justify-center bg-cover bg-center ${!(program.images && program.images[0]) ? 'bg-gradient-to-br from-slate-100 to-slate-200' : ''}`}
                style={(program.images && program.images[0]) ? { backgroundImage: `url('${program.images[0]}')` } : {}}
            >
                {!(program.images && program.images[0]) && <span className="text-slate-300 text-4xl font-black select-none">UN</span>}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                <Calendar className="w-3.5 h-3.5" /> {program.date}
            </div>
            <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-red transition-colors">{program.title}</h3>
            {program.subtitle && <p className="text-navy/50 text-xs mb-2">{program.subtitle}</p>}
            <p className="text-navy/60 text-sm leading-relaxed mb-4 line-clamp-3">{program.excerpt}</p>
            <button className="text-sm font-semibold text-navy group-hover:text-red transition-colors flex items-center gap-1">
                Read Full Report →
            </button>
        </motion.div>
    );
};

// ─── PAGE ──────────────────────────────────────────────────────────────────────
const Programs: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Resolve statuses dynamically using current date
    const upcoming = allPrograms.filter(p => resolveStatus(p) === 'Upcoming');
    const ongoing = allPrograms.filter(p => resolveStatus(p) === 'Ongoing');
    const past = allPrograms
        .filter(p => resolveStatus(p) === 'Past')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const activeUpcoming = [...upcoming, ...ongoing];
    const selectedProgram = allPrograms.find(p => p.id === selectedId) ?? null;

    return (
        <div className="bg-cream min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-navy mb-6"
                    >
                        Our Programs & Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-navy/70"
                    >
                        Discover our active engagements, join upcoming sessions, and explore the impact of our past initiatives.
                    </motion.p>
                </div>

                {/* Upcoming & Ongoing */}
                {activeUpcoming.length > 0 && (
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold text-navy mb-10 flex items-center gap-3">
                            <span className="w-2 h-8 bg-red rounded-full block" />
                            Upcoming & Ongoing
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {activeUpcoming.map(p => (
                                <ProgramCard key={p.id} program={p} variant="featured" onClick={() => setSelectedId(p.id)} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Events Archive */}
                {past.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-navy mb-10 flex items-center gap-3">
                            <span className="w-2 h-8 bg-navy rounded-full block" />
                            Past Events Archive
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {past.map(p => (
                                <ProgramCard key={p.id} program={p} variant="archive" onClick={() => setSelectedId(p.id)} />
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Overlay */}
            <AnimatePresence>
                {selectedProgram && (
                    <ProgramOverlay program={selectedProgram} onClose={() => setSelectedId(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Programs;
