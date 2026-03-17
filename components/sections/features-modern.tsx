'use client';

import { BookOpen, Microscope, Users, Globe, Target, Lightbulb, Check } from 'lucide-react';

import { useState, useEffect } from 'react';

export function FeaturesSection() {
  const [content, setContent] = useState({
    title: 'Become a Young Space Expert!',
    subtitle: 'Experience 21 elite modules including workshops, exhibitions, multiple hands-on experiments, and insightful offline classes.',
    features: [
      {
        iconName: 'BookOpen',
        title: 'Fun Workshop',
        description: 'Get hands-on and build amazing things in our creative aviation workshops!',
        gradient: 'from-blue-500 to-cyan-500',
        badge: 'CREATE',
        badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
      },
      {
        iconName: 'Microscope',
        title: 'Learn to Fly!',
        description: 'Experience the thrill of being in a real cockpit with our cool simulators!',
        gradient: 'from-indigo-500 to-blue-500',
        badge: 'FLIGHT',
        badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      },
      {
        iconName: 'Users',
        title: 'Meet Pilot Mentors',
        description: 'Ask questions and learn secrets from professional pilots and engineers!',
        gradient: 'from-cyan-500 to-teal-500',
        badge: 'FRIENDS',
        badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      },
      {
        iconName: 'Target',
        title: 'Design Rockets!',
        description: 'Design, build, and test your very own rockets and flying drones!',
        gradient: 'from-blue-600 to-indigo-600',
        badge: 'BUILD IT',
        badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
      },
      {
        iconName: 'Globe',
        title: 'How Planes Work',
        description: 'Discover the science of how giant planes stay up in the sky!',
        gradient: 'from-teal-500 to-cyan-600',
        badge: 'SCIENCE',
        badgeColor: 'text-teal-600 bg-teal-50 border-teal-200',
      },
      {
        iconName: 'Lightbulb',
        title: 'Space Field Trips',
        description: 'Go on exciting adventures to air bases and watch the stars!',
        gradient: 'from-indigo-500 to-purple-500',
        badge: 'ADVENTURE',
        badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      },
    ],
    benefits: [
      'Career Guidance & Quizzes',
      'Space Watch Program',
      'Foreign Student Interaction',
      'Defence Exam Preparation (Optional)',
      'Aerospace Innovation in Rocket Design',
      'Aerial Operations and Flight Testing',
    ],
    stats: [
      {
        value: '60+ Hrs',
        label: 'Sessions & Classes',
        detail: 'Total hands-on sessions and online classes',
        badge: 'TOTAL',
        gradient: 'from-blue-600 to-cyan-600',
        badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
        border: 'border-blue-200',
      },
      {
        value: '40+ Hrs',
        label: 'Online Sessions',
        detail: 'Interactive live streaming masterclasses via Zoom',
        badge: 'ONLINE',
        gradient: 'from-indigo-600 to-purple-600',
        badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        border: 'border-indigo-200',
      },
      {
        value: '20+ Hrs',
        label: 'Hands-on Sessions',
        detail: 'Live aircraft demo, flight simulations, and droning',
        badge: 'PRACTICAL',
        gradient: 'from-cyan-600 to-teal-600',
        badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
        border: 'border-cyan-200',
      },
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/content/features`);
        if (response.ok) {
          const result = await response.json();
          setContent(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch features content:', error);
      }
    };
    fetchContent();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return BookOpen;
      case 'Microscope': return Microscope;
      case 'Users': return Users;
      case 'Globe': return Globe;
      case 'Target': return Target;
      case 'Lightbulb': return Lightbulb;
      default: return Lightbulb;
    }
  };

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">India's First</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 text-balance mb-6 uppercase">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Features Grid — Foundation Program card style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {(content.features || []).map((feature: any, idx: number) => {
            const Icon = getIcon(feature.iconName || 'Lightbulb');
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              >
                {/* Badge */}
                <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${feature.badgeColor || 'text-blue-600 bg-blue-50 border-blue-200'}`}>
                  {feature.badge || 'INFO'}
                </span>

                {/* Icon */}
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Perks — highlighted card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden">
          {/* Header stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Benefits list */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">INCLUDED</span>
                  <h3 className="text-2xl font-bold text-gray-900">Additional Perks</h3>
                </div>
                <div className="space-y-3">
                  {(content.benefits || []).map((benefit: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stat cards — Foundation Program card style */}
              <div className="space-y-4">
                {(content.stats || []).map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl border ${stat.border || 'border-gray-200'} p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${stat.badgeColor || 'text-blue-600 bg-blue-50 border-blue-200'}`}>
                          {stat.badge || 'STAT'}
                        </span>
                        <p className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient || 'from-blue-600 to-indigo-600'} mt-3`}>
                          {stat.value}
                        </p>
                        <p className="text-sm font-bold text-gray-900 mt-1">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
