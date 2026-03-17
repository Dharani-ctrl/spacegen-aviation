'use client';

import { Star, Lightbulb, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

export function AboutSection() {
  const [content, setContent] = useState({
    title: 'About SpaceGen',
    description: 'SpaceGen Aviation stands at the forefront of the global aviation industry...',
    description2: 'With a fleet of 75 aircraft, our training programs...'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/about`);
        if (response.ok) {
          const result = await response.json();
          setContent(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch about content:', error);
      }
    };
    fetchContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  const highlights = [
    {
      icon: Star,
      title: 'World-Class Training',
      description: 'Expert instructors with international aviation experience',
      gradient: 'from-blue-500 to-blue-700',
      badge: 'EXCELLENCE',
      badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
      image: '/img5.jpeg',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Cutting-edge simulators and aerospace technology labs',
      gradient: 'from-indigo-500 to-blue-600',
      badge: 'TECHNOLOGY',
      badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=95&w=600&h=300',
    },
    {
      icon: Target,
      title: 'Career Ready',
      description: 'Certified programs recognized globally',
      gradient: 'from-cyan-500 to-blue-600',
      badge: 'CERTIFIED',
      badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=95&w=600&h=300',
    },
    {
      icon: Zap,
      title: 'Hands-On Learning',
      description: 'Real flying experience with professional pilots',
      gradient: 'from-blue-600 to-indigo-700',
      badge: 'PRACTICAL',
      badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
      image: '/img6.jpeg',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">WHY CHOOSE SPACEGEN</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 text-balance mb-6 uppercase">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed text-left">
            {content.description}
          </p>
          {content.description2 && (
            <p className="text-xl text-gray-600 leading-relaxed text-left mt-4">
              {content.description2}
            </p>
          )}
        </div>

        {/* Highlight Cards — Modern Image Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.2)'
                }}
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Strip (Top) */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60`} />

                  {/* Floating Badge over image */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-md bg-white/90 shadow-sm uppercase tracking-widest ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon Badge anchored on image border */}
                  <div className={`absolute -bottom-5 left-6 h-10 w-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg border-2 border-white z-10 transition-transform group-hover:rotate-12`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content (Bottom) */}
                <div className="p-6 pt-8 flex flex-col flex-1">
                  <h3 className="text-base font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Decorative bottom bar */}
                <div className={`h-1.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${item.gradient}`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3 uppercase">SpaceGen Academy In India</h3>
              <p className="text-gray-600 leading-relaxed">
                With a vision to make a difference nationally in a sustainable manner, by creating and distributing world class programmes that significantly impact the mental and physical potential of children.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                {
                  color: 'bg-blue-600',
                  border: 'border-blue-100',
                  label: 'In-SPACE Certified',
                  detail: 'Official Indian National Space Promotion Association recognition',
                  badge: 'CERTIFIED',
                  badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
                },
                {
                  color: 'bg-indigo-600',
                  border: 'border-indigo-100',
                  label: 'Authorised Dealers',
                  detail: 'of Aero East serbian EX1 Italy/AK1-3 Helicopter and all aviation products.',
                  badge: 'OFFICIAL',
                  badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
                },
                {
                  color: 'bg-cyan-600',
                  border: 'border-cyan-100',
                  label: 'Aerospace Manufacturing',
                  detail: 'NOSE CONE assembly, Payload fairing for Large space launch Vehicles, Composite/metallic manufacturing.',
                  badge: 'ADVANCED',
                  badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`flex gap-4 p-4 rounded-xl bg-white border ${item.border} shadow-sm transition-all`}
                >
                  <div className={`h-2 w-2 rounded-full ${item.color} mt-2 flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm uppercase">{item.label}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 lg:pl-10"
          >
            {/* New HD Hero Image with Achievement Badge */}
            <motion.div variants={itemVariants} className="relative group mb-8">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-blue-50 bg-blue-50/30">
                <img
                  src="/img7.jpeg"
                  alt="Aviation research and training at SpaceGen"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-1000"
                />

                {/* Floating Achievement Badge */}
                <div className="absolute top-6 right-6 backdrop-blur-md bg-white/90 border border-blue-100 rounded-2xl p-4 shadow-xl hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mb-1">Trusted By</p>
                      <p className="text-xl font-black text-gray-900 leading-none">1,600+ <span className="text-sm font-bold">Pilots</span></p>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/60 to-transparent p-6">
                  <p className="text-white/90 text-sm font-medium italic">"Empowering the next generation of aerospace leaders."</p>
                </div>
              </div>

              {/* Decorative Background Orbs */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />
            </motion.div>

            {/* Stat cards — Foundation Program card style */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-blue-200 p-8 shadow-sm transition-all"
            >
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">ACHIEVEMENT</span>
              <p className="text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mt-4">1,600+</p>
              <p className="text-lg font-black text-gray-900 mt-2 uppercase tracking-tight">Skilled Pilots Trained</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">Contributing to global aviation excellence</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-sm transition-all"
              >
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">FLEET</span>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mt-3">75</p>
                <p className="text-sm font-black text-gray-900 mt-1 uppercase tracking-tight">Aircraft Fleet</p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-cyan-200 p-6 shadow-sm transition-all"
              >
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">LEGACY</span>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mt-3">25+</p>
                <p className="text-sm font-black text-gray-900 mt-1 uppercase tracking-tight">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
