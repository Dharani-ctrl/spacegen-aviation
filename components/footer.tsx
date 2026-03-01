import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="inline-block">
              <h3 className="text-2xl font-black tracking-widest text-white">SARD</h3>
              <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mt-1 rounded-full" />
            </div>
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-400 leading-tight uppercase">
              SpaceGen Aviation<br />Research & Development
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              India's premier aviation education provider with global standards and IN-SPACE certification.
            </p>
            {/* Social / badge pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mt-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">IN-SPACE Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-5 text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="h-4 w-0.5 bg-cyan-400 rounded-full inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Programs', href: '#programs' },
                { label: 'Features', href: '#features' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-cyan-400" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-5 text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="h-4 w-0.5 bg-indigo-400 rounded-full inline-block" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <div>
                  <a href="tel:+919842158350" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors block">
                    +91 98421 58350
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-3.5 w-3.5 text-indigo-400" />
                </div>
                <a href="mailto:spacegensouthindia@gmail.com" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors break-all">
                  spacegensouthindia@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-bold mb-5 text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="h-4 w-0.5 bg-purple-400 rounded-full inline-block" />
              Our Offices
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Head Office</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Level 4, Gumidelli Towers,<br />
                    Begumpet, Hyderabad - 500016
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Regional Office</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hanudev Infotech Park,<br />
                    Nava India, Coimbatore - 641028
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-500">
            © {currentYear} SpaceGen Aviation SARD. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider">
              Terms
            </Link>
            <Link href="/cookies" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
