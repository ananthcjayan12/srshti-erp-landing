import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Calculator, Activity, ArrowRightLeft } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const FeatureCard = ({ title, desc, icon: Icon, colorClass, bgClass }: any) => (
    <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3 bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden relative p-8 flex flex-col min-h-[250px]">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${colorClass} ${bgClass}`}>
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bricolage font-[800] tracking-[-0.03em] text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 font-dmsans text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

const Features: React.FC = () => {
    return (
        <section id="features" className="bg-white relative">
            <div className="max-w-[1200px] mx-auto py-[80px] px-[24px]">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bricolage font-[800] text-slate-900 tracking-[-0.03em] leading-[1.05]">
                        Everything you need to scale your factory. <br />
                        <span className="text-slate-300">Nothing you don't.</span>
                    </h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[24px]"
                >
                    <FeatureCard title="Accounting & Indian GST" desc="Full Indian GST compliance, Chart of Accounts, Profit/Loss." icon={Calculator} colorClass="text-blue-600" bgClass="bg-blue-50" />
                    <FeatureCard title="Inventory & Warehouse" desc="Real-time stock, multi-warehouse, valuation (FIFO/Moving Average)." icon={Settings} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
                    <FeatureCard title="Manufacturing & BOM" desc="Multi-level BOM, Job Cards, Workstations, Production Planning." icon={Activity} colorClass="text-amber-600" bgClass="bg-amber-50" />
                    <FeatureCard title="Sales & Purchase" desc="Quotations, Sales Orders, Purchase Orders, Delivery Notes." icon={ArrowRightLeft} colorClass="text-indigo-600" bgClass="bg-indigo-50" />
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
