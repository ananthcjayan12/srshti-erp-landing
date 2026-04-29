import React from 'react';
import { motion } from 'framer-motion';

const ProcessTimeline: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
                        Process Timeline
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-start justify-between gap-6 max-w-7xl mx-auto w-full relative">
                    {/* Continuous background line for desktop */}
                    <div className="hidden lg:block absolute top-3.5 left-0 w-full h-px bg-slate-200 -z-10" />

                    {[
                        { step: 1, title: 'Discovery', desc: 'Current process\nstudy' },
                        { step: 2, title: 'Setup', desc: 'Company, GST, Users' },
                        { step: 3, title: 'Masters', desc: 'Items, Customers,\nBOMs' },
                        { step: 4, title: 'Transactions', desc: 'Sales, Purchase,\nInventory' },
                        { step: 5, title: 'Training', desc: 'Core team training' },
                        { step: 6, title: 'Testing', desc: 'UAT & Corrections' },
                        { step: 7, title: 'Go-live', desc: 'Opening balance,\nSupport' },
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col relative bg-white pr-4 lg:w-32 xl:w-40"
                        >
                            <div className="flex items-center gap-1.5 mb-2">
                                <span className="text-blue-600 font-bold text-lg md:text-xl">{item.step}.</span>
                                <span className="text-slate-900 font-bold text-lg md:text-xl leading-tight whitespace-pre-wrap">{item.title === 'Transactions' ? 'Transactions' : item.title}</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-500 font-medium whitespace-pre-wrap leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex gap-1 text-amber-400 mb-4">
                            {'★★★★★'}
                        </div>
                        <p className="text-slate-700 font-medium mb-6">
                            "The visibility into our inventory and production flow has been game-changing for our manufacturing unit."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">M</div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">National Manufacturing</p>
                                <p className="text-xs text-slate-500">Operations Head</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex gap-1 text-amber-400 mb-4">
                            {'★★★★★'}
                        </div>
                        <p className="text-slate-700 font-medium mb-6">
                            "Clear pricing, no hidden fees, and exactly as promised. The ERPNext implementation was smooth."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">P</div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">Pioneer Industries</p>
                                <p className="text-xs text-slate-500">Director</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
