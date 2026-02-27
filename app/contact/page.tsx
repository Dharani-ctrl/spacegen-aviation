import Header from '@/components/header'
import Footer from '@/components/footer'
import ContactForm from '@/components/contact-form'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact SpaceGen Aviation',
  description: 'Get in touch with SpaceGen Aviation for enquiries about our aviation programs.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -ml-64 -mb-32" />

        <div className="container relative z-10 mx-auto px-4 md:px-6 space-y-20">
          {/* Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-2">
              <span className="text-[10px] sm:text-xs font-black text-blue-600 uppercase tracking-widest">Connect With Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto px-4">
              Have questions about our programs or admissions? Our specialized team is here to guide your aviation journey.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto mb-16">
            <div className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-2">Phone</h3>
              <a href="tel:+919842158350" className="text-gray-900 font-black text-lg hover:text-blue-600 transition-colors">
                +91 98421 58350
              </a>
            </div>

            <div className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <Mail className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-2">Email</h3>
              <a href="mailto:spacegensouthindia@gmail.com" className="text-gray-900 font-black text-sm hover:text-indigo-600 transition-colors break-all leading-relaxed">
                spacegensouthindia@gmail.com
              </a>
            </div>

            <div className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-2">Location</h3>
              <p className="text-gray-900 font-black text-lg">
                Coimbatore, TN
              </p>
            </div>

            <div className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-2">Hours</h3>
              <p className="text-gray-900 font-black text-lg leading-tight">
                9AM - 6PM IST
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
