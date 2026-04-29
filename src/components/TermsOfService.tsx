import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
                
                <div className="prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                        <p className="text-slate-600 mb-4">
                            Welcome to Dent.Cue360, a dental clinic management platform operated by Cue360. These Terms of Service ("Terms") govern your access to and use of our services, software, and website accessible at <a href="https://dent.cue360.in" className="text-dental-600 hover:underline">https://dent.cue360.in</a> (collectively, the "Services").
                        </p>
                        <p className="text-slate-600 mb-4">
                            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Service Description</h2>
                        <p className="text-slate-600 mb-4">
                            Cue360 provides a subscription-based dental clinical management solution that enables dental clinics to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Manage patient records and medical histories</li>
                            <li>Schedule and track appointments</li>
                            <li>Generate prescriptions and treatment plans</li>
                            <li>Process billing and invoicing</li>
                            <li>Communicate with patients through various channels including WhatsApp Business Platform</li>
                            <li>Monitor clinic operations and performance</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Eligibility and Account Registration</h2>
                        <p className="text-slate-600 mb-4">
                            To use our Services, you must:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Be a licensed dental professional or authorized representative of a dental clinic</li>
                            <li>Provide accurate and complete registration information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Be at least 18 years of age</li>
                            <li>Comply with all applicable laws and regulations</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            You are responsible for all activities that occur under your account.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Subscription and Payment</h2>
                        <p className="text-slate-600 mb-4">
                            Our Services are offered on a subscription basis. By subscribing, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Pay all applicable subscription fees as specified in your plan</li>
                            <li>Provide valid payment information</li>
                            <li>Allow automatic renewal unless cancelled before the renewal date</li>
                            <li>Accept that fees are non-refundable except as required by law</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            We reserve the right to modify pricing with advance notice to subscribers.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Ownership and Responsibilities</h2>
                        <p className="text-slate-600 mb-4">
                            <strong>Your Data:</strong> You retain all ownership rights to the patient data and clinic information you input into the Services. We do not claim ownership of your data.
                        </p>
                        <p className="text-slate-600 mb-4">
                            <strong>Your Responsibilities:</strong> You are solely responsible for:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Obtaining proper consent from patients for data collection and processing</li>
                            <li>Ensuring compliance with healthcare regulations and data protection laws</li>
                            <li>The accuracy and legality of all data entered into the system</li>
                            <li>Maintaining appropriate data backups</li>
                            <li>Using the Services only for lawful purposes</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. WhatsApp Business Platform Integration</h2>
                        <p className="text-slate-600 mb-4">
                            If you use our WhatsApp Business Platform integration, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Comply with Meta's WhatsApp Business Platform policies and terms</li>
                            <li>Obtain explicit opt-in consent from patients before sending messages</li>
                            <li>Use the messaging feature only for service-related communications</li>
                            <li>Not send unsolicited promotional messages</li>
                            <li>Respect patient preferences for communication channels</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Violation of WhatsApp policies may result in suspension of messaging capabilities.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Acceptable Use Policy</h2>
                        <p className="text-slate-600 mb-4">
                            You agree not to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Use the Services for any illegal or unauthorized purpose</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Interfere with or disrupt the Services or servers</li>
                            <li>Attempt to gain unauthorized access to the Services</li>
                            <li>Transmit viruses, malware, or harmful code</li>
                            <li>Impersonate others or misrepresent your affiliation</li>
                            <li>Share your account credentials with unauthorized parties</li>
                            <li>Reverse engineer or attempt to extract source code</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Security and Privacy</h2>
                        <p className="text-slate-600 mb-4">
                            We implement reasonable security measures to protect your data. However, no system is completely secure. You acknowledge that:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Data transmission over the internet carries inherent risks</li>
                            <li>You use the Services at your own risk</li>
                            <li>We cannot guarantee absolute security</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            For detailed information about how we handle data, please review our <a href="/privacy" className="text-dental-600 hover:underline">Privacy Policy</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Service Availability and Support</h2>
                        <p className="text-slate-600 mb-4">
                            We strive to maintain high availability of our Services but do not guarantee uninterrupted access. We may:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Perform scheduled maintenance with advance notice</li>
                            <li>Suspend Services for emergency repairs</li>
                            <li>Modify or discontinue features with reasonable notice</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Support is provided according to your subscription plan.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Intellectual Property</h2>
                        <p className="text-slate-600 mb-4">
                            The Services, including all software, content, and materials, are owned by Cue360 and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable license to use the Services in accordance with these Terms.
                        </p>
                        <p className="text-slate-600 mb-4">
                            You may not copy, modify, distribute, sell, or lease any part of our Services without explicit written permission.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Termination</h2>
                        <p className="text-slate-600 mb-4">
                            <strong>By You:</strong> You may cancel your subscription at any time through your account settings or by contacting support.
                        </p>
                        <p className="text-slate-600 mb-4">
                            <strong>By Us:</strong> We may suspend or terminate your access if you:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Violate these Terms</li>
                            <li>Fail to pay subscription fees</li>
                            <li>Engage in fraudulent or harmful activities</li>
                            <li>Pose a security or legal risk</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Upon termination, your access to the Services will cease. Data retention will follow our Privacy Policy and applicable agreements.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Disclaimers and Limitation of Liability</h2>
                        <p className="text-slate-600 mb-4">
                            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                        </p>
                        <p className="text-slate-600 mb-4">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CUE360 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                        </p>
                        <p className="text-slate-600 mb-4">
                            Our total liability shall not exceed the amount you paid for the Services in the 12 months preceding the claim.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Indemnification</h2>
                        <p className="text-slate-600 mb-4">
                            You agree to indemnify and hold harmless Cue360, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Your use of the Services</li>
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any applicable laws or regulations</li>
                            <li>Your violation of third-party rights</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Governing Law and Dispute Resolution</h2>
                        <p className="text-slate-600 mb-4">
                            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts in India.
                        </p>
                        <p className="text-slate-600 mb-4">
                            We encourage resolving disputes amicably through direct communication before pursuing legal action.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Changes to Terms</h2>
                        <p className="text-slate-600 mb-4">
                            We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the Services. Your continued use of the Services after such notification constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Miscellaneous</h2>
                        <p className="text-slate-600 mb-4">
                            <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in effect.
                        </p>
                        <p className="text-slate-600 mb-4">
                            <strong>Waiver:</strong> Our failure to enforce any right or provision in these Terms shall not constitute a waiver of such right or provision.
                        </p>
                        <p className="text-slate-600 mb-4">
                            <strong>Assignment:</strong> You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.
                        </p>
                        <p className="text-slate-600 mb-4">
                            <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Cue360 regarding the Services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">17. Contact Information</h2>
                        <p className="text-slate-600 mb-4">
                            For questions or concerns regarding these Terms of Service, please contact us:
                        </p>
                        <p className="text-slate-600 mb-4">
                            Email: <a href="mailto:support@cue360.in" className="text-dental-600 hover:underline">support@cue360.in</a><br />
                            Website: <a href="https://dent.cue360.in" className="text-dental-600 hover:underline">https://dent.cue360.in</a>
                        </p>
                    </section>

                    <p className="text-slate-500 text-sm mt-12">
                        Last updated: February 24, 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
