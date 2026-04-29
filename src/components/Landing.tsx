import Navbar from './Navbar';
import Hero from './Hero';
import OperationalChaos from './WhatsAppFeature';
import Features from './Features';
import ROICalculator from './ROICalculator';
import Pricing from './Pricing';
import ProcessTimeline from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

function Landing() {
    return (
        <>
            <Navbar />
            <Hero />
            <OperationalChaos />
            <Features />
            <ROICalculator />
            <ProcessTimeline />
            <Pricing />
            <Contact />
            <Footer />
        </>
    );
}

export default Landing;
