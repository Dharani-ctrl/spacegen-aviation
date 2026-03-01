'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const INITIAL_COUNT = 6;

const galleryImages = [
    { url: '/img9.jpg', title: 'Flight Training', description: 'Expert instruction in modern aircraft.' },
    { url: '/img14.jpg', title: 'Aviation Academy', description: 'Learn to fly with state-of-the-art facilities.' },
    { url: '/img15.jpg', title: 'Modern Fleet', description: 'Training with the latest aviation technology.' },
    { url: '/img16.jpeg', title: 'Cockpit View', description: 'Hands-on experience in high-performance aircraft.' },
    { url: '/img17.jpeg', title: 'Aerodynamics', description: 'Explore the science of flight.' },
    { url: '/img18.jpeg', title: 'Graduation Day', description: 'Celebrating the success of our students.' },
    { url: '/img19.jpeg', title: 'Advanced Simulator', description: 'Practicing complex maneuvers safely.' },
    { url: '/img20.jpeg', title: 'Maintenance Hangar', description: 'Keeping our fleet in top condition.' },
    { url: '/img21.jpeg', title: 'Pilot Briefing', description: 'Preparation for every training flight.' },
    { url: '/img22.jpeg', title: 'Solo Flight', description: 'A major milestone in every pilot\'s journey.' },
    { url: '/img23.jpeg', title: 'Aerial Photography', description: 'Stunning views from above.' },
    { url: '/img24.jpeg', title: 'Night Training', description: 'Learning the skills for 24/7 operations.' },
    { url: '/img25.jpeg', title: 'Cross-Country Navigation', description: 'Flying to new horizons.' },
    { url: '/img26.jpeg', title: 'Aviation Theory', description: 'Mastering the principles of flight.' },
    { url: '/img27.jpeg', title: 'Safety First', description: 'Rigorous safety standards and training.' },
    { url: '/img28.jpeg', title: 'Student Community', description: 'Building friendships that last a lifetime.' },
    { url: '/img29.jpeg', title: 'Career Guidance', description: 'Preparing for a professional airline career.' },
    { url: '/img30.jpeg', title: 'Engine Inspection', description: 'Understanding aircraft systems.' },
    { url: '/img31.jpeg', title: 'ATC Communication', description: 'Mastering radio procedures.' },
    { url: '/img32.jpeg', title: 'Meteorology', description: 'Understanding weather for safe flying.' },
    { url: '/img33.jpeg', title: 'Flight Planning', description: 'Precise preparation for every mission.' },
    { url: '/img34.jpeg', title: 'Helicopter Training', description: 'Versatile pilot training options.' },
    { url: '/img35.jpeg', title: 'Global Aviation', description: 'Connecting with the world of flight.' },
    { url: '/img36.jpeg', title: 'Innovation in Flight', description: 'Exploring the future of aviation.' },
    { url: '/img37.jpeg', title: 'Aviation Leadership', description: 'Training the next generation of commanders.' },
    { url: '/img38.jpeg', title: 'Precision Landing', description: 'Developing expert handling skills.' },
    { url: '/img39.jpeg', title: 'Instrument Rating', description: 'Mastering flight by reference to instruments.' },
    { url: '/img40.jpeg', title: 'Academy Campus', description: 'Our beautiful location for learning.' },
    { url: '/img41.jpeg', title: 'Passion for Flight', description: 'Where dreams take to the skies.' },
    { url: '/img2 (2).jpeg', title: 'Inauguration', description: 'The beginning of excellence.' },
];

export function GallerySection() {
    const [showAll, setShowAll] = useState(false);
    const displayedImages = showAll ? galleryImages : galleryImages.slice(0, INITIAL_COUNT);

    return (
        <section id="gallery" className="relative py-24 overflow-hidden bg-white">
            {/* Soft Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring" }}
                        viewport={{ once: true }}
                        className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
                    >
                        OUR SPACE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">ADVENTURES</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full shadow-sm"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto mt-6 text-lg text-slate-600 font-medium"
                    >
                        Check out our amazing students and cool aircraft in action! See what it&apos;s like to be part of the SpaceGen family.
                    </motion.p>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedImages.map((image, index) => (
                            <motion.div
                                key={image.url}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                    y: { type: "spring", stiffness: 300, damping: 20 }
                                }}
                                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-100 transition-shadow duration-500"
                            >
                                <Image
                                    src={image.url}
                                    alt={image.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />

                                {/* Modern Soft Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col justify-end p-8">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                                        <p className="text-sm text-cyan-300 font-medium tracking-wide uppercase">{image.description}</p>
                                        <div className="mt-4 h-1 w-12 bg-cyan-500 rounded-full" />
                                    </motion.div>
                                </div>

                                {/* Inner Bevel Light Effect */}
                                <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-3xl z-20" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group relative inline-flex items-center gap-2 px-10 py-4 bg-slate-950 text-white font-bold rounded-2xl overflow-hidden active:scale-95 transition-all shadow-lg hover:shadow-blue-500/20"
                    >
                        <span className="relative z-10">{showAll ? 'SHOW LESS' : 'EXPLORE FULL GALLERY'}</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <svg
                            className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
