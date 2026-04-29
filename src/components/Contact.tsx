import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prefillMessage, setPrefillMessage] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const intent = searchParams.get('intent');
        if (intent) {
            setPrefillMessage(decodeURIComponent(intent));
            // Let the DOM finish layout calculation and gracefully scroll down
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            // Submit to Google Form
            await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfkYUyKULwsQYa2xyw-Tt83nWelqFGQTYT5LFIqSWi3mOCszw/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors',
            });

            // Fire Meta Pixel Lead event immediately after successful submission
            if (typeof (window as any).fbq === 'function') {
                (window as any).fbq('track', 'Lead');
            }

            setIsSubmitted(true);
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setPrefillMessage('');
                (e.target as HTMLFormElement).reset();
            }, 3000);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-32 bg-white border-t border-slate-100">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to upgrade your manufacturing operations?</h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    Get Started with Srshti Today
                    <br className="hidden md:block" /> No credit card required.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 relative">
                    <div>
                        <input
                            type="text"
                            name="entry.2005620554"
                            placeholder="Full Name"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="email"
                            name="entry.1045781291"
                            placeholder="Email Address"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                        />
                        <input
                            type="tel"
                            name="entry.1166974658"
                            placeholder="Phone Number"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                        />
                    </div>
                    <div>
                        <textarea
                            name="entry.839337160"
                            placeholder="Your Enquiries (Optional)"
                            rows={4}
                            value={prefillMessage}
                            onChange={(e) => setPrefillMessage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className="w-full px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-95 duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitted ? '✓ Submitted Successfully!' : isSubmitting ? 'Submitting...' : 'Request Access'}
                    </button>
                </form>

                <p className="mt-6 text-xs text-slate-400">
                    By requesting access, you agree to our Terms of Service.
                </p>
            </div>
        </section>
    );
};

export default Contact;
