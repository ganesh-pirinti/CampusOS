import React, { useState } from 'react';
import { 
  Bus, 
  Network, 
  GraduationCap, 
  Trophy, 
  Calendar, 
  Map, 
  ShieldCheck, 
  Building,
  Zap
} from 'lucide-react';

interface SystemBox {
  id: string;
  name: string;
  icon: any;
  color: string;
  knows: string[];
  affects: string[];
  doesWithIt: string[];
}

export const SystemGraphScreen: React.FC = () => {
  const systemsList: SystemBox[] = [
    {
      id: 'transport',
      name: 'Transport',
      icon: Bus,
      color: '#4285F4',
      knows: ['Bus location', 'Route ID', 'GPS Telemetry & Delay'],
      affects: ['Students', 'Classes', 'Routes'],
      doesWithIt: ['Recalculates transit ETAs', 'Notifies passengers', 'Protects attendance grace period']
    },
    {
      id: 'academic',
      name: 'Academic ERP',
      icon: Network,
      color: '#4285F4',
      knows: ['Student timetables', 'Course enrollments', 'Attendance records'],
      affects: ['Biometric logs', 'Class eligibility', 'OD approvals'],
      doesWithIt: ['Auto-generates On-Duty passes', 'Adjusts attendance entries', 'Syncs faculty rosters']
    },
    {
      id: 'lms',
      name: 'LMS Telemetry',
      icon: GraduationCap,
      color: '#FBBC05',
      knows: ['Quiz scores', 'Submission timestamps', 'Topic error analytics'],
      affects: ['Mentoring needs', 'Student concept scores'],
      doesWithIt: ['Detects concept gaps', 'Matches faculty office hours', 'Pushes adaptive modules']
    },
    {
      id: 'student_affairs',
      name: 'Student Affairs',
      icon: Trophy,
      color: '#34A853',
      knows: ['Hackathon results', 'Contest verification', 'Club activities'],
      affects: ['Student profiles', 'Extracurricular credits'],
      doesWithIt: ['Verifies external wins', 'Triggers OD workflows', 'Notifies HODs']
    },
    {
      id: 'faculty',
      name: 'Faculty',
      icon: Calendar,
      color: '#4285F4',
      knows: ['Office hours', 'Consultation slots', 'Class schedules'],
      affects: ['Student mentoring', 'Attendance approvals'],
      doesWithIt: ['Reserves 1-on-1 support slots', 'Receives automated OD alerts', 'Updates office rosters']
    },
    {
      id: 'routes',
      name: 'Routes',
      icon: Map,
      color: '#EA4335',
      knows: ['Road blockage reports', 'Traffic congestion', 'Detour paths'],
      affects: ['Bus arrival ETAs', 'Driver routes'],
      doesWithIt: ['Calculates detour vectors', 'Broadcasts spatial reroutes', 'Updates live transit map']
    },
    {
      id: 'access',
      name: 'Access',
      icon: ShieldCheck,
      color: '#4285F4',
      knows: ['Biometric gate scans', 'Turnstile status', 'Lab clearance'],
      affects: ['Physical entry', 'Campus security'],
      doesWithIt: ['Applies Zero-Leak privacy filter', 'Projects simple ALLOW/VERIFY to gate', 'Hides private academic reasons']
    },
    {
      id: 'services',
      name: 'Campus Services',
      icon: Building,
      color: '#34A853',
      knows: ['Cafeteria queues', 'Library passes', 'Event halls'],
      affects: ['Student facilities', 'Campus operations'],
      doesWithIt: ['Synchronizes service hours', 'Adjusts facility access during events', 'Monitors facility load']
    }
  ];

  const [selectedSystem, setSelectedSystem] = useState<SystemBox>(systemsList[0]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE HEADER */}
      <div className="bg-white p-6 rounded-xl border border-[#DADCE0] shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-mono font-bold border border-[#4285F4]/30">
          <Network className="w-3.5 h-3.5 text-[#4285F4]" />
          CAMPUSOS CONNECTOR ARCHITECTURE
        </div>
        <h1 className="text-3xl font-bold text-[#202124] tracking-tight">HOW CAMPUSOS CONNECTS</h1>
        <p className="text-sm text-[#5F6368] font-normal">
          Click any system box to see what it knows, what it affects, and what CampusOS does with it.
        </p>
      </div>

      {/* 2. MAIN INTERACTIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 8 CLEAN BOXES & CENTRAL CONTEXT ENGINE (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm space-y-6">
          <div className="text-center pb-2 border-b border-[#DADCE0]">
            <h2 className="text-lg font-bold text-[#202124]">CONNECTED CAMPUS DOMAINS</h2>
            <p className="text-xs text-[#5F6368]">Select a system box to inspect its connector data flow.</p>
          </div>

          {/* CENTRAL CONTEXT ENGINE HERO CARD */}
          <div className="p-6 rounded-xl bg-[#4285F4] text-white text-center shadow-md space-y-2">
            <Zap className="w-8 h-8 fill-white mx-auto" />
            <h3 className="text-xl font-bold tracking-tight">CAMPUSOS CONTEXT ENGINE</h3>
            <p className="text-xs text-white/90">
              Central deterministic event graph &amp; cross-domain decision engine.
            </p>
          </div>

          {/* 8 BOXES GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemsList.map((sys) => {
              const Icon = sys.icon;
              const isSelected = selectedSystem.id === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys)}
                  className={`p-4 rounded-xl border transition-all text-left space-y-2 ${
                    isSelected
                      ? 'bg-[#E8F0FE] border-[#4285F4] shadow-sm font-bold ring-2 ring-[#4285F4]/30'
                      : 'bg-[#F8F9FA] border-[#DADCE0] hover:bg-white hover:border-[#4285F4]'
                  }`}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: sys.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-[#202124]">{sys.name}</h4>
                  <div className="text-[10px] text-[#5F6368] font-mono">Click to inspect</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SYSTEM DETAILS PANEL (Right 1 col) */}
        <div className="bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm space-y-6">
          <div className="border-b border-[#DADCE0] pb-4 space-y-1">
            <span className="text-xs font-mono text-[#1A73E8] uppercase font-bold">SELECTED SYSTEM</span>
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: selectedSystem.color }}
              >
                <selectedSystem.icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-[#202124]">{selectedSystem.name}</h3>
            </div>
          </div>

          {/* 3 SPECIFIED SECTIONS */}
          <div className="space-y-4 text-xs">
            
            {/* WHAT IT KNOWS */}
            <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-2">
              <div className="text-[#4285F4] font-mono uppercase font-bold text-[11px]">WHAT IT KNOWS</div>
              <ul className="list-disc list-inside space-y-1 text-[#202124] font-medium">
                {selectedSystem.knows.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* WHAT IT AFFECTS */}
            <div className="p-4 rounded-lg bg-[#FEF7E0] border border-[#FBBC05]/40 space-y-2">
              <div className="text-[#B06000] font-mono uppercase font-bold text-[11px]">WHAT IT AFFECTS</div>
              <ul className="list-disc list-inside space-y-1 text-[#202124] font-medium">
                {selectedSystem.affects.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* WHAT CAMPUSOS DOES WITH IT */}
            <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 space-y-2">
              <div className="text-[#137333] font-mono uppercase font-bold text-[11px]">WHAT CAMPUSOS DOES WITH IT</div>
              <ul className="list-disc list-inside space-y-1 text-[#202124] font-medium">
                {selectedSystem.doesWithIt.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
