import React, { useState } from 'react';
import { useNavigateToContact } from '../../hooks/useNavigateToContact';
import { handleShare as shareContent } from '../../utils/handleShare';

const PatientBreakEven: React.FC = () => {
    const goToContact = useNavigateToContact();
    
    const [rent, setRent] = useState(30000);
    const [salaries, setSalaries] = useState(60000);
    const [consumables, setConsumables] = useState(15000);
    const [utilities, setUtilities] = useState(13000);
    const [revenue, setRevenue] = useState(1000); // Average billing per patient

    const formatINR = (value: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(value));
    };

    const totalFixedCosts = rent + salaries + consumables + utilities;
    
    // Safety check for division by zero
    const breakEvenMonthly = revenue > 0 ? totalFixedCosts / revenue : 0;
    const breakEvenMonthlyCeil = Math.ceil(breakEvenMonthly);
    const breakEvenDaily = breakEvenMonthly / 25; // Standard 25 working days
    const breakEvenDailyCeil = Math.ceil(breakEvenDaily);
    
    const revenueNeededPerDay = totalFixedCosts / 25;
    
    // Growth scenario logic
    const safeMarginPatients = breakEvenDailyCeil + 3;
    const safeMarginTakeHome = safeMarginPatients * 25 * revenue - totalFixedCosts;

    const handleShare = () => {
        shareContent({
            title: 'Patient Break-Even Limit — Cue360 Clinic Profit Intelligence',
            text: `My clinic burns ${formatINR(totalFixedCosts)} a month. I need exactly ${breakEvenMonthlyCeil} patients per month (${breakEvenDailyCeil}/day) just to break even. See how much your clinic might be leaking 👇`,
            url: 'https://cue360.in/clinic-profit-intelligence',
        });
    };

    return (
        <section id="break-even" data-tool-section="patient_break_even" className="scroll-mt-32">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-3">New Patient Break-Even Limit</h2>
                <p className="text-xl text-slate-500">Do you know exactly how many patients it takes just to survive each month?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Inputs Area */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
                    {/* Slider 1 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Monthly Clinic Rent or EMI</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{formatINR(rent)}</span>
                        </div>
                        <input 
                            type="range" min="10000" max="250000" step="5000" 
                            value={rent} onChange={(e) => setRent(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 2 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Total Staff Salaries (Monthly)</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{formatINR(salaries)}</span>
                        </div>
                        <input 
                            type="range" min="10000" max="300000" step="5000" 
                            value={salaries} onChange={(e) => setSalaries(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 3 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Monthly Consumables & Lab Fees</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{formatINR(consumables)}</span>
                        </div>
                        <input 
                            type="range" min="5000" max="150000" step="5000" 
                            value={consumables} onChange={(e) => setConsumables(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 4 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Utilities, Software, & Other Fixed</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{formatINR(utilities)}</span>
                        </div>
                        <input 
                            type="range" min="2000" max="50000" step="1000" 
                            value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 5 */}
                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Average Revenue Per Patient</label>
                            <span className="text-2xl font-black text-rose-500">{formatINR(revenue)}</span>
                        </div>
                        <input 
                            type="range" min="300" max="10000" step="100" 
                            value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                    </div>
                </div>

                {/* Results Area */}
                <div data-tool-result="patient_break_even" className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-extrabold text-[#0D1B2A]">Your Financial Baseline</h3>
                        <button onClick={handleShare} data-share-tool="patient_break_even" className="group text-sm font-bold text-[#4B6EF5] bg-white hover:bg-gradient-to-r hover:from-[#4B6EF5] hover:to-indigo-600 hover:text-white border-2 border-blue-100 hover:border-transparent px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:scale-110 transition-transform"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            Share This Insight
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Monthly Burn</span>
                            <span className="text-3xl font-black text-slate-800">{formatINR(totalFixedCosts)}</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Needed per Day</span>
                            <span className="text-3xl font-black text-slate-800">{formatINR(revenueNeededPerDay)}</span>
                        </div>
                        <div className="bg-white border border-rose-200 bg-rose-50/50 rounded-xl p-5 shadow-sm flex flex-col items-center text-center transform scale-105 z-10">
                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 border-b border-rose-200/50 pb-1">Break-even patients (Monthly)</span>
                            <span className="text-4xl font-black text-rose-700">{breakEvenMonthlyCeil}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white border-l-4 border-l-slate-400 p-5 rounded-r-xl shadow-sm">
                            <p className="text-slate-700 text-lg leading-relaxed">
                                You must see exactly <strong>{breakEvenDailyCeil} patients</strong> every single working day just to keep the lights on — before you earn a single rupee for yourself.
                            </p>
                        </div>

                        {safeMarginTakeHome > 0 && (
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 border-l-4 border-l-emerald-500 border border-t-emerald-100 border-r-emerald-100 border-b-emerald-100 p-5 rounded-r-xl shadow-sm">
                                <p className="text-slate-800 text-lg leading-relaxed">
                                    <strong>However...</strong> because fixed costs are already paid for, if you could attract just <strong>3 extra patients per day</strong> past your break-even point, your monthly take-home profit jumps to <strong>{formatINR(safeMarginTakeHome)}</strong>.
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-[10px] text-slate-400 mt-8 leading-relaxed">
                        Assumption: This calculator uses 25 working days per month as the baseline. It aggregates all costs (rent, salaries, materials) and determines the absolute minimum volume needed. Use this as a directional financial survival tool.
                    </p>
                </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#0D1B2A] mb-1">Cue360 automatically secures your baseline.</h4>
                    <p className="text-slate-600">With automated recalls and reduced no-shows, crossing your break-even limit happens earlier in the month.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <button onClick={() => goToContact('See How Automations Work - Break Even')} data-cta="demo" data-cta-tool="patient_break_even" className="text-slate-600 font-semibold hover:text-[#4B6EF5] transition-colors px-4 py-2">See Automations Demo</button>
                    <button onClick={() => goToContact('Start Free Trial - Break Even')} data-cta="trial" data-cta-tool="patient_break_even" className="bg-[#4B6EF5] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">Start Free 14-Day Trial</button>
                </div>
            </div>
        </section>
    );
};

export default PatientBreakEven;
