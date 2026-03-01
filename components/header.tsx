'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { name: 'About', href: '/#about', path: '/', hash: 'about' },
  { name: 'Programs', href: '/programs', path: '/programs', hash: 'programs' },

  { name: 'Features', href: '/#features', path: '/', hash: 'features' },
  { name: 'Gallery', href: '/#gallery', path: '/', hash: 'gallery' },
  { name: 'Contact', href: '/contact', path: '/contact', hash: '' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    // Only track scroll on the home page for hash links
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    NAV_LINKS.forEach((link) => {
      if (link.hash) {
        const element = document.getElementById(link.hash)
        if (element) observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [pathname])

  const isActive = (link: typeof NAV_LINKS[0]) => {
    // If we're on a specific page (like /programs or /contact)
    if (pathname === link.path && link.path !== '/') return true

    // If we're on the home page and scrolling past the section
    if (pathname === '/' && link.hash && activeSection === link.hash) return true

    return false
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,217,255,0.1)]">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 flex items-center justify-center rounded-full overflow-hidden bg-slate-900 border border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(0,217,255,0.5)] group-hover:border-cyan-400/50 transition-all p-1">
            <Image src="/sardc-logo.png" alt="SARDC Logo" width={48} height={48} className="object-contain" priority />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-xl sm:text-2xl text-white tracking-widest group-hover:text-cyan-400 transition-colors leading-none">SARDC</span>
            <span className="block text-[0.45rem] sm:text-[0.6rem] font-bold text-cyan-400 tracking-[0.1em] sm:tracking-[0.15em] mt-1 sm:mt-1.5 leading-tight sm:leading-none drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]">SPACEGEN AVIATION RESEARCH CENTER</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 relative py-2 ${isActive(link)
                ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]'
                : 'text-slate-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]'
                }`}
            >
              {link.name}
              {/* Active Indicator Line */}
              {isActive(link) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#00d9ff] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden md:block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all font-bold text-slate-950 border-0">
              Enquire Now
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex md:hidden text-primary"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-cyan-500/20 bg-slate-950/90 backdrop-blur-2xl md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all px-4 py-2 rounded-lg ${isActive(link)
                  ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/50 hover:pl-6'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="block pt-4" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all font-bold text-slate-950 border-0">
                Enquire Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
