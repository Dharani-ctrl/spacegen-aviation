import Header from '@/components/header';
import Footer from '@/components/footer';
import { Cookie } from 'lucide-react';

export default function CookiePolicy() {
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
                        <Cookie className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase drop-shadow-md">Cookie Policy</h1>
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
                            What Are Cookies?
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the <strong>SpaceGen Aviation Research & Development (SARD)</strong> website or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">2</span>
                            How We Use Cookies
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-cyan-500">
                            <li><strong>Essential Cookies:</strong> To enable certain functions of the Service, such as remembering your preferences or login details for any student portals.</li>
                            <li><strong>Analytics Cookies:</strong> To provide analytics. We use these to track information about how our site is used so that we can make improvements to our digital experience.</li>
                            <li><strong>Performance Cookies:</strong> to ensure our high-quality multimedia content (like videos and images of flight training) loads quickly and efficiently.</li>
                        </ul>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">3</span>
                            Third-Party Cookies
                        </h2>
                        <p className="text-slate-600 leading-relaxed border-l-4 border-indigo-500 pl-6 bg-slate-50 py-4 pr-4 rounded-r-xl my-8">
                            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, primarily Google Analytics, to help us understand where our students and parents are visiting from and what programs interest them most.
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm">4</span>
                            What Are Your Choices Regarding Cookies?
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, and some of our pages might not display properly.
                        </p>

                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
