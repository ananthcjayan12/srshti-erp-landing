import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { handleShare } from '../../utils/handleShare';

const SalaryCalc: React.FC = () => {
  const [collections, setCollections] = useState<number>(250000);
  const [expenses, setExpenses] = useState<number>(110000);
  const [workingDays, setWorkingDays] = useState<number>(24);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);

  const monthlyNetIncome = (collections || 0) - (expenses || 0);
  const totalWorkingHours = workingDays * hoursPerDay;
  const effectiveHourlyRate = totalWorkingHours > 0 ? Math.max(0, Math.round(monthlyNetIncome / totalWorkingHours)) : 0;

  const associateAvg = 550;
  const seniorAvg = 750;

  // Render variables for dynamic max width in bar chart
  const maxChartVal = Math.max(effectiveHourlyRate, seniorAvg, associateAvg) * 1.1; // 10% headroom

  // Scenarios for secondary insight
  const lessExpensesHourly = Math.round(((collections || 0) - ((expenses || 0) * 0.9)) / totalWorkingHours);
  const moreRevenueHourly = Math.round((((collections || 0) * 1.1) - (expenses || 0)) / totalWorkingHours);

  const handleShareTool = () => {
    handleShare({
      title: 'Invisible Salary Calculator — Cue360',
      text: `You NEED to try this 👀 It literally shows you what you actually earn per hour as a clinic owner after all expenses. Free, takes 2 mins, and honestly eye-opening. Best free dental finance tool I've found 🦷`,
      url: 'https://cue360.in/dental-toolkit#salary-calculator',
    });
  };

  const handleShareResult = () => {
    handleShare({
      title: 'My Invisible Salary Result — Cue360',
      text: `My effective hourly income as a clinic owner is ₹${effectiveHourlyRate}/hour. What's yours? Calculate it free with the Cue360 Invisible Salary Calculator 👇`,
      url: 'https://cue360.in/dental-toolkit#salary-calculator',
    });
  };

  return (
    <div id="salary-calculator" className="scroll-mt-32 max-w-5xl mx-auto py-12 md:py-20 border-b border-slate-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-3">
            The Invisible Salary Calculator
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            You own the risk. Are you earning the reward?
          </p>
        </div>
        <button 
          onClick={handleShareTool}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors shrink-0"
        >
          <Share2 className="w-4 h-4" />
          Share This Tool
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* INPUTS PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0D1B2A] mb-1">
                Your clinic's total monthly revenue (₹)
              </label>
              <input
                type="number"
                value={collections || ''}
                onChange={(e) => setCollections(Number(e.target.value))}
                placeholder="250000"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-[#0D1B2A] font-semibold focus:ring-2 focus:ring-[#4B6EF5] focus:border-transparent transition-all outline-none"
              />
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Use your last 3-month average for a more accurate result.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0D1B2A] mb-1">
                Total monthly clinic expenses (₹)
              </label>
              <input
                type="number"
                value={expenses || ''}
                onChange={(e) => setExpenses(Number(e.target.value))}
                placeholder="110000"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-[#0D1B2A] font-semibold focus:ring-2 focus:ring-[#4B6EF5] focus:border-transparent transition-all outline-none"
              />
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Include everything you pay out — staff salaries, rent, supplies, utilities, loan EMIs, software, and any other regular cost.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="flex justify-between items-center text-sm font-bold text-[#0D1B2A] mb-3">
                <span>Days you personally work per month</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[#4B6EF5]">{workingDays} days</span>
              </label>
              <input
                type="range"
                min="18"
                max="28"
                value={workingDays}
                onChange={(e) => setWorkingDays(Number(e.target.value))}
                className="w-full accent-[#4B6EF5]"
              />
            </div>

            <div>
              <label className="flex justify-between items-center text-sm font-bold text-[#0D1B2A] mb-3">
                <span>Hours you work on a typical day</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[#4B6EF5]">{hoursPerDay} hrs</span>
              </label>
              <input
                type="range"
                min="4"
                max="14"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full accent-[#4B6EF5]"
              />
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Include administration and planning time outside clinic hours.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col justify-center">
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-600 mb-1">Your effective hourly income</h3>
            <div className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A]">
              ₹{effectiveHourlyRate.toLocaleString('en-IN')}<span className="text-xl md:text-2xl text-slate-400 font-medium"> / hour</span>
            </div>
          </div>

          {/* Callouts */}
          <div className="mb-8">
            {effectiveHourlyRate < 550 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 text-sm leading-relaxed">
                <strong className="block mb-1 text-amber-800">Below Salary Parity</strong>
                You are currently earning less per hour than a salaried associate dentist — without the security of a fixed salary, and while carrying the full risk of running a business. This is not unusual for growing clinics, but it is important to see clearly.
              </div>
            )}
            {effectiveHourlyRate >= 550 && effectiveHourlyRate <= 900 && (
              <div className="bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-4 text-sm leading-relaxed shadow-sm">
                <strong className="block mb-1 text-slate-900">At Senior Parity</strong>
                You are earning in line with senior salaried dentists. Your ownership premium — the extra you earn for carrying business risk — is currently <strong className="text-[#0D1B2A]">₹{Math.abs(effectiveHourlyRate - seniorAvg)}/hour</strong> versus a typical corporate role. As your clinic grows, this gap should widen significantly.
              </div>
            )}
            {effectiveHourlyRate > 900 && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg p-4 text-sm leading-relaxed shadow-sm">
                <strong className="block mb-1 text-emerald-800">Healthy Ownership Premium</strong>
                You are earning a meaningful ownership premium — more than a salaried dentist in a comparable role. Focus now is on protecting and scaling this.
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="space-y-4 mb-8">
            <div className="space-y-1 relative">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Your Rate</span>
                <span>₹{effectiveHourlyRate}</span>
              </div>
              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${effectiveHourlyRate > seniorAvg ? 'bg-emerald-500' : effectiveHourlyRate < associateAvg ? 'bg-amber-500' : 'bg-[#4B6EF5]'}`}
                  style={{ width: `${Math.min(100, (effectiveHourlyRate / maxChartVal) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1 relative">
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>Corporate Chain Senior (Avg)</span>
                <span>₹{seniorAvg}</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 rounded-full"
                  style={{ width: `${(seniorAvg / maxChartVal) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1 relative">
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>Associate Dentist (Avg)</span>
                <span>₹{associateAvg}</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 rounded-full"
                  style={{ width: `${(associateAvg / maxChartVal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Secondary Insight */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6">
            <h4 className="font-bold text-[#0D1B2A] text-sm mb-2 flex items-center gap-2">
              <span className="text-[#06B6D4]">✦</span> The Leverage Effect
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you reduced your expenses by <strong className="text-slate-900">10%</strong>, your effective hourly rate would rise to <strong className="text-[#4B6EF5]">₹{lessExpensesHourly}</strong>. If you increased revenue by <strong className="text-slate-900">10%</strong>, it would rise to <strong className="text-[#4B6EF5]">₹{moreRevenueHourly}</strong>.
            </p>
          </div>

          <button 
            onClick={handleShareResult}
            className="w-full py-3 bg-white border border-slate-300 text-[#0D1B2A] font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            Share Your Result
          </button>
        </div>
      </div>

      <div className="mt-8 bg-[#F8FAFC] rounded-xl p-6 border border-slate-200">
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          <strong>Assumption Note:</strong> Effective hourly rate is calculated as (monthly revenue minus monthly expenses) divided by total working hours. This is a simplified measure of owner income and does not account for tax, depreciation, equipment costs amortised over time, or unpaid hours spent on administration outside clinic hours. Benchmark salaries sourced from the Indian Dental Association Compensation Survey 2023 and Practo Dentist Salary Report 2024.
        </p>

        <div className="bg-[#0D1B2A] rounded-lg p-5 flex flex-col md:flex-row sm:items-center justify-between gap-4 shadow-lg text-white">
          <div>
            <h5 className="font-bold text-white text-sm md:text-base">Ready to level up your clinic?</h5>
            <p className="text-slate-300 text-sm mt-1">
              Cue360's Practice Intel dashboard shows your real profit margin, monthly trends, and per-day earnings — automatically updated.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
             <a 
              href="https://dent.cue360.in/" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-bold text-[#0D1B2A] bg-white hover:bg-slate-100 px-5 py-2.5 rounded-lg transition-colors text-center"
            >
              Start Free 14-Day Trial
            </a>
            <a 
              href="/#contact" 
              className="text-sm font-bold text-white hover:text-slate-200 border border-white/20 hover:border-white/40 bg-white/5 px-5 py-2.5 rounded-lg transition-colors text-center"
            >
              Book a 15-Minute Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalc;
