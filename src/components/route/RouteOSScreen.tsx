import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Map, 
  ArrowRight,
  Bus,
  Users
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { LiveBusMap } from '../mobility/LiveBusMap';

export const RouteOSScreen: React.FC = () => {
  const { routeIncidents, reportRouteIncident, setActiveTab } = useCampus();
  const [showAltRoute, setShowAltRoute] = useState<boolean>(false);

  // Form state
  const [issueType, setIssueType] = useState<string>('Road Block');
  const [location, setLocation] = useState<string>('Vijayawada Route (NH16 Corridor)');

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    reportRouteIncident(issueType as any, location, 'HIGH');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-xl border border-[#DADCE0] shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE8E6] text-[#C5221F] text-xs font-mono font-bold border border-[#EA4335]/30 mb-2">
            <Map className="w-3.5 h-3.5 text-[#EA4335]" />
            ROUTE INTELLIGENCE CORE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">ROUTE INTELLIGENCE</h1>
          <p className="text-xs sm:text-sm text-[#5F6368] font-normal mt-1">
            Real-time traffic hazard mapping and automated detour rerouting.
          </p>
        </div>

        <button
          onClick={() => setShowAltRoute(prev => !prev)}
          className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-lg bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <ArrowRight className="w-5 h-5" />
          {showAltRoute ? 'HIDE ALTERNATIVE ROUTE' : 'SHOW ALTERNATIVE ROUTE'}
        </button>
      </div>

      {/* 2. BIG MAP HERO SECTION */}
      <div className="bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-xl font-bold text-[#202124]">SPATIAL ROUTE MAP &amp; DETOURS</h2>
          <span className="text-xs font-mono text-[#5F6368] bg-[#F8F9FA] px-3 py-1 rounded border border-[#DADCE0]">
            ● SPATIAL SYNC ACTIVE
          </span>
        </div>

        <div className="h-[340px] sm:h-[420px] lg:h-[480px] rounded-lg overflow-hidden border border-[#DADCE0]">
          <LiveBusMap height="100%" />
        </div>
      </div>

      {/* 3. TWO-COLUMN LAYOUT: REPORT ROAD ISSUE (Left) + ACTIVE ROAD ISSUES (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* LEFT SIDE: REPORT ROAD ISSUE */}
        <div className="bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-6 shadow-sm space-y-6">
          <div className="border-b border-[#DADCE0] pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#202124]">REPORT ROAD ISSUE</h2>
            <p className="text-xs text-[#5F6368]">Dispatch road hazards directly into CampusOS spatial graph.</p>
          </div>

          <form onSubmit={handleReport} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#5F6368] mb-1.5 uppercase font-bold">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] text-xs sm:text-sm font-bold min-h-[44px]"
              >
                <option value="Road Block">🚧 Road Block</option>
                <option value="Traffic">🚗 Heavy Traffic</option>
                <option value="Accident">💥 Collision / Accident</option>
                <option value="Flooding">🌊 Waterlogging / Flooding</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#5F6368] mb-1.5 uppercase font-bold">Location Corridor</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-[#202124] text-xs sm:text-sm font-bold min-h-[44px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 min-h-[44px] rounded-md bg-[#EA4335] hover:bg-[#D93025] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs"
            >
              <AlertTriangle className="w-4 h-4 fill-white text-[#EA4335]" />
              SUBMIT ROAD ISSUE
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: ACTIVE ROAD ISSUES */}
        <div className="bg-white rounded-xl border border-[#DADCE0] p-4 sm:p-6 shadow-sm space-y-6">
          <div className="border-b border-[#DADCE0] pb-3 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#202124]">ACTIVE ROAD ISSUES</h2>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#FCE8E6] text-[#C5221F] font-bold">
              {routeIncidents.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {routeIncidents.map((inc) => (
              <div key={inc.id} className="p-4 sm:p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚧</span>
                    <div>
                      <h3 className="text-base font-bold text-[#202124]">{inc.type}</h3>
                      <div className="text-xs text-[#EA4335] font-bold">{inc.location}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#FCE8E6] text-[#C5221F] text-xs font-mono font-bold">
                    12 min impact
                  </span>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-3 rounded bg-white border border-[#DADCE0]">
                  <div className="flex items-center gap-1.5">
                    <Bus className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>Affected Buses: <strong className="text-[#202124]">Bus 07, Bus 04</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#EA4335]" />
                    <span>Affected Students: <strong className="text-[#EA4335]">42 Students</strong></span>
                  </div>
                </div>

                <div className="text-xs p-2.5 rounded bg-[#E6F4EA] border border-[#34A853]/30 text-[#137333]">
                  <strong>Alternative Route Suggested:</strong> Reroute via Metro Overpass Link (Bypasses hazard zone cleanly).
                </div>
              </div>
            ))}
          </div>

          {/* ONE OBVIOUS BUTTON */}
          <button
            onClick={() => {
              setShowAltRoute(true);
              setActiveTab('mobility');
            }}
            className="w-full py-3.5 min-h-[48px] rounded-lg bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            SHOW ALTERNATIVE ROUTE
          </button>
        </div>

      </div>

    </div>
  );
};
