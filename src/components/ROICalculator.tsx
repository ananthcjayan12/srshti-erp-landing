import React, { useState } from 'react';

const ROICalculator: React.FC = () => {
    const [turnover, setTurnover] = useState<number>(100);
    const [wastedHours, setWastedHours] = useState<number>(40);

    const formatINR = (value: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(value));
    };

    const calculateSavings = () => {
        // Industry average: ₹200/hour for skilled manual data entry/checking
        const hourlyCost = 200;
        const laborSavings = wastedHours * hourlyCost * 52;
        
        // Industry average: 2% of turnover is lost to operational inefficiencies (stock outs, overstock, missed billing)
        const efficiencySavings = (turnover * 100000) * 0.02;

        return { laborSavings, efficiencySavings, total: laborSavings + efficiencySavings };
    };

    const { laborSavings, efficiencySavings, total } = calculateSavings();
    const paybackMonths = total > 0 ? Math.ceil((165000 / total) * 12) : 0;

    return (
        <section id="roi-calculator" className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center space-x-2 border border-slate-700/50 rounded-full px-5 py-2 mb-6">
                        <span className="text-xs font-bold text-blue-200 tracking-wider uppercase">Interactive Calculator</span>
                    </div>
                    <h2 className="text-4xl md:text-[3.25rem] font-extrabold tracking-tight mb-4 text-white leading-tight">
                        See how much <span className="text-amber-500">ERPNext</span> saves
                        <br /> your small industry.
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
                    
                    <div className="flex-1 w-full space-y-10">
                        {/* Slider 1 */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">Current Annual Turnover <br/><span className="text-slate-500">₹ Lakhs</span></label>
                                <span className="text-2xl font-black text-blue-600">₹{turnover}L</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1000" 
                                step="10" 
                                value={turnover} 
                                onChange={(e) => setTurnover(Number(e.target.value))} 
                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-3">
                                <span>0</span>
                                <span>1,000</span>
                            </div>
                        </div>

                        {/* Slider 2 */}
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">Wasted Manual Hours/Week <br/><span className="text-slate-500 font-medium normal-case tracking-normal">e.g., Data entry, Tally sync</span></label>
                                <span className="text-2xl font-black text-blue-600">{wastedHours} hr</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="5" 
                                value={wastedHours} 
                                onChange={(e) => setWastedHours(Number(e.target.value))} 
                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-3">
                                <span>0</span>
                                <span>100</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[420px] bg-[#f0fdf4] rounded-2xl p-8 border border-[#dcfce7] flex flex-col justify-center items-center text-center shadow-xl shadow-green-500/10">
                        <p className="text-[13px] font-bold text-[#166534] uppercase tracking-widest mb-4">Estimated Annual Savings</p>
                        <p className="text-5xl font-black text-[#16a34a] mb-6">{formatINR(total)}</p>
                        
                        <div className="w-full space-y-3 mb-6 text-sm font-medium">
                            <div className="flex justify-between items-center text-[#15803d]">
                                <span>Recovered Labor (₹200/hr)</span>
                                <span className="font-bold">{formatINR(laborSavings)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#15803d]">
                                <span>Inventory & Ops Optimization</span>
                                <span className="font-bold">{formatINR(efficiencySavings)}</span>
                            </div>
                        </div>

                        <div className="w-full border-t border-[#bbf7d0] pt-6 space-y-3">
                            <div className="flex justify-between items-center text-slate-700 text-sm">
                                <span>One-time Investment</span>
                                <span className="font-bold">₹1,65,000</span>
                            </div>
                            <div className="flex justify-between items-center text-[#166534] text-base font-black bg-green-200/50 p-3 rounded-xl">
                                <span>Payback Period</span>
                                <span>{paybackMonths > 0 ? `${paybackMonths} Months` : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="max-w-4xl mx-auto mt-12 text-center border border-slate-700/50 bg-slate-800/30 rounded-2xl p-6">
                    <p className="text-sm text-slate-300">
                        <span className="font-bold text-blue-400">Statistical Backing:</span> Research shows small manufacturers lose <strong>3-5% of their revenue</strong> to operational inefficiencies (stock-outs, overstocking, manual billing errors). Furthermore, skilled resources spend on average <strong>15-20 hours a week</strong> on redundant data entry tasks. This calculator models these industry-average inefficiencies against a base hourly rate of ₹200.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
