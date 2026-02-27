import { CheckCircle } from 'lucide-react'

export default function About() {
  const achievements = [
    {
      title: 'IIT Equivalent Program',
      description: 'India\'s first IIT-equivalent aviation curriculum',
      icon: '🎓',
    },
    {
      title: 'Global Recognition',
      description: 'Recognized by British Aviation Group & AeroEast Serbia',
      icon: '🌍',
    },
    {
      title: 'Expert Instructors',
      description: 'Authorized dealers of Aero East Serbian EX1 Italian AK1 Helicopter',
      icon: '👨‍✈️',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-primary text-lg font-semibold">ABOUT SPACEGEN</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-balance">
            Leading Aviation Excellence in India
          </h3>
        </div>

        {/* Main Content */}
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              SpaceGen Aviation stands at the forefront of the global aviation industry as a premier manufacturer and seller of aircraft and its components, serving both India and the international market. Our comprehensive expertise extends beyond manufacturing, encompassing a robust flight training organization with significant operations in Indonesia and the UAE.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a fleet of 75 aircraft, our training programs have successfully produced over 1,600 highly skilled pilots, contributing to the global aviation talent pool. Our commitment to excellence and safety is recognized by esteemed bodies such as the British Aviation Group, AeroEast Serbia, Jazerah aviation club in the UAE, and NFI in Indonesia.
            </p>

            {/* Key Points */}
            <div className="space-y-4 pt-6">
              <div className="flex gap-3">
                <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Global Operations</h4>
                  <p className="text-sm text-muted-foreground">Training programs across India, Indonesia, and UAE</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Advanced Technology</h4>
                  <p className="text-sm text-muted-foreground">Aerodynamic and NOSE CONE aerospace products</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Safety First</h4>
                  <p className="text-sm text-muted-foreground">Industry-leading safety standards and certifications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid gap-6">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
