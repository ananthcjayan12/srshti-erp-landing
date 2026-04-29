import React, { useState } from 'react';
import { useNavigateToContact } from '../../hooks/useNavigateToContact';
import { handleShare as shareContent } from '../../utils/handleShare';

const RecallRevenueLeak: React.FC = () => {
    const goToContact = useNavigateToContact();

    const [activePatients, setActivePatients] = useState<number | ''>(3000);
    const [avgValue, setAvgValue] = useState<number | ''>(3500);
    const [organicReturnRate, setOrganicReturnRate] = useState(15);

    const safeActivePatients = Number(activePatients) || 0;
    const safeAvgValue = Number(avgValue) || 0;

    const formatINR = (value: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(value));
    };

    const eligiblePatients = Math.round(safeActivePatients * 0.60);
    
    const returningPatients = Math.round(eligiblePatients * (organicReturnRate / 100));
    const unrecalledPatients = Math.max(0, eligiblePatients - returningPatients);
    
    const revenueLeak = unrecalledPatients * safeAvgValue;

    const handleShare = () => {
        shareContent({
            title: 'Recall Revenue Leak — Cue360 Clinic Profit Intelligence',
            text: `I just found out my clinic is losing ${formatINR(revenueLeak)} a year from patients who simply forget to book their 6-month recall. See how much your clinic might be leaking 👇`,
            url: 'https://cue360.in/clinic-profit-intelligence',
        });
    };

    return (
        <section id="recall-revenue" data-tool-section="recall_revenue_leak" className="scroll-mt-32">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-3">Recall Revenue Leak</h2>
                <p className="text-xl text-slate-500">The easiest money to make is from the patients you already have.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
                {/* Step 1 */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-[#0D1B2A] text-white flex items-center justify-center font-black text-lg shadow-md">1</div>
                        <h3 className="text-2xl font-bold text-[#0D1B2A]">The Opportunity</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-[#0D1B2A] block mb-2">Active Patient Base (Seen in last 3 years)</label>
                                <input 
                                    type="number" 
                                    value={activePatients}
                                    onChange={(e) => setActivePatients(e.target.value === '' ? '' : Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-lg rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4B6EF5]/50"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-[#0D1B2A] block mb-2">Average recurring value per patient per year</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input 
                                        type="number" 
                                        value={avgValue}
                                        onChange={(e) => setAvgValue(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-lg rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4B6EF5]/50"
                                    />
                                </div>
                                <p className="text-[11px] text-slate-500 mt-2 font-medium">Think checkups, scaling, minor fillings.</p>
                            </div>
                        </div>

                        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                            <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Overdue for Recall</span>
                            <span className="text-4xl font-black text-[#0D1B2A]">{new Intl.NumberFormat('en-IN').format(eligiblePatients)} <span className="text-lg font-bold text-slate-400">patients</span></span>
                            <p className="text-sm text-slate-500 mt-3 max-w-xs mx-auto">Assuming 60% of your base is medically eligible for a 6-month checkup.</p>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100 my-10" />

                {/* Step 2 */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-lg shadow-md">2</div>
                        <h3 className="text-2xl font-bold text-[#0D1B2A]">The Leak</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-2">
                                    <label className="text-sm font-bold text-[#0D1B2A] max-w-[70%]">What percentage of your patients book a recall visit on their own?</label>
                                    <span className="text-3xl font-black text-[#4B6EF5]">{organicReturnRate}%</span>
                                </div>
                                <input 
                                    type="range" min="0" max="100" step="1" 
                                    value={organicReturnRate} onChange={(e) => setOrganicReturnRate(Number(e.target.value))} 
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5] mt-4"
                                />
                                <p className="text-xs text-slate-500 mt-3 font-medium">(Without you chasing them via calls or messages. Industry average is 10-20%)</p>
                            </div>
                            
                            <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl text-center">
                                <span className="text-sm font-bold text-rose-500 block mb-1">Patients falling through the cracks</span>
                                <span className="text-3xl font-black text-rose-600">{new Intl.NumberFormat('en-IN').format(unrecalledPatients)}</span>
                            </div>
                        </div>

                        <div data-tool-result="recall_revenue_leak" className="bg-gradient-to-b from-[#F8FAFC] to-rose-50/50 border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center">
                            <button onClick={handleShare} data-share-tool="recall_revenue_leak" className="absolute top-4 right-4 group text-sm font-bold text-[#4B6EF5] bg-white hover:bg-gradient-to-r hover:from-[#4B6EF5] hover:to-indigo-600 hover:text-white border-2 border-blue-100 hover:border-transparent px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 z-10">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:scale-110 transition-transform"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                Share This Insight
                            </button>

                            <div className="text-center mt-4">
                                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-4">Gross Revenue Lost Annually</span>
                                <h4 className="text-5xl md:text-6xl font-black text-rose-600 tracking-tighter mb-6">
                                    {formatINR(revenueLeak)}
                                </h4>
                                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                    You are losing <strong>{formatINR(revenueLeak)}</strong> in easy, recurring revenue every year simply because patients forget to book.
                                </p>
                            </div>

                            <p className="text-[10px] text-slate-400 mt-8 text-center leading-relaxed">
                                Assumption: 60% of total active base requires at least bi-annual basic hygiene/checkups. Revenue leak calculates the value of the proportion of the 60% eligible base that fails to return organically. It assumes the clinic has zero proactive automated recall systems in place.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-[#0D1B2A] border border-slate-700 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="text-center md:text-left z-10">
                    <h4 className="text-2xl font-bold text-white mb-2">Cue360 automatically recovers lost recall revenue.</h4>
                    <p className="text-blue-200 text-lg">Smart WhatsApp campaigns bring old patients back for checkups with zero effort from your front desk.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10 w-full sm:w-auto">
                    <button onClick={() => goToContact('Start Free Trial - Recall Leak')} data-cta="trial" data-cta-tool="recall_revenue_leak" className="bg-[#4B6EF5] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all w-full sm:w-auto text-center border border-blue-400/30">
                        Stop The Leak Today
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RecallRevenueLeak;
