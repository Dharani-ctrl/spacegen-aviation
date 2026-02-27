'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:px-6 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-primary font-semibold text-lg">AEROSPACE EDUCATION</div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
                India's First <span className="text-primary">IIT Equivalent</span> Aviation Program
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Experience world-class aviation education with hands-on flying simulation, drone technology, and rocket engineering for school students.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                Explore Programs <ChevronRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">1,600+</div>
                <div className="text-sm text-muted-foreground">Skilled Pilots Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">75</div>
                <div className="text-sm text-muted-foreground">Aircraft Fleet</div>
              </div>
            </div>
          </div>

          {/* Right Content - Placeholder for image */}
          <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl text-primary/40">✈️</div>
                  <p className="text-muted-foreground">Premium Aviation Visual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
