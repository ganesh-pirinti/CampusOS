import React, { useState } from 'react';
import { 
  Zap, 
  Bus, 
  Trophy, 
  GraduationCap, 
  MapPin, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import type { EventType } from '../../types/campus';

export const EventSimulatorScreen: React.FC = () => {
  const { triggerEvent, setSelectedEventForImpact } = useCampus();
  const [selectedEventType, setSelectedEventType] = useState<EventType>('BUS_DELAY');
  const [simulatedResult, setSimulatedResult] = useState<any>(null);

  const handleSimulate = (type: EventType) => {
    setSelectedEventType(type);
    const res = triggerEvent(type);
    setSimulatedResult(res);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE & SUBTITLE */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#DADCE0] shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-mono font-bold border border-[#4285F4]/30">
          <Zap className="w-3.5 h-3.5 text-[#4285F4]" />
          HERO DEMO ENGINE
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">SIMULATE A CAMPUS EVENT</h1>
        <p className="text-base sm:text-xl text-[#5F6368] font-normal italic">
          “See how one event changes the rest of campus.”
        </p>
      </div>

      {/* 2. LARGE 5 EVENT BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* BUS DELAY */}
        <button
          onClick={() => handleSimulate('BUS_DELAY')}
          className={`p-4 sm:p-5 min-h-[48px] rounded-xl border text-left space-y-3 transition-all ${
            selectedEventType === 'BUS_DELAY' && simulatedResult
              ? 'bg-[#E8F0FE] border-[#4285F4] ring-2 ring-[#4285F4]/30 shadow-md'
              : 'bg-white border-[#DADCE0] hover:border-[#4285F4]'
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#4285F4] text-white flex items-center justify-center font-bold">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[#1A73E8] font-bold">EVENT 1</div>
            <div className="text-sm sm:text-base font-bold text-[#202124]">BUS DELAY</div>
            <div className="text-[11px] text-[#5F6368] mt-1">Bus 07 delayed 18m</div>
          </div>
        </button>

        {/* ROAD BLOCK */}
        <button
          onClick={() => handleSimulate('ROAD_BLOCK')}
          className={`p-4 sm:p-5 min-h-[48px] rounded-xl border text-left space-y-3 transition-all ${
            selectedEventType === 'ROAD_BLOCK' && simulatedResult
              ? 'bg-[#FCE8E6] border-[#EA4335] ring-2 ring-[#EA4335]/30 shadow-md'
              : 'bg-white border-[#DADCE0] hover:border-[#EA4335]'
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#EA4335] text-white flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[#EA4335] font-bold">EVENT 2</div>
            <div className="text-sm sm:text-base font-bold text-[#202124]">ROAD BLOCK</div>
            <div className="text-[11px] text-[#5F6368] mt-1">Vijayawada Route obstruction</div>
          </div>
        </button>

        {/* HACKATHON WIN */}
        <button
          onClick={() => handleSimulate('HACKATHON_WIN')}
          className={`p-4 sm:p-5 min-h-[48px] rounded-xl border text-left space-y-3 transition-all ${
            selectedEventType === 'HACKATHON_WIN' && simulatedResult
              ? 'bg-[#E6F4EA] border-[#34A853] ring-2 ring-[#34A853]/30 shadow-md'
              : 'bg-white border-[#DADCE0] hover:border-[#34A853]'
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#34A853] text-white flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[#34A853] font-bold">EVENT 3</div>
            <div className="text-sm sm:text-base font-bold text-[#202124]">HACKATHON WIN</div>
            <div className="text-[11px] text-[#5F6368] mt-1">External victory verified</div>
          </div>
        </button>

        {/* QUIZ FAILURE */}
        <button
          onClick={() => handleSimulate('QUIZ_FAILURE')}
          className={`p-4 sm:p-5 min-h-[48px] rounded-xl border text-left space-y-3 transition-all ${
            selectedEventType === 'QUIZ_FAILURE' && simulatedResult
              ? 'bg-[#FEF7E0] border-[#FBBC05] ring-2 ring-[#FBBC05]/30 shadow-md'
              : 'bg-white border-[#DADCE0] hover:border-[#FBBC05]'
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FBBC05] text-[#202124] flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[#B06000] font-bold">EVENT 4</div>
            <div className="text-sm sm:text-base font-bold text-[#202124]">QUIZ FAILURE</div>
            <div className="text-[11px] text-[#5F6368] mt-1">38% Linked List gap</div>
          </div>
        </button>

        {/* ACCESS CHANGE */}
        <button
          onClick={() => handleSimulate('ACCESS_STATUS_CHANGE')}
          className={`p-4 sm:p-5 min-h-[48px] rounded-xl border text-left space-y-3 transition-all ${
            selectedEventType === 'ACCESS_STATUS_CHANGE' && simulatedResult
              ? 'bg-[#E8F0FE] border-[#4285F4] ring-2 ring-[#4285F4]/30 shadow-md'
              : 'bg-white border-[#DADCE0] hover:border-[#4285F4]'
          }`}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#4285F4] text-white flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[#1A73E8] font-bold">EVENT 5</div>
            <div className="text-sm sm:text-base font-bold text-[#202124]">ACCESS CHANGE</div>
            <div className="text-[11px] text-[#5F6368] mt-1">Privacy gate hold</div>
          </div>
        </button>

      </div>

      {/* 3. 5-STEP CASCADE PROGRESSION OUTPUT */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 lg:space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DADCE0] pb-4">
          <div>
            <span className="text-xs font-mono text-[#4285F4] uppercase font-bold">SIMULATION OUTPUT CASCADE</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              {selectedEventType === 'BUS_DELAY' && 'BUS 07 DELAYED'}
              {selectedEventType === 'ROAD_BLOCK' && 'ROAD BLOCK DETECTED'}
              {selectedEventType === 'HACKATHON_WIN' && 'HACKATHON WIN VERIFIED'}
              {selectedEventType === 'QUIZ_FAILURE' && 'QUIZ CONCEPT GAP DETECTED'}
              {selectedEventType === 'ACCESS_STATUS_CHANGE' && 'ACCESS STATUS UPDATED'}
            </h2>
          </div>

          <button
            onClick={() => setSelectedEventForImpact(simulatedResult?.event || null)}
            className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs"
          >
            <span>VIEW IMPACT DETAILS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 VISUALLY OBVIOUS STEPS */}
        <div>
          <h3 className="text-xs font-mono text-[#5F6368] uppercase font-bold mb-6 text-center">
            5-STEP DETERMINISTIC CONTEXT CASCADE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative">
            
            {/* STEP 1 */}
            <div className="p-5 rounded-xl bg-[#E8F0FE] border border-[#4285F4]/40 text-center space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white font-bold text-xs flex items-center justify-center mx-auto">1</div>
              <div className="text-xs font-bold text-[#1A73E8] uppercase font-mono">STEP 1</div>
              <div className="text-sm font-bold text-[#202124]">EVENT RECEIVED</div>
              <div className="text-xs text-[#5F6368] mt-1 font-mono">
                {selectedEventType === 'BUS_DELAY' && 'Bus 07 delayed'}
                {selectedEventType === 'ROAD_BLOCK' && 'Obstruction on NH16'}
                {selectedEventType === 'HACKATHON_WIN' && 'Contest win verified'}
                {selectedEventType === 'QUIZ_FAILURE' && 'Score: 38% Quiz 1'}
                {selectedEventType === 'ACCESS_STATUS_CHANGE' && 'Status set to VERIFY'}
              </div>
            </div>

            {/* STEP 2 */}
            <div className="p-5 rounded-xl bg-[#E8F0FE] border border-[#4285F4]/40 text-center space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white font-bold text-xs flex items-center justify-center mx-auto">2</div>
              <div className="text-xs font-bold text-[#1A73E8] uppercase font-mono">STEP 2</div>
              <div className="text-sm font-bold text-[#202124]">UNDERSTANDS CONTEXT</div>
              <div className="text-xs text-[#5F6368] mt-1 font-mono">
                {selectedEventType === 'BUS_DELAY' && '42 students affected'}
                {selectedEventType === 'ROAD_BLOCK' && '2 routes affected'}
                {selectedEventType === 'HACKATHON_WIN' && '4 classes affected'}
                {selectedEventType === 'QUIZ_FAILURE' && 'Linked List gap'}
                {selectedEventType === 'ACCESS_STATUS_CHANGE' && 'Lab fee review'}
              </div>
            </div>

            {/* STEP 3 */}
            <div className="p-5 rounded-xl bg-[#FEF7E0] border border-[#FBBC05]/40 text-center space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#FBBC05] text-[#202124] font-bold text-xs flex items-center justify-center mx-auto">3</div>
              <div className="text-xs font-bold text-[#B06000] uppercase font-mono">STEP 3</div>
              <div className="text-sm font-bold text-[#202124]">IMPACT FOUND</div>
              <div className="text-xs text-[#5F6368] mt-1 font-mono">
                {selectedEventType === 'BUS_DELAY' && '1 class at risk'}
                {selectedEventType === 'ROAD_BLOCK' && '12m transit delay'}
                {selectedEventType === 'HACKATHON_WIN' && '6 attendance credits'}
                {selectedEventType === 'QUIZ_FAILURE' && 'Prof. X available'}
                {selectedEventType === 'ACCESS_STATUS_CHANGE' && 'Turnstile hold'}
              </div>
            </div>

            {/* STEP 4 */}
            <div className="p-5 rounded-xl bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">4</div>
              <div className="text-xs font-bold text-[#137333] uppercase font-mono">STEP 4</div>
              <div className="text-sm font-bold text-[#202124]">ACTION RECOMMENDED</div>
              <div className="text-xs text-[#137333] mt-1 font-bold font-mono">
                {selectedEventType === 'BUS_DELAY' && 'BUS 12 recommended'}
                {selectedEventType === 'ROAD_BLOCK' && 'Metro detour suggested'}
                {selectedEventType === 'HACKATHON_WIN' && 'OD Pass generated'}
                {selectedEventType === 'QUIZ_FAILURE' && 'Book 4:00 PM slot'}
                {selectedEventType === 'ACCESS_STATUS_CHANGE' && 'Display generic VERIFY'}
              </div>
            </div>

            {/* STEP 5 */}
            <div className="p-5 rounded-xl bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">5</div>
              <div className="text-xs font-bold text-[#137333] uppercase font-mono">STEP 5</div>
              <div className="text-sm font-bold text-[#202124]">SYSTEMS UPDATED</div>
              <div className="text-xs text-[#137333] mt-1 font-bold font-mono">
                {selectedEventType === 'BUS_DELAY' && 'Students notified'}
                {selectedEventType === 'ROAD_BLOCK' && 'Live map updated'}
                {selectedEventType === 'HACKATHON_WIN' && 'Faculty notified'}
                {selectedEventType === 'QUIZ_FAILURE' && 'LMS module pushed'}
                {selectedEventType === 'ACCESS_STATUS_CHANGE' && 'Privacy shield active'}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
