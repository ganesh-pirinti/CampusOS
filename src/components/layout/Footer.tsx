import React from 'react';
import { ShieldAlert, Cpu } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`h-10 bg-white border-t border-[#DADCE0] px-6 flex items-center justify-between text-xs text-[#5F6368] shrink-0 font-serif ${className}`}>
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-[#4285F4]" />
        <span>
          <strong className="text-[#202124]">Google Solution Hunt Challenge 2026</strong> — PS02: “When Systems Don't Understand Each Other”
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#5F6368] font-mono text-[11px]">CampusOS Context Engine v2.6 (Deterministic)</span>
        <span className="flex items-center gap-1 text-[#34A853] font-mono text-[11px] font-bold">
          <Cpu className="w-3 h-3 text-[#34A853]" />
          Simulated Connector Data
        </span>
      </div>
    </footer>
  );
};
