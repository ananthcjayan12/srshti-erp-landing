import React from 'react';
import { motion } from 'framer-motion';
import { useNavigateToContact } from '../hooks/useNavigateToContact';


const Hero: React.FC = () => {
    const goToContact = useNavigateToContact();
    return (
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden bg-slate-50 min-h-[85vh] flex items-center">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-dental-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px]" />
                {/* Grid Pattern overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="max-w-[90rem] mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* Left Column Content */}
                <div className="w-full lg:w-[45%] xl:w-[40%] text-left lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-dental-50 shadow-sm rounded-full px-4 py-1.5 mb-8"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-dental-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-dental-600 uppercase tracking-widest">ERPNext Implementation Partner</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[5.5rem] font-bold tracking-tight text-slate-900 mb-8 leading-[1.05]"
                    >
                        Unified Operations. <br /> Unmatched Efficiency. <br />
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10 max-w-lg flex flex-col gap-1"
                    >
                        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
                            Seamless ERPNext for Small Industries.
                        </p>
                        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
                            <span className="text-dental-600 font-extrabold">Accounting, GST, Production Control.</span>
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-12 w-full max-w-md lg:max-w-none"
                    >
                        <button
                            onClick={() => goToContact('Schedule Your Free Audit')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-dental-600 text-white rounded-xl font-bold hover:bg-dental-700 hover:scale-105 transition-all shadow-lg shadow-dental-600/20"
                        >
                            Schedule Your Free Audit
                        </button>
                        <button
                            onClick={() => goToContact('Watch Module Overview')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-slate-900 border-2 border-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4l12 6-12 6z" />
                            </svg>
                            Watch Module Overview
                        </button>
                    </motion.div>

                </div>

                {/* Right Column: 3D Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full lg:w-[55%] xl:w-[60%] flex flex-col relative group mt-8 lg:mt-0"
                >
                    {/* Punchy Trust Pillars moved above the image */}
                    <div className="flex flex-row items-stretch justify-between w-full lg:w-11/12 mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] mb-6 z-20 relative">
                        <div className="flex flex-col items-center justify-center p-4 sm:p-5 flex-1 border-r border-slate-100 text-center group/pillar cursor-default">
                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dental-50 group-hover/pillar:bg-dental-100 transition-colors mb-3 text-dental-600">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-extrabold text-slate-900 group-hover/pillar:text-dental-700 transition-colors text-sm sm:text-base mb-1">Easiest</span>
                            <span className="text-slate-500 font-medium text-[10px] sm:text-xs leading-snug">Instant Adoption- No Experience Required</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 sm:p-5 flex-1 border-r border-slate-100 text-center group/pillar cursor-default">
                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 group-hover/pillar:bg-amber-100 transition-colors mb-3 text-amber-500">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="font-extrabold text-slate-900 group-hover/pillar:text-amber-600 transition-colors text-sm sm:text-base mb-1">Fastest</span>
                            <span className="text-slate-500 font-medium text-[10px] sm:text-xs leading-snug">0.1s real-time sync</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 sm:p-5 flex-1 text-center group/pillar cursor-default">
                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-50 group-hover/pillar:bg-indigo-100 transition-colors mb-3 text-indigo-600">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="12" cy="12" r="9" strokeWidth="2.5" />
                                    <circle cx="12" cy="12" r="3" strokeWidth="2.5" />
                                </svg>
                            </div>
                            <span className="font-extrabold text-slate-900 group-hover/pillar:text-indigo-700 transition-colors text-sm sm:text-base mb-1">Smartest</span>
                            <span className="text-slate-500 font-medium text-[10px] sm:text-xs leading-snug">Automated workflows</span>
                        </div>
                    </div>

                    <div className="relative transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] z-10">
                        {/* Abstract Vector Dashboard UI */}
                        <div className="w-full aspect-[16/9] bg-slate-50 p-4 md:p-6 flex flex-col gap-4 rounded-2xl border border-slate-200/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative">
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                        <div className="w-4 h-4 border-[2px] border-white rounded-sm" />
                                    </div>
                                    <div className="h-4 w-24 bg-slate-200 rounded-full" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                                    <div className="w-8 h-8 rounded-full bg-blue-100" />
                                </div>
                            </div>
                            
                            {/* Dashboard Content */}
                            <div className="flex-1 flex gap-4">
                                {/* Sidebar */}
                                <div className="hidden sm:flex w-1/4 h-full bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex-col gap-3">
                                    <div className="h-3 w-3/4 bg-slate-200 rounded-full mb-2" />
                                    <div className="h-8 w-full bg-blue-50 rounded-lg border border-blue-100" />
                                    <div className="h-8 w-full bg-slate-50 rounded-lg" />
                                    <div className="h-8 w-full bg-slate-50 rounded-lg" />
                                    <div className="h-8 w-full bg-slate-50 rounded-lg" />
                                    <div className="mt-auto h-8 w-full bg-slate-100 rounded-lg" />
                                </div>
                                
                                {/* Main Area */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {/* Stats Row */}
                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                            <div className="h-3 w-1/2 bg-slate-200 rounded-full mb-4" />
                                            <div className="flex items-end gap-2">
                                                <div className="h-8 w-2/3 bg-slate-800 rounded-lg" />
                                                <div className="h-4 w-8 bg-emerald-100 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                            <div className="h-3 w-1/2 bg-slate-200 rounded-full mb-4" />
                                            <div className="flex items-end gap-2">
                                                <div className="h-8 w-1/2 bg-slate-800 rounded-lg" />
                                                <div className="h-4 w-8 bg-emerald-100 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Chart Area */}
                                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col">
                                        <div className="h-3 w-1/4 bg-slate-200 rounded-full mb-6" />
                                        <div className="flex-1 flex items-end justify-between gap-2 pt-4 border-b border-slate-100">
                                            {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                                                    className="w-full bg-blue-500 rounded-t-sm"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating Animated Cards */}
                        <motion.div 
                            initial={{ x: 20, y: 20, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute top-10 -right-6 bg-white/90 backdrop-blur shadow-xl rounded-xl p-4 border border-slate-100 hidden md:block z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventory Sync</p>
                                    <p className="text-sm font-black text-slate-900">Live: 99.9% Accuracy</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ x: -20, y: 40, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="absolute bottom-12 -left-8 bg-white/90 backdrop-blur shadow-2xl rounded-xl p-5 border border-slate-100 hidden md:block z-20"
                        >
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue Growth</p>
                                <div className="flex items-end gap-2">
                                    <div className="w-2 h-8 bg-blue-200 rounded-sm" />
                                    <div className="w-2 h-12 bg-blue-300 rounded-sm" />
                                    <div className="w-2 h-16 bg-blue-400 rounded-sm" />
                                    <div className="w-2 h-20 bg-blue-600 rounded-sm animate-bounce" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    {/* Glow effect behind */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-dental-100 to-dental-50 rounded-3xl blur-2xl opacity-50 -z-10 group-hover:opacity-70 transition-opacity duration-700"></div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
