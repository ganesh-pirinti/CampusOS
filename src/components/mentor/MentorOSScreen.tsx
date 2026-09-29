import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const MentorOSScreen: React.FC = () => {
  const { quizFailures, scheduleMentoring } = useCampus();
  const [scheduledState, setScheduledState] = useState<boolean>(false);

  const activeRecord = quizFailures[0];

  const handleSchedule = () => {
    scheduleMentoring(activeRecord.id);
    setScheduledState(true);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE & MAIN MESSAGE */}
      <div className="bg-white p-6 rounded-xl border border-[#DADCE0] shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF7E0] text-[#B06000] text-xs font-mono font-bold border border-[#FBBC05]/30">
          <GraduationCap className="w-3.5 h-3.5 text-[#FBBC05]" />
          MENTOROS ACADEMIC SUPPORT
        </div>
        <h1 className="text-3xl font-bold text-[#202124] tracking-tight">EARLY ACADEMIC SUPPORT</h1>
        <p className="text-xl text-[#5F6368] font-normal italic">
          “Turn a learning problem into an available support action.”
        </p>
      </div>

      {/* 2. HERO STUDENT SUPPORT CARD */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-8 shadow-sm space-y-8">
        
        {/* STUDENT CARD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#DADCE0] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#FEF7E0] text-[#B06000] flex items-center justify-center font-bold text-2xl border border-[#FBBC05]/40">
              🎓
            </div>
            <div>
              <span className="text-xs font-mono text-[#B06000] uppercase font-bold">STUDENT TELEMETRY CARD</span>
              <h2 className="text-2xl font-bold text-[#202124]">Ganesh</h2>
              <div className="text-sm text-[#5F6368] mt-0.5">
                Course: <strong className="text-[#202124]">Data Structures</strong> • Quiz Score: <span className="text-[#EA4335] font-bold">38%</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#FEF7E0] border border-[#FBBC05]/40 text-xs space-y-1">
            <div className="text-[#B06000] font-bold font-mono uppercase">PROBLEM DETECTED</div>
            <div className="text-base font-bold text-[#202124]">Linked List concept gap</div>
          </div>
        </div>

        {/* CAMPUSOS MATCHING FIND */}
        <div className="p-6 rounded-xl bg-[#E8F0FE] border border-[#4285F4]/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#1A73E8] uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#1A73E8]" />
              CAMPUSOS FACULTY &amp; SLOT MATCH
            </span>
            <div className="text-lg font-bold text-[#202124]">
              Faculty: <span className="text-[#1A73E8]">Prof. X</span> (Data Structures Chair)
            </div>
            <div className="text-sm text-[#5F6368]">
              Available Office Slot: <strong className="text-[#202124]">4:00–4:30 PM Today</strong>
            </div>
          </div>

          <div>
            <button
              onClick={handleSchedule}
              disabled={scheduledState}
              className={`px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-md transition-all ${
                scheduledState
                  ? 'bg-[#E6F4EA] text-[#137333] border border-[#34A853]/40 cursor-default'
                  : 'bg-[#FBBC05] hover:bg-[#F2B600] text-[#202124]'
              }`}
            >
              {scheduledState ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#34A853]" />
                  SUPPORT SCHEDULED
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 fill-[#202124]" />
                  SCHEDULE SUPPORT
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. SIMPLE VISUAL FLOW (LMS -> Concept -> Faculty -> Time -> Support) */}
        <div>
          <h3 className="text-xs font-mono text-[#5F6368] uppercase font-bold mb-4">
            VISUAL SUPPORT CASCADE FLOW
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] text-center space-y-1">
              <div className="text-xs font-bold text-[#5F6368] font-mono">1. LMS</div>
              <div className="text-sm font-bold text-[#202124]">Quiz Score (38%)</div>
            </div>

            <div className="p-4 rounded-lg bg-[#FEF7E0] border border-[#FBBC05]/40 text-center space-y-1">
              <div className="text-xs font-bold text-[#B06000] font-mono">2. CONCEPT</div>
              <div className="text-sm font-bold text-[#202124]">Linked List Gap</div>
            </div>

            <div className="p-4 rounded-lg bg-[#E8F0FE] border border-[#4285F4]/40 text-center space-y-1">
              <div className="text-xs font-bold text-[#1A73E8] font-mono">3. FACULTY</div>
              <div className="text-sm font-bold text-[#1A73E8]">Prof. X</div>
            </div>

            <div className="p-4 rounded-lg bg-[#E8F0FE] border border-[#4285F4]/40 text-center space-y-1">
              <div className="text-xs font-bold text-[#1A73E8] font-mono">4. TIME</div>
              <div className="text-sm font-bold text-[#202124]">4:00–4:30 PM</div>
            </div>

            <div className={`p-4 rounded-lg border text-center space-y-1 ${
              scheduledState ? 'bg-[#E6F4EA] border-[#34A853]/40' : 'bg-[#F8F9FA] border-[#DADCE0]'
            }`}>
              <div className="text-xs font-bold text-[#34A853] font-mono">5. SUPPORT</div>
              <div className="text-sm font-bold text-[#202124]">
                {scheduledState ? 'Booked & Confirmed' : 'Ready to Schedule'}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
