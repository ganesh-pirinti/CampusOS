import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AccessOSScreen: React.FC = () => {
  const { updateAccessStatus } = useCampus();
  const [isAdminAuthorizedView, setIsAdminAuthorizedView] = useState<boolean>(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-xl border border-[#DADCE0] shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-mono font-bold border border-[#4285F4]/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4285F4]" />
            ACCESSOS PRIVACY GATE CONTROL
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">PRIVACY-SAFE CAMPUS ACCESS</h1>
          <p className="text-xs sm:text-sm text-[#5F6368] font-normal mt-1">
            Protects student privacy by displaying only high-level status to gate turnstiles.
          </p>
        </div>

        {/* Admin Toggle */}
        <button
          onClick={() => setIsAdminAuthorizedView(prev => !prev)}
          className={`w-full sm:w-auto px-5 py-3 sm:py-2.5 min-h-[44px] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            isAdminAuthorizedView
              ? 'bg-[#34A853] text-white shadow-sm'
              : 'bg-[#F8F9FA] hover:bg-[#E8EAED] border border-[#DADCE0] text-[#3C4043]'
          }`}
        >
          <Lock className="w-4 h-4" />
          {isAdminAuthorizedView ? 'ADMIN AUTHORIZED VIEW' : 'SWITCH TO ADMIN VIEW'}
        </button>
      </div>

      {/* 2. THREE LARGE STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* ALLOW CARD */}
        <div className="p-4 sm:p-6 rounded-xl bg-[#E6F4EA] border-2 border-[#34A853] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#137333]">ALLOW</h2>
            <CheckCircle2 className="w-7 h-7 text-[#34A853]" />
          </div>
          <p className="text-xs text-[#137333]">Biometric turnstile opens automatically. All clear.</p>
        </div>

        {/* VERIFY CARD */}
        <div className="p-4 sm:p-6 rounded-xl bg-[#FEF7E0] border-2 border-[#FBBC05] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#B06000]">VERIFY</h2>
            <AlertTriangle className="w-7 h-7 text-[#FBBC05]" />
          </div>
          <p className="text-xs text-[#B06000]">Contact authorized administrator. Turnstile held.</p>
        </div>

        {/* DENY CARD */}
        <div className="p-4 sm:p-6 rounded-xl bg-[#FCE8E6] border-2 border-[#EA4335] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#C5221F]">DENY</h2>
            <XCircle className="w-7 h-7 text-[#EA4335]" />
          </div>
          <p className="text-xs text-[#C5221F]">Access restricted. Escort to administration desk.</p>
        </div>

      </div>

      {/* 3. SECURITY VIEW VS ADMIN VIEW */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DADCE0] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase font-bold text-[#EA4335]">
              {isAdminAuthorizedView ? 'DEAN ADMINISTRATIVE VIEW' : 'SECURITY GUARD VIEW'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              Student ID: <span className="text-[#1A73E8] font-mono">24CSE00123</span>
            </h2>
          </div>

          <span className="text-xs font-mono bg-[#F8F9FA] px-3 py-1.5 rounded border border-[#DADCE0] text-[#5F6368] self-start sm:self-auto">
            Time: <strong className="text-[#202124]">8:14 AM</strong>
          </span>
        </div>

        {/* SECURITY VIEW (Default) */}
        {!isAdminAuthorizedView ? (
          <div className="p-4 sm:p-6 rounded-xl bg-[#F8F9FA] border border-[#DADCE0] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white border border-[#DADCE0]">
                <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">STUDENT ID</div>
                <div className="text-xl sm:text-2xl font-bold text-[#202124] font-mono mt-1">24CSE00123</div>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DADCE0]">
                <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">ACCESS STATUS</div>
                <div className="text-xl sm:text-2xl font-bold text-[#B06000] mt-1">VERIFY</div>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DADCE0]">
                <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">TIME</div>
                <div className="text-xl sm:text-2xl font-bold text-[#202124] font-mono mt-1">8:14 AM</div>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#FEF7E0] border border-[#FBBC05]/40 text-sm font-bold text-[#B06000] text-center">
              “Contact authorized administrator.”
            </div>

            <p className="text-xs text-[#5F6368] italic text-center">
              Notice: Gate security guard sees ONLY Student ID, VERIFY status, and Time. Disciplinary or academic reasons are never displayed to security personnel.
            </p>
          </div>
        ) : (
          /* ADMIN AUTHORIZED VIEW */
          <div className="p-4 sm:p-6 rounded-xl bg-[#E6F4EA] border border-[#34A853]/40 space-y-6">
            <div className="text-xs font-mono text-[#137333] uppercase font-bold">DEAN FULL AUTHORIZED DETAILS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-white border border-[#DADCE0] space-y-1">
                <div className="text-[#5F6368] font-mono">AUTHORIZED REASON</div>
                <div className="text-sm font-bold text-[#202124]">Dean Office Academic Review Pending</div>
                <div className="text-[#5F6368]">OD Certificate #ACH-8842 awaits Dean signature.</div>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DADCE0] space-y-1">
                <div className="text-[#5F6368] font-mono">ACTION CONTROLS</div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => updateAccessStatus('STU-002', 'VERIFIED')}
                    className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded bg-[#34A853] text-white text-xs font-bold"
                  >
                    OVERRIDE &amp; SET ALLOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
