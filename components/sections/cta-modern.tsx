'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin, Zap } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-gray-200 bg-gray-50">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Content */}
          <div className="text-center space-y-8 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600">Only 30 Spots Left This Batch</span>
            </div>

            <div>
              <h2 className="text-6xl sm:text-7xl font-black text-balance leading-tight mb-6 text-gray-900">
                Contact us today!
                <br />
                <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-relaxed mt-2 block">Our team of professionals are ready to help guide you on your pathway.</span>
              </h2>
              <div className="relative inline-block mt-4 mb-4">
                <span className="absolute -left-4 -top-4 text-4xl text-blue-300/60 font-serif">"</span>
                <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic px-6 relative z-10 font-[Caveat,cursive]">
                  The sky is not the limit, it's just the beginning.
                </p>
                <span className="absolute -right-4 bottom-0 text-4xl text-blue-300/60 font-serif">"</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all font-bold text-white border-0 group w-full sm:w-auto"
                >
                  Enroll Now - Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <a href="tel:+919842158350">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-blue-300 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md font-bold w-full sm:w-auto"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +91 9842 158350
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-200">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-white border border-blue-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-1">Email</p>
                <a href="mailto:spacegensouthindia@gmail.com" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  spacegensouthindia@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-white border border-blue-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-1">WhatsApp & Call</p>
                <a href="https://wa.me/919842158350" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  +91 9842 158350
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-white border border-blue-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-4">Locations</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">HEAD OFFICE:</p>
                    <p className="font-medium text-gray-600 text-sm leading-relaxed">
                      Level 4, Gumidelli Towers, 1-10-39 to 44,<br />
                      Old Airport Rd, Begumpet,<br />
                      Hyderabad - 500016
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 mt-4">REGIONAL OFFICE:</p>
                    <p className="font-medium text-gray-600 text-sm leading-relaxed">
                      Hanudev Infotech Park, 6th Floor,<br />
                      Unit No.Block 'C', SF.No:558/2,<br />
                      Avinasi road, Nava India signal,<br />
                      Coimbatore - 641028
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-center text-gray-600 mb-4">
              Have questions? Check out our FAQs or speak with our counselors today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200">
                View FAQs
              </Button>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200">
                Schedule Call
              </Button>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
