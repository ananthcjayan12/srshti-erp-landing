import React, { useState } from 'react';
import { useNavigateToContact } from '../../hooks/useNavigateToContact';
import { handleShare as shareContent } from '../../utils/handleShare';

interface Procedure {
    id: string;
    name: string;
    fee: number | '';
    time: number | '';
}

interface RankedProcedure extends Procedure {
    fee: number;
    time: number;
    hourlyRate: number;
}

const ProcedureProfitRanker: React.FC = () => {
    const goToContact = useNavigateToContact();
    const [procedures, setProcedures] = useState<Procedure[]>([
        { id: '1', name: 'Cleaning', fee: 500, time: 30 },
        { id: '2', name: 'Root Canal', fee: 8000, time: 90 },
        { id: '3', name: 'Crown', fee: 12000, time: 60 },
    ]);
    const [ranked, setRanked] = useState<RankedProcedure[]>([]);
    const [hasRanked, setHasRanked] = useState(false);

    const formatINR = (value: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(value));
    };

    const handleAddRow = () => {
        if (procedures.length < 6) {
            setProcedures([...procedures, { id: Date.now().toString(), name: '', fee: '', time: '' }]);
            setHasRanked(false);
        }
    };

    const handleUpdateChange = (id: string, field: keyof Procedure, value: string | number) => {
        setProcedures(procedures.map(p => p.id === id ? { ...p, [field]: value } : p));
        setHasRanked(false);
    };

    const handleRank = () => {
        const validProcedures = procedures.filter(p => p.name && p.fee !== '' && p.time !== '' && Number(p.time) > 0) as RankedProcedure[];
        
        validProcedures.forEach(p => {
            p.hourlyRate = (p.fee / p.time) * 60;
        });

        validProcedures.sort((a, b) => b.hourlyRate - a.hourlyRate);
        setRanked(validProcedures);
        setHasRanked(true);
    };

    const handleShare = () => {
        if (ranked.length > 0) {
            const top = ranked[0];
            const bottom = ranked[ranked.length - 1];
            shareContent({
                title: 'Procedure Profit Ranker — Cue360 Clinic Profit Intelligence',
                text: `I just found out my highest earning procedure makes ${formatINR(top.hourlyRate)}/hr, and my lowest makes ${formatINR(bottom.hourlyRate)}/hr. Find out which procedures are really making you money 👇`,
                url: 'https://cue360.in/clinic-profit-intelligence',
            });
        }
    };

    const maxRate = ranked.length > 0 ? ranked[0].hourlyRate : 0;

    let insightComponent = null;
    if (ranked.length > 1 && hasRanked) {
        const top = ranked[0];
        const bottom = ranked[ranked.length - 1];
        const diffPercent = Math.round(((top.hourlyRate - bottom.hourlyRate) / top.hourlyRate) * 100);
        
        const sessionsToReplace = 4;
        const additionalMonthly = 4 * 4 * (top.hourlyRate - bottom.hourlyRate) * (bottom.time / 60);
        const roundedAdditional = Math.round(additionalMonthly / 500) * 500;

        insightComponent = (
            <div className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-50/50 border-l-4 border-l-amber-400 border border-t-amber-100 border-r-amber-100 border-b-amber-100 p-6 rounded-r-xl shadow-sm">
                <p className="text-slate-800 text-lg leading-relaxed">
                    <strong>{top.name}</strong> is your highest-earning procedure, generating <strong>{formatINR(top.hourlyRate)}</strong> per chair-hour. 
                    <strong>{bottom.name}</strong> is your lowest earner at <strong>{formatINR(bottom.hourlyRate)}/hr</strong> ({diffPercent}% less efficient). 
                    If you replaced just {sessionsToReplace} {bottom.name} sessions per week with {top.name}, you could earn an additional <strong>{formatINR(roundedAdditional)}</strong> per month from the exact same chair time. Protect your schedule for {top.name}.
                </p>
            </div>
        );
    }

    return (
        <section id="procedure-profit" data-tool-section="procedure_profit_ranker" className="scroll-mt-32">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-3">Procedure Profit Ranker</h2>
                <p className="text-xl text-slate-500">You work hard all day. But are you filling your chair with the right work?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Inputs Area */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="space-y-4 mb-6">
                        {procedures.map((proc, idx) => (
                            <div key={proc.id} className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-12 font-bold text-xs text-slate-400 uppercase tracking-wider mb-[-8px]">Procedure {idx + 1}</div>
                                <div className="col-span-12 md:col-span-5 relative">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Cleaning"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        value={proc.name}
                                        onChange={(e) => handleUpdateChange(proc.id, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-3 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium pointer-events-none">₹</span>
                                    <input 
                                        type="number" 
                                        placeholder="Fee"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg pl-8 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={proc.fee}
                                        onChange={(e) => handleUpdateChange(proc.id, 'fee', e.target.value ? Number(e.target.value) : '')}
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-4 relative">
                                    <input 
                                        type="number" 
                                        placeholder="Mins"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg pl-3 pr-10 md:pr-12 md:pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={proc.time}
                                        onChange={(e) => handleUpdateChange(proc.id, 'time', e.target.value ? Number(e.target.value) : '')}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold uppercase pointer-events-none">mins</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-6">
                        {procedures.length < 6 && (
                            <button onClick={handleAddRow} className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto">
                                + Add Procedure
                            </button>
                        )}
                        <button onClick={handleRank} className="bg-[#4B6EF5] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto sm:ml-auto">
                            Rank My Procedures
                        </button>
                    </div>
                </div>

                {/* Results Area */}
                <div data-tool-result="procedure_profit_ranker" className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    {!hasRanked ? (
                        <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center px-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-500">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 font-medium text-lg">Enter your procedures and click <strong>Rank My Procedures</strong> to uncover your true hourly earners.</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-extrabold text-[#0D1B2A]">Hourly Revenue Ranking</h3>
                                <button onClick={handleShare} data-share-tool="procedure_profit_ranker" className="group text-sm font-bold text-[#4B6EF5] bg-white hover:bg-gradient-to-r hover:from-[#4B6EF5] hover:to-indigo-600 hover:text-white border-2 border-blue-100 hover:border-transparent px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:scale-110 transition-transform"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                    Share This Insight
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {ranked.map((p, idx) => {
                                    const percent = (p.hourlyRate / maxRate) * 100;
                                    const isTop = idx === 0;
                                    const isBottom = idx === ranked.length - 1 && ranked.length > 1;
                                    
                                    let barColor = "bg-blue-400";
                                    if (isTop) barColor = "bg-gradient-to-r from-[#06B6D4] to-[#4B6EF5]";
                                    if (isBottom) barColor = "bg-slate-300";

                                    return (
                                        <div key={idx} className="relative pt-1">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className={`text-sm font-bold ${isTop ? 'text-blue-700' : isBottom ? 'text-slate-500' : 'text-slate-700'}`}>{p.name}</span>
                                                <span className={`text-sm font-extrabold ${isTop ? 'text-blue-700' : isBottom ? 'text-slate-500' : 'text-slate-800'}`}>{formatINR(p.hourlyRate)} <span className="text-[10px] font-semibold text-slate-400">/hr</span></span>
                                            </div>
                                            <div className="w-full bg-slate-200/50 rounded-full h-3">
                                                <div className={`${barColor} h-3 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {insightComponent}

                            <p className="text-[10px] text-slate-400 mt-6 leading-relaxed">
                                Assumption: This calculator measures revenue per chair-hour only. It does not account for material costs, lab fees, or procedure complexity. Use it as a relative comparison, not an absolute profit figure. Source: Average dental procedure durations based on Indian Dental Association clinical time guidelines.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {hasRanked && (
                <div className="mt-12 bg-white border border-slate-200 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold text-[#0D1B2A] mb-1">Cue360 shows you this breakdown automatically — updated every day.</h4>
                        <p className="text-slate-500">Know which procedures to prioritise. See your real revenue mix in your Practice Intel dashboard.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <button onClick={() => goToContact('Book a Demo - Procedure Ranker')} data-cta="demo" data-cta-tool="procedure_profit_ranker" className="text-slate-600 font-semibold hover:text-blue-600 transition-colors px-4 py-2">Book a Demo Instead</button>
                        <button onClick={() => goToContact('Start Free Trial - Procedure Ranker')} data-cta="trial" data-cta-tool="procedure_profit_ranker" className="bg-[#4B6EF5] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">Start Free 14-Day Trial</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProcedureProfitRanker;
