'use client'

import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 md:px-6 space-y-12">
        {/* Main CTA */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Ready to Soar Into <span className="text-primary">Aerospace Excellence?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students experiencing world-class aviation education
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started Today
          </Button>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="p-8 rounded-lg border border-border bg-card text-center hover:border-primary/50 transition-colors">
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Call Us</h4>
            <a href="tel:+919842158350" className="text-primary hover:underline">
              +91 98421 58350
            </a>
          </div>

          <div className="p-8 rounded-lg border border-border bg-card text-center hover:border-primary/50 transition-colors">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Email Us</h4>
            <div className="space-y-1">
              <a href="mailto:info@spacegenaviation.in" className="text-primary hover:underline text-xs block">
                info@spacegenaviation.in
              </a>
              <a href="mailto:ceo@spacegenaviation.in" className="text-primary hover:underline text-xs block">
                ceo@spacegenaviation.in
              </a>
            </div>
          </div>

          <div className="p-8 rounded-lg border border-border bg-card text-center hover:border-primary/50 transition-colors">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Location</h4>
            <p className="text-muted-foreground text-sm">
              Coimbatore, Tamil Nadu, India
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
              f
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
              𝕏
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
              in
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
              📷
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
