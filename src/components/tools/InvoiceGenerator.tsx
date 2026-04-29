import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Share2, Download, Printer, Plus, Trash2, Image as ImageIcon, Lock, X, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useNavigateToContact } from '../../hooks/useNavigateToContact';
import { handleShare } from '../../utils/handleShare';

interface LineItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

const InvoiceGenerator: React.FC = () => {
  const goToContact = useNavigateToContact();

  // Clinic Details
  const [clinicName, setClinicName] = useState<string>('');
  const [dentistName, setDentistName] = useState<string>('');
  const [clinicAddress, setClinicAddress] = useState<string>('');
  const [clinicPhone, setClinicPhone] = useState<string>('');
  const [clinicEmail, setClinicEmail] = useState<string>('');
  const [clinicLogo, setClinicLogo] = useState<string | null>(null);

  // Patient Details
  const [patientName, setPatientName] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-001');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentStatus, setPaymentStatus] = useState<string>('Paid');

  // Line Items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', name: '', quantity: 1, unitPrice: 0 }
  ]);

  // Totals & Notes
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [gstPercent, setGstPercent] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showNudgePopup, setShowNudgePopup] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // --- LOCAL STORAGE: LOAD CLINIC DETAILS ---
  useEffect(() => {
    const saved = localStorage.getItem('cue360_invoice_clinic_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.clinicName) setClinicName(parsed.clinicName);
        if (parsed.dentistName) setDentistName(parsed.dentistName);
        if (parsed.clinicAddress) setClinicAddress(parsed.clinicAddress);
        if (parsed.clinicPhone) setClinicPhone(parsed.clinicPhone);
        if (parsed.clinicEmail) setClinicEmail(parsed.clinicEmail);
        if (parsed.clinicLogo) setClinicLogo(parsed.clinicLogo);
      } catch (e) {
        console.error("Failed to parse saved clinic details");
      }
    }
  }, []);

  // --- LOCAL STORAGE: SAVE CLINIC DETAILS ---
  useEffect(() => {
    const dataToSave = {
      clinicName,
      dentistName,
      clinicAddress,
      clinicPhone,
      clinicEmail,
      clinicLogo
    };
    localStorage.setItem('cue360_invoice_clinic_details', JSON.stringify(dataToSave));
  }, [clinicName, dentistName, clinicAddress, clinicPhone, clinicEmail, clinicLogo]);


  // --- SMART NUDGE LOGIC ---
  const handleNudgeCheck = useCallback(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedCounterData = localStorage.getItem('cue360_invoice_daily_counter');
    let currentData = { date: todayStr, count: 0, hasShownToday: false };

    if (savedCounterData) {
      try {
        currentData = JSON.parse(savedCounterData);
        if (currentData.date !== todayStr) {
          // Reset for new day
          currentData = { date: todayStr, count: 0, hasShownToday: false };
        }
      } catch (e) {}
    }

    currentData.count += 1;
    localStorage.setItem('cue360_invoice_daily_counter', JSON.stringify(currentData));

    // Show popup if 5th invoice generated and haven't shown today
    if (currentData.count === 5 && !currentData.hasShownToday) {
      setTimeout(() => setShowNudgePopup(true), 1000);
    }
  }, []);

  const markPopupShown = () => {
     const savedCounterData = localStorage.getItem('cue360_invoice_daily_counter');
     if (savedCounterData) {
       try {
         const currentData = JSON.parse(savedCounterData);
         currentData.hasShownToday = true;
         localStorage.setItem('cue360_invoice_daily_counter', JSON.stringify(currentData));
       } catch (e) {}
     }
  };

  // --- 4 HOUR TIMER NUDGE ---
  useEffect(() => {
    const fourHoursMs = 14400000; // 4 hours in milliseconds
    const timer = setTimeout(() => {
      const todayStr = new Date().toISOString().split('T')[0];
      const lastPromptDate = localStorage.getItem('cue360_invoice_4h_prompt');
      
      if (lastPromptDate !== todayStr) {
        setShowNudgePopup(true);
        localStorage.setItem('cue360_invoice_4h_prompt', todayStr);
      }
    }, fourHoursMs);

    // Dev mode testing trigger
    (window as any).triggerInvoiceNudge = () => {
       console.log("Triggering nudge manually...");
       setShowNudgePopup(true);
    };

    return () => clearTimeout(timer);
  }, []);

  // Make sure if the user dismisses it, we track it for the daily counter logic
  const handleClosePopup = () => {
    setShowNudgePopup(false);
    markPopupShown();
  };

  const handleActionPopup = () => {
    setShowNudgePopup(false);
    markPopupShown();
    goToContact('Invoice Generator Nudge');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClinicLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLineItem = () => {
    if (lineItems.length >= 10) return;
    setLineItems([...lineItems, { id: Math.random().toString(), name: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const afterDiscount = subtotal - discountAmount;
  const gstAmount = afterDiscount * (gstPercent / 100);
  const total = afterDiscount + gstAmount;
  const balanceDue = Math.max(0, total - amountPaid);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    try {
      setIsGeneratingPdf(true);
      
      // Temporarily strip zoom classes from the parent wrapper to avoid html2canvas kerning/layout overlap bugs
      const zoomWrapper = document.getElementById('pdf-zoom-wrapper');
      const originalWrapperClasses = zoomWrapper ? zoomWrapper.className : '';
      if (zoomWrapper) {
          zoomWrapper.className = 'w-full flex justify-center origin-top';
      }
      
      // Remove any inline zoom as a fallback
      const originalStyle = previewRef.current.style.cssText;
      previewRef.current.style.cssText = originalStyle + '; zoom: 1 !important; transform: scale(1) !important;';
      
      // Force repaint wait
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(previewRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
           // Double check the cloned element is pure
           const clonedPreview = clonedDoc.getElementById('invoice-preview-container');
           if(clonedPreview) clonedPreview.style.transform = 'none';
        }
      });
      
      // Restore layout
      if (zoomWrapper) zoomWrapper.className = originalWrapperClasses;
      previewRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoiceNumber || 'Invoice'}.pdf`);
      
      handleNudgeCheck();
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    if (!previewRef.current) return;
    try {
      setIsPrinting(true);
      
      const zoomWrapper = document.getElementById('pdf-zoom-wrapper');
      const originalWrapperClasses = zoomWrapper ? zoomWrapper.className : '';
      if (zoomWrapper) {
          zoomWrapper.className = 'w-full flex justify-center origin-top';
      }
      
      const originalStyle = previewRef.current.style.cssText;
      previewRef.current.style.cssText = originalStyle + '; zoom: 1 !important; transform: scale(1) !important;';
      
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(previewRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
           const clonedPreview = clonedDoc.getElementById('invoice-preview-container');
           if(clonedPreview) clonedPreview.style.transform = 'none';
        }
      });
      
      if (zoomWrapper) zoomWrapper.className = originalWrapperClasses;
      previewRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Triggers native print dialogue when opened
      pdf.autoPrint();
      const blobUrl = pdf.output('bloburl');
      window.open(blobUrl, '_blank');
      
      handleNudgeCheck();
    } catch (error) {
      console.error('Error printing PDF', error);
      alert('Failed to print PDF. Please try again.');
    } finally {
      setIsPrinting(false);
    }
  };

  const handleShareTool = () => {
    handleShare({
      title: 'Free Dental Invoice Generator — Cue360',
      text: `Just found the best free dental invoice tool and had to share it 🦷\n\nZero login, auto-saves your clinic details, generates a professional PDF in seconds. It's completely free — you need this!`,
      url: 'https://cue360.in/dental-invoice-generator',
    });
  };

  return (
    <>
      <div id="invoice-generator" className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6 bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(75,110,245,0.06)] relative overflow-hidden print:hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-100/40 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-[#4B6EF5]/10 text-[#4B6EF5] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Clinical Tool
               </span>
               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100/50 rounded-full inline-flex">
                 <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                 <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
                   Local Auto-Save
                 </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0D1B2A] tracking-tight mb-4">
              Free Dental Invoice Generator
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
              Create a professional patient invoice in under a minute. Your clinic details are automatically saved securely in your browser for next time. We do not store any of your data.
            </p>
          </div>
          <button 
            onClick={handleShareTool}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-[#0D1B2A] rounded-xl text-sm font-bold transition-all shrink-0 shadow-sm hover:shadow relative z-10"
          >
            <Share2 className="w-4 h-4" />
            Share With A Colleague
          </button>
        </div>

        <div className="grid xl:grid-cols-2 lg:grid-cols-12 gap-8 print:block">
          
          {/* EDITOR (Hidden on print) */}
          <div className="xl:col-span-1 lg:col-span-6 space-y-8 print:hidden">
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-[0_8px_30px_rgb(75,110,245,0.06)] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4B6EF5]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0D1B2A]">Clinic Details</h3>
                 </div>
                 <span className="text-[10px] font-black tracking-widest text-[#4B6EF5] bg-blue-50 px-2.5 py-1 rounded-md uppercase">Saved Locally</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Clinic Name</label>
                  <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} placeholder="e.g. Smile Dental Care" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/10 focus:border-[#4B6EF5] transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Dentist Name</label>
                  <div className="flex relative shadow-sm rounded-xl">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-sm font-bold">Dr.</span>
                    <input type="text" value={dentistName} onChange={(e) => setDentistName(e.target.value)} placeholder="e.g. Rahul Sharma" className="flex-1 w-full bg-slate-50/70 border border-slate-200 rounded-r-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/10 focus:border-[#4B6EF5] transition-all outline-none" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Clinic Address</label>
                  <textarea rows={2} value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} placeholder="e.g. 123 Healthcare Avenue, Mumbai" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/10 focus:border-[#4B6EF5] transition-all outline-none resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Phone Number</label>
                  <input type="text" value={clinicPhone} onChange={(e) => setClinicPhone(e.target.value)} placeholder="e.g. +91 9876543210" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/10 focus:border-[#4B6EF5] transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Email</label>
                  <input type="email" value={clinicEmail} onChange={(e) => setClinicEmail(e.target.value)} placeholder="e.g. hello@smiledental.in" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/10 focus:border-[#4B6EF5] transition-all outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Clinic Logo</label>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full text-sm font-medium text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border file:border-slate-200 file:text-sm file:font-semibold file:bg-white file:text-[#0D1B2A] hover:file:bg-slate-50 focus:outline-none transition-all cursor-pointer bg-slate-50/70 rounded-xl px-2 py-2 border border-slate-200" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-[0_8px_30px_rgb(75,110,245,0.06)] p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-slate-100 pb-4">
                 <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                 </div>
                 <h3 className="text-xl font-extrabold text-[#0D1B2A]">Patient Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Patient Name</label>
                  <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g. Priya Patel" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Patient Age</label>
                  <input type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="e.g. 34" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Patient Phone</label>
                  <input type="text" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder="e.g. 9876543210" className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Invoice Number</label>
                  <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full bg-[#0D1B2A]/5 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Invoice Date</label>
                  <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Payment Status</label>
                  <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none cursor-pointer">
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-[0_8px_30px_rgb(75,110,245,0.06)] p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-slate-100 pb-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                 </div>
                 <h3 className="text-xl font-extrabold text-[#0D1B2A]">Line Items & Billing</h3>
              </div>
              
              <div className="overflow-x-auto relative z-10 w-full">
                <table className="w-full text-sm">
                  <thead>
                     <tr className="text-left text-[#0D1B2A] font-bold border-b border-slate-200">
                      <th className="pb-3 w-1/2 min-w-[120px] uppercase tracking-wider text-[11px]">Procedure Name</th>
                      <th className="pb-3 w-20 min-w-[70px] text-center uppercase tracking-wider text-[11px]">Qty</th>
                      <th className="pb-3 w-28 min-w-[90px] text-right uppercase tracking-wider text-[11px] pr-2">Unit Price (₹)</th>
                      <th className="pb-3 w-28 min-w-[80px] text-right uppercase tracking-wider text-[11px] pr-4">Total (₹)</th>
                      <th className="pb-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {lineItems.map((item, index) => (
                      <tr key={item.id} className="group">
                        <td className="pt-3 pr-2">
                          <input type="text" value={item.name} onChange={(e) => updateLineItem(item.id, 'name', e.target.value)} placeholder={index === 0 ? "e.g. Scaling and Polishing" : "Procedure name"} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-[#06B6D4]/10 focus:border-[#06B6D4] outline-none transition-all" />
                        </td>
                        <td className="pt-3 px-2">
                          <input type="number" min="1" value={item.quantity === 0 ? '' : item.quantity} onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value) || 0)} className="w-full text-center bg-slate-50/70 border border-slate-200 rounded-xl px-2 py-2 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-[#06B6D4]/10 focus:border-[#06B6D4] outline-none transition-all" />
                        </td>
                        <td className="pt-3 px-1 md:px-2">
                          <input type="number" min="0" value={item.unitPrice === 0 ? '' : item.unitPrice} onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value) || 0)} placeholder={index === 0 ? "500" : "0"} className="w-full text-right bg-slate-50/70 border border-slate-200 rounded-xl px-2 py-2 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-[#06B6D4]/10 focus:border-[#06B6D4] outline-none transition-all" />
                        </td>
                        <td className="pt-3 pl-2 pr-4 text-right font-black text-[#0D1B2A]">
                          ₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}
                        </td>
                        <td className="pt-3 pl-1 text-center text-slate-300 hover:text-red-500 cursor-pointer transition-colors" onClick={() => removeLineItem(item.id)}>
                          {lineItems.length > 1 && <Trash2 className="w-4 h-4 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {lineItems.length < 10 && (
                <button onClick={addLineItem} className="mt-4 text-sm text-[#06B6D4] font-bold flex items-center gap-1.5 hover:text-cyan-700 transition-colors bg-cyan-50 px-3 py-1.5 rounded-lg">
                  <Plus className="w-4 h-4" /> Add Procedure
                </button>
              )}

              <div className="pt-8 border-t border-slate-200 flex flex-col items-end space-y-3 w-full max-w-sm ml-auto mt-6 relative z-10">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest text-[11px]">Subtotal</span>
                  <span className="text-sm font-bold text-[#0D1B2A]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest text-[11px]">Discount (%)</span>
                  <input type="number" min="0" max="100" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)} className="w-24 text-right bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-[#06B6D4]/10 focus:border-[#06B6D4] outline-none transition-all" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest text-[11px]">GST (%)</span>
                  <select value={gstPercent} onChange={(e) => setGstPercent(Number(e.target.value))} className="w-24 text-right bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-[#06B6D4]/10 focus:border-[#06B6D4] outline-none transition-all cursor-pointer">
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                  </select>
                </div>
                <div className="flex justify-between items-center w-full pt-3 border-t border-slate-200 mt-2">
                  <span className="text-lg font-black text-[#0D1B2A] uppercase tracking-wider">Total</span>
                  <span className="text-xl font-black text-[#0D1B2A]">₹{Math.round(total).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center w-full pt-2">
                  <span className="text-sm font-bold text-slate-500">Amount Paid (₹)</span>
                  <input type="number" min="0" value={amountPaid === 0 ? '' : amountPaid} onChange={(e) => setAmountPaid(Number(e.target.value) || 0)} className="w-32 text-right bg-[#4B6EF5]/5 border border-[#4B6EF5]/20 rounded-lg px-3 py-2 text-sm font-black text-[#4B6EF5] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/20 focus:border-[#4B6EF5] outline-none transition-all" />
                </div>
                <div className="flex justify-between items-center w-full pt-4 border-t border-slate-200">
                  <span className="text-sm font-black text-[#0D1B2A]">Balance Due</span>
                  <span className={`text-base font-black ${balanceDue > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>₹{Math.round(balanceDue).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 relative z-10">
                 <label className="block text-xs font-black text-[#0D1B2A] uppercase tracking-wide mb-1.5 ml-1">Notes or Instructions for Patient</label>
                  <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Please return for follow-up in 7 days. Take prescribed medication as directed." className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0D1B2A] focus:bg-white focus:ring-4 focus:ring-[#4B6EF5]/10 focus:border-[#4B6EF5] outline-none transition-all resize-none"></textarea>
              </div>
              
              <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-xl text-xs text-emerald-800 flex gap-3 relative z-10">
                <span className="font-black shrink-0 uppercase tracking-widest text-emerald-600">Tip</span>
                <span className="font-medium leading-relaxed max-w-md">Dental services are generally exempt from GST under Indian tax law. Cosmetic procedures may attract GST. Check with your accountant for your specific situation.</span>
              </div>

            </div>
          </div>

          {/* LIVE PREVIEW (Also used for PDF generated visual) */}
          <div className="xl:col-span-1 lg:col-span-6 space-y-4 w-full overflow-hidden">
            <div className="sticky top-28 space-y-6">
              
              <div className="flex justify-between items-center print:hidden px-2">
                <h3 className="text-xl font-extrabold text-[#0D1B2A]">Live Document</h3>
              </div>

              {/* A4 PROPORTION INVOICE CONTAINER */}
              <div className="bg-slate-50/80 backdrop-blur-sm px-2 py-6 md:p-6 lg:p-8 rounded-[2rem] border border-slate-200/60 overflow-hidden print:p-0 print:bg-white print:w-full print:overflow-visible flex justify-center items-start shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] pt-6 md:pt-10 lg:pt-12 relative w-full">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent pointer-events-none"></div>
                 
                 {/* ZOOM RESPONSIVE WRAPPER */}
                 <div id="pdf-zoom-wrapper" className="w-full flex justify-center origin-top [zoom:0.45] sm:[zoom:0.6] md:[zoom:0.8] xl:[zoom:0.75] 2xl:[zoom:0.9]">
                   <div 
                      ref={previewRef}
                      id="invoice-preview-container" 
                      className="bg-white w-[794px] min-w-[794px] min-h-[1123px] shrink-0 shadow-[0_20px_50px_rgba(13,27,42,0.1)] p-12 lg:p-14 font-sans text-slate-800 print:shadow-none print:m-0 print:px-0 print:border-none relative box-border flex flex-col rounded z-10 border border-slate-100"
                    >
                      <div className="absolute top-0 right-0 w-full h-2.5 bg-gradient-to-r from-[#4B6EF5] to-[#06B6D4]"></div>
                    
                    {/* Header */}
                    <div className="flex flex-row justify-between items-start mb-14 pt-4 shrink-0 w-full gap-8">
                      <div className="flex gap-6 flex-1 min-w-0 pr-4">
                        {clinicLogo ? (
                          <img src={clinicLogo} alt="Clinic Logo" className="w-24 h-24 object-contain shrink-0" />
                        ) : (
                          <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-200 shrink-0">
                            <ImageIcon className="w-10 h-10" />
                          </div>
                        )}
                        <div className="pt-1 flex-1 min-w-0 pb-2">
                          <h1 className="text-3xl font-black text-[#0D1B2A] leading-normal m-0 p-0 block break-words">{clinicName || 'Clinic Name'}</h1>
                          {dentistName && <p className="text-lg font-bold text-slate-700 m-0 mt-2 break-words">Dr. {dentistName}</p>}
                          {clinicAddress && <p className="text-sm text-slate-500 mt-2 m-0 leading-relaxed whitespace-pre-wrap">{clinicAddress}</p>}
                          <div className="mt-3 space-y-1">
                              {clinicPhone && <p className="text-sm font-semibold text-slate-500 m-0 leading-snug break-words">Tel: <span className="text-slate-800">{clinicPhone}</span></p>}
                              {clinicEmail && <p className="text-sm font-semibold text-slate-500 m-0 leading-snug break-words">Email: <span className="text-slate-800">{clinicEmail}</span></p>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0 relative">
                        <div className="bg-[#0D1B2A] text-white px-6 py-2.5 inline-block text-xl font-black uppercase mb-6 rounded">Invoice</div>
                        <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[160px]">
                            <p className="text-xs font-bold text-[#0D1B2A] m-0 flex justify-between gap-5"><span className="text-slate-400 font-semibold uppercase text-[10px]">No</span><span>{invoiceNumber}</span></p>
                            <p className="text-xs font-bold text-[#0D1B2A] m-0 flex justify-between gap-5"><span className="text-slate-400 font-semibold uppercase text-[10px]">Date</span><span>{new Date(invoiceDate).toLocaleDateString('en-IN')}</span></p>
                        </div>
                        
                        <div className="mt-5 text-right w-full flex justify-end">
                           <span className={`inline-block whitespace-nowrap px-4 py-2 text-xs font-black uppercase border rounded-lg bg-white ${paymentStatus === 'Paid' ? 'border-emerald-300 text-emerald-600' : paymentStatus === 'Partially Paid' ? 'border-amber-300 text-amber-600' : 'border-rose-300 text-rose-600'}`}>
                             {paymentStatus}
                           </span>
                        </div>
                      </div>
                    </div>

                    {/* Patient Info Block */}
                    <div className="mb-10 flex">
                      <div className="border-l-4 border-[#06B6D4] pl-5 py-1">
                        <p className="text-[10px] font-black text-[#0D1B2A] uppercase mb-1.5 m-0 opacity-50">Billed To</p>
                        <p className="font-black text-[#0D1B2A] text-xl m-0 leading-normal">{patientName || 'Patient Name'}</p>
                        {(patientAge || patientPhone) && (
                          <div className="flex gap-4 mt-2">
                            {patientAge && <p className="text-xs font-bold text-slate-500 m-0">Age: <span className="text-slate-800">{patientAge}</span></p>}
                            {patientPhone && <p className="text-xs font-bold text-slate-500 m-0">Phone: <span className="text-slate-800">{patientPhone}</span></p>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Invoice Table */}
                    <div className="mb-8 min-h-[150px]">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[#0D1B2A]">
                            <th className="py-3 px-4 text-left font-black uppercase text-[11px] w-3/5">Description</th>
                            <th className="py-3 px-4 text-center font-black uppercase text-[11px]">Qty</th>
                            <th className="py-3 px-4 text-right font-black uppercase text-[11px] w-24">Price</th>
                            <th className="py-3 px-4 text-right font-black uppercase text-[11px] w-24">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lineItems.map((item, i) => (
                             item.name || item.quantity || item.unitPrice ? (
                              <tr key={i} className="border-b border-slate-100 last:border-0 text-slate-700">
                                <td className="py-4 px-4 font-semibold">{item.name || '-'}</td>
                                <td className="py-4 px-4 text-center font-medium">{item.quantity}</td>
                                <td className="py-4 px-4 text-right font-medium">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                                <td className="py-4 px-4 text-right font-black text-[#0D1B2A]">₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
                              </tr>
                             ) : null
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Box */}
                    <div className="flex justify-end mb-12">
                      <div className="w-full max-w-sm bg-[#F8FAFC] p-5 rounded-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase">Subtotal</span>
                          <span className="font-bold text-[#0D1B2A]">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        {discountPercent > 0 && (
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-slate-500 uppercase">Discount ({discountPercent}%)</span>
                            <span className="font-bold text-emerald-600">- ₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        {gstPercent > 0 && (
                          <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-3">
                            <span className="text-xs font-bold text-slate-500 uppercase">GST ({gstPercent}%)</span>
                            <span className="font-bold text-[#0D1B2A]">+ ₹{Math.round(gstAmount).toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-3 border-b border-slate-200">
                          <span className="text-lg font-black text-[#0D1B2A] uppercase">Total</span>
                          <span className="text-xl font-black text-[#0D1B2A]">₹{Math.round(total).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 text-sm">
                          <span className="text-xs font-bold text-slate-500 uppercase">Amount Paid</span>
                          <span className="font-bold text-[#0D1B2A]">₹{Math.round(amountPaid).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 pb-1 gap-2">
                          <span className="font-black text-[#0D1B2A] pr-4">Balance Due</span>
                          <span className={`text-lg font-black shrink-0 ${balanceDue > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>₹{Math.round(balanceDue).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    {notes && (
                      <div className="mb-12 text-sm max-w-lg">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 m-0">Notes & Instructions</p>
                        <p className="text-slate-700 font-semibold whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{notes}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-slate-100 text-center flex flex-col items-center shrink-0 w-full">
                       <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                         Powered by Cue360 Clinic Intelligence
                       </p>
                    </div>
                 </div> {/* End of previewRef div */}
                 </div> {/* End of zoom wrapper div */}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 print:hidden">
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isGeneratingPdf}
                  className="flex-1 bg-[#4B6EF5] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-[0_8px_20px_rgba(75,110,245,0.25)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed border border-[#4B6EF5]/50"
                >
                  {isGeneratingPdf ? (
                     <span className="animate-pulse flex items-center gap-2"><Sparkles className="w-4 h-4" /> Generating HQ PDF...</span>
                  ) : (
                    <>
                      <Download className="w-5 h-5" /> Download Professional PDF
                    </>
                  )}
                </button>
                <button 
                  onClick={handlePrint} 
                  disabled={isPrinting}
                  className="flex-1 bg-white border-2 border-slate-200 text-[#0D1B2A] font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {isPrinting ? (
                     <span className="animate-pulse flex items-center gap-2"><Sparkles className="w-4 h-4" /> Preparing...</span>
                  ) : (
                    <>
                       <Printer className="w-5 h-5" /> Print Directly
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* POPUP MODAL NUDGE */}
      {showNudgePopup && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-[#0D1B2A]/60 backdrop-blur-md transition-opacity print:hidden">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-lg w-full p-10 relative overflow-hidden animate-in fade-in zoom-in duration-500 border border-slate-100">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#06B6D4]/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#4B6EF5]/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <button 
              onClick={handleClosePopup}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full p-2 transition-all relative z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100/50 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-inner">
               <Sparkles className="w-10 h-10 text-[#4B6EF5]" />
            </div>
            
            <h3 className="text-3xl font-black text-[#0D1B2A] mb-4 leading-tight tracking-tight relative z-10">
              You're generating invoices like a pro! 👏
            </h3>
            <p className="text-slate-600 text-base font-medium leading-relaxed mb-8 relative z-10 max-w-md">
              Since you're managing multiple invoices, want to automate your entire billing flow? Cue360 tracks your payments, sends WhatsApp payment links to patients, and gives you deep practice analytics—all automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
               <button 
                  onClick={handleActionPopup}
                  className="flex-1 bg-[#4B6EF5] text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-all shadow-[0_8px_20px_rgba(75,110,245,0.25)] active:scale-[0.98] border border-indigo-500/50"
               >
                  Upgrade Practice Free
               </button>
               <button 
                  onClick={handleClosePopup}
                  className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
               >
                  Maybe Later
               </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default InvoiceGenerator;
