'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const INITIAL_COUNT = 6;

export function GallerySection() {
    const [showAll, setShowAll] = useState(false);
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/gallery`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data) {
                        setContent(result.data);
                    }
                }
            } catch (error) {
                console.error('Gallery fetch error:', error);
            }
        };
        fetchContent();
    }, []);

    const galleryImages = content?.images || [];
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
                        {content?.title?.split(' ')[0] || 'OUR'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{content?.title?.split(' ').slice(1).join(' ') || 'GALLERY'}</span>
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
                        {content?.subtitle || 'Take a look at our amazing students and aircraft!'}
                    </motion.p>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedImages.map((image: any, index: number) => (
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
