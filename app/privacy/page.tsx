import Header from '@/components/header';
import Footer from '@/components/footer';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPolicy() {
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
                        <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase drop-shadow-md">Privacy Policy</h1>
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
                            Introduction
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            At <strong>SpaceGen Aviation Research & Development (SARD)</strong>, we are committed to protecting the privacy and security of our students, parents, and website visitors. This Privacy Policy explains how we collect, use, and safeguard your personal information when you interact with our programs, website, and services.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">2</span>
                            Information We Collect
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We may collect the following types of information:</p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-cyan-500">
                            <li><strong>Personal Identification Information:</strong> Name, age, grade, email address, phone number, and mailing address of students and parents/guardians during enrollment.</li>
                            <li><strong>Academic/Health Records:</strong> Basic health and learning profile information necessary for safety during practical training (simulators, campus visits).</li>
                            <li><strong>Usage Data:</strong> Information on how you navigate our website (IP address, browser type, pages visited), collected automatically through cookies and similar technologies.</li>
                        </ul>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">3</span>
                            How We Use Your Information
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">SpaceGen Aviation uses the collected data exclusively for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-cyan-500">
                            <li>To register and manage student enrollment in our aerospace and aviation programs.</li>
                            <li>To communicate important updates, schedules, and progress reports to parents.</li>
                            <li>To improve our curriculum, website, and overall educational experience.</li>
                            <li>To ensure the physical safety and well-being of students during on-site campus activities.</li>
                        </ul>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">4</span>
                            Data Protection & Security
                        </h2>
                        <p className="text-slate-600 leading-relaxed border-l-4 border-indigo-500 pl-6 bg-slate-50 py-4 pr-4 rounded-r-xl my-8">
                            We implement state-of-the-art security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no internet-based service is 100% secure, and we cannot guarantee absolute security.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">5</span>
                            Third-Party Sharing
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes. We may share necessary data with trusted service providers (such as certification bodies like IN-SPACE) strictly for the purpose of validating student credentials or facilitating course logistics.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">6</span>
                            Contact Us
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions or concerns about our Privacy Policy or your personal data, please contact our data protection officer at: <br />
                            <strong className="text-slate-900 mt-2 block">Email:</strong> <a href="mailto:spacegensouthindia@gmail.com" className="hover:text-cyan-600 transition-colors">spacegensouthindia@gmail.com</a><br />
                            <strong className="text-slate-900 block mt-1">Phone:</strong> +91 9842 158350
                        </p>

                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
