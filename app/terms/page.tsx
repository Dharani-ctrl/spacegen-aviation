import Header from '@/components/header';
import Footer from '@/components/footer';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Header />

            {/* Hero Header */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 pt-32 pb-24 px-4 relative overflow-hidden">
                {/* Decorative Grid and Orbs */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-2xl">
                        <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase drop-shadow-md">Terms of Service</h1>
                    <p className="text-cyan-400 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm drop-shadow-sm">SpaceGen Aviation Research & Development</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow container mx-auto px-4 -mt-10 sm:-mt-12 relative z-20 pb-20">
                <div className="bg-white rounded-[2rem] p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 max-w-4xl mx-auto space-y-12">

                    <div className="prose prose-slate prose-lg sm:prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:text-cyan-600 transition-colors">

                        <p className="text-slate-500 text-sm sm:text-base font-semibold tracking-widest uppercase mb-12 border-b border-slate-100 pb-6">
                            Last Updated: March 2026
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">1</span>
                            Agreement to Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing the website and educational programs of <strong>SpaceGen Aviation Research & Development (SARD)</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you must not access the services.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">2</span>
                            Educational Programs & Enrollment
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">When enrolling in any of our aerospace or aviation programs:</p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-cyan-500">
                            <li>All applicants must provide accurate, current, and complete information during registration.</li>
                            <li>SARD reserves the right to accept or decline student applications based on program capacity, prerequisites, and our code of conduct.</li>
                            <li>Fees are non-refundable unless explicitly stated otherwise in a separate, written enrollment agreement.</li>
                        </ul>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">3</span>
                            Intellectual Property
                        </h2>
                        <p className="text-slate-600 leading-relaxed border-l-4 border-indigo-500 pl-6 bg-slate-50 py-4 pr-4 rounded-r-xl my-8">
                            The Service and its original content, curriculum, features, and functionality are and will remain the exclusive property of SpaceGen Aviation Research & Development and its licensors. Our curriculum is protected by copyright, trademark, and other intellectual property laws.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">4</span>
                            Student Code of Conduct
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Students enrolled in our programs are expected to maintain professional behavior, respect instructors and peers, and adhere strictly to all safety protocols, especially when interacting with flight simulators and aerospace hardware. SARD reserves the right to dismiss any student whose behavior is deemed disruptive or unsafe, without refund.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">5</span>
                            Limitation of Liability
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            In no event shall SpaceGen Aviation Research & Development, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">6</span>
                            Changes to Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>

                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
