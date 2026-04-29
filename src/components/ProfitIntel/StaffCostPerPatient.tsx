import React, { useState } from 'react';
import { useNavigateToContact } from '../../hooks/useNavigateToContact';
import { handleShare as shareContent } from '../../utils/handleShare';

const StaffCostPerPatient: React.FC = () => {
    const goToContact = useNavigateToContact();
    
    const [staff, setStaff] = useState(3);
    const [salary, setSalary] = useState(18000);
    const [patientsPerDay, setPatientsPerDay] = useState(15);
    const [workingDays, setWorkingDays] = useState(25);
    const [noShowRate, setNoShowRate] = useState(20);

    const formatINR = (value: number) => {
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(value));
    };

    const totalStaffCost = staff * salary;
    const totalPatientsPerMonth = patientsPerDay * workingDays;
    const actualPatientsServed = totalPatientsPerMonth * (1 - (noShowRate / 100));
    
    // Safety check for division by zero
    const staffCostActual = actualPatientsServed > 0 ? totalStaffCost / actualPatientsServed : 0;
    const staffCostZeroNoShows = totalPatientsPerMonth > 0 ? totalStaffCost / totalPatientsPerMonth : 0;
    
    const missedPatients = totalPatientsPerMonth - actualPatientsServed;
    const noShowMonthlyCost = missedPatients * staffCostZeroNoShows;

    const staffCostPerMissedPatient = staffCostZeroNoShows;
    
    let savingsAt10Percent = 0;
    if (noShowRate > 10) {
        savingsAt10Percent = ((noShowRate - 10) / 100) * totalPatientsPerMonth * staffCostActual;
    }

    const handleShare = () => {
        shareContent({
            title: 'Staff Cost Per Patient — Cue360 Clinic Profit Intelligence',
            text: `I just found out my staff cost per patient is ${formatINR(staffCostActual)}, and no-shows are costing my team ${formatINR(noShowMonthlyCost)} per month. See how much your clinic might be leaking 👇`,
            url: 'https://cue360.in/clinic-profit-intelligence',
        });
    };

    return (
        <section id="staff-cost" data-tool-section="staff_cost_per_patient" className="scroll-mt-32">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-3">Staff Cost Per Patient</h2>
                <p className="text-xl text-slate-500">Your staff cost is fixed. Your patients are not. That gap is costing you.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Inputs Area */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
                    {/* Slider 1 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">How many staff members do you employ?</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{staff}</span>
                        </div>
                        <input 
                            type="range" min="1" max="15" step="1" 
                            value={staff} onChange={(e) => setStaff(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 2 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Average monthly salary per person</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{formatINR(salary)}</span>
                        </div>
                        <input 
                            type="range" min="8000" max="60000" step="500" 
                            value={salary} onChange={(e) => setSalary(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                        <p className="text-[11px] text-slate-500 mt-2 font-medium">Include all staff types. Use a rough average across your team.</p>
                    </div>

                    {/* Slider 3 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Patients you see on a typical working day</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{patientsPerDay}</span>
                        </div>
                        <input 
                            type="range" min="5" max="60" step="1" 
                            value={patientsPerDay} onChange={(e) => setPatientsPerDay(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 4 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">Days your clinic is open per month</label>
                            <span className="text-2xl font-black text-[#4B6EF5]">{workingDays}</span>
                        </div>
                        <input 
                            type="range" min="20" max="28" step="1" 
                            value={workingDays} onChange={(e) => setWorkingDays(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B6EF5]"
                        />
                    </div>

                    {/* Slider 5 */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-[#0D1B2A]">What percentage of booked patients do not show up?</label>
                            <span className="text-2xl font-black text-rose-500">{noShowRate}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="50" step="1" 
                            value={noShowRate} onChange={(e) => setNoShowRate(Number(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                    </div>
                </div>

                {/* Results Area */}
                <div data-tool-result="staff_cost_per_patient" className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-extrabold text-[#0D1B2A]">Staff Efficiency Impact</h3>
                        <button onClick={handleShare} data-share-tool="staff_cost_per_patient" className="group text-sm font-bold text-[#4B6EF5] bg-white hover:bg-gradient-to-r hover:from-[#4B6EF5] hover:to-indigo-600 hover:text-white border-2 border-blue-100 hover:border-transparent px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:scale-110 transition-transform"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            Share This Insight
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm shadow-rose-100/50 flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">Staff cost per patient today</span>
                            <span className="text-3xl font-black text-rose-600">{formatINR(staffCostActual)}</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Staff cost if no-shows were zero</span>
                            <span className="text-3xl font-black text-slate-800">{formatINR(staffCostZeroNoShows)}</span>
                        </div>
                        <div className="bg-white border border-rose-200 bg-rose-50/50 rounded-xl p-5 shadow-sm flex flex-col items-center text-center transform scale-105 z-10">
                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 border-b border-rose-200/50 pb-1">Monthly cost of no-shows to your team</span>
                            <span className="text-3xl font-black text-rose-700">{formatINR(noShowMonthlyCost)}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white border-l-4 border-l-slate-400 p-5 rounded-r-xl shadow-sm">
                            <p className="text-slate-700 text-lg leading-relaxed">
                                Every patient who does not show up costs you <strong>{formatINR(staffCostPerMissedPatient)}</strong> in staff wages alone — before you even count lost revenue.
                            </p>
                        </div>

                        {noShowRate > 10 && (
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 border-l-4 border-l-emerald-500 border border-t-emerald-100 border-r-emerald-100 border-b-emerald-100 p-5 rounded-r-xl shadow-sm">
                                <p className="text-slate-800 text-lg leading-relaxed">
                                    If you reduced your no-show rate from <strong>{noShowRate}%</strong> to <strong>10%</strong>, you would save <strong>{formatINR(savingsAt10Percent)}</strong> per month in staff efficiency alone.
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-[10px] text-slate-400 mt-8 leading-relaxed">
                        Assumption: Staff cost per patient is calculated by dividing total monthly staff salaries by total patients served. This is a staff efficiency metric, not total cost per patient. It does not include rent, consumables, utilities, or equipment costs. Reference: Staff salary ranges based on 2024 Indian dental clinic staffing surveys.
                    </p>
                </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-[#0D1B2A] mb-1">Cue360's WhatsApp reminders reduce no-shows by up to 40% — automatically.</h4>
                    <p className="text-slate-600">Fewer empty chairs means your staff cost per patient drops. Every week, automatically.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <button onClick={() => goToContact('See How Reminders Work - Staff Cost')} data-cta="demo" data-cta-tool="staff_cost_per_patient" className="text-slate-600 font-semibold hover:text-[#4B6EF5] transition-colors px-4 py-2">See How Reminders Work</button>
                    <button onClick={() => goToContact('Start Free Trial - Staff Cost')} data-cta="trial" data-cta-tool="staff_cost_per_patient" className="bg-[#4B6EF5] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto">Start Free 14-Day Trial</button>
                </div>
            </div>
        </section>
    );
};

export default StaffCostPerPatient;
