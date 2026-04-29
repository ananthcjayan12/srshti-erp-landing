import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const CaseStudiesCTA: React.FC = () => {
    return (
        <section className="py-12 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                            Curious to see these results in action?
                        </h3>
                        <p className="text-blue-100 font-medium text-lg">
                            We've documented every step of our most successful industrial implementations.
                        </p>
                    </div>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            to="/case-studies" 
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-lg shadow-xl shadow-blue-900/20 hover:bg-slate-50 transition-all"
                        >
                            Explore Case Studies
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesCTA;
