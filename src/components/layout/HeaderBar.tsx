import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Users, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const HeaderBar: React.FC = () => {
  const { events, systems, currentSimulation, setActiveTab } = useCampus();
  const [timeStr, setTimeStr] = useState<string>('2026-09-29 14:29:30');

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const yr = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const da = String(d.getDate()).padStart(2, '0');
      const hr = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      const se = String(d.getSeconds()).padStart(2, '0');
      setTimeStr(`${yr}-${mo}-${da} ${hr}:${mi}:${se}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeEventsCount = events.filter(e => e.status === 'active').length;
  const operationalSystemsCount = systems.filter(s => s.status === 'operational').length;

  return (
    <div className="relative z-10 shrink-0 bg-white">
      <header className="h-16 border-b border-[#DADCE0] px-6 flex items-center justify-between">
        {/* Left System Indicators */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${
                currentSimulation.running ? 'bg-[#4285F4]' : 'bg-[#34A853]'
              }`} />
              <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${
                currentSimulation.running ? 'bg-[#4285F4]' : 'bg-[#34A853]'
              }`} />
            </div>
            <span className="text-xs font-mono font-bold text-[#202124] uppercase tracking-wider">
              {currentSimulation.running ? 'CONTEXT ENGINE PROCESSING...' : 'ENGINE ACTIVE'}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[#DADCE0]" />

          {/* Metrics Row */}
          <div className="hidden lg:flex items-center gap-5 text-xs text-[#5F6368] font-serif">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#4285F4]" />
              <span className="font-bold text-[#202124]">{operationalSystemsCount}/8</span> Systems Active
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#EA4335]" />
              <span className="font-bold text-[#202124]">{activeEventsCount}</span> Active Events
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#4285F4]" />
              <span className="font-bold text-[#202124]">128</span> Affected Users
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
              <span className="font-bold text-[#34A853]">94%</span> Action Coverage
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* LIVE DEMO Badge */}
          <div className="px-2.5 py-1 rounded bg-[#E8F0FE] border border-[#4285F4]/30 text-[#1A73E8] text-[11px] font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1A73E8] animate-ping" />
            <span>LIVE DEMO</span>
          </div>

          {/* Prototype Label Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FE] border border-[#4285F4]/30 text-[#1A73E8] text-xs font-serif font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A73E8]" />
            <span>SRM University-AP • Solution Hunt 2026</span>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#5F6368] bg-[#F8F9FA] px-3 py-1 rounded-md border border-[#DADCE0]">
            <Clock className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>{timeStr}</span>
          </div>

          {/* Quick Launch Simulator Button */}
          <button
            onClick={() => setActiveTab('simulator')}
            className="px-3.5 py-1.5 rounded-md bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-serif font-bold shadow-2xs flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Event Simulator</span>
          </button>
        </div>
      </header>

      {/* Subtle Four-Color Horizontal Indicator Bar (Blue -> Red -> Yellow -> Green) */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/4 bg-[#4285F4]" />
        <div className="h-full w-1/4 bg-[#EA4335]" />
        <div className="h-full w-1/4 bg-[#FBBC05]" />
        <div className="h-full w-1/4 bg-[#34A853]" />
      </div>
    </div>
  );
};
