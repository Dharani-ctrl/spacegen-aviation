'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlowingButton } from '@/components/animations/glowing-button';
import { TextReveal } from '@/components/animations/text-reveal';
import { ParallaxSection } from '@/components/animations/parallax-section';
import { ArrowRight, Zap, BookOpen, Cpu, Award, Plane } from 'lucide-react';

import { useState, useEffect } from 'react';

export function HeroSection() {
  const [content, setContent] = useState({
    title: 'Aviation Programme',
    subtitle: 'For School Students'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/hero`);
        if (response.ok) {
          const result = await response.json();
          setContent(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch hero content:', error);
      }
    };
    fetchContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const highlights = [
    {
      icon: BookOpen,
      badge: 'IIT EQUIVALENT',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-300',
      accentColor: 'bg-blue-500',
      title: 'IIT-Level Program',
      detail: "India's first aviation-focused IIT equivalent curriculum",
      gradient: 'from-blue-500 to-cyan-400',
      image: '/img2 (2).jpeg',
      imageAlt: 'Enthusiastic school students in a modern aviation classroom',
    },
    {
      icon: Cpu,
      badge: 'HANDS-ON',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-300',
      accentColor: 'bg-indigo-500',
      title: 'On-Campus Flying Sim',
      detail: 'Certified flying simulation labs on campus',
      gradient: 'from-indigo-500 to-blue-500',
      image: '/hero-flyingsim.png',
      imageAlt: 'Modern flight simulator cockpit interior',
    },
    {
      icon: Award,
      badge: 'CERTIFIED',
      badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-300',
      accentColor: 'bg-cyan-500',
      title: 'UAV / Drone / Rocket',
      detail: 'Conceptual and practical aerospace engineering',
      gradient: 'from-cyan-500 to-blue-400',
      image: '/img4.jpeg',
      imageAlt: 'Drone flying in clear blue sky with rocket launch',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-24 pb-12 sm:pt-32 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Soft decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none hidden lg:block" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-6">
            {/* SpaceGen Research Image */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-blue-50 group"
            >
              <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                {/* 
                  NOTE: Replace the src URL below with your actual video file path. 
                  Place your video (e.g., 'sample.mp4') in the 'public' folder 
                  and update the src to: src="/sample.mp4" 
                */}
                <video
                  src="kids.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                >
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-white text-xs font-bold uppercase tracking-widest">SpaceGen Aviation Research &amp; Development</p>
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 w-fit"
            >
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600">{"India's #1 Aviation Program"}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-black leading-tight text-balance uppercase text-gray-900">
                <TextReveal duration={1}>
                  {content.title}
                </TextReveal>
              </h1>
              <p className="text-lg sm:text-xl text-blue-600 max-w-lg leading-relaxed font-semibold">
                {content.subtitle}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <GlowingButton variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowingButton>
              </Link>
              <Link href="/programs">
                <GlowingButton variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                  Explore Programs
                </GlowingButton>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200"
            >
              {[
                { value: '1.6K+', label: 'Skilled Pilots', color: 'from-blue-600 to-cyan-600' },
                { value: '75', label: 'Aircraft', color: 'from-indigo-600 to-blue-600' },
                { value: '20+', label: 'Certifications', color: 'from-cyan-600 to-teal-600' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`space-y-1 ${idx === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <div className={`text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side — NEW Top Image + highlight cards */}
          <ParallaxSection offset={30}>
            <motion.div variants={itemVariants} className="space-y-6">

              {/* --- NEW RECTANGLE IMAGE AREA (Marked in your request) --- */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[21/9] sm:aspect-video group"
              >
                <img
                  src="/kids3.jpg"
                  alt="Aviation Tech"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2">
                    <Plane className="text-cyan-400 h-4 w-4" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">Next-Gen Aerospace Lab</span>
                  </div>
                </div>
              </motion.div>
              {/* --- END NEW IMAGE AREA --- */}

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">What you&apos;ll experience</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: `0 20px 40px -12px rgba(59,130,246, 0.25)`
                    }}
                    className="group relative bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 hover:border-white shadow-sm transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-auto sm:h-32"
                  >
                    <div className="relative w-full sm:w-32 h-48 sm:h-full flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* overlay gradient was tinting image even when not hovered; start transparent */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-center relative">
                      <div className={`absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${item.accentColor}`} />
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-opacity-50 ${item.badgeColor} backdrop-blur-sm`}>
                          {item.badge}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:rotate-6 transition-transform`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-normal mt-0.5 line-clamp-2">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center pr-4">
                      <div className={`p-1.5 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${item.accentColor} text-white`}>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">Limited Seats</p>
                    <p className="font-bold text-lg">Only 30 Spots Left</p>
                    <p className="text-sm text-blue-200 mt-0.5">This batch closes soon</p>
                  </div>
                  <Link href="/contact">
                    <button className="bg-white text-blue-600 font-bold text-sm px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                      Enroll →
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </ParallaxSection>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400 font-semibold">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-blue-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}