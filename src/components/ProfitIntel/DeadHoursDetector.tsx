import React, { useState } from 'react';
import { useNavigateToContact } from '../../hooks/useNavigateToContact';
import { handleShare as shareContent } from '../../utils/handleShare';

const DeadHoursDetector: React.FC = () => {
    const goToContact = useNavigateToContact();

    const [chairs, setChairs] = useState(2);
    const [hoursPerDay, setHoursPerDay] = useState(8);
    const [daysPerWeek, setDaysPerWeek] = useState(6);
    const [patientsPerDay, setPatientsPerDay] = useState(14);
    const [timePerPatient, setTimePerPatient] = useState(30);
    const [avgInvoice, setAvgInvoice] = useState<number | ''>(900);

    const formatINR = (value: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(value));
    };

    // Math calculations
    const availableMinsPerWeek = chairs * hoursPerDay * 60 * daysPerWeek;
    const usedMinsPerWeek = patientsPerDay * timePerPatient * daysPerWeek;
    
    const deadMinsPerWeek = Math.max(0, availableMinsPerWeek - usedMinsPerWeek);
    const deadHoursPerWeek = deadMinsPerWeek / 60;
    
    // Clamp at 100% just in case they enter more patients than time allows
    const rawUtilisation = availableMinsPerWeek > 0 ? (usedMinsPerWeek / availableMinsPerWeek) * 100 : 0;
    const utilisationRate = Math.min(100, Math.max(0, rawUtilisation));
    
    const maxPatientsPerWeek = availableMinsPerWeek / timePerPatient;
    const actualWeeklyPatients = patientsPerDay * daysPerWeek;
    
    const safeAvgInvoice = Number(avgInvoice) || 0;
    const revenueGapPerWeek = Math.max(0, maxPatientsPerWeek - actualWeeklyPatients) * safeAvgInvoice;
    const revenueGapPerMonth = revenueGapPerWeek * 4.3;
    const revenueGapPerYear = revenueGapPerWeek * 52;

    const availableHoursPerWeek = availableMinsPerWeek / 60;
    const usedHoursPerWeek = usedMinsPerWeek / 60;

    let gaugeColor = "text-rose-500";
    let gaugeBg = "stroke-rose-100";
    if (utilisationRate >= 50 && utilisationRate <= 70) {
        gaugeColor = "text-amber-500";
        gaugeBg = "stroke-amber-100";
    } else if (utilisationRate > 70) {
        gaugeColor = "text-emerald-500";
        gaugeBg = "stroke-emerald-100";
    }

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (utilisationRate / 100) * circumference;

    const handleShare = () => {
        shareContent({
            title: 'Dead Hours Detector — Cue360 Clinic Profit Intelligence',
            text: `I just found out my clinic has ${deadHoursPerWeek.toFixed(1)} dead chair-hours per week — worth ${formatINR(revenueGapPerMonth)} a month in lost revenue. See what yours might be leaking 👇`,
            url: 'https://cue360.in/clinic-profit-intelligence',
        });
    };

    return (
        <section id="dead-hours" data-tool-section="dead_hours_detector" className="scroll-mt-32">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-3">Dead Hours Detector</h2>
                <p className="text-xl text-slate-500">Your clinic is open. The lights are on. Is money coming in?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Inputs */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
                    {/* Chair count */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">How many treatment chairs does your clinic have?</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{chairs}</span>
                        </div>
                        <input 
                            type="range" min="1" max="8" step="1" 
                            value={chairs} onChange={(e) => setChairs(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Hours per day */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">How many hours is your clinic open each day?</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{hoursPerDay}</span>
                        </div>
                        <input 
                            type="range" min="4" max="14" step="1" 
                            value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Days per week */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Days open per week</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{daysPerWeek}</span>
                        </div>
                        <input 
                            type="range" min="4" max="7" step="1" 
                            value={daysPerWeek} onChange={(e) => setDaysPerWeek(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Patients per day */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Patients you actually see on a typical day</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{patientsPerDay}</span>
                        </div>
                        <input 
                            type="range" min="5" max="60" step="1" 
                            value={patientsPerDay} onChange={(e) => setPatientsPerDay(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                        <p className="text-[11px] text-slate-500 mt-2 font-medium">(Across all chairs)</p>
                    </div>

                    {/* Time per patient */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Average time spent per patient</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{timePerPatient}m</span>
                        </div>
                        <input 
                            type="range" min="20" max="60" step="1" 
                            value={timePerPatient} onChange={(e) => setTimePerPatient(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                        <p className="text-[11px] text-slate-500 mt-2 font-medium leading-tight">Typical dental appointments in India range from 20 to 45 minutes. 30 minutes is the national average for mixed-procedure clinics. Adjust for your clinic type.</p>
                    </div>

                    {/* Avg Invoice */}
                    <div className="pt-2">
                        <label className="text-sm font-bold text-[#0D1B2A] block mb-2">Average amount billed per patient visit (₹)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                            <input 
                                type="number" 
                                value={avgInvoice}
                                onChange={(e) => setAvgInvoice(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-lg rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4B6EF5]/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div data-tool-result="dead_hours_detector" className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-extrabold text-[#0D1B2A] mt-2">Utilisation Output</h3>
                        <button onClick={handleShare} data-share-tool="dead_hours_detector" className="group text-sm font-bold text-[#4B6EF5] bg-white hover:bg-gradient-to-r hover:from-[#4B6EF5] hover:to-indigo-600 hover:text-white border-2 border-blue-100 hover:border-transparent px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 z-10">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:scale-110 transition-transform"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            Share This Insight
                        </button>
                    </div>

                    {/* Circular Gauge */}
                    <div className="flex flex-col items-center justify-center mb-8 relative">
                        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 140 140">
                            <circle cx="70" cy="70" r={radius} className={`fill-none stroke-[12px] ${gaugeBg}`} />
                            <circle 
                                cx="70" cy="70" r={radius} 
                                className={`fill-none stroke-[12px] ${gaugeColor.replace('text-', 'stroke-')} transition-all duration-1000 ease-out`}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-black ${gaugeColor}`}>{Math.round(utilisationRate)}%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Utilisation</span>
                        </div>
                    </div>

                    {/* Metric Grids */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Chair utilisation rate</p>
                            <p className={`text-xl font-black ${gaugeColor}`}>{Math.round(utilisationRate)}%</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Dead chair-hours per week</p>
                            <p className="text-xl font-black text-[#0D1B2A]">{deadHoursPerWeek.toFixed(1)} <span className="text-sm font-semibold text-slate-400">hours</span></p>
                        </div>
                        <div className="bg-white border border-rose-100 bg-rose-50/30 rounded-xl p-4 shadow-sm text-center">
                            <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider mb-1">Revenue gap per month</p>
                            <p className="text-xl font-black text-rose-600">{formatINR(revenueGapPerMonth)}</p>
                        </div>
                        <div className="bg-white border border-rose-100 bg-rose-50/80 rounded-xl p-4 shadow-sm text-center transform scale-[1.02]">
                            <p className="text-[10px] text-rose-600 font-black uppercase tracking-wider mb-1 border-b border-rose-200 pb-1">Revenue gap per year</p>
                            <p className="text-2xl font-black text-rose-700 mt-1">{formatINR(revenueGapPerYear)}</p>
                        </div>
                    </div>

                    {/* Insight para */}
                    <div className="bg-slate-100/50 border border-slate-200 p-5 rounded-xl shadow-inner">
                        <p className="text-slate-700 leading-relaxed text-[15px]">
                            Your {chairs} chair{chairs > 1 ? 's' : ''} {chairs > 1 ? 'are' : 'is'} available for <strong>{Math.round(availableHoursPerWeek)}</strong> hours per week, but you are using <strong>{Math.round(usedHoursPerWeek)}</strong> hours. That is <strong>{deadHoursPerWeek.toFixed(1)}</strong> hours per week of overhead with no return — equivalent to <strong>{formatINR(revenueGapPerWeek)}</strong> walking out the door every week.
                        </p>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-6 leading-relaxed">
                        Assumption: Dead hours are calculated as available chair-time minus time actively used for patient treatment. This assumes continuous single-chair occupancy per appointment. Overhead costs (rent, salaries, utilities) continue during idle hours, making dead chair time a direct financial drain. Benchmark: Well-run single-dentist clinics in Indian metros operate at 65–75% chair utilisation. Multi-chair clinics average 50–60%. Source: Internal Cue360 analysis based on anonymised clinic data and IDA operational surveys.
                    </p>
                </div>
            </div>

            <div className="mt-12 bg-white border border-slate-200 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#0D1B2A] mb-1">Cue360's smart scheduling fills your gaps before they become dead hours.</h4>
                    <p className="text-slate-500">See open slots, fill last-minute cancellations, and track utilisation daily — all from your phone.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <button onClick={() => goToContact('Watch a 2-Minute Demo - Dead Hours')} data-cta="demo" data-cta-tool="dead_hours_detector" className="text-slate-600 font-semibold hover:text-[#4B6EF5] transition-colors px-4 py-2">Watch a 2-Minute Demo</button>
                    <button onClick={() => goToContact('Start Free Trial - Dead Hours')} data-cta="trial" data-cta-tool="dead_hours_detector" className="bg-[#4B6EF5] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">Start Free 14-Day Trial</button>
                </div>
            </div>
        </section>
    );
};

export default DeadHoursDetector;
