'use client'

import { Card } from '@/components/ui/card'

export default function Features() {
  const mainFeatures = [
    {
      title: '60+ Hrs of Training',
      items: ['40+ Hrs Online Classes', '20+ Hrs Hands-on Sessions'],
      icon: '📚',
    },
    {
      title: 'Comprehensive Curriculum',
      items: ['Workshops', 'Exhibitions', 'Career Guidance', 'Industry Insights'],
      icon: '🎓',
    },
    {
      title: 'Certification Focus',
      items: [
        'In-SPACE Certified',
        'Industry Recognized',
        'Student Pilot License Ready',
      ],
      icon: '🏆',
    },
  ]

  const curriculumItems = [
    'Workshops',
    'Exhibitions',
    'Career Guidance',
    'Events and Quizzes',
    'Space Watch Program',
    'Insightful Offline Classes',
    'Flight Simulation Mastery',
    'Conceptual Online Classes',
    'Foreign Student Interaction',
    'Industry Insight Guest Lectures',
    'Multiple Hands On Experiments',
    'Exploratory Excursions: Field Trips',
    'Defence Exam Preparation (Optional)',
    'Unmanned Aerial Systems & Drone Design',
    'Rocketry Experimentation In Testing Rockets',
    'Aviation Engineering and Aircraft Construction',
    'Electronics Integration On Aircraft, Drone, & Rockets',
    'Precision Engineering in Drone Assembly And Testing',
    'Overseas Online Guest Lectures By University Professors',
    'Aerospace Innovation in Rocket Design And Development',
    'Aerial Operations And Flight Testing From School Grounds',
  ]

  const hands_on_activities = [
    {
      name: 'Engaging and Conceptual Pilot Training',
      icon: '✈️',
    },
    {
      name: 'Insightful Offline Classes',
      icon: '📖',
    },
    {
      name: 'Wings of Wonder Program',
      icon: '🌟',
    },
    {
      name: 'Engine Propulsions',
      icon: '⚙️',
    },
    {
      name: 'Wings of Wonder',
      icon: '🦅',
    },
    {
      name: 'Drone/UAV/Rocket',
      icon: '🚁',
    },
    {
      name: 'Aviation STEM Lab',
      icon: '🔬',
    },
    {
      name: 'Field Trips',
      icon: '🚌',
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-primary text-lg font-semibold">WHAT WE OFFER</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-balance">
            Complete Learning Experience
          </h3>
        </div>

        {/* Main Features */}
        <div className="grid gap-6 md:grid-cols-3">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="p-8 border-border hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
              <ul className="space-y-2">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Level 1 Foundation Program */}
        <div className="border-2 border-primary/30 rounded-lg p-8 md:p-12 bg-card">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">🎯</div>
            <div>
              <h4 className="text-2xl font-bold">Level 1 Foundation (Duration: 40 hours)</h4>
              <p className="text-muted-foreground mt-2">
                Complete hands-on aviation experience for beginners
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hands_on_activities.slice(0, 3).map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-3xl">{activity.icon}</span>
                <span className="text-sm font-medium">{activity.name}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-5 mt-6">
            {hands_on_activities.slice(3).map((activity, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center">
                <div className="text-2xl">{activity.icon}</div>
                <span className="text-xs font-medium leading-tight">{activity.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        <div className="space-y-6">
          <div>
            <h4 className="text-2xl font-bold mb-2">Complete Curriculum (21 Modules)</h4>
            <p className="text-muted-foreground">
              Comprehensive program features including workshops, exhibitions, career guidance, and much more
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {curriculumItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <span className="text-primary font-bold text-lg flex-shrink-0 mt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-muted-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
