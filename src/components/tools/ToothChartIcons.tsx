import type { ToothGroup } from './ToothChartData';

// Reusing and updating the base SVG shape used centrally in the tool
export const SimpleToothSVG = ({ isMolar, group }: { isMolar: boolean, group?: ToothGroup }) => {
  if (group === 'incisor') {
    return (
      <svg viewBox="0 0 40 60" className="w-full h-full drop-shadow-sm transition-all duration-300 pointer-events-none group-hover:-translate-y-1 group-active:translate-y-0">
        <path d="M15,25 C10,25 10,10 12,5 C15,0 25,0 28,5 C30,10 30,25 25,25 C30,40 25,55 20,55 C15,55 10,40 15,25 Z" fill="currentColor" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      </svg>
    );
  }
  if (group === 'canine') {
     return (
      <svg viewBox="0 0 40 60" className="w-full h-full drop-shadow-sm transition-all duration-300 pointer-events-none group-hover:-translate-y-1 group-active:translate-y-0">
        <path d="M15,25 C10,25 15,10 20,5 C25,10 30,25 25,25 C30,40 25,57 20,57 C15,57 10,40 15,25 Z" fill="currentColor" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      </svg>
    );
  }
  
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full drop-shadow-sm transition-all duration-300 pointer-events-none group-hover:-translate-y-1 group-active:translate-y-0">
      {isMolar ? (
        <path 
           d="M10,25 C5,25 5,10 10,5 C15,0 25,0 30,5 C35,10 35,25 30,25 C35,40 30,55 25,55 C20,55 20,40 20,40 C20,40 20,55 15,55 C10,55 5,40 10,25 Z" 
           fill="currentColor" stroke="rgba(0,0,0,0.1)" strokeWidth="1"
        />
      ) : (
        <path 
           d="M15,25 C10,25 10,10 15,5 C20,0 20,0 25,5 C30,10 30,25 25,25 C30,40 25,55 20,55 C15,55 10,40 15,25 Z" 
           fill="currentColor" stroke="rgba(0,0,0,0.1)" strokeWidth="1"
        />
      )}
    </svg>
  );
};

// Larger specific silhouette for Quiz
export const ToothSilhouetteSVG = ({ group, arch }: { group: ToothGroup, arch: 'upper'|'lower' }) => {
  return (
    <svg viewBox="0 0 100 150" className="w-full h-full max-h-48 text-slate-300">
      {group === 'incisor' && (
         <path d="M40,70 C20,70 20,20 30,10 C40,0 60,0 70,10 C80,20 80,70 60,70 C70,110 60,140 50,140 C40,140 30,110 40,70 Z" fill="currentColor" />
      )}
      {group === 'canine' && (
         <path d="M40,70 C20,70 40,30 50,10 C60,30 80,70 60,70 C70,110 60,145 50,145 C40,145 30,110 40,70 Z" fill="currentColor" />
      )}
      {group === 'premolar' && (
         <path d="M30,70 C20,70 20,30 30,20 C40,10 60,10 70,20 C80,30 80,70 70,70 C80,110 70,140 50,140 C30,140 20,110 30,70 Z" fill="currentColor" />
      )}
      {group === 'molar' && arch === 'upper' && (
         <path d="M25,70 C10,70 10,30 25,20 C40,10 60,10 75,20 C90,30 90,70 75,70 C85,110 70,140 60,140 C55,140 50,110 50,110 C50,110 45,140 40,140 C30,140 15,110 25,70 Z" fill="currentColor" />
      )}
      {group === 'molar' && arch === 'lower' && (
         <path d="M20,70 C10,70 10,30 20,20 C30,10 70,10 80,20 C90,30 90,70 80,70 C90,110 80,140 70,140 C60,140 50,110 50,110 C50,110 40,140 30,140 C20,140 10,110 20,70 Z" fill="currentColor" />
      )}
    </svg>
  );
};


// 5-Section Geometric Diagram
export const SurfaceDiagram = ({ group }: { group: ToothGroup }) => {
  const isAnterior = group === 'incisor' || group === 'canine';
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full max-w-24 max-h-24">
      {/* Circle divided into 5 sections */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#E2E8F0" strokeWidth="2" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="16" y1="16" x2="36" y2="36" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="84" y1="16" x2="64" y2="36" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="16" y1="84" x2="36" y2="64" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="84" y1="84" x2="64" y2="64" stroke="#E2E8F0" strokeWidth="2" />

      {/* Center - Occlusal/Incisal */}
      <text x="50" y="54" fontSize="12" fontWeight="bold" fill="#64748B" textAnchor="middle">{isAnterior ? 'I' : 'O'}</text>
      {/* Top - Buccal/Facial */}
      <text x="50" y="16" fontSize="12" fontWeight="bold" fill="#64748B" textAnchor="middle">{isAnterior ? 'F' : 'B'}</text>
      {/* Bottom - Lingual */}
      <text x="50" y="93" fontSize="12" fontWeight="bold" fill="#64748B" textAnchor="middle">L</text>
      {/* Left - Mesial */}
      <text x="10" y="54" fontSize="12" fontWeight="bold" fill="#64748B" textAnchor="middle">M</text>
      {/* Right - Distal */}
      <text x="90" y="54" fontSize="12" fontWeight="bold" fill="#64748B" textAnchor="middle">D</text>
    </svg>
  );
};

// Charting condition overlay applied on top of SimpleToothSVG
export const ChartingOverlaySVG = ({ condition, surfaces }: { condition: string, surfaces: string[] }) => {
  if (condition === 'missing' || condition === 'extraction') {
     return (
       <div className="absolute inset-0 flex items-center justify-center p-1 pointer-events-none z-10">
          <svg viewBox="0 0 100 100" className={`w-full h-full ${condition === 'missing' ? 'text-blue-500' : 'text-blue-500'}`}>
             <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
             <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          </svg>
       </div>
     );
  }

  if (condition === 'implant') {
     return (
       <div className="absolute inset-0 flex items-center justify-center p-1 pointer-events-none z-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
             <rect x="35" y="40" width="30" height="50" fill="currentColor" />
             <line x1="30" y1="50" x2="70" y2="50" stroke="white" strokeWidth="4" />
             <line x1="30" y1="65" x2="70" y2="65" stroke="white" strokeWidth="4" />
             <line x1="30" y1="80" x2="70" y2="80" stroke="white" strokeWidth="4" />
             <path d="M30 40 L50 20 L70 40 Z" fill="currentColor" />
          </svg>
       </div>
     );
  }

  if (condition === 'rct') {
      return (
         <div className="absolute inset-0 flex items-center justify-center pt-8 pointer-events-none z-10">
             <div className="w-3/4 h-1 bg-blue-500"></div>
         </div>
      );
  }

  if (condition === 'rct-crown' || condition === 'crown') {
      return (
         <div className="absolute inset-0 pointer-events-none z-10 flex flex-col pt-1">
             <div className="w-full aspect-square border-[3px] border-blue-500 rounded-lg"></div>
             {condition === 'rct-crown' && (
                 <div className="w-3/4 h-1 bg-blue-500 mx-auto mt-2"></div>
             )}
         </div>
      );
  }

  // Handle Restorations and Caries (Surface specific)
  if (condition === 'restoration' || condition === 'caries' || condition === 'sealant') {
      const isRed = condition === 'caries';
      const colorClass = isRed ? 'bg-red-500' : 'bg-blue-500';
      const oColor = condition === 'sealant' ? 'bg-blue-300 opacity-60' : colorClass;
      
      const hasO = surfaces.includes('O') || surfaces.includes('I');
      const hasM = surfaces.includes('M');
      const hasD = surfaces.includes('D');
      const hasB = surfaces.includes('B') || surfaces.includes('F');
      const hasL = surfaces.includes('L');

      return (
         <div className="absolute top-1 left-0 right-0 h-10 pointer-events-none z-10 flex items-center justify-center">
             <div className="relative w-8 h-8 md:w-10 md:h-10">
                {/* O/I */}
                {hasO && <div className={`absolute inset-0 m-auto w-1/3 h-1/3 rounded-sm ${oColor}`}></div>}
                {/* M */}
                {hasM && <div className={`absolute left-0 top-0 bottom-0 m-auto w-1/3 h-2/3 rounded-sm ${colorClass}`}></div>}
                {/* D */}
                {hasD && <div className={`absolute right-0 top-0 bottom-0 m-auto w-1/3 h-2/3 rounded-sm ${colorClass}`}></div>}
                {/* B/F */}
                {hasB && <div className={`absolute top-0 left-0 right-0 m-auto w-2/3 h-1/3 rounded-sm ${colorClass}`}></div>}
                {/* L */}
                {hasL && <div className={`absolute bottom-0 left-0 right-0 m-auto w-2/3 h-1/3 rounded-sm ${colorClass}`}></div>}
             </div>
         </div>
      );
  }

  return null;
}
