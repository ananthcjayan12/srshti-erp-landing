import { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Printer, CheckCircle2, Download, Trash2, ArrowRight } from 'lucide-react';
import { handleShare } from '../../utils/handleShare';
import { adultTeeth, paedoTeeth, simulatorScenarios } from './ToothChartData';
import type { ToothData, DentitionType, NotationSystem } from './ToothChartData';
import { SimpleToothSVG, SurfaceDiagram, ToothSilhouetteSVG, ChartingOverlaySVG } from './ToothChartIcons';

type TabMode = 'explore' | 'identify' | 'converter' | 'simulator';

export default function ToothChart() {
  const [activeTab, setActiveTab] = useState<TabMode>('explore');
  const [dentition, setDentition] = useState<DentitionType>('adult');
  const [notation, setNotation] = useState<NotationSystem>('fdi');
  const [selectedTooth, setSelectedTooth] = useState<ToothData | null>(null);

  const activeTeeth = dentition === 'adult' ? adultTeeth : paedoTeeth;
  const upperTeeth = activeTeeth.filter(t => t.arch === 'upper');
  const lowerTeeth = activeTeeth.filter(t => t.arch === 'lower');

  // --- EXPLORE STATE ---
  const [showTimeline, setShowTimeline] = useState(false);

  // --- IDENTIFY STATE ---
  const [idLevel, setIdLevel] = useState<'easy'|'medium'|'hard'>('medium');
  const [idTarget, setIdTarget] = useState<ToothData | null>(null);
  const [idScore, setIdScore] = useState(0);
  const [idStreak, setIdStreak] = useState(0);
  const [idTotal, setIdTotal] = useState(0);
  const [idFeedback, setIdFeedback] = useState<{status: 'correct'|'incorrect'|null, msg: string}>({status: null, msg: ''});

  // --- CONVERTER STATE ---
  const [convFDI, setConvFDI] = useState('');
  const [convUni, setConvUni] = useState('');
  const [convPal, setConvPal] = useState('');
  const [convFilterQuad, setConvFilterQuad] = useState('All');
  const [convFilterType, setConvFilterType] = useState('All');

  // --- SIMULATOR STATE ---
  type ChartingMarking = { surfaces: string[], condition: string };
  const [chartingConfig, setChartingConfig] = useState<Record<string, ChartingMarking>>({});
  const [simSelectedSurfaces, setSimSelectedSurfaces] = useState<string[]>([]);
  const [simScenario, setSimScenario] = useState('s1'); // Scenario 1 by default
  const [simVerification, setSimVerification] = useState<{correct: number, total: number, msg: string}|null>(null);

  // --- SCROLL HINT STATE ---
  const [hasScrolled, setHasScrolled] = useState(false);
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const handleSidePanelScroll = useCallback(() => {
    if (!hasScrolled) setHasScrolled(true);
  }, [hasScrolled]);
  // Reset scroll hint when tab changes
  useEffect(() => { setHasScrolled(false); }, [activeTab, selectedTooth]);

  // --- SHARE TOOL ---
  const handleShareTool = () => {
    handleShare({
      title: 'Dental Chart Master — Cue360',
      text: `bro this dental chart tool is actually 🔥 FDI quiz, tooth explorer, notation converter + charting simulator — all in one place, all FREE. Best way to understand dental charts before practicals fr 🦾`,
      url: 'https://cue360.in/dental-toolkit#tooth-chart',
    });
  };

  useEffect(() => {
    // Logic on tab change
    setSelectedTooth(null);
    if (activeTab === 'identify') {
       startNewQuiz();
    }
    // Scroll side panel back to top
    if (sidePanelRef.current) {
       sidePanelRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Handle Chart Click based on Tab
  const handleToothClick = (tooth: ToothData) => {
    if (activeTab === 'explore') {
       setSelectedTooth(tooth);
    } else if (activeTab === 'identify') {
       handleQuizClick(tooth);
    } else if (activeTab === 'converter') {
       setSelectedTooth(tooth);
       setConvFDI(tooth.fdi);
       setConvUni(tooth.universal);
       setConvPal(tooth.palmer);
    } else if (activeTab === 'simulator') {
       setSelectedTooth(tooth);
       setSimSelectedSurfaces([]);
    }
  };

  // --- IDENTIFY LOGIC ---
  const startNewQuiz = () => {
    setIdFeedback({ status: null, msg: '' });
    setSelectedTooth(null); // to clear selection
    if (idTotal >= 10) return; // Keep at end screen
    
    // Pick target based on Level
    let pool = activeTeeth;
    if (idLevel === 'hard') {
       // Filter commonly confused pairs
       const confusedIds = ['31','41','32','42', '15','25','14','24', '34','44','35','45', '37','47','36','46', '17','27','16','26'];
       pool = activeTeeth.filter(t => confusedIds.includes(t.fdi));
    } else if (idLevel === 'easy') {
       // Just pick anything, easy only judges group which we handle on click
    }
    const random = pool[Math.floor(Math.random() * pool.length)];
    setIdTarget(random);
  };

  const handleQuizClick = (tooth: ToothData) => {
    if (idFeedback.status) return; // already answered
    if (!idTarget) return;

    let isCorrect = false;
    if (idLevel === 'easy') {
        isCorrect = tooth.group === idTarget.group;
    } else {
        isCorrect = tooth.fdi === idTarget.fdi;
    }

    if (isCorrect) {
       setIdScore(prev => prev + 1);
       setIdStreak(prev => prev + 1);
       setIdFeedback({ status: 'correct', msg: `Correct! This is a ${tooth.name}.` });
       setSelectedTooth(tooth); // Highlight correct
    } else {
       setIdStreak(0);
       setIdFeedback({ status: 'incorrect', msg: `Not quite. This was the ${idTarget.name}.` });
       setSelectedTooth(idTarget); // Force highlight correct one
    }
    setIdTotal(prev => prev + 1);
  };

  const generateWhatsAppShare = () => {
     const text = `I scored ${idScore}/10 on the Tooth Identify Challenge 🦷 Can you beat me? Try it free: cue360.in/dental-toolkit#identify — Powered by Cue360`;
     return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const resetQuiz = () => {
     setIdScore(0); setIdStreak(0); setIdTotal(0); 
     startNewQuiz();
  };

  // --- CONVERTER LOGIC ---
  const handleConvInput = (val: string, type: 'fdi'|'uni'|'pal') => {
     if (type === 'fdi') {
       setConvFDI(val);
       const t = adultTeeth.find(x => x.fdi === val) || paedoTeeth.find(x => x.fdi === val);
       if (t) { setConvUni(t.universal); setConvPal(t.palmer); setSelectedTooth(t); setDentition(t.fdi.startsWith('5')||t.fdi.startsWith('6')||t.fdi.startsWith('7')||t.fdi.startsWith('8')?'paediatric':'adult'); }
     }
     if (type === 'uni') {
       setConvUni(val);
       const t = adultTeeth.find(x => x.universal.toLowerCase() === val.toLowerCase()) || paedoTeeth.find(x => x.universal.toLowerCase() === val.toLowerCase());
       if (t) { setConvFDI(t.fdi); setConvPal(t.palmer); setSelectedTooth(t); setDentition(t.fdi.startsWith('5')||t.fdi.startsWith('6')||t.fdi.startsWith('7')||t.fdi.startsWith('8')?'paediatric':'adult'); }
     }
  };

  // --- SIMULATOR LOGIC ---
  const applyCondition = (cond: string) => {
    if (!selectedTooth) return;
    setChartingConfig(prev => ({
       ...prev,
       [selectedTooth.fdi]: { surfaces: [...simSelectedSurfaces], condition: cond }
    }));
  };

  const loadScenario = (id: string) => {
     setSimScenario(id);
     setSimVerification(null);
     setSelectedTooth(null);
     const sc = simulatorScenarios.find(s => s.id === id);
     if (sc) {
        setDentition(sc.dentition as DentitionType);
        if (id === 's5') {
            setChartingConfig({});
        } else {
           setChartingConfig({});
        }
     }
  };

  const verifyCharting = () => {
     const sc = simulatorScenarios.find(s => s.id === simScenario);
     if (!sc) return;
     let correctCount = 0;
     const total = Object.keys(sc.correctMarkings).length;
     Object.keys(sc.correctMarkings).forEach(toothFDI => {
         const correctMark = (sc.correctMarkings as any)[toothFDI];
         const userMark = chartingConfig[toothFDI];
         if (userMark && userMark.condition === correctMark.condition) {
             correctCount++;
         }
     });
     setSimVerification({ correct: correctCount, total, msg: correctCount === total ? 'Perfect Charting!' : 'Keep practicing.' });
  };


  return (
    <div id="tooth-chart" className="scroll-mt-32 max-w-[1400px] mx-auto py-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-2">
               Dental Chart Master
            </h2>
            <p className="text-lg text-slate-600 font-medium">
               Interactive Tooth Number Chart, Quiz &amp; Charting Simulator.
            </p>
          </div>
          <button
            onClick={handleShareTool}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors shrink-0"
          >
            <Share2 className="w-4 h-4" />
            Share This Tool
          </button>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden print:border-none print:shadow-none flex flex-col lg:h-[85vh] lg:max-h-[900px]">
         
         {/* STICKY TAB BAR */}
         <div className="bg-white border-b border-slate-200 p-4 md:p-5 shadow-sm print:hidden z-20 shrink-0">
            <div className="grid grid-cols-2 md:flex md:justify-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
               {[
                 { id: 'explore', label: 'Explore', mobileLabel: 'Explore' },
                 { id: 'identify', label: 'Identify Quiz', mobileLabel: 'Quiz' },
                 { id: 'converter', label: 'Notation Converter', mobileLabel: 'Converter' },
                 { id: 'simulator', label: 'Charting Simulator', mobileLabel: 'Simulator' }
               ].map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabMode)}
                    className={`whitespace-nowrap px-4 md:px-6 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all text-center ${activeTab === tab.id ? 'bg-[#4B6EF5] text-white shadow-md scale-[1.02]' : 'bg-transparent text-slate-500 hover:text-[#0D1B2A] hover:bg-slate-200'}`}
                 >
                    <span className="md:hidden">{tab.mobileLabel}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                 </button>
               ))}
            </div>
            
            <p className="text-center text-sm italic text-slate-500 mt-3 h-5 hidden md:block">
               {activeTab === 'explore' && 'Click any tooth to learn everything about it — morphology, notation, and clinical significance.'}
               {activeTab === 'identify' && 'Test yourself. Can you identify every tooth by sight?'}
               {activeTab === 'converter' && 'Type any tooth number in any system and see it on the chart instantly.'}
               {activeTab === 'simulator' && 'Mark a mock patient chart using real clinical symbols. Practice for practicals and vivas.'}
            </p>
         </div>

         {/* FILTERS AND TOGGLES */}
         <div className="py-3 px-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-[#F8FAFC] print:hidden shrink-0 z-10 shadow-sm">
            <div className="flex flex-wrap gap-2">
               <button onClick={() => { setDentition('adult'); setSelectedTooth(null); }} className={`px-4 py-1.5 rounded-lg border text-xs font-black uppercase tracking-wider transition-all ${dentition === 'adult' ? 'bg-[#0D1B2A] border-[#0D1B2A] text-white shadow-sm' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'}`}>Adult (32)</button>
               <button onClick={() => { setDentition('paediatric'); setSelectedTooth(null); }} className={`px-4 py-1.5 rounded-lg border text-xs font-black uppercase tracking-wider transition-all ${dentition === 'paediatric' ? 'bg-[#0D1B2A] border-[#0D1B2A] text-white shadow-sm' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'}`}>Primary (20)</button>
            </div>
            {(activeTab === 'explore' || activeTab === 'identify') && (
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">System</span>
                 <div className="flex bg-slate-200 rounded-lg p-1">
                   <button onClick={() => setNotation('fdi')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${notation === 'fdi' ? 'bg-white text-[#0D1B2A] shadow-sm' : 'text-slate-500'}`}>FDI</button>
                   <button onClick={() => setNotation('universal')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${notation === 'universal' ? 'bg-white text-[#0D1B2A] shadow-sm' : 'text-slate-500'}`}>Universal</button>
                 </div>
               </div>
            )}
            {activeTab === 'explore' && (
                <button onClick={() => setShowTimeline(!showTimeline)} className={`px-4 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm ${showTimeline ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}>
                    ⏳ Eruption Timeline
                </button>
            )}
         </div>

         {/* MAIN SPLIT CONTENT AREA */}
         <div className="flex flex-col lg:flex-row flex-1 overflow-hidden print:overflow-visible">
            
            {/* LEFT SIDE: MAIN CHART (SCROLLABLE INDEPENDENTLY ON MOBILE, FIXED/SCROLLABLE ON DESKTOP) */}
            <div className={`lg:w-[55%] xl:w-[60%] flex-col items-center bg-white border-b lg:border-b-0 lg:border-r border-slate-200 lg:overflow-y-auto no-scrollbar relative print:border-none ${activeTab === 'identify' && idTotal >= 10 ? 'hidden lg:flex' : 'flex'}`}>
               <div className="w-full h-full min-h-max p-4 md:p-8 lg:p-12 xl:px-16 flex flex-col justify-center gap-6">
                 
                 {/* UPPER ARCH */}
                 <div>
                   <h3 className="text-center font-bold tracking-widest text-[#4B6EF5] uppercase text-[10px] mb-4 print:text-[10px] opacity-70">Maxillary Arch</h3>
                   <div className="flex justify-between gap-1 md:gap-1.5 w-full">
                      {upperTeeth.map((tooth) => {
                         const isSelected = selectedTooth?.id === tooth.id;
                         const m = chartingConfig[tooth.fdi];
                         return (
                         <div 
                           key={tooth.id} 
                           onClick={() => handleToothClick(tooth)}
                           className={`relative flex flex-col items-center cursor-pointer group flex-1 max-w-[48px] md:max-w-none`}
                         >
                           <div className={`w-full aspect-[2/3] rounded-lg flex flex-col items-center justify-end transition-colors relative print:text-black ${isSelected && activeTab !== 'identify' ? 'text-[#4B6EF5]' : 'text-slate-300 group-hover:text-blue-300'}`}>
                              <SimpleToothSVG isMolar={tooth.group==='molar'||tooth.group==='premolar'} group={tooth.group} />
                              {activeTab === 'simulator' && m && (
                                 <ChartingOverlaySVG condition={m.condition} surfaces={m.surfaces} />
                              )}
                              {activeTab === 'explore' && showTimeline && (
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-black text-[#0D1B2A] bg-yellow-100/90 rounded-full px-1.5 py-0.5 border border-yellow-400 shadow-sm z-10">
                                     {tooth.eruptionOrder}
                                 </div>
                              )}
                           </div>
                           <div className={`mt-2 w-6 h-6 md:w-8 md:h-8 border-2 rounded-full flex items-center justify-center text-[10px] md:text-xs font-extrabold transition-all duration-300 print:border-black print:text-black ${isSelected && activeTab !== 'identify' ? 'bg-[#4B6EF5] border-[#4B6EF5] text-white shadow-md' : 'border-slate-200 text-slate-500 group-hover:border-[#4B6EF5] group-hover:text-[#4B6EF5] bg-white'}`}>
                             {notation === 'fdi' ? tooth.fdi : tooth.universal}
                           </div>
                         </div>
                      )})}
                   </div>
                 </div>

                 {/* MIDLINE SEPARATOR */}
                 <div className="w-full flex items-center justify-center opacity-30 my-2 print:hidden pointer-events-none">
                    <div className="h-px bg-slate-300 flex-1"></div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest px-4">Occlusal Plane</span>
                    <div className="h-px bg-slate-300 flex-1"></div>
                 </div>

                 {/* LOWER ARCH */}
                 <div>
                   <div className="flex justify-between gap-1 md:gap-1.5 w-full">
                      {lowerTeeth.map(tooth => {
                         const isSelected = selectedTooth?.id === tooth.id;
                         const m = chartingConfig[tooth.fdi];
                         return (
                         <div 
                           key={tooth.id} 
                           onClick={() => handleToothClick(tooth)}
                           className={`relative flex flex-col-reverse items-center cursor-pointer group flex-1 max-w-[48px] md:max-w-none`}
                         >
                           <div className={`w-full aspect-[2/3] rounded-lg flex flex-col items-center justify-start rotate-180 transition-colors relative print:text-black ${isSelected && activeTab !== 'identify' ? 'text-[#4B6EF5]' : 'text-slate-300 group-hover:text-blue-300'}`}>
                              <SimpleToothSVG isMolar={tooth.group==='molar'||tooth.group==='premolar'} group={tooth.group} />
                              {activeTab === 'simulator' && m && (
                                 <div className="rotate-180 w-full h-full flex flex-col justify-end"><ChartingOverlaySVG condition={m.condition} surfaces={m.surfaces} /></div>
                              )}
                              {activeTab === 'explore' && showTimeline && (
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-black text-[#0D1B2A] bg-yellow-100/90 rounded-full px-1.5 py-0.5 border border-yellow-400 shadow-sm z-10 -rotate-180">
                                     {tooth.eruptionOrder}
                                 </div>
                              )}
                           </div>
                           <div className={`mb-2 w-6 h-6 md:w-8 md:h-8 border-2 rounded-full flex items-center justify-center text-[10px] md:text-xs font-extrabold transition-all duration-300 print:border-black print:text-black ${isSelected && activeTab !== 'identify' ? 'bg-[#4B6EF5] border-[#4B6EF5] text-white shadow-md' : 'border-slate-200 text-slate-500 group-hover:border-[#4B6EF5] group-hover:text-[#4B6EF5] bg-white'}`}>
                             {notation === 'fdi' ? tooth.fdi : tooth.universal}
                           </div>
                         </div>
                      )})}
                   </div>
                   <h3 className="text-center font-bold tracking-widest text-[#4B6EF5] uppercase text-[10px] mt-4 print:text-[10px] opacity-70">Mandibular Arch</h3>
                 </div>
               </div>
            </div>

            {/* RIGHT SIDE: DYNAMIC PANEL (SCROLLABLE) */}
            <div
              ref={sidePanelRef}
              onScroll={handleSidePanelScroll}
              className={`lg:w-[45%] xl:w-[40%] bg-[#F8FAFC] lg:overflow-y-auto relative print:w-full print:overflow-visible transition-all ${!hasScrolled ? 'scroll-hint-visible' : ''}`}
            >
               
               {/* EXPLORE PANEL */}
               {activeTab === 'explore' && selectedTooth && (
                  <div className="p-6 md:p-8 animate-fade-in print:bg-white print:p-0 print:mt-10">
                     <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#0D1B2A] text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-sm">QUADRANT {selectedTooth.quadrant}</span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-sm border border-blue-200">{selectedTooth.group}</span>
                     </div>
                     <h4 className="text-2xl md:text-3xl font-extrabold text-[#0D1B2A] mb-5 leading-tight">{selectedTooth.name}</h4>
                     
                     {selectedTooth.landmark && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-900 px-4 py-3 rounded-r-lg text-sm font-bold flex items-start gap-3 mb-6 shadow-sm">
                           <span className="text-xl shrink-0 leading-none">💡</span> 
                           <p className="leading-snug">{selectedTooth.landmark}</p>
                        </div>
                     )}

                     <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
                        <h5 className="font-extrabold text-[#4B6EF5] text-xs uppercase tracking-widest mb-3">Clinical Significance</h5>
                        <p className="text-slate-600 leading-relaxed text-sm">{selectedTooth.clinicalNote}</p>
                        <div className="mt-5 pt-5 border-t border-slate-100">
                           <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <span className="bg-emerald-100 text-emerald-600 p-1 rounded">🧠</span> Remember This Trick
                           </h5>
                           <p className="text-emerald-700 font-bold text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100">{selectedTooth.mnemonic}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                           <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">FDI Notation</div>
                           <div className="text-2xl font-black text-[#0D1B2A]">{selectedTooth.fdi}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                           <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Universal</div>
                           <div className="text-2xl font-black text-[#0D1B2A]">{selectedTooth.universal}</div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8 overflow-hidden">
                        <div className="flex border-b border-slate-100">
                          <div className="w-1/3 flex items-center justify-center bg-slate-50 p-4 border-r border-slate-100 shrink-0">
                             <SurfaceDiagram group={selectedTooth.group} />
                          </div>
                          <div className="p-4 flex flex-col justify-center w-2/3">
                             <div className="text-[10px] uppercase text-[#4B6EF5] font-black tracking-wider mb-2">Morphology</div>
                             <div className="text-sm font-bold text-[#0D1B2A] leading-snug">{selectedTooth.rootDesc}</div>
                             {selectedTooth.cuspDesc && <div className="text-xs font-semibold text-slate-500 mt-1">{selectedTooth.cuspDesc}</div>}
                          </div>
                        </div>
                        <div className="p-4 bg-slate-50/50 flex flex-col gap-2">
                           <div className="flex justify-between items-center text-sm"><span className="text-slate-500 font-medium">Avg. Crown Length</span> <strong className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{selectedTooth.crownLengthMm} mm</strong></div>
                           <div className="flex justify-between items-center text-sm"><span className="text-slate-500 font-medium">Avg. Root Length</span> <strong className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{selectedTooth.rootLengthMm} mm</strong></div>
                           {selectedTooth.eruptionAge && (
                              <div className="mt-2 flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                                 <span className="text-slate-500 font-medium text-xs">Eruption Timeline</span> 
                                 <strong className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{selectedTooth.eruptionAge}</strong>
                              </div>
                           )}
                        </div>
                     </div>
                     
                     <button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2 bg-[#0D1B2A] text-white px-6 py-4 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-slate-300 print:hidden">
                        <Download className="w-4 h-4" /> Download Tooth Reference Card PDF
                     </button>
                  </div>
               )}
               
               {/* EXPLORE EMPTY STATE */}
               {activeTab === 'explore' && !selectedTooth && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                     <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm animate-bounce">👆</div>
                     <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">Select a tooth to explore</h3>
                     <p className="text-sm max-w-xs">Click any tooth on the diagram to instantly view its morphology, dimensions, and clinical notes.</p>
                  </div>
               )}

               {/* IDENTIFY PANEL */}
               {activeTab === 'identify' && idTarget && idTotal < 10 && (
                  <div className="p-6 md:p-8 flex flex-col items-center h-full animate-fade-in print:hidden">
                     <div className="w-full flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm mb-8 relative z-10">
                        <button onClick={() => setIdLevel('easy')} className={`flex-1 text-xs py-2 rounded-md font-bold transition-all ${idLevel==='easy'?'bg-emerald-100 text-emerald-800 shadow-sm':'text-slate-500 hover:bg-slate-50'}`}>Easy</button>
                        <button onClick={() => setIdLevel('medium')} className={`flex-1 text-xs py-2 rounded-md font-bold transition-all ${idLevel==='medium'?'bg-blue-100 text-blue-800 shadow-sm':'text-slate-500 hover:bg-slate-50'}`}>Medium</button>
                        <button onClick={() => setIdLevel('hard')} className={`flex-1 text-xs py-2 rounded-md font-bold transition-all ${idLevel==='hard'?'bg-rose-100 text-rose-800 shadow-sm':'text-slate-500 hover:bg-slate-50'}`}>Hard (Pairs)</button>
                     </div>
                     
                     <div className="bg-white w-full max-w-sm rounded-[2rem] border border-slate-200 shadow-md p-8 flex flex-col items-center text-center relative mb-6 shrink-0 z-10">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-[#4B6EF5] rounded-t-[2rem]"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Identify This Tooth</span>
                        <div className="w-40 h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center shadow-inner mb-6 text-slate-400">
                           <ToothSilhouetteSVG arch={idTarget.arch} group={idTarget.group} />
                        </div>
                        
                        <div className="w-full">
                           {idFeedback.status ? (
                              <div className={`p-4 rounded-xl border flex flex-col items-center text-center animate-fade-in ${idFeedback.status === 'correct' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                                 <p className="font-bold mb-1">{idFeedback.msg}</p>
                                 {idFeedback.status === 'correct' && idTarget.landmark && (
                                     <p className="text-xs opacity-80 italic">{idTarget.landmark}</p>
                                 )}
                              </div>
                           ) : (
                              <p className="text-sm font-semibold text-slate-500 bg-slate-50 py-3 px-4 rounded-xl border border-slate-100">
                                 Tap the matching tooth on the chart on the left.
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="w-full max-w-sm flex items-center justify-between px-2 mb-6">
                        <span className="text-sm font-bold text-slate-600">Score: <span className="text-xl font-black text-[#0D1B2A]">{idScore}/{idTotal}</span></span>
                        <span className="text-sm font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">Streak: 🔥 <span className="text-[#0D1B2A]">{idStreak}</span></span>
                     </div>

                     {idFeedback.status && (
                        <button onClick={startNewQuiz} className="w-full max-w-sm flex items-center justify-center gap-2 bg-[#4B6EF5] text-white px-6 py-4 rounded-xl text-base font-bold hover:bg-blue-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Next Challenge <ArrowRight className="w-5 h-5" />
                        </button>
                     )}
                  </div>
               )}

               {/* IDENTIFY FINISH STATE */}
               {activeTab === 'identify' && idTotal >= 10 && (
                  <div className="absolute inset-0 z-50 bg-[#0D1B2A] flex flex-col items-center justify-center text-center print:hidden rounded-lg m-6 lg:m-0 shadow-2xl relative overflow-hidden h-[90%] lg:h-full">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#4B6EF5] rounded-full blur-[80px] opacity-40"></div>
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 rounded-full blur-[80px] opacity-20"></div>
                     
                     <div className="relative z-10 flex flex-col items-center">
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">Challenge Complete!</h3>
                        <p className="text-slate-300 font-medium mb-8">You finished the {idLevel} identify quiz.</p>
                        
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl mb-10 w-64 shadow-2xl relative">
                           <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-2xl">🏆</div>
                           <p className="text-8xl font-black text-emerald-400 leading-none drop-shadow-md">{idScore}</p>
                           <p className="text-white/60 font-bold uppercase tracking-widest mt-2 text-sm">Out of 10</p>
                        </div>

                        <div className="flex flex-col gap-4 w-full px-8 max-w-sm">
                           <a href={generateWhatsAppShare()} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5C] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 text-lg">
                               <Share2 className="w-5 h-5" /> Dare a Friend
                           </a>
                           <button onClick={resetQuiz} className="w-full bg-transparent hover:bg-white/10 text-white border-2 border-white/20 px-6 py-4 rounded-xl font-bold transition-all">
                               Try Again
                           </button>
                        </div>
                     </div>
                  </div>
               )}

               {/* CONVERTER PANEL */}
               {activeTab === 'converter' && (
                  <div className="p-6 md:p-8 flex flex-col animate-fade-in relative min-h-max">
                     <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 z-10 sticky top-0 md:static print:hidden shrink-0">
                        <h3 className="text-sm font-extrabold text-[#4B6EF5] uppercase tracking-widest mb-4 flex items-center gap-2">Live Notation Converter</h3>
                        <div className="grid grid-cols-3 gap-3">
                           <div className="flex flex-col">
                              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1">FDI</label>
                              <input value={convFDI} onChange={(e) => handleConvInput(e.target.value, 'fdi')} className="w-full border-2 border-slate-200 rounded-lg px-2 py-3 text-center text-xl font-black text-[#0D1B2A] focus:border-[#4B6EF5] focus:ring-0 transition-colors" placeholder="e.g. 16" />
                           </div>
                           <div className="flex flex-col">
                              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1">Universal</label>
                              <input value={convUni} onChange={(e) => handleConvInput(e.target.value, 'uni')} className="w-full border-2 border-slate-200 rounded-lg px-2 py-3 text-center text-xl font-black text-[#0D1B2A] focus:border-[#4B6EF5] focus:ring-0 transition-colors" placeholder="e.g. 3" />
                           </div>
                           <div className="flex flex-col">
                              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1">Palmer</label>
                              <input value={convPal} disabled className="w-full border-2 border-slate-100 bg-slate-50 rounded-lg px-2 py-3 text-center text-xl font-black text-slate-500 cursor-not-allowed" placeholder="e.g. ┘ 6" />
                           </div>
                        </div>
                        {selectedTooth && (
                           <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center gap-2 text-center animate-fade-in">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="font-bold text-emerald-800 text-sm leading-tight">{selectedTooth.name}</span>
                           </div>
                        )}
                     </div>

                     <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
                        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 shrink-0 print:hidden">
                            <select value={convFilterQuad} onChange={e=>setConvFilterQuad(e.target.value)} className="w-full sm:w-1/2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-[#4B6EF5] focus:border-[#4B6EF5] text-slate-700">
                                <option value="All">All Quads</option>
                                <option value="1">Upper R (1)</option>
                                <option value="2">Upper L (2)</option>
                                <option value="3">Lower L (3)</option>
                                <option value="4">Lower R (4)</option>
                            </select>
                            <select value={convFilterType} onChange={e=>setConvFilterType(e.target.value)} className="w-full sm:w-1/2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-[#4B6EF5] focus:border-[#4B6EF5] text-slate-700">
                                <option value="All">All Teeth</option>
                                <option value="incisor">Incisors</option>
                                <option value="canine">Canines</option>
                                <option value="premolar">Premolars</option>
                                <option value="molar">Molars</option>
                            </select>
                        </div>
                        <div className="flex-1 overflow-y-auto w-full print:overflow-visible">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead className="bg-slate-100 text-slate-600 sticky top-0 print:static shadow-sm z-10">
                                    <tr>
                                        <th className="py-2.5 px-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">FDI</th>
                                        <th className="py-2.5 px-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Uni.</th>
                                        <th className="py-2.5 px-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-r border-slate-200">Palm.</th>
                                        <th className="py-2.5 px-4 text-[10px] font-black uppercase tracking-widest">Name</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {(dentition==='adult'?adultTeeth:paedoTeeth).filter(t => 
                                        (convFilterQuad === 'All' || t.quadrant.toString() === convFilterQuad) &&
                                        (convFilterType === 'All' || t.group === convFilterType)
                                    ).map((t) => (
                                        <tr key={t.id} onClick={() => handleToothClick(t)} className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${selectedTooth?.id === t.id ? 'bg-blue-50' : ''}`}>
                                            <td className="py-3 px-4 font-black text-[#4B6EF5]">{t.fdi}</td>
                                            <td className="py-3 px-4 font-black text-rose-500">{t.universal}</td>
                                            <td className="py-3 px-4 font-black text-slate-500 border-r border-slate-100">{t.palmer}</td>
                                            <td className="py-3 px-4 font-semibold text-[#0D1B2A] text-xs leading-tight">{t.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 border-t border-slate-200 bg-slate-50 shrink-0 print:hidden hidden sm:block">
                            <button onClick={() => window.print()} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-[#0D1B2A] hover:border-[#0D1B2A] hover:text-white transition-all">
                                <Printer className="w-3.5 h-3.5" /> Print Chart Data PDF
                            </button>
                        </div>
                     </div>
                  </div>
               )}

               {/* SIMULATOR PANEL */}
               {activeTab === 'simulator' && (
                  <div className="p-6 md:p-8 flex flex-col h-full animate-fade-in print:hidden">
                     
                     <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 shrink-0 relative z-20">
                         <div className="flex justify-between items-center mb-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#4B6EF5]">Practice Scenario</label>
                            {simVerification && (
                                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-black ${simVerification.correct === simVerification.total ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                    Score: {simVerification.correct}/{simVerification.total}
                                </span>
                            )}
                         </div>
                         <div className="relative mb-3">
                           <select value={simScenario} onChange={(e) => loadScenario(e.target.value)} className="w-full border-2 border-[#4B6EF5] text-sm bg-blue-50/50 hover:bg-blue-50 rounded-xl px-4 py-3 font-bold text-[#0D1B2A] focus:border-[#4B6EF5] focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer outline-none animate-[scenario-pulse_2s_ease-in-out_3]">
                               {simulatorScenarios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#4B6EF5]">
                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                           </div>
                         </div>
                         {simScenario !== 's5' && (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 mb-4 font-medium leading-relaxed italic">
                                "{simulatorScenarios.find(s=>s.id===simScenario)?.description}"
                            </div>
                         )}
                         <div className="flex gap-2">
                            <button onClick={verifyCharting} className="flex-1 bg-[#0D1B2A] hover:bg-slate-800 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                                Verify My Findings
                            </button>
                            <button onClick={() => window.print()} className="bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 aspect-square w-12 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0" title="Print Mock Chart">
                                <Printer className="w-5 h-5"/>
                            </button>
                         </div>
                     </div>

                     <div className="shrink-0 min-h-max bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative flex flex-col justify-center overflow-visible">
                         {!selectedTooth && (
                             <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center text-slate-500 animate-fade-in">
                                 <div className="w-16 h-16 bg-blue-50 border-2 border-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner animate-pulse">👆</div>
                                 <h3 className="text-lg font-extrabold text-[#0D1B2A] mb-2 leading-tight">Select a tooth to chart</h3>
                                 <p className="text-sm max-w-[200px] leading-relaxed">Click any tooth on the diagram to assign clinical conditions.</p>
                             </div>
                         )}
                         
                         <div className="mb-6 flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center text-[#4B6EF5] font-black text-lg">
                                    {selectedTooth?.fdi || '--'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Target</span>
                                    <span className="text-sm font-bold text-[#0D1B2A] leading-none line-clamp-1">{selectedTooth?.name || 'Waiting...'}</span>
                                </div>
                            </div>
                            <button onClick={() => applyCondition('clear')} className="text-[10px] font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1.5 bg-white border border-rose-200 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors shadow-sm disabled:opacity-50" disabled={!selectedTooth}>
                               <Trash2 className="w-3.5 h-3.5"/> Clear
                            </button>
                         </div>

                         <div className="mb-8">
                             <span className="text-[10px] font-black uppercase text-[#4B6EF5] tracking-widest block mb-3">1. Select Surfaces</span>
                             <div className="flex gap-2">
                                 {['M', 'D', 'O', 'B', 'L'].map(sf => {
                                     const isAnterior = selectedTooth?.group === 'incisor' || selectedTooth?.group === 'canine';
                                     let label = sf;
                                     if (sf === 'O' && isAnterior) label = 'I';
                                     if (sf === 'B' && isAnterior) label = 'F';
                                     
                                     const selected = simSelectedSurfaces.includes(sf);
                                     return (
                                         <button 
                                            key={sf} 
                                            disabled={!selectedTooth}
                                            onClick={() => setSimSelectedSurfaces(prev => selected ? prev.filter(x=>x!==sf) : [...prev, sf])}
                                            className={`flex-1 aspect-square rounded-xl border-2 font-black text-sm lg:text-base flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${selected ? 'border-[#4B6EF5] bg-[#4B6EF5] text-white shadow-[0_4px_12px_rgba(75,110,245,0.3)] scale-[1.05]' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 shadow-sm'}`}
                                         >{label}</button>
                                     )
                                 })}
                             </div>
                         </div>

                         <div>
                             <span className="text-[10px] font-black uppercase text-[#4B6EF5] tracking-widest block mb-3">2. Apply Condition</span>
                             <div className="grid grid-cols-2 gap-2">
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('caries')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-rose-200 bg-rose-50 text-rose-700 flex items-center gap-3 hover:bg-rose-100 transition-colors shadow-sm disabled:opacity-50">
                                     <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-inner"></span> Caries
                                 </button>
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('restoration')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-blue-200 bg-blue-50 text-blue-700 flex items-center gap-3 hover:bg-blue-100 transition-colors shadow-sm disabled:opacity-50">
                                     <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-inner"></span> Filling
                                 </button>
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('crown')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-slate-200 text-slate-800 flex items-center gap-3 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 bg-white">
                                     <div className="w-3.5 h-3.5 border-2 border-blue-600 rounded-[3px]"></div> Crown
                                 </button>
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('rct')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-slate-200 text-slate-800 flex items-center gap-3 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 bg-white">
                                     <div className="w-3.5 h-1.5 bg-blue-600 rounded-sm"></div> RCT
                                 </button>
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('missing')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-slate-200 text-slate-800 flex items-center gap-3 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 bg-white">
                                     <span className="font-extrabold text-blue-600 text-base leading-none translate-y-[-1px]">X</span> Missing
                                 </button>
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('implant')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-slate-200 text-slate-800 flex items-center gap-3 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 bg-white">
                                     <div className="w-2.5 h-3.5 bg-blue-600 rounded-b-sm border-t-2 border-white relative"><div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600"></div></div> Implant
                                 </button>
                                 <button disabled={!selectedTooth} onClick={() => applyCondition('sealant')} className="text-left px-4 py-3 border rounded-xl text-sm font-bold border-indigo-100 bg-indigo-50/50 text-indigo-700 flex items-center gap-3 hover:bg-indigo-50 transition-colors shadow-sm disabled:opacity-50 col-span-2">
                                     <span className="w-3.5 h-3.5 rounded-full bg-blue-400 opacity-60 mix-blend-multiply"></span> Pit & Fissure Sealant
                                 </button>
                             </div>
                         </div>
                     </div>
                  </div>
               )}

            </div>
         </div>
      </div>

    </div>
  );
}
