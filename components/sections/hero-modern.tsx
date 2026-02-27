'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, Trophy } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">India's #1 Aviation Program</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-6xl sm:text-7xl font-black leading-tight text-balance text-gray-900 dark:text-white mb-4">
                Your Sky
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Awaits
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Master aviation & space tech with hands-on flying simulators, drone engineering, and rocket science. Perfect for ambitious school students.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all text-white font-bold group"
                >
                  Begin Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary/5 font-bold"
                >
                  Discover Programs
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  1.6K+
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Skilled Pilots</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  75
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Aircraft</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  20+
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Certifications</p>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Cards */}
          <div className="relative h-96 lg:h-full lg:min-h-screen flex flex-col justify-center gap-6">
            {/* Card 1 - Flying */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-primary/30 hover:border-primary transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 duration-300">
                <div className="space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl">
                    ✈️
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Flying Simulator</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Experience real-world flying with our on-campus flight simulation labs. Get certified hands-on experience.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Expert instructors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Drone & Rocket */}
            <div className="group relative ml-8 lg:ml-0">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-accent/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-secondary/30 hover:border-secondary transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 duration-300">
                <div className="space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-3xl">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Drone & Rocket Tech</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Design, build, and launch drones and rockets. Learn advanced aerospace engineering principles.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Trophy className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-semibold text-secondary">Competition-ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
