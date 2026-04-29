import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { CheckCircleIcon, ArrowTrendingUpIcon, ChartBarSquareIcon, ClockIcon } from '@heroicons/react/24/solid';

const CaseStudiesPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 bg-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-xs uppercase tracking-widest mb-6">
                            Verified Impact Reports
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">
                            We Don't Just Implement.<br/> <span className="text-amber-400">We Multiply Revenue.</span>
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed font-medium">
                            Read our deep-dive implementation reports. Witness how we transformed operations for manufacturing, retail, and healthcare by turning chaotic processes into predictable, scalable profit engines.
                        </p>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">
                    
                    {/* Case Study 1: ICC Cables */}
                    <motion.article 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-200"
                    >
                        <div className="mb-12 border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest rounded">Manufacturing</span>
                                <span className="text-slate-400 font-bold text-sm">Case Study #01</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                ICC Cables: Achieving 99.9% BOM Accuracy & Eradicating Production Bottlenecks
                            </h2>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                How a leading cable manufacturer scaled their production capacity by 45% simply by digitizing their supply chain and work order routing through ERPNext.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <ArrowTrendingUpIcon className="w-10 h-10 text-blue-600 mb-4" />
                                <span className="text-4xl font-black text-slate-900 mb-2">45%</span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Production Output</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <ChartBarSquareIcon className="w-10 h-10 text-blue-600 mb-4" />
                                <span className="text-4xl font-black text-slate-900 mb-2">₹12.5L</span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Wastage Saved / Qtr</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <ClockIcon className="w-10 h-10 text-blue-600 mb-4" />
                                <span className="text-4xl font-black text-slate-900 mb-2">99.9%</span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Inventory Precision</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-sm">!</span>
                                    The Crisis
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                                    Before Srshti, ICC relied on a fragmented mix of Excel sheets and legacy Tally systems. Procurement managers had zero visibility into real-time shop-floor consumption. 
                                </p>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    This resulted in massive raw material stockpiling (tying up working capital) while simultaneously causing frequent stock-outs of critical micro-components, halting entire production lines for days.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm">✓</span>
                                    The Architecture
                                </h3>
                                <ul className="space-y-4">
                                    {['Multi-level BOM configuration for 400+ SKUs', 'Automated Material Requests triggered by Sales Orders', 'Workstation mapping & Capacity Planning', 'Real-time Quality Inspection gates'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 font-semibold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                            <h4 className="text-white font-bold text-lg mb-6">Engineered Production Workflow</h4>
                            <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between relative">
                                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
                                {['Sales Order Intake', 'Auto Material Request', 'BOM & Work Order Routing', 'Shop Floor Operations', 'Automated Costing'].map((step, idx) => (
                                    <div key={idx} className="relative z-10 flex-1 bg-slate-800 border border-slate-700 p-4 rounded-xl text-center shadow-lg">
                                        <div className="w-8 h-8 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center font-black text-xs mb-3 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                            {idx + 1}
                                        </div>
                                        <p className="text-white font-bold text-sm">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.article>

                    {/* Case Study 2: Blush & Glow */}
                    <motion.article 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-rose-900/5 border border-slate-200"
                    >
                        <div className="mb-12 border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-rose-100 text-rose-700 font-bold text-xs uppercase tracking-widest rounded">Retail & Rental</span>
                                <span className="text-slate-400 font-bold text-sm">Case Study #02</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                Blush & Glow: 3x Faster Checkouts & Zero Inventory Leakage
                            </h2>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Engineering a flawless POS rental system that handles booking, deposits, quality checks, and real-time accounting reconciliation without dropping a single record.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <span className="text-4xl font-black text-rose-600 mb-2">3x</span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Faster POS Billing</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <span className="text-4xl font-black text-rose-600 mb-2">0</span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Lost Rental Items</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                                <span className="text-4xl font-black text-rose-600 mb-2">100%</span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Deposit Reconciliation</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">The Complexity</h3>
                                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                                    Rental businesses are notoriously difficult to track. Blush & Glow had to manage walk-in customers, upfront deposit collections, return tracking, damage assessments, and final invoicing. 
                                </p>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    Their accountants were spending weekends matching POS cash to bank statements and manually tracking raw material purchases for their custom tailoring wing.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution</h3>
                                <p className="text-slate-600 leading-relaxed font-medium mb-6">
                                    We deployed a highly customized ERPNext environment where the Point of Sale instantly generates backend accounting ledger entries. A specialized "Rental Status" workflow was built on top of standard inventory.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-slate-700 font-bold"><CheckCircleIcon className="w-5 h-5 text-rose-500" /> Walk-in POS tailored for Rentals</li>
                                    <li className="flex items-center gap-2 text-slate-700 font-bold"><CheckCircleIcon className="w-5 h-5 text-rose-500" /> Automated Security Deposit Ledgers</li>
                                    <li className="flex items-center gap-2 text-slate-700 font-bold"><CheckCircleIcon className="w-5 h-5 text-rose-500" /> Damage & Repair Costing Engine</li>
                                </ul>
                            </div>
                        </div>
                    </motion.article>

                    {/* Case Study 3: Pooja's Smilecraft */}
                    <motion.article 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-teal-900/5 border border-slate-200"
                    >
                        <div className="mb-12 border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-teal-100 text-teal-700 font-bold text-xs uppercase tracking-widest rounded">Healthcare</span>
                                <span className="text-slate-400 font-bold text-sm">Case Study #03</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                Pooja's Smilecraft: Automating Multi-Chair Operations & Patient Retention
                            </h2>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Transforming an overwhelmed dental practice into a highly efficient machine with zero revenue leakage and automated WhatsApp patient communication.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Performance Indicators</h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="text-slate-600">No-show Rate Drop</span>
                                            <span className="text-teal-600">40%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="text-slate-600">Patient Retention Increase</span>
                                            <span className="text-teal-600">30%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="text-slate-600">Admin Hours Saved/Week</span>
                                            <span className="text-teal-600">15 hrs</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">The Implementation</h3>
                                <p className="text-slate-600 leading-relaxed font-medium mb-6">
                                    Healthcare operations leak revenue when follow-ups are missed and chairs sit empty. We configured ERPNext to act as a specialized clinic management system. 
                                </p>
                                <p className="text-slate-600 leading-relaxed font-medium mb-6">
                                    By building custom integrations via webhooks, the ERP system now automatically texts patients on WhatsApp 24 hours prior to their appointment, captures confirmations, processes invoices instantly post-treatment, and updates ledger accounts in the background.
                                </p>
                            </div>
                        </div>
                    </motion.article>

                    {/* CTA */}
                    <div className="text-center py-12">
                        <h3 className="text-3xl font-black text-slate-900 mb-6">Ready to see these numbers in your business?</h3>
                        <Link to="/#contact" className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:-translate-y-1 transition-all text-lg">
                            Request Your Free Audit
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default CaseStudiesPage;
