import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import InvoiceGenerator from './tools/InvoiceGenerator';

const DentalInvoicePage: React.FC = () => {
    useEffect(() => {
        // Handle SEO Meta Tags dynamically
        document.title = "Free Dental Invoice Generator | Create Professional Invoices | Cue360";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Generate clean, professional dental invoices in seconds. Auto-save clinic details, add procedures, calculate GST, and download as PDF completely free.");
        }

        // Set canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', 'https://cue360.in/dental-invoice-generator');
        }

        // Set OG URL
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', 'https://cue360.in/dental-invoice-generator');
        }

        // ============================================================
        // CUE360 — INVOICE GENERATOR PAGE TRACKING
        // Meta Pixel ID: 787549303968445 (base loaded in index.html)
        // GA4 ID: G-FCZM32STHB (base loaded in index.html)
        // Page: /dental-invoice-generator
        // Purpose: Identify high-intent clinic owners for retargeting
        // ============================================================

        // Fire GA4 page-specific config for this page
        if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('config', 'G-FCZM32STHB', {
                'page_title': 'Free Dental Invoice Generator',
                'page_location': window.location.href
            });
        }

        // Fire Meta Pixel PageView for SPA navigation
        if (typeof (window as any).fbq !== 'undefined') {
            (window as any).fbq('track', 'PageView');
        }

        // --- UTILITY: fire both Meta + GA4 together ---
        function trackEvent(metaEventName: string, metaParams: Record<string, unknown>, ga4EventName?: string, ga4Params?: Record<string, unknown>) {
            if (typeof (window as any).fbq !== 'undefined') {
                (window as any).fbq('trackCustom', metaEventName, metaParams || {});
            }
            if (typeof (window as any).gtag !== 'undefined') {
                (window as any).gtag('event', ga4EventName || metaEventName, ga4Params || metaParams || {});
            }
        }

        // ============================================================
        // EVENT 1 — PAGE ENGAGEMENT (60 seconds on page)
        // ============================================================
        const engagementTimer = setTimeout(function() {
            trackEvent(
                'InvoicePageEngaged',
                { page: 'invoice_generator', time_spent: '60s' },
                'invoice_page_engaged',
                { engagement_time: '60s', tool: 'invoice_generator' }
            );
        }, 60000);

        // ============================================================
        // EVENT 2 — CLINIC DETAILS STARTED
        // ============================================================
        let clinicNameTracked = false;
        const clinicNameHandler = function(this: HTMLInputElement) {
            if (!clinicNameTracked && this.value.length > 2) {
                clinicNameTracked = true;
                trackEvent(
                    'InvoiceClinicDetailsStarted',
                    {
                        page: 'invoice_generator',
                        action: 'typed_clinic_name',
                        signal: 'clinic_owner_confirmed'
                    },
                    'invoice_clinic_started',
                    { tool: 'invoice_generator', user_type: 'clinic_owner' }
                );
            }
        };
        const clinicNameField = document.querySelector(
            'input[placeholder*="Smile Dental"], input[name*="clinic"]'
        ) as HTMLInputElement | null;
        if (clinicNameField) {
            clinicNameField.addEventListener('input', clinicNameHandler);
        }

        // ============================================================
        // EVENT 3 — PROCEDURE ADDED (Line Item entered)
        // ============================================================
        let procedureTracked = false;
        const procedureHandler = function(e: Event) {
            const target = e.target as HTMLInputElement;
            if (!procedureTracked && target && (
                target.placeholder && (
                    target.placeholder.toLowerCase().includes('scaling') ||
                    target.placeholder.toLowerCase().includes('procedure')
                ) ||
                target.closest && target.closest('[class*="line"], [class*="item"], [class*="procedure"]')
            )) {
                if (target.value && target.value.length > 1) {
                    procedureTracked = true;
                    trackEvent(
                        'InvoiceProcedureAdded',
                        {
                            page: 'invoice_generator',
                            action: 'added_procedure',
                            signal: 'active_billing_clinic'
                        },
                        'invoice_procedure_added',
                        { tool: 'invoice_generator', user_type: 'billing_clinic' }
                    );
                }
            }
        };
        document.addEventListener('input', procedureHandler);

        // ============================================================
        // EVENT 4 — PDF DOWNLOADED
        // ============================================================
        const pdfDownloadHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = el.innerText || el.textContent || '';
            const isDownload =
                text.toLowerCase().includes('download') ||
                text.toLowerCase().includes('pdf') ||
                (el.closest && el.closest('[class*="download"], [class*="pdf"]'));

            if (isDownload) {
                // Meta standard Lead event
                if (typeof (window as any).fbq !== 'undefined') {
                    (window as any).fbq('track', 'Lead', {
                        content_name: 'Invoice PDF Downloaded',
                        content_category: 'dental_invoice_generator',
                        value: 1,
                        currency: 'INR'
                    });
                }
                // GA4
                if (typeof (window as any).gtag !== 'undefined') {
                    (window as any).gtag('event', 'generate_lead', {
                        event_category: 'invoice_generator',
                        event_label: 'pdf_downloaded',
                        value: 1
                    });
                }
                // Custom event for segmentation
                trackEvent(
                    'InvoicePDFDownloaded',
                    {
                        page: 'invoice_generator',
                        action: 'downloaded_pdf',
                        signal: 'tool_fully_used',
                        value: 1,
                        currency: 'INR'
                    },
                    'invoice_pdf_downloaded',
                    {
                        tool: 'invoice_generator',
                        conversion: true
                    }
                );
            }
        };
        document.addEventListener('click', pdfDownloadHandler);

        // ============================================================
        // EVENT 5 — PRINT CLICKED
        // ============================================================
        const printClickHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = el.innerText || el.textContent || '';
            if (text.toLowerCase().includes('print')) {
                trackEvent(
                    'InvoicePrintClicked',
                    {
                        page: 'invoice_generator',
                        action: 'clicked_print',
                        signal: 'operational_clinic'
                    },
                    'invoice_print_clicked',
                    { tool: 'invoice_generator' }
                );
            }
        };
        document.addEventListener('click', printClickHandler);

        // ============================================================
        // EVENT 6 — SHARE WITH COLLEAGUE CLICKED
        // ============================================================
        const shareClickHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = el.innerText || el.textContent || '';
            if (text.toLowerCase().includes('share') ||
                text.toLowerCase().includes('colleague')) {
                trackEvent(
                    'InvoiceSharedWithColleague',
                    {
                        page: 'invoice_generator',
                        action: 'shared_tool',
                        signal: 'referral_intent'
                    },
                    'invoice_shared',
                    { tool: 'invoice_generator', action: 'share' }
                );
            }
        };
        document.addEventListener('click', shareClickHandler);

        // ============================================================
        // EVENT 7 — GET STARTED / CTA CLICKED
        // ============================================================
        const ctaClickHandler = function(e: Event) {
            const el = e.target as HTMLElement;
            const text = el.innerText || el.textContent || '';
            if (
                text.toLowerCase().includes('get started') ||
                text.toLowerCase().includes('book demo') ||
                text.toLowerCase().includes('start free trial')
            ) {
                // Fire Meta standard InitiateCheckout
                if (typeof (window as any).fbq !== 'undefined') {
                    (window as any).fbq('track', 'InitiateCheckout', {
                        content_name: 'Cue360 Trial Intent',
                        content_category: 'invoice_generator_cta',
                        value: 16999,
                        currency: 'INR'
                    });
                }
                trackEvent(
                    'InvoicePageCTAClicked',
                    {
                        page: 'invoice_generator',
                        action: 'clicked_get_started',
                        signal: 'trial_intent',
                        value: 16999,
                        currency: 'INR'
                    },
                    'cta_clicked',
                    {
                        button_text: text.trim(),
                        location: 'invoice_generator_page',
                        intent: 'trial_signup'
                    }
                );
            }
        };
        document.addEventListener('click', ctaClickHandler);

        // ============================================================
        // EVENT 8 — SCROLL DEPTH (reached bottom of page)
        // ============================================================
        let scrollBottomTracked = false;
        const scrollHandler = function() {
            if (scrollBottomTracked) return;
            const scrollPercent = (window.scrollY + window.innerHeight) /
                document.body.scrollHeight * 100;
            if (scrollPercent >= 85) {
                scrollBottomTracked = true;
                trackEvent(
                    'InvoicePageScrolledToBottom',
                    {
                        page: 'invoice_generator',
                        action: 'scrolled_to_cta',
                        scroll_depth: '85%'
                    },
                    'scroll_depth',
                    {
                        page: 'invoice_generator',
                        depth_percentage: 85
                    }
                );
            }
        };
        window.addEventListener('scroll', scrollHandler);

        // ── CLEANUP on unmount ──
        return () => {
            clearTimeout(engagementTimer);
            if (clinicNameField) {
                clinicNameField.removeEventListener('input', clinicNameHandler);
            }
            document.removeEventListener('input', procedureHandler);
            document.removeEventListener('click', pdfDownloadHandler);
            document.removeEventListener('click', printClickHandler);
            document.removeEventListener('click', shareClickHandler);
            document.removeEventListener('click', ctaClickHandler);
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <div className="bg-[#F8FAFC] relative overflow-hidden selection:bg-cyan-200 selection:text-cyan-900">
            {/* Soft Ambient Orbs for Clinical, Peaceful Vibe */}
            <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-cyan-100/40 blur-[120px] pointer-events-none print:hidden z-0"></div>
            <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4B6EF5]/10 blur-[150px] pointer-events-none print:hidden z-0"></div>
            
            <div className="relative z-10 print:hidden">
                <Navbar />
            </div>

            <div className="relative z-10 pt-24 md:pt-32 min-h-screen">
                <InvoiceGenerator />
            </div>

            <div className="relative z-10 print:hidden mt-20 border-t border-blue-50">
                <Footer />
            </div>
        </div>
    );
};

export default DentalInvoicePage;
