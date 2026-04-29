import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useNavigateToContact } from '../hooks/useNavigateToContact';

const Pricing: React.FC = () => {
    const goToContact = useNavigateToContact();
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">Transparent Pricing</p>
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Practical quotation model for your growth</h2>
                    <p className="text-slate-500">Fixed cost implementation. No hidden surprises.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">

                    {/* Lean Plan */}
                    <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col hover:border-blue-200 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Lean</h3>
                        <div className="mb-2 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-slate-900">₹1,25,000</span>
                        </div>
                        <p className="text-sm italic text-slate-500 mb-8 font-medium">+ GST | Hosting extra at actuals</p>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {['Company & GST Setup', 'Chart of accounts', 'Sales, Purchase, Inventory', 'Master data import', 'Basic Roles & Users', '2-3 Training Sessions', 'Go-live Support'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                    <CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-slate-400 mb-6 border-t pt-4">No custom development, no complex reports, no heavy data cleaning.</p>
                        <button
                            onClick={() => goToContact('Interested in Lean Plan')}
                            className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-colors mt-auto"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Professional Plan - Highlighted */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-200 relative z-10 flex flex-col border border-slate-800"
                    >
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wider">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Professional</h3>
                        <div className="mb-2 flex items-baseline gap-1">
                            <span className="text-4xl font-bold">₹1,65,000</span>
                        </div>
                        <p className="text-sm italic text-slate-400 mb-8 font-medium">+ GST | Hosting extra at actuals</p>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {['Everything in Lean', 'BOM & Workstation Setup', 'Manufacturing Module Configuration', 'Purchase-to-stock flow', 'Opening stock migration', 'Basic production reports', '4-5 training sessions', '45-60 days timeline'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm font-medium text-slate-200">
                                    <CheckIcon className="w-5 h-5 text-white flex-shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => goToContact('Interested in Professional Plan')}
                            className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition-colors shadow-lg mt-auto"
                        >
                            Get Professional
                        </button>
                    </motion.div>

                    {/* Custom Plan */}
                    <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col hover:border-blue-200 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Custom</h3>
                        <div className="mb-2 flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-900 mt-2">₹1.75L - ₹2.75L+</span>
                        </div>
                        <p className="text-sm italic text-slate-500 mb-8 font-medium">+ GST | Hosting extra at actuals</p>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {['Everything in Professional', 'Custom print formats (3-5)', 'Custom reports (2-4)', 'Minor workflow customization', 'Role-based approval flow', 'Basic dashboard customization'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                    <CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => goToContact('Interested in Custom Plan')}
                            className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-colors mt-auto"
                        >
                            Talk to Sales
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Pricing;
