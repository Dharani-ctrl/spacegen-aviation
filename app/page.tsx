'use client';

import Header from '@/components/header';
import { HeroSection } from '@/components/sections/hero-space';
import { AboutSection } from '@/components/sections/about-modern';
import { ProgramsSection } from '@/components/sections/programs-modern';
import { FeaturesSection } from '@/components/sections/features-modern';
import { CTASection } from '@/components/sections/cta-modern';
import { GallerySection } from '@/components/sections/gallery';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <FeaturesSection />
      <GallerySection />
      <CTASection />
      <Footer />
    </main>
  );
}
