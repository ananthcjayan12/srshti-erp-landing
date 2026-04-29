import React from 'react';
import {
    HomeIcon,
    CalendarIcon,
    UserGroupIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    BellIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const DashboardPreview: React.FC = () => {
    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex font-sans select-none antialiased">

            {/* Sidebar */}
            <div className="w-16 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
                <div>
                    <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800/50">
                        <img src="/logo.png" alt="Cue360 Logo" className="h-10 lg:h-12 w-auto object-contain" width={96} height={48} loading="lazy" decoding="async" />
                    </div>
                    <div className="p-4 space-y-1">
                        <NavRow icon={<HomeIcon className="w-5 h-5" />} label="Overview" active />
                        <NavRow icon={<CalendarIcon className="w-5 h-5" />} label="Schedule" />
                        <NavRow icon={<UserGroupIcon className="w-5 h-5" />} label="Patients" />
                        <NavRow icon={<Cog6ToothIcon className="w-5 h-5" />} label="Treatment" />
                        <NavRow icon={<ChartBarIcon className="w-5 h-5" />} label="Analytics" />
                    </div>
                </div>
                <div className="p-4 lg:px-6 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-dental-500 to-purple-500 ring-2 ring-slate-800"></div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-medium text-white">Dr. Smith</p>
                            <p className="text-xs text-slate-500">Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-slate-950 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="text-sm text-slate-400 font-medium">Dashboard / Overview</div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-700/50">
                            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
                            <span className="text-xs text-slate-500">Search patients...</span>
                            <div className="ml-8 text-[10px] bg-slate-700 text-slate-400 px-1.5 rounded border border-slate-600">⌘K</div>
                        </div>
                        <BellIcon className="w-5 h-5 text-slate-400" />
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 lg:p-8 overflow-hidden space-y-6">

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard title="Total Revenue" value="$48,294" trend="+12.5%" sparkline={[40, 35, 50, 60, 75, 65, 80, 70, 90, 85, 100]} />
                        <StatCard title="Active Patients" value="1,249" trend="+4.2%" sparkline={[20, 25, 30, 28, 40, 35, 50, 45, 60, 70, 80]} />
                        <StatCard title="Treatments" value="342" trend="+8.1%" sparkline={[60, 55, 65, 60, 70, 75, 65, 80, 85, 90, 95]} />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Dental Chart Widget */}
                        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-semibold text-white">Live Charting</h3>
                                <div className="flex gap-2">
                                    <StatusBadge status="Exam" />
                                    <EllipsisHorizontalIcon className="w-5 h-5 text-slate-500" />
                                </div>
                            </div>
                            {/* Visual Representation of Teeth Grid */}
                            <div className="grid grid-cols-16 gap-1 h-32 items-center justify-center border-b border-slate-800 pb-6 mb-4">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`h-12 rounded-sm bg-slate-800 border-slate-700/50 border relative group cursor-pointer hover:bg-slate-700 transition-colors ${[3, 12].includes(i) ? 'bg-red-500/10 border-red-500/30' : ''}`}>
                                        {/* Tooth Number */}
                                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-600 font-mono">{i + 1}</span>
                                        {/* Condition Indicator */}
                                        {[3, 12].includes(i) && <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></div></div>}
                                    </div>
                                ))}
                                {[...Array(16)].map((_, i) => (
                                    <div key={i + 16} className={`h-12 rounded-sm bg-slate-800 border-slate-700/50 border relative group cursor-pointer hover:bg-slate-700 transition-colors ${[20].includes(i + 16) ? 'bg-dental-500/10 border-dental-500/30' : ''}`}>
                                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-600 font-mono">{32 - i}</span>
                                        {[20].includes(i + 16) && <div className="absolute inset-0 bg-dental-500/10 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-dental-500 shadow-glow"></div></div>}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex gap-3">
                                    <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center">
                                        <span className="text-xs text-slate-500">X-Ray 01</span>
                                    </div>
                                    <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center">
                                        <span className="text-xs text-slate-500">X-Ray 02</span>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400 space-y-2">
                                    <p className="flex justify-between"><span>Procedure:</span> <span className="text-white">Root Canal</span></p>
                                    <p className="flex justify-between"><span>Provider:</span> <span className="text-white">Dr. Smith</span></p>
                                    <p className="flex justify-between"><span>Status:</span> <span className="text-yellow-400">In Progress</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Appointments List */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col">
                            <h3 className="text-sm font-semibold text-white mb-4">Up Next</h3>
                            <div className="space-y-4 flex-1">
                                <AppointmentRow time="09:00" patient="Sarah Connor" type="Checkup" />
                                <AppointmentRow time="10:30" patient="John Wick" type="Cleaning" active />
                                <AppointmentRow time="11:45" patient="Ellen Ripley" type="Filling" />
                                <AppointmentRow time="14:00" patient="Tony Stark" type="Consult" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components for cleanliness
const NavRow: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium ${active ? 'bg-dental-500/10 text-dental-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
        {icon}
        <span className="hidden lg:block">{label}</span>
    </div>
);

const StatCard: React.FC<{ title: string; value: string; trend: string; sparkline: number[] }> = ({ title, value, trend, sparkline }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-slate-700 transition-colors">
        <div className="flex justify-between items-start z-10">
            <div>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">{title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h4 className="text-2xl font-bold text-white tracking-tight">{value}</h4>
                </div>
            </div>
            <span className="text-xs font-semibold text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded border border-teal-400/20">{trend}</span>
        </div>

        {/* SVG Sparkline */}
        <div className="absolute inset-x-0 bottom-0 h-16 opacity-30 group-hover:opacity-40 transition-opacity">
            <svg className="w-full h-full" preserveAspectRatio="none">
                <path
                    d={`M0,${64 - (sparkline[0] / 100) * 64} ${sparkline.map((n, i) => `L${(i / (sparkline.length - 1)) * 100}%,${64 - (n / 100) * 64}`).join(' ')} V64 H0 Z`}
                    fill="url(#sparkGradient)"
                />
                <path
                    d={`M0,${64 - (sparkline[0] / 100) * 64} ${sparkline.map((n, i) => `L${(i / (sparkline.length - 1)) * 100}%,${64 - (n / 100) * 64}`).join(' ')}`}
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
                <defs>
                    <linearGradient id="sparkGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    </div>
);

const AppointmentRow: React.FC<{ time: string; patient: string; type: string; active?: boolean }> = ({ time, patient, type, active }) => (
    <div className={`flex items-center gap-4 p-3 rounded-lg border text-sm ${active ? 'bg-slate-800/80 border-dental-500/30 ring-1 ring-dental-500/20' : 'bg-slate-900/50 border-slate-800/50'}`}>
        <span className="text-slate-500 font-mono text-xs">{time}</span>
        <div className="flex-1">
            <p className="font-semibold text-slate-200">{patient}</p>
            <p className="text-xs text-slate-500">{type}</p>
        </div>
        {active && <div className="w-2 h-2 rounded-full bg-dental-500 shadow-glow"></div>}
    </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-dental-400/10 text-dental-400 border border-dental-400/20">
        {status}
    </span>
);

export default DashboardPreview;
