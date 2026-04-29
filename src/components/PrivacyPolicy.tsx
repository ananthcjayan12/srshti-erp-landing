import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
                
                <div className="prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                        <p className="text-slate-600 mb-4">
                            This Privacy Policy governs the use of the platform accessible at <a href="https://dent.cue360.in" className="text-dental-600 hover:underline">https://dent.cue360.in</a>, powered by Cue360, a subscription-based dental clinical management solution used by independent dental clinics.
                        </p>
                        <p className="text-slate-600 mb-4">
                            Cue360 provides secure digital infrastructure for managing patient records, appointments, prescriptions, billing, and communication workflows.
                        </p>
                        <p className="text-slate-600 mb-4">
                            We are committed to protecting personal and health information in compliance with applicable laws, including the Digital Personal Data Protection Act, 2023 (India) and Meta's WhatsApp Business Platform policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Nature of Service & Data Responsibility</h2>
                        <p className="text-slate-600 mb-4">
                            Cue360 operates strictly as a technology service provider (Solution provider).
                        </p>
                        <p className="text-slate-600 mb-4">
                            Each subscribing dental clinic acts as the users, meaning:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>The clinic decides what patient data is collected.</li>
                            <li>The clinic is responsible for obtaining patient consent.</li>
                            <li>The clinic determines how patient data is used for treatment and services.</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Cue360 does not independently decide the purpose of data collection.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Categories of Data Collected</h2>
                        <p className="text-slate-600 mb-4">
                            Data collection is determined by the clinic and may include:
                        </p>
                        
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">A. Mandatory Data (Required for Treatment & Records)</h3>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Patient name</li>
                            <li>Contact number</li>
                            <li>Gender</li>
                            <li>Address</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Mandatory data is collected only when necessary to provide healthcare services or comply with legal requirements.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-900 mb-3">B. Optional Data (Collected Based on Patient Permission)</h3>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Email address</li>
                            <li>Essential medical history (if available)</li>
                            <li>Occupation</li>
                            <li>Age</li>
                            <li>DOB</li>
                            <li>Other Medical History / Chief Complaint</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Optional data is collected only with the patient's explicit consent and is not mandatory for basic service delivery unless required for clinical reasons.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Purpose of Data Processing</h2>
                        <p className="text-slate-600 mb-4">
                            Patient data is processed strictly for:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Providing dental diagnosis and treatment</li>
                            <li>Maintaining clinical records</li>
                            <li>Tracking procedures and conditions</li>
                            <li>Issuing prescriptions</li>
                            <li>Generating invoices and receipts</li>
                            <li>Appointment scheduling and reminders</li>
                            <li>Service quality monitoring</li>
                            <li>Legal and regulatory compliance</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Cue360 does not use patient data for advertising, resale, or unrelated commercial purposes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. WhatsApp Business Platform Integration</h2>
                        <p className="text-slate-600 mb-4">
                            The platform may integrate with the WhatsApp Business Platform (Cloud API) to enable clinics to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Send appointment confirmations</li>
                            <li>Share prescriptions</li>
                            <li>Provide follow-up instructions</li>
                            <li>Respond to patient inquiries</li>
                            <li>Request for feedback on the visit</li>
                        </ul>
                        
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Compliance Commitments:</h3>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Messages are sent only for service-related purposes.</li>
                            <li>Clinics are responsible for obtaining valid opt-in before sending messages.</li>
                            <li>No unsolicited promotional messaging is allowed without explicit consent.</li>
                            <li>Phone numbers are not sold or shared with third parties.</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Use of WhatsApp services is follows the process outlined by Meta.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Lawful Basis & Consent (DPDP Act 2023 Compliance)</h2>
                        <p className="text-slate-600 mb-4">
                            Data is processed based on:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Explicit patient consent</li>
                            <li>Medical necessity</li>
                            <li>Legal obligations</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Patients may withdraw consent for optional data or communications at any time by contacting the clinic.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Access & Security Controls</h2>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Access is restricted to authenticated clinic users (doctors, dentists, receptionists).</li>
                            <li>Role-based permissions limit access to relevant information.</li>
                            <li>Each clinic can access only its own data.</li>
                            <li>Login credentials are individually assigned.</li>
                            <li>System access is logged and monitored.</li>
                            <li>Admin controls the role based access</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Security Measures</h2>
                        <p className="text-slate-600 mb-4">
                            We implement appropriate technical and organizational safeguards, including:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>HTTPS encrypted connections</li>
                            <li>Secure cloud hosting</li>
                            <li>Role-based access controls</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            While reasonable safeguards are implemented, absolute security cannot be guaranteed.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Data Sharing & Disclosure</h2>
                        <p className="text-slate-600 mb-4">
                            Patient data may be shared only:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Within the clinic for treatment purposes</li>
                            <li>When required by law</li>
                            <li>During medical emergencies</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Cue360 does not sell, rent, or monetize patient data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Data Retention</h2>
                        <p className="text-slate-600 mb-4">
                            Data is retained as required for:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Medical record regulations</li>
                            <li>Legal and taxation compliance</li>
                            <li>Contractual obligations</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Upon subscription termination, data handling will follow contractual agreements between Cue360 and the clinic.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Patient Rights</h2>
                        <p className="text-slate-600 mb-4">
                            Patients may request through their respective clinic:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-4 ml-4">
                            <li>Access to their data</li>
                            <li>Correction of inaccurate information</li>
                            <li>Withdrawal of communication consent</li>
                            <li>Deletion of optional data (subject to legal retention requirements)</li>
                        </ul>
                        <p className="text-slate-600 mb-4">
                            Requests may also be directed to: <a href="mailto:support@cue360.in" className="text-dental-600 hover:underline">support@cue360.in</a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Children's Data</h2>
                        <p className="text-slate-600 mb-4">
                            Dental records of minors are processed only with authorization from a parent or legal guardian through the clinic.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Policy Updates</h2>
                        <p className="text-slate-600 mb-4">
                            This Privacy Policy may be updated periodically. Updates will be published at: <a href="https://dent.cue360.in" className="text-dental-600 hover:underline">https://dent.cue360.in</a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact & Grievance Redressal</h2>
                        <p className="text-slate-600 mb-4">
                            For privacy concerns, compliance queries, or grievances:
                        </p>
                        <p className="text-slate-600 mb-4">
                            Email: <a href="mailto:support@cue360.in" className="text-dental-600 hover:underline">support@cue360.in</a><br />
                            Website: <a href="https://dent.cue360.in" className="text-dental-600 hover:underline">https://dent.cue360.in</a>
                        </p>
                        <p className="text-slate-600 mb-4">
                            We aim to respond within a reasonable timeframe as per applicable law.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
