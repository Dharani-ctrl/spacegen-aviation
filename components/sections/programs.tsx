'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Clock, Star, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Programs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      duration: '40 hours',
      ageGroup: 'Class 4th to 12th',
      icon: '🚀',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      highlights: [
        'Engaging and conceptual pilot training',
        'Focused specialized sessions',
        '20 hrs hands-on sessions',
        'Flight simulations & aircraft sighting',
        'Comprehensive specialized curriculum',
      ],
    },
    {
      level: 'Level 2',
      title: 'Advanced Program',
      duration: '60+ hours',
      ageGroup: 'Class 12th & above',
      icon: '✈️',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      highlights: [
        'Advanced flight simulation mastery',
        '40+ hrs specialized sessions',
        '20+ hrs hands-on training',
        'UAV/Drone/Rocket pilot certification',
        'Industry-recognized credentials',
      ],
      featured: true,
    },
  ]

  return (
    <section id="programs" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -ml-64 -mb-32" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-2">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Our Programs</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}
              Flight Path
            </span>
          </h3>
          <p className="text-xl text-gray-600 font-medium font-sans">
            Tailored aviation excellence for every stage of your career journey.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:gap-10 md:grid-cols-2 max-w-5xl mx-auto"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              {program.featured && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition-opacity" />
              )}
              <Card
                className={`relative p-8 md:p-10 h-full flex flex-col border border-gray-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm transition-all duration-500 overflow-hidden ${program.featured
                    ? 'bg-gradient-to-br from-white to-indigo-50/50 border-blue-200'
                    : 'bg-gradient-to-br from-white to-blue-50/50 hover:border-blue-100'
                  } group-hover:shadow-2xl group-hover:-translate-y-2`}
              >
                {program.featured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-bl-[2rem] text-[10px] font-black tracking-widest uppercase">
                    Most Popular
                  </div>
                )}

                <div className="space-y-8 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`text-xs font-black mb-2 uppercase tracking-widest ${program.color}`}>{program.level}</div>
                      <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Time</p>
                      <h4 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{program.title}</h4>
                    </div>
                    <div className={`text-4xl p-4 rounded-2xl ${program.bgColor} shadow-sm group-hover:rotate-12 transition-transform`}>
                      {program.icon}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 font-bold text-gray-500">
                      <Clock size={18} className="text-blue-600" />
                      {program.duration}
                    </div>
                    <div className="flex items-center gap-2 font-bold text-gray-500">
                      <Users size={18} className="text-blue-600" />
                      {program.ageGroup}
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <p className="font-black text-[10px] uppercase tracking-widest text-gray-400">Program Highlights</p>
                    <ul className="space-y-3">
                      {program.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-4 group/item">
                          <CheckCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 font-bold tracking-tight group-hover/item:text-gray-900 transition-colors">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-10">
                  <Button
                    className={`w-full py-8 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-[0.98] ${program.featured
                      ? 'bg-gray-900 text-white hover:bg-black shadow-xl hover:shadow-indigo-200'
                      : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Age Requirements - Premium Light Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-[2rem] p-10 md:p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-600" />
          <h4 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight text-gray-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shadow-sm transition-transform group-hover:scale-110">📋</span>
            Right Age to Start
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-transparent hover:border-blue-100 transition-all">
              <span className="font-bold text-gray-700">Level 1 - Foundation</span>
              <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Class 4th - 12th</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-transparent hover:border-blue-100 transition-all">
              <span className="font-bold text-gray-700">Level 2 - Advanced</span>
              <span className="text-indigo-600 font-black text-sm uppercase tracking-widest">Class 12th & Above</span>
            </div>
            <p className="text-sm text-blue-600 font-black pt-4 uppercase tracking-[0.1em] text-center border-t border-gray-50 italic">
              Fully trained for student pilot license upon completion
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
