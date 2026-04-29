import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-load heavy route components — only downloaded when the user navigates there
const ClinicProfitIntelligence = lazy(() => import('./components/ClinicProfitIntelligence'));
const DentalToolkit = lazy(() => import('./components/DentalToolkit'));
const DentalInvoicePage = lazy(() => import('./components/DentalInvoicePage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'));

// Scroll to top on route change — fixes the issue where navigating between pages
// leaves the user stranded at the bottom of the previous page
function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        // Don't scroll to top if navigating to a hash section (e.g. /#pricing)
        if (!hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
    return null;
}

// Minimal loading fallback — keeps the layout stable during code-split chunk loading
function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-3 border-slate-200 border-t-dental-500 rounded-full animate-spin" />
        </div>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white font-sans selection:bg-dental-200 selection:text-dental-900">
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/case-studies" element={<CaseStudiesPage />} />
                        <Route path="/clinic-profit-intelligence" element={<ClinicProfitIntelligence />} />
                        <Route path="/dental-toolkit" element={<DentalToolkit />} />
                        <Route path="/dental-invoice-generator" element={<DentalInvoicePage />} />
                        <Route path="/privacy" element={
                            <>
                                <Navbar />
                                <PrivacyPolicy />
                                <Footer />
                            </>
                        } />
                        <Route path="/terms" element={
                            <>
                                <Navbar />
                                <TermsOfService />
                                <Footer />
                            </>
                        } />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App
