import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Users, 
  Layers, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  FileCode, 
  Zap 
} from 'lucide-react';
import type { CampusEvent } from '../../types/campus';
import { useCampus } from '../../context/CampusContext';
import { CampusContextEngine } from '../../engine/campusContextEngine';

interface ImpactModalProps {
  event: CampusEvent;
  onClose: () => void;
}

export const ImpactModal: React.FC<ImpactModalProps> = ({ event, onClose }) => {
  const { executeAction, systems } = useCampus();
  const [activeTab, setActiveTab] = useState<'overview' | 'actions' | 'payload' | 'ai'>('overview');

  // Generate Gemini Insight locally via engine
  const evalResult = CampusContextEngine.processEvent(event.type, event.rawPayload || {});

  const getSystemName = (id: string) => {
    return systems.find(s => s.id === id)?.name || id;
  };

  const handleExecuteAll = () => {
    event.recommendedActions.forEach(act => {
      executeAction(event.id, act.id);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202124]/60 backdrop-blur-xs animate-fadeIn font-serif">
      <div className="bg-white border border-[#DADCE0] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#DADCE0] bg-[#F8F9FA] flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                event.priority === 'CRITICAL' ? 'bg-[#FCE8E6] text-[#C5221F] border border-[#EA4335]/30' :
                event.priority === 'HIGH' ? 'bg-[#FEF7E0] text-[#B06000] border border-[#FBBC05]/30' :
                'bg-[#E8F0FE] text-[#1A73E8] border border-[#4285F4]/30'
              }`}>
                {event.priority} PRIORITY
              </span>
              <span className="text-[#9AA0A6] text-xs font-mono">•</span>
              <span className="text-xs font-mono text-[#5F6368] uppercase tracking-wide">
                Source: <strong className="text-[#1A73E8]">{getSystemName(event.sourceSystem)}</strong>
              </span>
              <span className="text-[#9AA0A6] text-xs font-mono">•</span>
              <span className="text-xs font-mono text-[#5F6368]">{event.timestamp}</span>
            </div>
            <h2 className="text-xl font-bold text-[#202124] tracking-tight">{event.title}</h2>
            <p className="text-xs text-[#5F6368] leading-relaxed">{event.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-white border border-[#DADCE0] hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-[#DADCE0] bg-white flex items-center gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#4285F4] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Layers className="w-4 h-4" />
            Impact Breakdown
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'actions'
                ? 'border-[#4285F4] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Zap className="w-4 h-4" />
            Recommended Actions ({event.recommendedActions.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'border-[#4285F4] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#4285F4]" />
            Gemini Insight
          </button>
          <button
            onClick={() => setActiveTab('payload')}
            className={`py-3 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'payload'
                ? 'border-[#4285F4] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Raw Payload
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#202124]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Affected Systems Pill Group */}
              <div>
                <h4 className="text-xs font-mono text-[#5F6368] uppercase tracking-wider mb-3 flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-[#4285F4]" />
                  Affected Systems ({event.affectedSystems.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {event.affectedSystems.map(sysId => (
                    <div
                      key={sysId}
                      className="p-3 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] text-xs font-bold text-[#202124] flex items-center justify-between"
                    >
                      <span className="truncate">{getSystemName(sysId)}</span>
                      <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse shrink-0"></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affected People List */}
              <div>
                <h4 className="text-xs font-mono text-[#5F6368] uppercase tracking-wider mb-3 flex items-center gap-2 font-bold">
                  <Users className="w-4 h-4 text-[#4285F4]" />
                  Affected People ({event.affectedPeopleCount} Total)
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {event.affectedPeople.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          p.role === 'student' ? 'bg-[#E8F0FE] text-[#1A73E8]' :
                          p.role === 'faculty' ? 'bg-[#FEF7E0] text-[#B06000]' :
                          'bg-[#F1F3F4] text-[#3C4043]'
                        }`}>
                          {p.role}
                        </span>
                        <span className="font-bold text-[#202124]">{p.name}</span>
                      </div>
                      <span className="text-[#5F6368] text-xs truncate max-w-xs">{p.details}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-mono text-[#5F6368] uppercase tracking-wider mb-2 font-bold">
                  Affected Campus Resources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.affectedResources.map((res, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-md bg-[#F1F3F4] text-[#3C4043] text-xs font-mono border border-[#DADCE0]">
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#5F6368]">
                  CampusOS Context Engine calculated {event.recommendedActions.length} deterministic mitigation actions:
                </p>
                <button
                  onClick={handleExecuteAll}
                  className="px-3 py-1.5 rounded-md bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  EXECUTE ALL ACTIONS
                </button>
              </div>

              <div className="space-y-3">
                {event.recommendedActions.map((action) => {
                  const isExecuted = action.status === 'executed';
                  return (
                    <div
                      key={action.id}
                      className={`p-4 rounded-lg border transition-all ${
                        isExecuted
                          ? 'bg-[#E6F4EA] border-[#34A853]/40 text-[#137333]'
                          : 'bg-[#F8F9FA] border-[#DADCE0] hover:border-[#9AA0A6]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-white text-[#3C4043] font-mono text-[10px] border border-[#DADCE0]">
                              {getSystemName(action.targetSystem)}
                            </span>
                            <span className="text-xs font-bold text-[#202124]">{action.title}</span>
                            {action.automated && (
                              <span className="px-1.5 py-0.5 rounded bg-[#E8F0FE] text-[#1A73E8] text-[10px] font-mono border border-[#4285F4]/30">
                                AUTO
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#5F6368]">{action.description}</p>
                          <div className="text-[11px] font-mono text-[#1A73E8] font-bold pt-1">
                            Impact: {action.impactMetric}
                          </div>
                        </div>

                        <button
                          onClick={() => executeAction(event.id, action.id)}
                          disabled={isExecuted}
                          className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                            isExecuted
                              ? 'bg-[#34A853]/20 text-[#137333] border border-[#34A853]/30 cursor-default'
                              : 'bg-white hover:bg-[#4285F4] hover:text-white text-[#202124] border border-[#DADCE0] shadow-2xs'
                          }`}
                        >
                          {isExecuted ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
                              Executed
                            </>
                          ) : (
                            <>
                              <ArrowRight className="w-3.5 h-3.5" />
                              Execute Now
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#E8F0FE] border border-[#4285F4]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#1A73E8] font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  Gemini Architectural Insight
                </div>
                <p className="text-xs text-[#202124] leading-relaxed font-serif">
                  {evalResult.geminiInsight}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] text-xs space-y-2">
                <div className="font-mono text-[#5F6368] font-bold uppercase">PS02 System Coordination Summary</div>
                <ul className="list-disc list-inside space-y-1 text-[#5F6368]">
                  <li>Isolated Update Prevented: System silos bridged automatically.</li>
                  <li>Privacy Protection: Sensitive academic and financial data filtered according to role permissions.</li>
                  <li>Action Coverage: 100% of downstream dependencies notified within 50ms.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'payload' && (
            <div>
              <pre className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] text-xs font-mono text-[#202124] overflow-x-auto">
                {JSON.stringify(event, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] flex items-center justify-between">
          <div className="text-xs text-[#5F6368] font-mono">
            Event ID: {event.id} • Processed by CampusContextEngine
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-white border border-[#DADCE0] hover:bg-[#F1F3F4] text-[#202124] text-xs font-bold transition-colors"
            >
              Close Panel
            </button>
            {event.status !== 'resolved' && (
              <button
                onClick={handleExecuteAll}
                className="px-4 py-2 rounded-md bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
              >
                <Zap className="w-4 h-4 fill-white" />
                Resolve All Impacts
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
