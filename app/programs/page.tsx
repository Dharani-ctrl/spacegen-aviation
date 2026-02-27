'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Star, Users, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const programs = [
  {
    level: 'Level 1',
    title: 'Foundation Program',
    duration: '40 hours',
    ageGroup: 'Class 4th to 12th',
    price: '₹35,000 - ₹45,000',
    description: 'Perfect for beginners, this foundation program introduces students to aviation concepts and basic flying simulation.',
    highlights: [
      'Engaging and conceptual pilot training',
      '20 hrs hands-on sessions',
      '20 hrs online classes',
      'Flight simulations',
      'Child-friendly curriculum',
      'In-SPACE certified',
      'Student pilot license track',
    ],
    modules: 21,
    cta: 'Enroll in Level 1',
  },
  {
    level: 'Level 2',
    title: 'Advanced Program',
    duration: '60+ hours',
    ageGroup: 'Class 12th & above',
    price: '₹55,000 - ₹75,000',
    description: 'Advanced program for serious aviation enthusiasts ready for professional certification.',
    highlights: [
      'Advanced flight simulation mastery',
      '40+ hrs online sessions',
      '20+ hrs hands-on training',
      'UAV/Drone design and operation',
      'Rocket technology concepts',
      'Industry-recognized credentials',
      'Student pilot license certification',
    ],
    modules: 21,
    cta: 'Enroll in Level 2',
    featured: true,
  },
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 space-y-20">
          {/* Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-2">
              <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
              <span className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest">Aviation Excellence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Aviation Programs</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto px-4">
              Empowering the next generation of pilots and aerospace engineers through world-class training.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid gap-8 max-w-4xl mx-auto">
            {programs.map((program, index) => (
              <div key={index} className="relative">
                {program.featured && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-xl blur opacity-20" />
                )}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Card
                    className={`relative p-6 sm:p-10 md:p-14 grid gap-8 md:gap-12 md:grid-cols-2 border border-gray-100 rounded-[2rem] sm:rounded-[3rem] shadow-xl md:shadow-2xl transition-all duration-500 overflow-hidden ${program.featured
                      ? 'bg-gradient-to-br from-white to-indigo-50/50 border-blue-100 ring-1 ring-blue-50'
                      : 'bg-gradient-to-br from-white to-blue-50/50 hover:border-blue-100'
                      }`}
                  >
                    {program.featured && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-bl-[2.5rem] text-[10px] font-black tracking-[0.2em] uppercase z-20">
                        Recommended
                      </div>
                    )}

                    {/* Left Content */}
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-black text-blue-600 mb-3 uppercase tracking-[0.2em]">{program.level}</div>
                        <h3 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">{program.title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">{program.description}</p>
                      </div>

                      {/* Meta Info */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <Clock className="text-primary flex-shrink-0" size={20} />
                          <div>
                            <div className="text-sm font-black text-black uppercase tracking-tight">Duration</div>
                            <div className="text-sm text-muted-foreground">{program.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Users className="text-primary flex-shrink-0" size={20} />
                          <div>
                            <div className="text-sm font-black text-black uppercase tracking-tight">Age Group</div>
                            <div className="text-sm text-muted-foreground">{program.ageGroup}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Award className="text-primary flex-shrink-0" size={20} />
                          <div>
                            <div className="text-sm font-black text-black uppercase tracking-tight">Modules</div>
                            <div className="text-sm text-muted-foreground">{program.modules} comprehensive modules</div>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="pt-6 border-t border-gray-50">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Investment</div>
                        <div className="text-3xl font-black text-gray-900">{program.price}</div>
                      </div>

                      <Link href="/contact" className="block pt-4">
                        <Button
                          className={`w-full py-8 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-[0.98] ${program.featured
                            ? 'bg-gray-900 text-white hover:bg-black shadow-indigo-100'
                            : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 shadow-gray-100'
                            }`}
                        >
                          {program.cta}
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-gray-50/50 p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100/50">
                      <h4 className="font-black text-xl mb-6 sm:mb-8 uppercase tracking-tight text-gray-900">Program Highlights</h4>
                      <ul className="space-y-4 sm:space-y-6">
                        {program.highlights.map((highlight, i) => (
                          <li key={i} className="flex gap-4 group/item">
                            <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                            <span className="text-gray-600 font-bold tracking-tight group-hover/item:text-gray-900 transition-colors leading-snug">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="space-y-12 pt-20 border-t border-gray-50">
            <h2 className="text-4xl font-black text-center text-gray-900 uppercase tracking-tight">Expert Advice & FAQs</h2>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: 'What is the minimum age requirement?',
                  a: 'Level 1 is designed for students from Class 4th onwards. Level 2 is for Class 12th and above.',
                },
                {
                  q: 'Do I need prior aviation experience?',
                  a: 'No, our programs are designed for beginners. We start from the basics and gradually advance.',
                },
                {
                  q: 'What happens after completing the program?',
                  a: 'Upon successful completion, students receive certification and can pursue professional pilot training.',
                },
                {
                  q: 'Are there any scholarship opportunities?',
                  a: 'Please contact us for details on scholarship and financial assistance programs.',
                },
              ].map((item, i) => (
                <Card key={i} className="p-8 border border-gray-100 rounded-3xl hover:border-blue-200 hover:shadow-xl transition-all duration-300 group bg-white shadow-sm">
                  <h4 className="font-black mb-3 text-lg text-gray-900 uppercase tracking-tight flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
                    {item.q}
                  </h4>
                  <p className="text-gray-600 font-medium leading-relaxed pl-5">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
