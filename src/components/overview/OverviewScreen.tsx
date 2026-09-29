import React, { useState } from 'react';
import { 
  Zap, 
  Layers, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Bus, 
  GraduationCap, 
  Trophy, 
  Map, 
  ShieldCheck, 
  Network, 
  Calendar,
  Sparkles,
  FileText,
  Clock
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const OverviewScreen: React.FC = () => {
  const { events, setSelectedEventForImpact, triggerEvent, setActiveTab } = useCampus();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const connectedSystemsList = [
    { name: 'Transport (SRM-AP Seed)', icon: Bus, activeEvents: 2, lastUpdate: '1 min ago', status: 'Connected' },
    { name: 'Academic ERP', icon: Network, activeEvents: 1, lastUpdate: '3 mins ago', status: 'Connected' },
    { name: 'LMS Telemetry', icon: GraduationCap, activeEvents: 1, lastUpdate: 'Just now', status: 'Connected' },
    { name: 'Student Affairs', icon: Trophy, activeEvents: 0, lastUpdate: '5 mins ago', status: 'Connected' },
    { name: 'Faculty Calendar', icon: Calendar, activeEvents: 1, lastUpdate: '2 mins ago', status: 'Connected' },
    { name: 'Routes GIS', icon: Map, activeEvents: 1, lastUpdate: 'Just now', status: 'Connected' },
    { name: 'Access Control', icon: ShieldCheck, activeEvents: 0, lastUpdate: '4 mins ago', status: 'Connected' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif relative">
      
      {/* 1. INSTITUTIONAL HERO & CONTEXT IDENTITY (Stitch Design) */}
      <div className="w-full bg-white rounded-xl border border-[#DADCE0] shadow-sm p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#E8F0FE] flex items-center justify-center text-[#1A73E8]">
              <Sparkles className="w-4 h-4 text-[#1A73E8]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A73E8]">
              SRM University-AP
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F8F9FA] text-[#5F6368] border border-[#DADCE0] tracking-tight">
            Solution Hunt 2026 • PS02 Protocol
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">CampusOS</h1>
            <p className="italic text-sm sm:text-base text-[#5F6368] mt-0.5">
              “One campus. One context. Connected decisions.”
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                triggerEvent('BUS_DELAY');
                showToast('Bus Delay Event Triggered & Cross-System Cascade Active');
              }}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 min-h-[44px] rounded-md bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98"
            >
              <Zap className="w-4 h-4 fill-white" />
              SIMULATE BUS DELAY
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[#DADCE0] bg-[#F8F9FA] px-3 py-2 rounded-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block animate-ping"></span>
          <span className="text-xs font-bold text-[#202124] tracking-wide font-mono">
            Real-time Cross-Domain Synthesis: LIVE
          </span>
          <span className="text-xs text-[#5F6368] font-mono ml-auto">
            Cycle: 3.2s • SRM-AP Published Seed Data
          </span>
        </div>
      </div>

      {/* 2. HIGH-LEVEL METRICS (4 Grid Cards - Stitch Spec) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Connected Systems */}
        <div className="bg-white p-4 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#5F6368] tracking-wider font-bold">Systems</span>
            <Layers className="w-4 h-4 text-[#4285F4]" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#202124] leading-none">7</span>
            <span className="text-xs text-[#34A853] font-bold ml-1">Active</span>
          </div>
          <span className="text-xs text-[#5F6368] mt-1">Bus, LMS, Wi-Fi, ERP +3</span>
        </div>

        {/* Metric 2: Active Events */}
        <div className="bg-white p-4 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#5F6368] tracking-wider font-bold">Events</span>
            <AlertTriangle className="w-4 h-4 text-[#EA4335]" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#EA4335] leading-none">{events.length}</span>
            <span className="text-xs text-[#EA4335] font-bold ml-1">In-Flight</span>
          </div>
          <span className="text-xs text-[#5F6368] mt-1">1 Critical · 2 Monitored</span>
        </div>

        {/* Metric 3: People Affected */}
        <div className="bg-white p-4 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#5F6368] tracking-wider font-bold">Affected</span>
            <Users className="w-4 h-4 text-[#4285F4]" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#202124] leading-none">53</span>
            <span className="text-xs text-[#5F6368] ml-1">Members</span>
          </div>
          <span className="text-xs text-[#5F6368] mt-1">42 Students · 11 Cohort</span>
        </div>

        {/* Metric 4: Actions Recommended */}
        <div className="bg-white p-4 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#5F6368] tracking-wider font-bold">Actions</span>
            <CheckCircle2 className="w-4 h-4 text-[#34A853]" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#34A853] leading-none">3</span>
            <span className="text-xs text-[#34A853] font-bold ml-1">Dispatched</span>
          </div>
          <span className="text-xs text-[#5F6368] mt-1">Zero manual escalation</span>
        </div>
      </div>

      {/* 3. CENTRAL VISUAL: CAMPUS CONTEXT ENGINE (5-STAGE CAUSAL CASCADE) */}
      <div className="w-full bg-white p-6 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-[#DADCE0]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#4285F4] text-white flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <h2 className="text-xl font-bold text-[#202124]">Campus Context Engine</h2>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#E8F0FE] text-[#1A73E8] font-bold tracking-wider">
            PS02 PROTOCOL
          </span>
        </div>

        <p className="text-xs text-[#5F6368]">
          Automated causal correlation bridging physical transit telematics to academic governance records.
        </p>

        {/* 5-Stage Step Flow */}
        <div className="flex flex-col space-y-3 pt-2">
          {/* Stage 1: EVENT */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#FCE8E6] text-[#C5221F] flex items-center justify-center font-bold text-xs font-mono">1</div>
              <div className="w-0.5 h-8 bg-[#DADCE0] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#EA4335] font-bold uppercase tracking-wider">1. Event Trigger</span>
                <span className="text-xs text-[#5F6368] font-mono">08:14 AM</span>
              </div>
              <p className="text-sm font-bold text-[#202124] mt-0.5">Bus Delay (Vijayawada NH16 Corridor)</p>
              <p className="text-xs text-[#5F6368]">GPS speed dropped below 5 km/h for 18 min on Kaza tollgate bypass</p>
            </div>
          </div>

          {/* Stage 2: CONTEXT */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold text-xs font-mono">2</div>
              <div className="w-0.5 h-8 bg-[#DADCE0] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
              <span className="text-xs font-mono text-[#4285F4] font-bold uppercase tracking-wider">2. Context Synthesis</span>
              <p className="text-sm font-bold text-[#202124] mt-0.5">Morning Peak &amp; 8:45 AM Labs</p>
              <p className="text-xs text-[#5F6368]">Cross-referenced timetable: CSE Dept Object-Oriented Lab session</p>
            </div>
          </div>

          {/* Stage 3: IMPACT */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#FCE8E6] text-[#C5221F] flex items-center justify-center font-bold text-xs font-mono">3</div>
              <div className="w-0.5 h-8 bg-[#DADCE0] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
              <span className="text-xs font-mono text-[#EA4335] font-bold uppercase tracking-wider">3. Impact Computed</span>
              <p className="text-sm font-bold text-[#202124] mt-0.5">42 Students &amp; 1 Class at Risk</p>
              <p className="text-xs text-[#5F6368]">Attendance threshold breach threat: 14 students will cross &lt;75%</p>
            </div>
          </div>

          {/* Stage 4: RECOMMENDATION */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#FEF7E0] text-[#B06000] flex items-center justify-center font-bold text-xs font-mono">4</div>
              <div className="w-0.5 h-8 bg-[#DADCE0] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
              <span className="text-xs font-mono text-[#B06000] font-bold uppercase tracking-wider">4. Recommendation</span>
              <p className="text-sm font-bold text-[#202124] mt-0.5">Reroute Trailing Commuters to Bus 12</p>
              <p className="text-xs text-[#5F6368]">Optimizes capacity buffer; alerts Lab Instructor Dr. K. Rao</p>
            </div>
          </div>

          {/* Stage 5: ACTION */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#E6F4EA] text-[#137333] flex items-center justify-center font-bold text-xs font-mono">5</div>
            </div>
            <div className="flex-1 bg-[#E6F4EA]/60 p-3 rounded-md border border-[#34A853]/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#137333] font-bold uppercase tracking-wider">5. Automated Dispatch</span>
                <span className="text-xs font-mono font-bold text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded border border-[#34A853]/30">APPLIED</span>
              </div>
              <p className="text-sm font-bold text-[#202124] mt-0.5">Push Notification &amp; Auto Attendance Waiver</p>
              <p className="text-xs text-[#5F6368]">Students notified via SMS/App; LMS marks grace period automatically</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WHAT'S HAPPENING NOW? (3 ACTIVE STITCH EVENT CARDS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#4285F4]" />
            <h2 className="text-xl font-bold text-[#202124]">What's Happening Now?</h2>
          </div>
          <span className="text-xs text-[#5F6368] font-mono">3 active anomalies</span>
        </div>

        {/* Event Card 1: Critical (Bus 07 Delayed - Red Stripe) */}
        <div className="w-full bg-white rounded-xl border border-[#DADCE0] shadow-sm p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EA4335]" />
          <div className="flex items-start justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#FCE8E6] text-[#C5221F] flex items-center justify-center">
                <Bus className="w-4 h-4 text-[#EA4335]" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#EA4335] uppercase font-bold tracking-wider">Transport Alert</span>
                <h3 className="text-lg font-bold text-[#202124] leading-tight">BUS 07 DELAYED</h3>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#FCE8E6] text-[#C5221F] font-bold">
              T+22m
            </span>
          </div>

          <p className="text-sm text-[#5F6368]">
            Road obstruction detected on Vijayawada bypass near Kaza tollgate corridor.
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              🚨 42 students affected
            </span>
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              🗺️ 2 routes affected
            </span>
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              🏫 1 class at risk
            </span>
          </div>

          <div className="bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0] text-xs space-y-1">
            <span className="text-[#1A73E8] font-bold uppercase font-mono text-[11px] block">Recommended Action</span>
            <p className="text-[#202124] font-medium">Switch affected students to BUS 12 &amp; auto-exempt lab entry lock.</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-mono text-[#5F6368]">Signal confidence: 98.4%</span>
            <button
              onClick={() => {
                setSelectedEventForImpact(events[0]);
                showToast('Viewing full cross-domain impact analysis for Bus 07');
              }}
              className="px-4 py-2 rounded bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span>VIEW IMPACT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Event Card 2: Academic Governance (Hackathon Win - Green Stripe) */}
        <div className="w-full bg-white rounded-xl border border-[#DADCE0] shadow-sm p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#34A853]" />
          <div className="flex items-start justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#E6F4EA] text-[#137333] flex items-center justify-center">
                <Trophy className="w-4 h-4 text-[#34A853]" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#34A853] uppercase font-bold tracking-wider">Achievement Verification</span>
                <h3 className="text-lg font-bold text-[#202124] leading-tight">HACKATHON WIN VERIFIED</h3>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#E6F4EA] text-[#137333] font-bold">
              Processed
            </span>
          </div>

          <p className="text-sm text-[#5F6368]">
            Smart India Hackathon 2026 1st Prize · Student Ganesh (CSE, 3rd Year).
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              📅 4 classes affected
            </span>
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              ✅ 6 attendance records queued
            </span>
          </div>

          <div className="bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0] text-xs space-y-1">
            <span className="text-[#34A853] font-bold uppercase font-mono text-[11px] block">Policy Resolution</span>
            <p className="text-[#202124] font-medium">OD (On Duty) workflow generated automatically; Dean approval bypass active.</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-mono text-[#5F6368]">Auto-ledger: Complete</span>
            <button
              onClick={() => {
                setActiveTab('achievement');
                showToast('Switched to AchievementOS On-Duty workflow ledger');
              }}
              className="px-4 py-2 rounded bg-[#F8F9FA] hover:bg-[#E8EAED] border border-[#DADCE0] text-[#202124] font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW WORKFLOW</span>
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Event Card 3: Learning Analytics (Quiz Failure - Yellow Stripe) */}
        <div className="w-full bg-white rounded-xl border border-[#DADCE0] shadow-sm p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FBBC05]" />
          <div className="flex items-start justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#FEF7E0] text-[#B06000] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#FBBC05]" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#B06000] uppercase font-bold tracking-wider">Pedagogic Alert</span>
                <h3 className="text-lg font-bold text-[#202124] leading-tight">QUIZ CONCEPT GAP DETECTED</h3>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#FEF7E0] text-[#B06000] font-bold">
              Sub-Score 38%
            </span>
          </div>

          <p className="text-sm text-[#5F6368]">
            CSE201 Data Structures: Linked Lists quiz average scored below 40% threshold.
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              ⚠️ 11 students affected
            </span>
            <span className="px-2.5 py-1 rounded bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] font-medium">
              👨‍🏫 2 faculty slots available
            </span>
          </div>

          <div className="bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0] text-xs space-y-1">
            <span className="text-[#B06000] font-bold uppercase font-mono text-[11px] block">Targeted Intervention</span>
            <p className="text-[#202124] font-medium">Micro-mentoring slot with Prof. Ramanathan (Today, 4:00 PM - Hall B3).</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-mono text-[#5F6368]">Mentor Capacity: 82%</span>
            <button
              onClick={() => {
                setActiveTab('mentor');
                showToast('Switched to MentorOS micro-mentoring scheduling interface');
              }}
              className="px-4 py-2 rounded bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span>SCHEDULE SUPPORT</span>
              <Calendar className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. CONNECTED SYSTEMS LIST */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DADCE0] pb-3">
          <h2 className="text-xl font-bold text-[#202124]">CONNECTED SYSTEMS</h2>
          <span className="text-xs text-[#5F6368] font-mono">7 Connected Domains</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {connectedSystemsList.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div key={idx} className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" title="Connected" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#202124]">{sys.name}</h3>
                  <div className="text-xs text-[#5F6368] mt-0.5">
                    <span>{sys.activeEvents} Active Events</span> • <span className="text-[11px] font-mono">{sys.lastUpdate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast Notification Box for Micro-delight Feedback (Stitch code.html Spec) */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-10 left-1/2 -translate-x-1/2 bg-[#202124] text-white py-3 px-5 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-fadeIn font-serif border border-[#DADCE0] max-w-[90vw]">
          <CheckCircle2 className="w-5 h-5 text-[#34A853] shrink-0" />
          <span className="text-xs font-medium truncate">{toastMessage}</span>
          <span className="text-[10px] font-mono text-[#34A853] uppercase font-bold border-l border-[#5F6368] pl-3 shrink-0">
            SYNC #OK
          </span>
        </div>
      )}

    </div>
  );
};
