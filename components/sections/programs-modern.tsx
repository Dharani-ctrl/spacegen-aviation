'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Rocket, Plane, Trophy, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

export function ProgramsSection() {
  const [content, setContent] = useState({
    title: 'Aviation Adventure',
    subtitle: 'Join the most exciting aviation school for kids and future pilots!',
    programs: [
      {
        level: 'Level 1',
        title: 'Foundation Program',
        subtitle: 'Perfect for beginners',
        duration: '40 Hours',
        target: 'Class 4th - 12th',
        price: '₹15,000',
        features: [
          'Fun Pilot Training Games!',
          'Exciting In-Person Labs',
          'Wings of Wonder Program',
          'Fly a Simulator & Build Engines!',
          'Awesome Field Trips & Paragliding!',
        ],
        iconName: 'Rocket',
        gradient: 'from-blue-500/10 to-cyan-500/10',
        accentColor: 'bg-blue-600',
        borderColor: 'border-blue-200',
        glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
      },
      {
        level: 'Level 2',
        title: 'Advanced Program',
        subtitle: "Fully trained student pilot",
        duration: '80 Hours',
        target: 'Class 12th & Above',
        price: '₹35,000',
        features: [
          'Become a Young Pilot Expert!',
          'Learn from Real Engineers!',
          'Fly Your Own Drones (UAVs)!',
          'Get Your Own Aviation Kit!',
          'Professional Industry Certification',
        ],
        iconName: 'Plane',
        gradient: 'from-indigo-500/10 to-purple-500/10',
        accentColor: 'bg-indigo-600',
        borderColor: 'border-indigo-200',
        featured: true,
        glow: 'shadow-[0_0_40px_rgba(99,102,241,0.2)]',
      },
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/programs`);
        if (response.ok) {
          const result = await response.json();
          setContent(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch programs content:', error);
      }
    };
    fetchContent();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Rocket': return Rocket;
      case 'Plane': return Plane;
      case 'Trophy': return Trophy;
      case 'Star': return Star;
      default: return Rocket;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  const programs = [
    {
      level: 'Level 1',
      title: 'Foundation Program',
      subtitle: 'Perfect for beginners',
      duration: '40 Hours',
      target: 'Class 4th - 12th',
      price: '₹15,000',
      features: [
        'Fun Pilot Training Games!',
        'Exciting In-Person Labs',
        'Wings of Wonder Program',
        'Fly a Simulator & Build Engines!',
        'Awesome Field Trips & Paragliding!',
      ],
      icon: Rocket,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      accentColor: 'bg-blue-600',
      borderColor: 'border-blue-200',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    },
    {
      level: 'Level 2',
      title: 'Advanced Program',
      subtitle: "Fully trained student pilot",
      duration: '80 Hours',
      target: 'Class 12th & Above',
      price: '₹35,000',
      features: [
        'Become a Young Pilot Expert!',
        'Learn from Real Engineers!',
        'Fly Your Own Drones (UAVs)!',
        'Get Your Own Aviation Kit!',
        'Professional Industry Certification',
      ],
      icon: Plane,
      gradient: 'from-indigo-500/10 to-purple-500/10',
      accentColor: 'bg-indigo-600',
      borderColor: 'border-indigo-200',
      featured: true,
      glow: 'shadow-[0_0_40px_rgba(99,102,241,0.2)]',
    },
  ];

  // Floating stars animation helper
  const floatingStars = [
    { size: 4, top: '10%', left: '5%', delay: 0 },
    { size: 6, top: '40%', left: '15%', delay: 1 },
    { size: 3, top: '80%', left: '10%', delay: 2 },
    { size: 5, top: '20%', right: '5%', delay: 0.5 },
    { size: 7, top: '60%', right: '15%', delay: 1.5 },
    { size: 4, bottom: '10%', right: '10%', delay: 2.5 },
  ];

  return (
    <section id="programs" className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Space Gravity Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-60" />

        {/* Floating Stars/Particles */}
        {floatingStars.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: star.delay
            }}
            className="absolute rounded-full bg-blue-300/30"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              right: star.right,
              bottom: star.bottom
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <Trophy className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-black text-blue-600 uppercase tracking-widest">Enroll in Your Future</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 text-balance mb-6 uppercase">
            Start Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}
              {content.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed font-bold">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {(content.programs || []).map((program: any, idx: number) => {
            const Icon = getIcon(program.iconName || 'Rocket');
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                animate={{
                  y: [0, -12, 0],
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 4 + idx,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.5
                }}
                className={`group relative transition-all duration-300 h-full ${program.featured ? 'md:order-2' : 'md:order-1'
                  }`}
              >
                {/* Space Glow behind card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient || 'from-blue-500/10 to-cyan-500/10'} rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                <Card className={`relative h-full border-none rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl border border-white/40 ring-1 ring-black/5 hover:ring-blue-400/30 transition-all duration-500 ${program.featured
                  ? 'bg-gradient-to-br from-white/80 to-indigo-50/40'
                  : 'bg-gradient-to-br from-white/80 to-blue-50/40'
                  } ${program.glow || ''}`}>
                  {program.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-bl-[2rem] text-xs font-black tracking-widest shadow-lg z-20">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-10 space-y-8 h-full flex flex-col relative">
                    {/* Header Section */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className={`text-[10px] font-black py-1 px-3 rounded-full text-white uppercase tracking-widest shadow-md ${program.accentColor || 'bg-blue-600'}`}>
                          {program.level}
                        </span>
                        <h3 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight pt-2">
                          {program.title}
                        </h3>
                        <p className="text-sm font-bold text-gray-500 italic">
                          {program.subtitle}
                        </p>
                      </div>
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${(program.gradient || 'from-blue-500 to-cyan-500').replace('/10', '')} flex items-center justify-center text-white flex-shrink-0 shadow-2xl group-hover:rotate-12 transition-transform duration-500`}>
                        <Icon strokeWidth={2.5} className="h-8 w-8" />
                      </div>
                    </div>

                    {/* Stats strip - Premium Look */}
                    <div className="flex items-center justify-between py-6 border-y border-gray-100/50">
                      <div className="text-center px-2">
                        <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Time</p>
                        <p className="text-sm font-black text-gray-800 tracking-tight">{program.duration}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-100" />
                      <div className="text-center px-2">
                        <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Level</p>
                        <p className="text-sm font-black text-gray-800 tracking-tight">{program.target.replace(' Grads', '')}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-100" />
                      <div className="text-center px-2">
                        <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Price</p>
                        <p className={`text-sm font-black tracking-tight ${program.featured ? 'text-blue-600' : 'text-gray-800'}`}>{program.price}</p>
                      </div>
                    </div>

                    {/* Feature Checklist */}
                    <div className="flex-grow space-y-4">
                      {(program.features || []).map((feature: string, fidx: number) => (
                        <div key={fidx} className="flex items-center gap-4 group/item">
                          <div className={`h-2 w-2 rounded-full transition-all duration-300 group-hover/item:scale-150 ${program.accentColor || 'bg-blue-600'}`} />
                          <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors tracking-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Enrollment CTA */}
                    <Link href="/contact" className="block pt-2">
                      <button
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${program.featured
                          ? 'bg-gray-900 text-white shadow-xl hover:bg-black hover:shadow-indigo-500/20'
                          : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        Enroll Path
                        <ArrowRight className="h-4 w-4 stroke-[3]" />
                      </button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Text */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-4">
            Not sure which program is right for you?
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border border-blue-300 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md transition-all">
              Talk to Our Counselors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
