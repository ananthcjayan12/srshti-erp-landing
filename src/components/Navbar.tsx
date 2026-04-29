import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useNavigateToContact } from '../hooks/useNavigateToContact';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const goToContact = useNavigateToContact();
    const navigate = useNavigate();
    const location = useLocation();

    /** Navigate to a homepage section (e.g. /#pricing) from any page */
    const scrollToSection = useCallback((e: React.MouseEvent, href: string) => {
        e.preventDefault();
        const sectionId = href.replace('/#', '');

        const doScroll = () => {
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        if (location.pathname === '/') {
            // Already on homepage — just scroll
            doScroll();
        } else {
            // Navigate to homepage first, then scroll after DOM mounts
            navigate('/');
            setTimeout(doScroll, 400);
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks: { name: string, href: string, isNew?: boolean, isPro?: boolean }[] = [
        { name: 'Case Studies', href: '/case-studies', isNew: true },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'ROI Calculator', href: '/#roi-calculator' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`sticky top-0 w-full z-[1000] transition-all duration-300 ${isScrolled || mobileMenuOpen
                    ? 'glass shadow-md border-b border-white/20'
                    : 'bg-transparent'
                    }`}
            >
                <div className="w-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
                    {/* Logo - Left */}
                    <Link
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                        className="flex items-center gap-2 cursor-pointer z-50 shrink-0"
                    >
                        <span className="text-2xl font-black tracking-tight text-slate-900">Srshti</span>
                    </Link>

                    {/* Centered Desktop Nav */}
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-4 xl:gap-10 px-4 min-w-0">
                        {navLinks.map(link => (
                            link.href.startsWith('/#') ? (
                                <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-sm font-semibold text-slate-900 hover:text-dental-600 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer">
                                    {link.name}
                                    {link.isNew && <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider shadow-sm">New</span>}
                                    {link.isPro && <span className="px-1.5 py-px rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200/60 text-[8px] font-bold uppercase tracking-wider">Pro</span>}
                                </a>
                            ) : (
                                <Link key={link.name} to={link.href} className="text-sm font-semibold text-slate-900 hover:text-dental-600 transition-colors whitespace-nowrap flex items-center gap-1.5">
                                    {link.name}
                                    {link.isNew && <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider shadow-sm">New</span>}
                                    {link.isPro && <span className="px-1.5 py-px rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200/60 text-[8px] font-bold uppercase tracking-wider">Pro</span>}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Right Area - CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4 shrink-0 z-[1000]">
                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <button
                                onClick={() => goToContact('Request Demo')}
                                className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
                            >
                                Request Demo
                            </button>
                            <button
                                onClick={() => goToContact('Get a Quote')}
                                className="bg-blue-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
                            >
                                Get a Quote
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden lg:hidden"
                        >
                            <div className="mx-4 mb-4 p-4 space-y-4 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl">
                                <div className="flex flex-col gap-2">
                                    {navLinks.map(link => (
                                        link.href.startsWith('/#') ? (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, link.href); }}
                                                className="flex items-center gap-2 text-slate-900 font-bold text-lg py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-dental-600 transition-all cursor-pointer"
                                            >
                                                {link.name}
                                                <div className="ml-auto flex items-center gap-2">
                                                    {link.isNew && <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider">New</span>}
                                                    {link.isPro && <span className="px-1.5 py-px rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200/60 text-[8px] font-bold uppercase tracking-wider">Pro</span>}
                                                </div>
                                            </a>
                                        ) : (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center gap-2 text-slate-900 font-bold text-lg py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-dental-600 transition-all"
                                            >
                                                {link.name}
                                                <div className="ml-auto flex items-center gap-2">
                                                    {link.isNew && <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider">New</span>}
                                                    {link.isPro && <span className="px-1.5 py-px rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200/60 text-[8px] font-bold uppercase tracking-wider">Pro</span>}
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Mobile Bottom CTA Bar */}
            <div
                className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[1000] flex gap-3"
                style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
                <button
                    onClick={() => goToContact('View Pricing')}
                    className="flex-1 bg-white border-2 border-slate-900 text-slate-900 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                    View Pricing
                </button>
                <button
                    onClick={() => goToContact('Get a Quote')}
                    className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                    Get a Quote
                </button>
            </div>
        </>
    );
};

export default Navbar;
