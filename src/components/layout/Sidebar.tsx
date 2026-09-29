import React from 'react';
import { 
  LayoutDashboard, 
  Radio,
  Bus, 
  Trophy, 
  GraduationCap, 
  Map, 
  ShieldCheck, 
  Network, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import type { TabId } from '../../context/CampusContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, events, resetDemoData, triggerEvent } = useCampus();

  const navItems: { 
    id: TabId; 
    label: string; 
    icon: React.FC<{ className?: string }>; 
    dotColor: string;
    badge?: number;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, dotColor: '#4285F4' },
    { id: 'live_campus', label: 'Live Campus', icon: Radio, dotColor: '#EA4335' },
    { id: 'mobility', label: 'Mobility', icon: Bus, dotColor: '#4285F4' },
    { id: 'achievement', label: 'Achievements', icon: Trophy, dotColor: '#34A853' },
    { id: 'mentor', label: 'Mentoring', icon: GraduationCap, dotColor: '#FBBC05' },
    { id: 'route', label: 'Routes', icon: Map, dotColor: '#EA4335' },
    { id: 'access', label: 'Access', icon: ShieldCheck, dotColor: '#4285F4' },
    { id: 'graph', label: 'System Connections', icon: Network, dotColor: '#5F6368' },
    { id: 'simulator', label: 'Event Simulator', icon: Zap, dotColor: '#4285F4', badge: events.length }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#DADCE0] flex flex-col justify-between shrink-0 select-none z-20 shadow-sm">
      <div>
        {/* App Title Header */}
        <div className="p-5 border-b border-[#DADCE0] bg-[#F8F9FA]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#4285F4] flex items-center justify-center text-white shadow-sm font-bold text-xl">
              <Zap className="w-6 h-6 fill-white stroke-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#202124] tracking-tight flex items-center gap-1.5 font-serif">
                CampusOS
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4285F4]/10 text-[#4285F4] font-mono border border-[#4285F4]/30 font-sans">
                  SRM-AP
                </span>
              </h1>
              <p className="text-xs text-[#5F6368] font-normal">One campus. Connected decisions.</p>
            </div>
          </div>
          <div className="mt-3 px-2.5 py-1.5 rounded-md bg-white border border-[#DADCE0] text-[11px] text-[#5F6368] flex items-center justify-between shadow-2xs font-serif">
            <span>SRM University-AP PS02</span>
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4">
          <button
            onClick={() => triggerEvent('BUS_DELAY')}
            className="w-full py-2.5 px-3 rounded-md bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all transform active:scale-98 font-serif"
          >
            <Zap className="w-4 h-4 fill-white" />
            SIMULATE EVENT
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#E8F0FE] text-[#1A73E8] font-bold border-l-4 border-[#4285F4] shadow-2xs'
                    : 'text-[#3C4043] hover:bg-[#F1F3F4] hover:text-[#202124] border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: item.dotColor }}
                  />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`} />
                  <span className="font-serif">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 text-[11px] rounded-full font-mono font-bold ${
                    isActive ? 'bg-[#4285F4] text-white' : 'bg-[#E8EAED] text-[#5F6368]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#DADCE0] space-y-3 bg-[#F8F9FA]/60">
        <div className="rounded-md bg-white p-3 border border-[#DADCE0] text-xs">
          <div className="flex items-center justify-between text-[#5F6368] mb-1">
            <span className="font-serif">Context Engine</span>
            <span className="text-[#34A853] font-mono font-bold">ONLINE</span>
          </div>
          <p className="text-[11px] text-[#5F6368] leading-tight font-serif">
            5 systems synchronized. Deterministic rule-graph pipeline active.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="w-full py-1.5 px-3 rounded-md bg-white border border-[#DADCE0] hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] text-xs font-serif font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo State
        </button>
      </div>
    </aside>
  );
};
