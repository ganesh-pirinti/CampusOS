import React, { useState } from 'react';
import { 
  Radio, 
  Map as MapIcon, 
  Clock, 
  AlertTriangle, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { LiveBusMap } from './LiveBusMap';

export const LiveCampusScreen: React.FC = () => {
  const { events, setSelectedEventForImpact } = useCampus();
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'events' | 'impact'>('map');

  const criticalEvents = events.filter(e => e.status === 'active' || e.priority === 'CRITICAL' || e.priority === 'HIGH');

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#DADCE0] shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-mono font-bold border border-[#4285F4]/30 mb-2">
            <Radio className="w-3.5 h-3.5 text-[#EA4335] animate-pulse" />
            REAL-TIME TELEMETRY & SPATIAL FEED
          </div>
          <h1 className="text-3xl font-bold text-[#202124] tracking-tight">LIVE CAMPUS</h1>
          <p className="text-sm text-[#5F6368] font-normal mt-1">
            Real-time visual map of buses, route incidents, boarding points, and live event cascades.
          </p>
        </div>

        {/* Top View Switcher Tabs: [ MAP ] [ EVENTS ] [ IMPACT ] */}
        <div className="flex items-center gap-1 bg-[#F8F9FA] p-1.5 rounded-lg border border-[#DADCE0]">
          <button
            onClick={() => setActiveSubTab('map')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'map'
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#E8EAED]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            MAP VIEW
          </button>
          <button
            onClick={() => setActiveSubTab('events')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'events'
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#E8EAED]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            LIVE EVENTS ({criticalEvents.length})
          </button>
          <button
            onClick={() => setActiveSubTab('impact')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'impact'
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#E8EAED]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            IMPACT DIGEST
          </button>
        </div>
      </div>

      {/* Main Screen Layout */}
      {activeSubTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Map View (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#202124] flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-[#4285F4]" />
                  SPATIAL CAMPUS & FLEET MAP
                </h2>
                <p className="text-xs text-[#5F6368]">
                  Live Leaflet GIS tracking buses on NH16 Vijayawada Corridor to SRM AP.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#E6F4EA] text-[#137333] text-xs font-mono font-bold border border-[#34A853]/30">
                ● GPS SYNC ACTIVE
              </span>
            </div>

            <div className="h-[520px] rounded-lg overflow-hidden border border-[#DADCE0]">
              <LiveBusMap height="100%" />
            </div>
          </div>

          {/* Right Side: LIVE EVENT PANEL */}
          <div className="bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-[#DADCE0] pb-3">
                <div>
                  <h2 className="text-lg font-bold text-[#202124] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#EA4335]" />
                    LIVE EVENT PANEL
                  </h2>
                  <p className="text-xs text-[#5F6368]">Active incidents requiring Context Engine decisioning.</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#FEF7E0] text-[#B06000] text-xs font-mono font-bold">
                  {criticalEvents.length} Active
                </span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {criticalEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] hover:border-[#4285F4] transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            evt.priority === 'CRITICAL' ? 'bg-[#EA4335] animate-ping' : 'bg-[#FBBC05]'
                          }`} />
                          <h3 className="text-sm font-bold text-[#202124]">{evt.title}</h3>
                        </div>
                        <p className="text-xs text-[#5F6368]">{evt.description}</p>
                      </div>
                      <span className="text-[11px] font-mono text-[#5F6368]">{evt.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded border border-[#DADCE0]">
                      <div>
                        <span className="text-[#5F6368] text-[11px] block">AFFECTED:</span>
                        <span className="font-bold text-[#EA4335]">{evt.affectedPeopleCount} Users</span>
                      </div>
                      <div>
                        <span className="text-[#5F6368] text-[11px] block">RECOMMENDED:</span>
                        <span className="font-bold text-[#1A73E8]">
                          {evt.recommendedActions[0]?.title || 'Auto Reroute'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEventForImpact(evt)}
                      className="w-full py-2 px-3 rounded bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>VIEW IMPACT &amp; CASCADE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#DADCE0] text-center">
              <span className="text-xs text-[#5F6368] italic">
                CampusOS automatically resolves route blockages via real-time bus rerouting.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Events SubTab */}
      {activeSubTab === 'events' && (
        <div className="bg-white rounded-xl border border-[#DADCE0] p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-[#202124]">All Active Telemetry Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((evt) => (
              <div key={evt.id} className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#202124]">{evt.title}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-[#DADCE0]">
                    {evt.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-[#5F6368]">{evt.description}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#DADCE0]">
                  <span className="text-[#5F6368]">{evt.affectedPeopleCount} people affected</span>
                  <button
                    onClick={() => setSelectedEventForImpact(evt)}
                    className="text-[#1A73E8] font-bold hover:underline"
                  >
                    View Impact Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impact Digest SubTab */}
      {activeSubTab === 'impact' && (
        <div className="bg-white rounded-xl border border-[#DADCE0] p-8 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-bold text-[#202124]">Campus Impact Digest</h2>
            <p className="text-sm text-[#5F6368]">
              Cross-domain intelligence overview generated by the Campus Context Engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-[#E8F0FE] border border-[#4285F4]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#1A73E8] font-bold text-sm">
                <Users className="w-4 h-4" />
                Mobility & Attendance
              </div>
              <p className="text-xs text-[#3C4043]">
                42 students auto-exempted from attendance penalties due to verified Bus 07 delay on NH16 corridor.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-[#E6F4EA] border border-[#34A853]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#137333] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                Academic OD Workflow
              </div>
              <p className="text-xs text-[#3C4043]">
                Hackathon victory auto-logged. On-Duty attendance adjustments sent to 3 department heads.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-[#FEF7E0] border border-[#FBBC05]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#B06000] font-bold text-sm">
                <Clock className="w-4 h-4" />
                Faculty Support Slots
              </div>
              <p className="text-xs text-[#3C4043]">
                LMS concept gaps matched with 2 faculty office hours. 1-click scheduling active.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
