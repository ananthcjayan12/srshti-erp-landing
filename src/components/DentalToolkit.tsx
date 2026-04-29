import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ToothChart from './tools/ToothChart';
import SalaryCalc from './tools/SalaryCalc';
import { FileText, Grid, Wallet, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const DentalToolkit: React.FC = () => {
    useEffect(() => {
        // Handle SEO Meta Tags dynamically
        document.title = "Dental Toolkit — Free Tools for Dentists and Clinics in India | Cue360";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Free dental tools for Indian dentists and clinics. Interactive tooth number chart, dental invoice generator, break-even calculator, and salary calculator. No login required.");
        }

        // Set canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', 'https://cue360.in/dental-toolkit');
        }

        // Set OG URL
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', 'https://cue360.in/dental-toolkit');
        }

        // Schema Markup
        const webAppData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Cue360 Dental Toolkit",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "offers": {
                "@type": "Offer",
                "price": "0"
            }
        };

        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the FDI tooth numbering system?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The FDI World Dental Federation notation is widely used internationally and across India. It assigns a two-digit number to each tooth. The first digit represents the quadrant (1-4 for adults, 5-8 for children), and the second digit denotes the position from the midline (1-8)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the Universal tooth numbering system?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Universal Numbering System is primarily used in the United States. It sequentially numbers adult teeth from 1 to 32, starting with the upper right third molar and ending with the lower right third molar. Primary children's teeth are assigned letters A through T."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do I calculate break-even for a dental clinic?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "To calculate a dental clinic's break-even point, you must sum all fixed monthly expenses including rent, salaries, utilities, and general supplies. You then divide this total fixed cost by your average revenue per patient visit. The result gives you the exact number of new patient visits required each month to cover essential operations without running at a loss."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is a good profit margin for a dental clinic in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A standard profit margin for a moderately established independent dental clinic in India is 30% to 40% before owner compensation and tax. As clinics scale and introduce high-margin procedures such as clear aligners or implants, margins can tighten slightly due to lab fees but overall revenue surges. Achieving and maintaining 35%+ requires diligent patient retention and cost control."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How much does a dental clinic owner earn in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Dental clinic owner earnings in India vary significantly depending on location and experience. A new clinic owner may take home between ₹50,000 to ₹1,00,000 per month, while an established, high-performing clinic owner could earn ₹2,50,000 to ₹5,00,000 or more monthly. These figures depend heavily on business overheads and patient volume."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is dental invoice GST applicable in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "In India, clinical services relating to the diagnosis, treatment, or care for illness, injury, or deformity — which applies to pure dental healthcare — are generally exempt from GST. However, strictly cosmetic dental procedures or the sale of oral care products directly from a clinic may attract GST. It is prudent to consult with a Chartered Accountant to ensure compliance for your specific procedures."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How many patients does a typical dental clinic see per day in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "An average growing dental clinic in an urban Indian center typically sees 5 to 15 patients per day, depending highly on the availability of the principal dentist. Solo practitioners handling multiple chairs efficiently can push this up to 20 visits a day with strong patient follow-ups. Specialized restorative clinics may see fewer patients per day due to longer appointment durations."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the average dental consultation fee in India?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The average dental consultation fee in India ranges between ₹300 and ₹800, depending on the clinic's location, infrastructure, and the dentist's expertise. Premium setups in metro cities may charge upwards of ₹1000 for a detailed first consultation involving full-mouth x-rays and specialized diagnostics."
                    }
                }
            ]
        };

        const script1 = document.createElement('script');
        script1.type = "application/ld+json";
        script1.innerHTML = JSON.stringify(webAppData);
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.type = "application/ld+json";
        script2.innerHTML = JSON.stringify(faqData);
        document.head.appendChild(script2);

        // ============================================================
        // CUE360 — DENTAL TOOLKIT PAGE TRACKING
        // Meta Pixel ID: 787549303968445
        // Page: /dental-toolkit
        // Strategy: Identify user type (student vs clinic owner)
        //           and retarget accordingly
        // ============================================================

        // Fire GA4 page-specific config for this page
        if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('config', 'G-FCZM32STHB', {
                'page_title': 'Dental Toolkit - Practice Hub',
                'page_location': window.location.href,
                'custom_map': {
                    'dimension1': 'user_type',
                    'dimension2': 'tool_used'
                }
            });
        }

        // Fire Meta Pixel PageView for SPA navigation
        if (typeof (window as any).fbq !== 'undefined') {
            (window as any).fbq('track', 'PageView');
        }

        // --- UTILITY: fire Meta + GA4 simultaneously ---
        function trackEvent(metaName: string, metaParams: Record<string, unknown>, ga4Name?: string, ga4Params?: Record<string, unknown>) {
            if (typeof (window as any).fbq !== 'undefined') {
                (window as any).fbq('trackCustom', metaName, metaParams || {});
            }
            if (typeof (window as any).gtag !== 'undefined') {
                (window as any).gtag('event', ga4Name || metaName, ga4Params || metaParams || {});
            }
        }

        // --- UTILITY: detect user type from behaviour ---
        const userSignals = {
            usedSalaryCalc: false,
            enteredRevenue: false,
            usedDentalChart: false,
            usedInvoiceTool: false,
            visitedPricing: false,
            userType: 'unknown' // 'student', 'clinic_owner', 'practising'
        };

        // ============================================================
        // EVENT 1 — PAGE ENGAGED (90 seconds)
        // ============================================================
        const engagementTimer = setTimeout(function() {
            trackEvent(
                'ToolkitPageEngaged',
                {
                    page: 'dental_toolkit',
                    time_spent: '90s',
                    user_type: userSignals.userType
                },
                'toolkit_page_engaged',
                {
                    engagement_time: '90s',
                    page: 'dental_toolkit'
                }
            );
        }, 90000);

        // ============================================================
        // EVENT 2 — TOOL NAVIGATION TAB CLICKED
        // ============================================================
        const tabClickHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim();
            const toolTabs = ['invoice generator', 'fdi tooth chart', 'target salary'];

            toolTabs.forEach(function(tab) {
                if (text.toLowerCase().includes(tab)) {
                    trackEvent(
                        'ToolkitTabClicked',
                        {
                            page: 'dental_toolkit',
                            tab_clicked: text,
                            signal: 'tool_intent_identified'
                        },
                        'toolkit_tab_clicked',
                        {
                            tab_name: text,
                            page: 'dental_toolkit'
                        }
                    );
                }
            });
        };
        document.addEventListener('click', tabClickHandler);

        // ============================================================
        // EVENT 3 — INVOICE GENERATOR LAUNCHED
        // ============================================================
        const invoiceLaunchHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();

            if (text.includes('launch invoice') || text.includes('invoice app') || (el.closest && el.closest('[href*="invoice"]'))) {
                userSignals.usedInvoiceTool = true;
                userSignals.userType = 'clinic_owner';

                if (typeof (window as any).fbq !== 'undefined') {
                    (window as any).fbq('track', 'Lead', {
                        content_name: 'Invoice Tool Launched from Toolkit',
                        content_category: 'dental_toolkit',
                        value: 0.5,
                        currency: 'INR'
                    });
                }
                trackEvent(
                    'ToolkitInvoiceLaunched',
                    {
                        page: 'dental_toolkit',
                        action: 'launched_invoice_tool',
                        user_type: 'clinic_owner',
                        signal: 'billing_intent'
                    },
                    'toolkit_invoice_launched',
                    {
                        tool: 'invoice_generator',
                        user_type: 'clinic_owner'
                    }
                );
            }
        };
        document.addEventListener('click', invoiceLaunchHandler);

        // ============================================================
        // EVENT 4 — DENTAL CHART MASTER USED
        // ============================================================
        const chartModeHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();
            const chartModes = ['explore', 'identify', 'notation', 'charting simulator', 'quiz'];

            chartModes.forEach(function(mode) {
                if (text.includes(mode)) {
                    userSignals.usedDentalChart = true;
                    if (userSignals.userType === 'unknown') {
                        userSignals.userType = 'student_or_junior';
                    }
                    trackEvent(
                        'DentalChartModeUsed',
                        {
                            page: 'dental_toolkit',
                            chart_mode: text,
                            user_type: userSignals.userType,
                            signal: 'dental_student_or_junior'
                        },
                        'dental_chart_mode_used',
                        {
                            mode: text,
                            tool: 'dental_chart_master'
                        }
                    );
                }
            });
        };
        document.addEventListener('click', chartModeHandler);

        // ============================================================
        // EVENT 5 — TOOTH CLICKED IN CHART
        // ============================================================
        let toothClickCount = 0;
        const toothClickHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const isToothElement = el.tagName === 'path' || el.tagName === 'circle' || (el.closest && el.closest('[class*="tooth"], [class*="chart"], svg'));

            if (isToothElement) {
                toothClickCount++;
                if (toothClickCount === 1 || toothClickCount === 5) {
                    trackEvent(
                        'DentalChartToothClicked',
                        {
                            page: 'dental_toolkit',
                            click_count: toothClickCount,
                            signal: toothClickCount >= 5 ? 'deep_chart_engagement' : 'chart_started'
                        },
                        'tooth_clicked',
                        {
                            click_number: toothClickCount,
                            tool: 'dental_chart_master'
                        }
                    );
                }
            }
        };
        document.addEventListener('click', toothClickHandler);

        // ============================================================
        // EVENT 6 — INVISIBLE SALARY CALCULATOR USED
        // ============================================================
        let salaryCalcTracked = false;
        let revenueInputTracked = false;

        const revenueInputHandler = function(e: Event) {
            const el = e.target as HTMLInputElement;
            const val = el.value ? el.value.toString().replace(/,/g, '') : '';
            const isRevenueField = el.type === 'number' || el.type === 'range' || (el.placeholder && (el.placeholder.includes('revenue') || el.placeholder.includes('lakh') || el.placeholder.includes('monthly'))) || (el.closest && el.closest('[class*="salary"], [class*="calculator"], [class*="revenue"]'));

            if (isRevenueField && parseInt(val) > 10000 && !revenueInputTracked) {
                revenueInputTracked = true;
                userSignals.enteredRevenue = true;
                userSignals.usedSalaryCalc = true;
                userSignals.userType = 'clinic_owner';

                if (typeof (window as any).fbq !== 'undefined') {
                    (window as any).fbq('track', 'ViewContent', {
                        content_name: 'Salary Calculator Revenue Entered',
                        content_category: 'clinic_owner_confirmed',
                        value: 1,
                        currency: 'INR'
                    });
                }
                trackEvent(
                    'SalaryCalcRevenueEntered',
                    {
                        page: 'dental_toolkit',
                        action: 'entered_clinic_revenue',
                        user_type: 'clinic_owner',
                        signal: 'HIGHEST_INTENT — confirmed active clinic',
                        revenue_range: parseInt(val) > 500000 ? 'above_5L' : parseInt(val) > 200000 ? '2L_to_5L' : 'below_2L'
                    },
                    'salary_calc_revenue_entered',
                    {
                        tool: 'salary_calculator',
                        user_type: 'clinic_owner',
                        revenue_bracket: parseInt(val) > 500000 ? 'above_5L' : '2L_to_5L'
                    }
                );
            }
        };
        document.addEventListener('input', revenueInputHandler);

        let sliderTracked = false;
        const sliderInputHandler = function(e: Event) {
            if (sliderTracked) return;
            if ((e.target as HTMLInputElement).type === 'range') {
                sliderTracked = true;
                if (!salaryCalcTracked) {
                    salaryCalcTracked = true;
                    trackEvent(
                        'SalaryCalcSliderUsed',
                        {
                            page: 'dental_toolkit',
                            action: 'used_slider',
                            signal: 'actively_calculating'
                        },
                        'salary_calc_slider_used',
                        { tool: 'salary_calculator' }
                    );
                }
            }
        };
        document.addEventListener('input', sliderInputHandler);

        // ============================================================
        // EVENT 7 — SHARE YOUR RESULT (Salary Calculator)
        // ============================================================
        const shareResultHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();

            if (text.includes('share your result') || text.includes('share result')) {
                trackEvent(
                    'SalaryResultShared',
                    {
                        page: 'dental_toolkit',
                        action: 'shared_salary_result',
                        signal: 'viral_share_intent',
                        user_type: userSignals.userType
                    },
                    'salary_result_shared',
                    {
                        tool: 'salary_calculator',
                        action: 'share_result'
                    }
                );
            }
        };
        document.addEventListener('click', shareResultHandler);

        // ============================================================
        // EVENT 8 — "SHARE THIS TOOL" CLICKED
        // ============================================================
        const shareToolHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();

            if (text.includes('share this tool')) {
                const chartSection = el.closest && el.closest('[class*="chart"], [id*="chart"]');
                const salarySection = el.closest && el.closest('[class*="salary"], [id*="salary"]');
                const parentSection = chartSection ? 'dental_chart_master' : salarySection ? 'salary_calculator' : 'unknown_tool';

                trackEvent(
                    'ToolkitToolShared',
                    {
                        page: 'dental_toolkit',
                        tool_shared: parentSection,
                        action: 'share_tool_clicked',
                        signal: 'referral_network_intent'
                    },
                    'toolkit_tool_shared',
                    {
                        tool: parentSection,
                        action: 'share'
                    }
                );
            }
        };
        document.addEventListener('click', shareToolHandler);

        // ============================================================
        // EVENT 9 — FAQ ACCORDION OPENED
        // ============================================================
        const faqOpenHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const faqItem = el.closest && el.closest('[class*="faq"], [class*="accordion"], details, summary');

            if (faqItem) {
                const questionText = faqItem.querySelector('summary, [class*="question"], h3, h4');
                const qText = questionText ? (questionText as HTMLElement).innerText || '' : 'unknown';

                const ownerQuestions = ['profit', 'margin', 'earn', 'salary', 'income', 'gst', 'revenue', 'patients per day'];
                const studentQuestions = ['fdi', 'numbering', 'universal', 'notation', 'system'];

                let questionType = 'general';
                ownerQuestions.forEach(function(kw) {
                    if (qText.toLowerCase().includes(kw)) questionType = 'clinic_owner_question';
                });
                studentQuestions.forEach(function(kw) {
                    if (qText.toLowerCase().includes(kw)) questionType = 'student_question';
                });

                if (questionType === 'clinic_owner_question' && userSignals.userType === 'unknown') {
                    userSignals.userType = 'practising_dentist';
                }

                trackEvent(
                    'ToolkitFAQOpened',
                    {
                        page: 'dental_toolkit',
                        question: qText.substring(0, 100),
                        question_type: questionType,
                        user_signal: questionType
                    },
                    'faq_opened',
                    {
                        question_text: qText.substring(0, 100),
                        question_type: questionType,
                        page: 'dental_toolkit'
                    }
                );
            }
        };
        document.addEventListener('click', faqOpenHandler);

        // ============================================================
        // EVENT 10 — MID-PAGE CTA STRIP CLICKED
        // ============================================================
        const midCtaHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim();
            const textLower = text.toLowerCase();

            const isTrialCTA = textLower.includes('14-day trial') || textLower.includes('free trial') || textLower.includes('start free');
            const isDemoCTA = textLower.includes('15-minute') || (textLower.includes('book') && textLower.includes('demo'));

            if (isTrialCTA || isDemoCTA) {
                const ctaType = isTrialCTA ? 'free_trial' : 'book_demo';

                if (typeof (window as any).fbq !== 'undefined') {
                    (window as any).fbq('track', 'InitiateCheckout', {
                        content_name: isTrialCTA ? 'Free Trial from Toolkit' : 'Demo from Toolkit',
                        content_category: 'dental_toolkit_cta',
                        value: 16999,
                        currency: 'INR'
                    });
                }
                trackEvent(
                    'ToolkitCTAClicked',
                    {
                        page: 'dental_toolkit',
                        cta_type: ctaType,
                        button_text: text,
                        user_type: userSignals.userType,
                        used_salary_calc: userSignals.usedSalaryCalc,
                        used_invoice: userSignals.usedInvoiceTool,
                        signal: 'direct_conversion_intent',
                        value: 16999,
                        currency: 'INR'
                    },
                    'toolkit_cta_clicked',
                    {
                        cta_type: ctaType,
                        location: 'mid_page_strip',
                        user_type: userSignals.userType,
                        value: 16999
                    }
                );
            }
        };
        document.addEventListener('click', midCtaHandler);

        // ============================================================
        // EVENT 11 — BOTTOM CTA: GET STARTED / CONTACT SALES
        // ============================================================
        const bottomCtaHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();

            if (text.includes('get started') || text.includes('contact sales')) {
                trackEvent(
                    'ToolkitBottomCTAClicked',
                    {
                        page: 'dental_toolkit',
                        button: text,
                        user_type: userSignals.userType,
                        tools_used_count: [
                            userSignals.usedSalaryCalc,
                            userSignals.usedDentalChart,
                            userSignals.usedInvoiceTool
                        ].filter(Boolean).length
                    },
                    'bottom_cta_clicked',
                    {
                        button_text: text,
                        page: 'dental_toolkit'
                    }
                );
            }
        };
        document.addEventListener('click', bottomCtaHandler);

        // ============================================================
        // EVENT 12 — CROSS-TOOL NAVIGATION
        // ============================================================
        const crossToolNavHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const link = el.closest && el.closest('a');
            if (!link) return;

            const href = link.href || '';
            const crossToolLinks = ['dental-invoice', 'break-even', 'profit-intelligence', 'dental-toolkit'];

            crossToolLinks.forEach(function(tool) {
                if (href.includes(tool)) {
                    trackEvent(
                        'ToolkitCrossToolNavigation',
                        {
                            page: 'dental_toolkit',
                            navigating_to: href,
                            signal: 'multi_tool_researcher',
                            user_type: userSignals.userType
                        },
                        'cross_tool_navigation',
                        {
                            destination: href,
                            source: 'dental_toolkit'
                        }
                    );
                }
            });
        };
        document.addEventListener('click', crossToolNavHandler);

        // ============================================================
        // EVENT 13 — VISITOR CLASSIFICATION ENGINE
        // ============================================================
        const classificationTimer = setTimeout(function() {
            let finalType = userSignals.userType;

            if (userSignals.enteredRevenue) {
                finalType = 'confirmed_clinic_owner';
            } else if (userSignals.usedInvoiceTool) {
                finalType = 'likely_clinic_owner';
            } else if (userSignals.usedSalaryCalc && !userSignals.enteredRevenue) {
                finalType = 'practising_or_senior_student';
            } else if (userSignals.usedDentalChart && !userSignals.usedSalaryCalc) {
                finalType = 'dental_student';
            }

            if (finalType !== 'unknown') {
                trackEvent(
                    'ToolkitVisitorClassified',
                    {
                        page: 'dental_toolkit',
                        visitor_type: finalType,
                        used_salary_calc: userSignals.usedSalaryCalc,
                        entered_revenue: userSignals.enteredRevenue,
                        used_dental_chart: userSignals.usedDentalChart,
                        used_invoice: userSignals.usedInvoiceTool,
                        signal: 'classification_complete'
                    },
                    'visitor_classified',
                    {
                        visitor_type: finalType,
                        page: 'dental_toolkit'
                    }
                );
            }
        }, 90000);

        // ============================================================
        // EVENT 14 — SCROLL DEPTH MILESTONES
        // ============================================================
        let scroll50Tracked = false;
        let scroll85Tracked = false;

        const scrollDepthHandler = function() {
            const scrollPct = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;

            if (!scroll50Tracked && scrollPct >= 50) {
                scroll50Tracked = true;
                trackEvent(
                    'ToolkitScrolled50',
                    { page: 'dental_toolkit', depth: '50%', note: 'reached_salary_calculator_section' },
                    'scroll_depth',
                    { depth: 50, page: 'dental_toolkit' }
                );
            }

            if (!scroll85Tracked && scrollPct >= 85) {
                scroll85Tracked = true;
                trackEvent(
                    'ToolkitScrolled85',
                    { page: 'dental_toolkit', depth: '85%', note: 'reached_faq_and_bottom_cta', user_type: userSignals.userType },
                    'scroll_depth',
                    { depth: 85, page: 'dental_toolkit' }
                );
            }
        };
        window.addEventListener('scroll', scrollDepthHandler);

        return () => {
             // Cleanup on unmount if needed
             document.head.removeChild(script1);
             document.head.removeChild(script2);
             clearTimeout(engagementTimer);
             clearTimeout(classificationTimer);
             document.removeEventListener('click', tabClickHandler);
             document.removeEventListener('click', invoiceLaunchHandler);
             document.removeEventListener('click', chartModeHandler);
             document.removeEventListener('click', toothClickHandler);
             document.removeEventListener('input', revenueInputHandler);
             document.removeEventListener('input', sliderInputHandler);
             document.removeEventListener('click', shareResultHandler);
             document.removeEventListener('click', shareToolHandler);
             document.removeEventListener('click', faqOpenHandler);
             document.removeEventListener('click', midCtaHandler);
             document.removeEventListener('click', bottomCtaHandler);
             document.removeEventListener('click', crossToolNavHandler);
             window.removeEventListener('scroll', scrollDepthHandler);
        };
    }, []);

    const scrollToTool = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <div className="bg-[#F8FAFC]">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0D1B2A] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/40 blur-[120px]"></div>
                    <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#4B6EF5]/20 blur-[150px]"></div>
                </div>
                <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 shadow-xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-sm md:text-base font-bold text-white tracking-wider uppercase">Free Clinical Open-Source Tools</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                        Your free toolkit for a <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#4B6EF5]">smarter dental practice.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                        Built rigorously for dental students, practising dentists, and clinic owners across India. <strong className="text-white font-semibold">Free to use, free to share.</strong> No login required.
                    </p>
                    
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-sm inline-flex items-center gap-2">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-[#0D1B2A] flex items-center justify-center text-xs font-bold text-blue-800">DR</div>
                            <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-[#0D1B2A] flex items-center justify-center text-xs font-bold text-emerald-800">DS</div>
                            <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-[#0D1B2A] flex items-center justify-center text-xs font-bold text-indigo-800">S</div>
                        </div>
                        <span className="text-sm font-semibold text-slate-300 ml-3">Used daily by <strong className="text-white">5,000+</strong> dentists & students</span>
                    </div>
                </div>
            </section>

            {/* STICKY SUB NAV */}
            <div className="sticky top-[72px] md:top-[88px] lg:top-[112px] z-[900] bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-[1100px] mx-auto px-4 py-4 md:py-5 flex items-center justify-start md:justify-center gap-6 md:gap-12 overflow-x-auto no-scrollbar">
                    <a href="#invoice-generator" className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                         <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">1</span> Invoice Generator
                    </a>
                    <a href="#tooth-chart" onClick={(e) => scrollToTool(e, 'tooth-chart')} className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                         <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">2</span> FDI Tooth Chart
                    </a>
                    <a href="#salary-calculator" onClick={(e) => scrollToTool(e, 'salary-calculator')} className="whitespace-nowrap text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                         <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">3</span> Target Salary Calc
                    </a>
                </div>
            </div>

            {/* TOOLS MENU LAYOUT Grid */}
            <section className="py-24 px-6 bg-slate-50 relative overflow-hidden" id="invoice-generator">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                <div className="max-w-[1100px] mx-auto relative z-10">
                    
                    {/* HIGHLIGHTED INVOICE GENERATOR BANNER */}
                    <div className="mb-10 w-full group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-[#4B6EF5] rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none"></div>
                        <div className="relative bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10 overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl z-0 pointer-events-none"></div>
                            
                            <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-[#4B6EF5] to-cyan-400 flex items-center justify-center text-white shadow-lg relative z-10 shadow-blue-500/30">
                                <FileText className="w-10 h-10" />
                            </div>
                            
                            <div className="flex-1 relative z-10 text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                                   <h3 className="text-3xl font-extrabold text-[#0D1B2A]">Dental Invoice Generator</h3>
                                   <span className="bg-rose-100 text-rose-700 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                                </div>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-2xl">
                                    Generate a meticulously clean, clinic-branded professional dental invoice in seconds. Automatically calculates GST, computes balances, and downloads directly as a high-fidelity PDF. No login required.
                                </p>
                                <Link 
                                    to="/dental-invoice-generator"
                                    className="inline-flex items-center justify-center gap-2 bg-[#4B6EF5] hover:bg-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-[0_8px_20px_rgba(75,110,245,0.25)] hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    Launch Invoice App <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* TWO SUB-TOOLS */}
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                        {/* Tooth Chart */}
                         <a href="#tooth-chart" onClick={(e) => scrollToTool(e, 'tooth-chart')} className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">02</div>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                               <Grid className="w-6 h-6 text-[#4B6EF5]" /> Dental Chart Master
                            </h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed max-w-sm">The most complete free dental charting tool for BDS students and dentists. Practice tooth identification and patient charting.</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>

                        {/* Salary Calculator */}
                        <a href="#salary-calculator" onClick={(e) => scrollToTool(e, 'salary-calculator')} className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 text-[120px] font-extrabold text-slate-50/80 group-hover:text-blue-50/50 transition-colors leading-none tracking-tighter pointer-events-none">03</div>
                            <h3 className="text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                               <Wallet className="w-6 h-6 text-[#4B6EF5]" /> Invisible Salary Calculator
                            </h3>
                            <p className="text-slate-600 mb-8 relative z-10 leading-relaxed max-w-sm">Calculate your real effective absolute hourly income as a clinic owner—are you earning more or less than a salaried associate?</p>
                            <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold">
                                Use This Tool <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* TOOLS COMPONENTS */}
            <div className="flex flex-col">
                <div id="tooth-chart" className="w-full bg-white relative py-20 border-b border-slate-100 scroll-mt-24">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/2"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <ToothChart />
                    </div>
                </div>

                <div id="salary-calculator" className="w-full bg-slate-50 relative py-20 border-b border-slate-200 shadow-inner scroll-mt-24">
                    <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[80px] opacity-60 pointer-events-none translate-y-1/4 -translate-x-1/4"></div>
                    <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                        <SalaryCalc />
                    </div>
                </div>
            </div>

            {/* SEO CONTENT SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-16 md:py-24">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-4">About These Tools</h2>
                    <p className="text-slate-600 leading-relaxed text-lg mb-6">
                        These tools are built and maintained by Cue360 — a dental clinic management platform built for Indian practices. All calculations are browser-based. We do not store any data you enter into these tools.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-bold pb-4">
                        <Link to="/dental-invoice-generator" className="text-[#4B6EF5] hover:underline">Dental Invoice Generator</Link>
                        <span className="text-slate-300">•</span>
                        <Link to="/#roi" className="text-[#4B6EF5] hover:underline">New Patient Break-Even Calculator</Link>
                        <span className="text-slate-300">•</span>
                        <Link to="/clinic-profit-intelligence" className="text-[#4B6EF5] hover:underline">Clinic Profit Intelligence</Link>
                    </div>
                </div>

                <div className="space-y-4">
                    <FAQItem 
                        q="What is the FDI tooth numbering system?" 
                        a="The FDI World Dental Federation notation is widely used internationally and across India. It assigns a two-digit number to each tooth. The first digit represents the quadrant (1-4 for adults, 5-8 for children), and the second digit denotes the position from the midline (1-8)." 
                    />
                    <FAQItem 
                        q="What is the Universal tooth numbering system?" 
                        a="The Universal Numbering System is primarily used in the United States. It sequentially numbers adult teeth from 1 to 32, starting with the upper right third molar and ending with the lower right third molar. Primary children's teeth are assigned letters A through T." 
                    />
                    <FAQItem 
                        q="How do I calculate break-even for a dental clinic?" 
                        a="To calculate a dental clinic's break-even point, you must sum all fixed monthly expenses including rent, salaries, utilities, and general supplies. You then divide this total fixed cost by your average revenue per patient visit. The result gives you the exact number of new patient visits required each month to cover essential operations without running at a loss." 
                    />
                    <FAQItem 
                        q="What is a good profit margin for a dental clinic in India?" 
                        a="A standard profit margin for a moderately established independent dental clinic in India is 30% to 40% before owner compensation and tax. As clinics scale and introduce high-margin procedures such as clear aligners or implants, margins can tighten slightly due to lab fees but overall revenue surges. Achieving and maintaining 35%+ requires diligent patient retention and cost control." 
                    />
                    <FAQItem 
                        q="How much does a dental clinic owner earn in India?" 
                        a="Dental clinic owner earnings in India vary significantly depending on location and experience. A new clinic owner may take home between ₹50,000 to ₹1,00,000 per month, while an established, high-performing clinic owner could earn ₹2,50,000 to ₹5,00,000 or more monthly. These figures depend heavily on business overheads and patient volume." 
                    />
                    <FAQItem 
                        q="Is dental invoice GST applicable in India?" 
                        a="In India, clinical services relating to the diagnosis, treatment, or care for illness, injury, or deformity — which applies to pure dental healthcare — are generally exempt from GST. However, strictly cosmetic dental procedures or the sale of oral care products directly from a clinic may attract GST. It is prudent to consult with a Chartered Accountant to ensure compliance for your specific procedures." 
                    />
                    <FAQItem 
                        q="How many patients does a typical dental clinic see per day in India?" 
                        a="An average growing dental clinic in an urban Indian center typically sees 5 to 15 patients per day, depending highly on the availability of the principal dentist. Solo practitioners handling multiple chairs efficiently can push this up to 20 visits a day with strong patient follow-ups. Specialized restorative clinics may see fewer patients per day due to longer appointment durations." 
                    />
                    <FAQItem 
                        q="What is the average dental consultation fee in India?" 
                        a="The average dental consultation fee in India ranges between ₹300 and ₹800, depending on the clinic's location, infrastructure, and the dentist's expertise. Premium setups in metro cities may charge upwards of ₹1000 for a detailed first consultation involving full-mouth x-rays and specialized diagnostics." 
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
};

// Simplified FAQ Accordion Component
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-[#0D1B2A] pr-8">{q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
            </button>
            <div 
                className={`px-6 text-slate-600 text-sm leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'pb-5 max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                {a}
            </div>
        </div>
    );
};

export default DentalToolkit;
