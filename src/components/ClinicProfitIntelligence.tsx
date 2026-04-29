import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProcedureProfitRanker from './ProfitIntel/ProcedureProfitRanker';
import StaffCostPerPatient from './ProfitIntel/StaffCostPerPatient';
import DeadHoursDetector from './ProfitIntel/DeadHoursDetector';
import RecallRevenueLeak from './ProfitIntel/RecallRevenueLeak';
import PatientBreakEven from './ProfitIntel/PatientBreakEven';
import { useNavigateToContact } from '../hooks/useNavigateToContact';

const ClinicProfitIntelligence: React.FC = () => {
    const goToContact = useNavigateToContact();

    useEffect(() => {
        window.scrollTo(0, 0);

        // Dynamic SEO Meta
        document.title = "Free Clinic Profit Calculators — Find Hidden Revenue Leaks | Cue360";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Free diagnostic tools to find where your dental clinic is losing money. Calculate procedure profit, staff cost per patient, dead hours, recall revenue leak, and break-even point. No login required.");
        }

        // Set canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', 'https://cue360.in/clinic-profit-intelligence');
        }

        // Set OG URL
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', 'https://cue360.in/clinic-profit-intelligence');
        }

        // FAQPage structured data
        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Are these profit calculator tools free to use?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, completely free. You can use them as often as you like to check the financial health of your clinic."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is my data saved or shared?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. All calculations happen entirely in your browser. We do not save, track, or share the numbers you enter into these calculators."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate are the calculations?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The tools use standard business logic and averages derived from the Indian Dental Association (IDA) surveys. However, they are diagnostic estimations, not formal accounting tools."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is chair utilisation and why does it matter?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Chair utilisation is the percentage of your clinic's open hours that a patient is actually seated and generating revenue. Since most of your costs are fixed, low utilisation directly eats your profit margin."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does Cue360 help fix the problems these tools reveal?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Cue360 automates WhatsApp reminders to cut no-shows, provides a unified calendar to fill dead hours, runs automated patient recall sequences, and gives you a dashboard that tracks your real-time procedure revenue mix."
                    }
                }
            ]
        };

        const script = document.createElement('script');
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(faqData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // ═══════════════════════════════════════════════════════════════════
    // META PIXEL — BEHAVIOURAL EVENT TRACKING (SPA-compatible)
    // Runs inside useEffect so it executes AFTER React has rendered
    // all child components and the DOM elements actually exist.
    // ═══════════════════════════════════════════════════════════════════
    useEffect(() => {
        const fbq = (window as any).fbq;
        if (typeof fbq !== 'function') {
            console.warn('[Cue360 Pixel] fbq not found — Meta Pixel base code may not be loaded.');
            return;
        }

        // ── Utility ──────────────────────────────────────────────────────
        const _fired: Record<string, boolean> = {};
        const _timers: Record<string, number> = {};
        const _started = Date.now();

        function fire(eventName: string, params?: Record<string, any>, dedupKey?: string) {
            if (dedupKey && _fired[dedupKey]) return;
            if (dedupKey) _fired[dedupKey] = true;
            fbq('trackCustom', eventName, params || {});
            console.log('[Cue360 Pixel]', eventName, params);
        }

        function timeOnPage(): number {
            return Math.round((Date.now() - _started) / 1000);
        }

        // Collect all cleanup functions
        const cleanups: (() => void)[] = [];

        // ── ① PAGE QUALITY SIGNAL (15s engaged visit) ────────────────────
        const engagedTimer = setTimeout(() => {
            fire('CPI_EngagedVisit', {
                content_name: 'clinic_profit_intelligence',
                time_on_page: 15
            }, 'engaged_visit');
        }, 15000);
        cleanups.push(() => clearTimeout(engagedTimer));

        // ── ② TOOL CARD CLICK ────────────────────────────────────────────
        const handleToolCardClick = (e: Event) => {
            const card = (e.target as HTMLElement).closest('[data-tool-card]');
            if (!card) return;
            const toolName = card.getAttribute('data-tool-card');
            fire('CPI_ToolSelected', {
                tool_name: toolName,
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            });
        };
        document.addEventListener('click', handleToolCardClick);
        cleanups.push(() => document.removeEventListener('click', handleToolCardClick));

        // ── ③ TOOL INTERACTION START ─────────────────────────────────────
        const toolStarted: Record<string, boolean> = {};
        const handleToolInput = (e: Event) => {
            const section = (e.target as HTMLElement).closest('[data-tool-section]');
            if (!section) return;
            const toolName = section.getAttribute('data-tool-section')!;
            if (toolStarted[toolName]) return;
            toolStarted[toolName] = true;
            _timers[toolName] = Date.now();
            fire('CPI_ToolInteractionStart', {
                tool_name: toolName,
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            });
        };
        document.addEventListener('input', handleToolInput);
        cleanups.push(() => document.removeEventListener('input', handleToolInput));

        // ── ④ TOOL RESULT SEEN (IntersectionObserver) ────────────────────
        // Small delay to let child components finish rendering
        const observers: IntersectionObserver[] = [];
        const resultObserverTimer = setTimeout(() => {
            const resultBlocks = document.querySelectorAll('[data-tool-result]');
            if (!resultBlocks.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const toolName = entry.target.getAttribute('data-tool-result')!;
                    const engageSecs = _timers[toolName]
                        ? Math.round((Date.now() - _timers[toolName]) / 1000)
                        : 0;
                    fire('CPI_ToolResultSeen', {
                        tool_name: toolName,
                        content_name: 'clinic_profit_intelligence',
                        engagement_secs: engageSecs,
                        time_on_page: timeOnPage()
                    }, 'result_seen_' + toolName);
                });
            }, { threshold: 0.5 });

            resultBlocks.forEach((block) => observer.observe(block));
            observers.push(observer);
        }, 500);
        cleanups.push(() => clearTimeout(resultObserverTimer));

        // ── ⑤ SHARE BUTTON CLICK ────────────────────────────────────────
        const handleShareClick = (e: Event) => {
            const shareBtn = (e.target as HTMLElement).closest('[data-share-tool]');
            if (!shareBtn) return;
            const toolName = shareBtn.getAttribute('data-share-tool');
            fire('CPI_ResultShared', {
                tool_name: toolName,
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            });
        };
        document.addEventListener('click', handleShareClick);
        cleanups.push(() => document.removeEventListener('click', handleShareClick));

        // ── ⑥ CTA CLICK — TRIAL ─────────────────────────────────────────
        const handleTrialClick = (e: Event) => {
            const trialBtn = (e.target as HTMLElement).closest('[data-cta="trial"]');
            if (!trialBtn) return;
            const toolName = trialBtn.getAttribute('data-cta-tool') || 'unknown';
            fbq('track', 'Lead', {
                content_name: 'clinic_profit_intelligence_trial',
                content_category: 'dental_saas',
                currency: 'INR'
            });
            fire('CPI_TrialCTAClick', {
                tool_name: toolName,
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            });
        };
        document.addEventListener('click', handleTrialClick);
        cleanups.push(() => document.removeEventListener('click', handleTrialClick));

        // ── ⑦ CTA CLICK — DEMO ──────────────────────────────────────────
        const handleDemoClick = (e: Event) => {
            const demoBtn = (e.target as HTMLElement).closest('[data-cta="demo"]');
            if (!demoBtn) return;
            const toolName = demoBtn.getAttribute('data-cta-tool') || 'unknown';
            fbq('track', 'Contact', {
                content_name: 'clinic_profit_intelligence_demo',
                content_category: 'dental_saas'
            });
            fire('CPI_DemoCTAClick', {
                tool_name: toolName,
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            });
        };
        document.addEventListener('click', handleDemoClick);
        cleanups.push(() => document.removeEventListener('click', handleDemoClick));

        // ── ⑧ CLOSING SECTION SEEN ──────────────────────────────────────
        const closingObserverTimer = setTimeout(() => {
            const closing = document.querySelector('[data-section="closing-cta"]');
            if (!closing) return;
            const obs = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fire('CPI_FullJourneySeen', {
                        content_name: 'clinic_profit_intelligence',
                        time_on_page: timeOnPage()
                    }, 'full_journey_seen');
                    obs.disconnect();
                }
            }, { threshold: 0.4 });
            obs.observe(closing);
            observers.push(obs);
        }, 500);
        cleanups.push(() => clearTimeout(closingObserverTimer));

        // ── ⑨ FAQ ACCORDION OPEN ────────────────────────────────────────
        const handleFaqClick = (e: Event) => {
            const faqItem = (e.target as HTMLElement).closest('[data-faq-item]');
            if (!faqItem) return;
            const question = faqItem.getAttribute('data-faq-item');
            fire('CPI_FAQOpened', {
                question: question,
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            });
        };
        document.addEventListener('click', handleFaqClick);
        cleanups.push(() => document.removeEventListener('click', handleFaqClick));

        // ── ⑩ EXIT INTENT (desktop only) ─────────────────────────────────
        let exitFired = false;
        const handleMouseLeave = (e: MouseEvent) => {
            if (exitFired || e.clientY > 50) return;
            exitFired = true;
            fire('CPI_ExitIntent', {
                content_name: 'clinic_profit_intelligence',
                time_on_page: timeOnPage()
            }, 'exit_intent');
        };
        document.addEventListener('mouseleave', handleMouseLeave as EventListener);
        cleanups.push(() => document.removeEventListener('mouseleave', handleMouseLeave as EventListener));

        // ── ⑪ SCROLL DEPTH MILESTONES ────────────────────────────────────
        const scrollMilestones: Record<number, boolean> = { 25: false, 50: false, 75: false, 100: false };
        const handleScroll = () => {
            const scrolled = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            [25, 50, 75, 100].forEach((m) => {
                if (!scrollMilestones[m] && scrolled >= m) {
                    scrollMilestones[m] = true;
                    fire('CPI_ScrollDepth', {
                        depth: m,
                        content_name: 'clinic_profit_intelligence',
                        time_on_page: timeOnPage()
                    }, 'scroll_' + m);
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        cleanups.push(() => window.removeEventListener('scroll', handleScroll));

        // ── ⑫ ROI CALCULATOR HANDOFF ─────────────────────────────────────
        const ref = document.referrer || '';
        const href = window.location.href || '';
        const fromROI = ref.includes('cue360.in') || href.includes('utm_source=roi_calculator');
        if (fromROI) {
            fire('CPI_FromROICalculator', {
                content_name: 'clinic_profit_intelligence',
                referrer: ref
            }, 'from_roi_calc');
        }

        console.log('[Cue360 Pixel] CPI behavioural tracking initialised — 12 events active.');

        // ── CLEANUP on unmount ───────────────────────────────────────────
        return () => {
            cleanups.forEach((fn) => fn());
            observers.forEach((obs) => obs.disconnect());
            console.log('[Cue360 Pixel] CPI tracking cleaned up.');
        };
    }, []);

    return (
        <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-blue-200 selection:text-blue-900">
            <Navbar />
            
            {/* HERO SECTION */}
            <section className="relative pt-40 pb-32 px-6 bg-[#0D1B2A] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/40 blur-[120px]"></div>
                    <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#4B6EF5]/20 blur-[150px]"></div>
                </div>
                <div className="max-w-[1000px] mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 shadow-xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-sm md:text-base font-bold text-white tracking-wider uppercase">Free Clinic Profit & Efficiency Calculators</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                        Is your clinic leaking money <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4B6EF5]">without knowing it?</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                        Most dental clinics lose 30–45% of their potential revenue every month — through no-shows, idle chair time, poor procedure mix, and lapsed patients. <strong className="text-white font-semibold">Find out your exact number in 60 seconds.</strong>
                    </p>
                </div>
            </section>

            {/* Sticky Sub Nav */}
            <div className="sticky top-[72px] md:top-[96px] lg:top-[112px] z-[900] bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-[1100px] mx-auto px-4 py-4 md:py-5 flex items-center justify-start md:justify-center gap-6 md:gap-12 overflow-x-auto no-scrollbar">
                    <a href="#procedure-profit" className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">1</span> Procedure Profit</a>
                    <a href="#staff-cost" className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">2</span> Staff Cost</a>
                    <a href="#dead-hours" className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">3</span> Dead Hours</a>
                    <a href="#recall-revenue" className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">4</span> Recall Leak</a>
                    <a href="#break-even" className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">5</span> Break-Even Limit</a>
                </div>
            </div>

            {/* Tools Menu (Grid of Cards) */}
            <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                <div className="max-w-[1100px] mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-4">Choose a Diagnostic Tool to Start</h2>
                        <p className="text-slate-500 text-lg">Pick an area of your practice to run a quick 60-second financial audit.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Procedure Profit */}
                        <a href="#procedure-profit" data-tool-card="procedure_profit_ranker" className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">01</div>
                            <span className="bg-blue-100 text-blue-700 font-extrabold text-xs px-3 py-1 rounded-full mb-4">60 SECONDS</span>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors">Procedure Profit Ranker</h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed">Find out which procedures are actually making you money — and which ones are secretly your worst earners per hour.</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>

                        {/* Staff Cost */}
                        <a href="#staff-cost" data-tool-card="staff_cost_per_patient" className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">02</div>
                            <span className="bg-blue-100 text-blue-700 font-extrabold text-xs px-3 py-1 rounded-full mb-4">60 SECONDS</span>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors">Staff Cost Per Patient</h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed">Calculate what your team actually costs you per patient — and see how no-shows silently inflate that number every single day.</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>

                        {/* Dead Hours */}
                        <a href="#dead-hours" data-tool-card="dead_hours_detector" className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">03</div>
                            <span className="bg-blue-100 text-blue-700 font-extrabold text-xs px-3 py-1 rounded-full mb-4">60 SECONDS</span>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors">Dead Hours Detector</h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed">Discover how many hours per week your clinic is open but not earning — and the exact rupee value of that idle time.</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>

                        {/* Recall Revenue */}
                        <a href="#recall-revenue" data-tool-card="recall_revenue_leak" className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">04</div>
                            <span className="bg-blue-100 text-blue-700 font-extrabold text-xs px-3 py-1 rounded-full mb-4">60 SECONDS</span>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors">Recall Revenue Leak</h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed">Find out how much revenue is sitting uncollected in your existing patient base — from people who simply haven't been followed up.</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>

                        {/* Break Even */}
                        <a href="#break-even" data-tool-card="patient_break_even" className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden md:col-span-2 lg:col-span-1">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">05</div>
                            <span className="bg-blue-100 text-blue-700 font-extrabold text-xs px-3 py-1 rounded-full mb-4">60 SECONDS</span>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors">New Patient Break-Even Limit</h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed">Discover exactly how many patients per day you need to process just to cover your fixed burn rate and survive the month.</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Tools Sections Wrap */}
            <div className="flex flex-col">
                <div className="w-full bg-white relative py-20 border-b border-slate-100">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/2"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <ProcedureProfitRanker />
                    </div>
                </div>

                <div className="w-full bg-slate-50 relative py-20 border-b border-slate-200 shadow-inner">
                    <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[80px] opacity-60 pointer-events-none translate-y-1/4 -translate-x-1/4"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <StaffCostPerPatient />
                    </div>
                </div>

                <div className="w-full bg-white relative py-20 border-b border-slate-100">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-60 pointer-events-none"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <DeadHoursDetector />
                    </div>
                </div>

                <div className="w-full bg-slate-50 relative py-20 border-b border-slate-100">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <RecallRevenueLeak />
                    </div>
                </div>

                <div className="w-full bg-white relative py-20">
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-emerald-50/60 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <PatientBreakEven />
                    </div>
                </div>
            </div>

            {/* Bottom Journey Close */}
            <section data-section="closing-cta" className="bg-[#0D1B2A] py-24 px-6 text-center">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">You have now seen the full picture.</h2>
                    <p className="text-xl text-slate-300 mb-16 leading-relaxed">
                        Most clinics lose between ₹2 and ₹8 lakhs per year to problems that Cue360 solves automatically. No-shows. Dead hours. Lapsed patients. Poor procedure mix.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <button 
                            onClick={() => goToContact('Start Free Trial - Profit Intel')}
                            className="bg-[#4B6EF5] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(75,110,245,0.4)] transition-all transform hover:-translate-y-1 w-full max-w-md"
                            data-cta="trial" data-cta-tool="closing_section"
                        >
                            Start Your Free 14-Day Trial — No Credit Card Required
                        </button>
                        <p className="text-slate-400 font-medium">Or talk to us: <button onClick={() => goToContact('Book a Demo - Profit Intel')} className="text-white underline hover:text-blue-300" data-cta="demo" data-cta-tool="closing_section">Book a 15-minute demo</button></p>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-24 px-6 bg-[#F8FAFC]">
                 <div className="max-w-[800px] mx-auto">
                    <h3 className="text-3xl font-extrabold text-[#0D1B2A] mb-10 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        <details className="group bg-white rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary data-faq-item="are_these_tools_free" className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-800">
                                Are these tools free to use?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                Yes, completely free. You can use them as often as you like to check the financial health of your clinic.
                            </div>
                        </details>
                        
                        <details className="group bg-white rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary data-faq-item="is_data_saved" className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-800">
                                Is my data saved or shared?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                No. All calculations happen entirely in your browser. We do not save, track, or share the numbers you enter into these calculators.
                            </div>
                        </details>
                        
                        <details className="group bg-white rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary data-faq-item="how_accurate" className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-800">
                                How accurate are the calculations?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                The tools use standard business logic and averages derived from the Indian Dental Association (IDA) surveys. However, they are diagnostic estimations, not formal accounting tools. They identify leaks, but your chartered accountant should verify exact profits.
                            </div>
                        </details>

                        <details className="group bg-white rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary data-faq-item="need_cue360_account" className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-800">
                                Do I need to be a Cue360 user to use these tools?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                No. These tools are open to all clinic owners. If you want Cue360 to track and fix these metrics automatically for you, you can start a free trial any time.
                            </div>
                        </details>

                        <details className="group bg-white rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary data-faq-item="what_is_chair_utilisation" className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-800">
                                What is chair utilisation and why does it matter?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                Chair utilisation is the percentage of your clinic's open hours that a patient is actually seated and generating revenue. Since most of your costs (rent, salaries, EMI) are fixed, low utilisation directly eats your profit margin.
                            </div>
                        </details>

                        <details className="group bg-white rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary data-faq-item="how_cue360_fixes_this" className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-800">
                                How does Cue360 help fix the problems these tools reveal?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                Cue360 automates WhatsApp reminders to cut no-shows, provides a unified calendar to fill dead hours, runs automated patient recall sequences, and gives you a dashboard that tracks your real-time procedure revenue mix.
                            </div>
                        </details>
                    </div>
                 </div>
            </section>

            <Footer />
        </div>
    );
};

export default ClinicProfitIntelligence;
