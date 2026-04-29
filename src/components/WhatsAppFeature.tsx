import React from 'react';
import { ArrowRight, Settings, Calculator, Activity, ArrowRightLeft } from 'lucide-react';
import { useNavigateToContact } from '../hooks/useNavigateToContact';

const OperationalChaos: React.FC = () => {
    const goToContact = useNavigateToContact();
    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column - Text Content */}
                    <div className="max-w-xl">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
                            ERPNext Implementation
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                            Eliminate Operational Chaos. Starting Today.
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            Ditch manual entry and silos. Consolidate systems. 
                            Seamlessly integrate your entire workflow on a single platform.
                        </p>

                        <div className="space-y-8 mb-10">
                            {/* Benefit 1 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 border border-blue-100">
                                    <Settings className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">No more manual data entry</h4>
                                    <p className="text-slate-600 mt-1">Automate repetitive tasks and reduce errors</p>
                                </div>
                            </div>
                            
                            {/* Benefit 2 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 border border-emerald-100">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Real-time Visibility</h4>
                                    <p className="text-slate-600 mt-1">Instantly know where your stock and cash flows are</p>
                                </div>
                            </div>

                            {/* Benefit 3 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-600 border border-amber-100">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Predictable Costs</h4>
                                    <p className="text-slate-600 mt-1">Fixed implementation pricing, no hidden fees</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => goToContact('Request Demo')} 
                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-md px-1"
                        >
                            See how it works
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Right Column - Cards */}
                    <div className="relative mx-auto w-full grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <Settings className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-slate-900">Manufacturing Automation</h4>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center mt-8">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <Calculator className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-slate-900">GST / Accounting</h4>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center -mt-8">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
                                <Activity className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-slate-900">Production Workflow</h4>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <ArrowRightLeft className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-slate-900">Sales / Purchase Flow</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OperationalChaos;
