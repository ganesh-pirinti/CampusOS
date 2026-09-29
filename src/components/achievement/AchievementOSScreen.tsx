import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AchievementOSScreen: React.FC = () => {
  const { achievements } = useCampus();
  const [selectedAchievement, setSelectedAchievement] = useState(achievements[0] || {
    id: 'ACH-01',
    title: 'Hackathon Winner',
    studentName: 'Ganesh',
    rollNo: '24CSE00123',
    eventName: 'Google Solution Hunt',
    prize: '1st Place',
    date: '29 Sep',
    classesAffectedCount: 4,
    odStatus: 'approved'
  });
  const [showWorkflowDrawer, setShowWorkflowDrawer] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#DADCE0] shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-mono font-bold border border-[#34A853]/30 mb-2">
            <Trophy className="w-3.5 h-3.5 text-[#34A853]" />
            ACHIEVEMENTOS CORE
          </div>
          <h1 className="text-3xl font-bold text-[#202124] tracking-tight">ACHIEVEMENT → ACADEMIC ACTION</h1>
          <p className="text-sm text-[#5F6368] font-normal mt-1">
            Turn extracurricular student success into instant, automated On-Duty (OD) attendance credit.
          </p>
        </div>

        <button
          onClick={() => setShowWorkflowDrawer(true)}
          className="px-6 py-3 rounded-lg bg-[#34A853] hover:bg-[#2D9247] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          VIEW WORKFLOW
        </button>
      </div>

      {/* 2. HERO WORKFLOW CARD */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-8 shadow-sm space-y-8">
        
        {/* TOP EVENT BADGE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DADCE0] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#E6F4EA] text-[#34A853] flex items-center justify-center font-bold text-2xl border border-[#34A853]/30">
              🏆
            </div>
            <div>
              <span className="text-xs font-mono text-[#34A853] uppercase font-bold">VERIFIED COMPETITION WIN</span>
              <h2 className="text-2xl font-bold text-[#202124]">Hackathon Won</h2>
              <div className="text-sm text-[#5F6368] mt-0.5">
                Student: <strong className="text-[#202124]">Ganesh</strong> (24CSE00123) • Date: <strong className="text-[#202124]">29 Sep</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[#E6F4EA] text-[#137333] font-mono text-xs font-bold border border-[#34A853]/30">
              ● OD AUTOMATION ACTIVE
            </span>
          </div>
        </div>

        {/* 5-STEP PROGRESS TIMELINE */}
        <div>
          <h3 className="text-xs font-mono text-[#5F6368] uppercase font-bold mb-4">
            5-STEP AUTOMATED CASCADE TIMELINE
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2">
              <div className="w-7 h-7 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">1</div>
              <div className="text-xs font-bold text-[#137333]">Event Detected</div>
              <div className="text-[10px] text-[#5F6368]">Student Affairs API</div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2">
              <div className="w-7 h-7 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">2</div>
              <div className="text-xs font-bold text-[#137333]">Classes Affected</div>
              <div className="text-[10px] text-[#5F6368]">4 Classes Identified</div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2">
              <div className="w-7 h-7 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">3</div>
              <div className="text-xs font-bold text-[#137333]">OD Generated</div>
              <div className="text-[10px] text-[#5F6368]">Pass #ACH-8842</div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2">
              <div className="w-7 h-7 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">4</div>
              <div className="text-xs font-bold text-[#137333]">Faculty Notified</div>
              <div className="text-[10px] text-[#5F6368]">3 Faculty Alerts</div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 text-center space-y-2">
              <div className="w-7 h-7 rounded-full bg-[#34A853] text-white font-bold text-xs flex items-center justify-center mx-auto">5</div>
              <div className="text-xs font-bold text-[#137333]">Attendance Action</div>
              <div className="text-[10px] text-[#5F6368]">6 Records Credited</div>
            </div>
          </div>
        </div>

        {/* METRICS DISPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#DADCE0]">
          <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
            <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">CLASSES AFFECTED</div>
            <div className="text-3xl font-bold text-[#34A853] mt-1">4 Classes</div>
            <div className="text-xs text-[#5F6368] mt-1">Data Structures, OS, DBMS, Networks</div>
          </div>

          <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
            <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">ATTENDANCE RECORDS</div>
            <div className="text-3xl font-bold text-[#34A853] mt-1">6 Records</div>
            <div className="text-xs text-[#5F6368] mt-1">Automatically adjusted to Present (OD)</div>
          </div>

          <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
            <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">FACULTY NOTIFICATIONS</div>
            <div className="text-3xl font-bold text-[#34A853] mt-1">3 Faculty</div>
            <div className="text-xs text-[#5F6368] mt-1">Notified via Academic ERP connector</div>
          </div>
        </div>

        {/* PRIMARY BUTTON */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowWorkflowDrawer(true)}
            className="px-8 py-3.5 rounded-lg bg-[#34A853] hover:bg-[#2D9247] text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-md transition-all"
          >
            <CheckCircle2 className="w-5 h-5 fill-white text-[#34A853]" />
            VIEW WORKFLOW
          </button>
        </div>

      </div>

      {/* ALL ACHIEVEMENTS LIST */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#202124]">OTHER VERIFIED STUDENT ACHIEVEMENTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              onClick={() => setSelectedAchievement(ach)}
              className="p-4 rounded-lg bg-[#F8F9FA] hover:bg-[#E6F4EA]/50 border border-[#DADCE0] cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#34A853] font-bold">{ach.prize}</span>
                <h4 className="font-bold text-sm text-[#202124]">{ach.title}</h4>
                <div className="text-xs text-[#5F6368]">{ach.studentName} ({ach.rollNo}) • {ach.date}</div>
              </div>
              <span className="text-xs font-bold text-[#137333] bg-[#E6F4EA] px-2.5 py-1 rounded border border-[#34A853]/30">
                OD Active &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WORKFLOW DRAWER / MODAL */}
      {showWorkflowDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202124]/60 backdrop-blur-xs font-serif animate-fadeIn">
          <div className="bg-white border border-[#DADCE0] rounded-xl w-full max-w-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-4">
              <div>
                <span className="text-xs font-mono text-[#34A853] uppercase font-bold">WORKFLOW EXECUTION DETAIL</span>
                <h3 className="text-xl font-bold text-[#202124]">OD Automation Workflow</h3>
              </div>
              <button
                onClick={() => setShowWorkflowDrawer(false)}
                className="text-xs font-mono text-[#5F6368] hover:text-[#202124]"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-2">
                <div className="font-bold text-sm text-[#202124]">{selectedAchievement.title}</div>
                <div className="grid grid-cols-2 gap-2 text-[#5F6368]">
                  <div>Name: <strong className="text-[#202124]">{selectedAchievement.studentName}</strong></div>
                  <div>Roll No: <strong className="text-[#202124]">{selectedAchievement.rollNo}</strong></div>
                  <div>Event: <strong className="text-[#202124]">{selectedAchievement.eventName}</strong></div>
                  <div>Status: <strong className="text-[#34A853]">OD Approved</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#E6F4EA] border border-[#34A853]/30 space-y-2 text-[#137333]">
                <div className="font-bold">Automated Actions Taken:</div>
                <ul className="list-disc list-inside space-y-1 text-[#3C4043]">
                  <td>Generated official On-Duty Certificate Pass #ACH-8842</td>
                  <td>Flagged 4 missed class periods during contest travel window</td>
                  <td>Notified Course Instructors (Prof. X, Prof. Y, Prof. Z)</td>
                  <td>Credited 6 biometric attendance entries automatically</td>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowWorkflowDrawer(false)}
                className="px-5 py-2 rounded-md bg-[#34A853] text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
