import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  AlertTriangle, 
  MapPin, 
  Radio, 
  UserCheck, 
  Sparkles
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { LiveBusMap } from './LiveBusMap';
import { 
  subscribeToBusLocations, 
  startDriverTracking, 
  stopDriverTracking, 
  updateBusTelemetry, 
  findNearestBoardingPoint, 
  rankRecommendedBuses, 
  SRM_BOARDING_POINTS,
  type LiveBusTelemetry, 
  type BoardingPoint 
} from '../../services/busTracking';

export const MobilityOSScreen: React.FC = () => {
  const { buses: initialBuses, reportDriverIncident } = useCampus();
  
  // Sub-mode tabs: 'student' | 'driver' | 'fleet'
  const [activeSubMode, setActiveSubMode] = useState<'student' | 'driver' | 'fleet'>('student');
  
  // Live Telemetry state
  const [liveBusMap, setLiveBusMap] = useState<Record<string, LiveBusTelemetry>>({});
  const [selectedBusId, setSelectedBusId] = useState<string>('BUS-07');
  
  // Driver Mode state
  const [isDriverGpsActive, setIsDriverGpsActive] = useState<boolean>(false);
  const driverBusId = 'BUS-07';

  // Student Mode state
  const [studentLocation, setStudentLocation] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 16.4950,
    longitude: 80.6480 // Kanuru / Vijayawada default
  });
  const [isLocatingStudent, setIsLocatingStudent] = useState<boolean>(false);
  const [selectedBoardingPoint] = useState<BoardingPoint>(SRM_BOARDING_POINTS[0]);

  useEffect(() => {
    const unsubscribe = subscribeToBusLocations((latestBuses) => {
      setLiveBusMap(latestBuses);
    });
    return () => unsubscribe();
  }, []);

  const liveBusList = Object.values(liveBusMap);
  const currentSelectedBus = liveBusMap[selectedBusId] || liveBusList[0] || initialBuses[0];

  // Driver GPS Toggle
  const handleToggleDriverGps = () => {
    if (isDriverGpsActive) {
      stopDriverTracking(driverBusId);
      setIsDriverGpsActive(false);
    } else {
      startDriverTracking(driverBusId);
      setIsDriverGpsActive(true);
    }
  };

  // Quick Road Issue Handler for Driver
  const handleQuickReportIncident = (issueType: string) => {
    updateBusTelemetry(driverBusId, {
      status: 'DELAYED',
      etaMinutes: 28,
      incidentAlert: `${issueType} reported on Vijayawada-SRM AP Corridor`
    });

    reportDriverIncident(
      driverBusId,
      issueType,
      `${issueType} reported by driver on ${driverBusId}`
    );
  };

  // Student Location Detection
  const handleUseMyLocation = () => {
    setIsLocatingStudent(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setStudentLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setIsLocatingStudent(false);
        },
        () => {
          setStudentLocation({ latitude: 16.4950, longitude: 80.6480 });
          setIsLocatingStudent(false);
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocatingStudent(false);
    }
  };

  const nearestBPInfo = studentLocation 
    ? findNearestBoardingPoint(studentLocation.latitude, studentLocation.longitude)
    : { boardingPoint: SRM_BOARDING_POINTS[0], distanceKm: 0.45, walkMinutes: 6 };

  const recommendation = studentLocation && liveBusList.length > 0
    ? rankRecommendedBuses(studentLocation.latitude, studentLocation.longitude, liveBusList)
    : null;

  const otherBuses = liveBusList.filter(b => b.busId !== (recommendation?.recommendedBus.busId || 'BUS-07'));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto text-[#202124] animate-fadeIn font-serif">
      
      {/* 1. TITLE & SUBTITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-xl border border-[#DADCE0] shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-xs font-mono font-bold border border-[#4285F4]/30 mb-2">
            <Bus className="w-3.5 h-3.5 text-[#4285F4]" />
            MOBILITYOS CORE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">CAMPUS MOBILITY</h1>
          <p className="text-xs sm:text-base text-[#5F6368] font-normal italic mt-0.5">
            “See where buses are, when they arrive, and what is affecting them.”
          </p>
        </div>

        {/* Sub-Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg overflow-x-auto no-scrollbar w-full md:w-auto">
          <button
            onClick={() => setActiveSubMode('student')}
            className={`px-3 sm:px-4 py-2.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 min-h-[44px] ${
              activeSubMode === 'student'
                ? 'bg-[#4285F4] text-white shadow-2xs'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            STUDENT BUS MODE
          </button>
          <button
            onClick={() => setActiveSubMode('driver')}
            className={`px-3 sm:px-4 py-2.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 min-h-[44px] ${
              activeSubMode === 'driver'
                ? 'bg-[#EA4335] text-white shadow-2xs'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            DRIVER MODE
          </button>
          <button
            onClick={() => setActiveSubMode('fleet')}
            className={`px-3 sm:px-4 py-2.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 min-h-[44px] ${
              activeSubMode === 'fleet'
                ? 'bg-[#34A853] text-white shadow-2xs'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            LIVE BUS MAP &amp; FLEET
          </button>
        </div>
      </div>

      {/* 2. TOP METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm">
          <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">LIVE BUSES</div>
          <div className="text-3xl font-bold text-[#4285F4] mt-2">{liveBusList.length}</div>
          <div className="text-xs text-[#5F6368] mt-1">Operational on NH16 Corridor</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm">
          <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">DRIVERS ONLINE</div>
          <div className="text-3xl font-bold text-[#34A853] mt-2">
            {isDriverGpsActive ? '4 Active' : '3 Active'}
          </div>
          <div className="text-xs text-[#5F6368] mt-1">Real-time GPS telemetry</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm">
          <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">ACTIVE DELAYS</div>
          <div className="text-3xl font-bold text-[#FBBC05] mt-2">
            {liveBusList.filter(b => b.status === 'DELAYED').length} Bus
          </div>
          <div className="text-xs text-[#5F6368] mt-1">Reroutes suggested</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm">
          <div className="text-xs font-mono text-[#5F6368] uppercase font-bold">AFFECTED STUDENTS</div>
          <div className="text-3xl font-bold text-[#EA4335] mt-2">42</div>
          <div className="text-xs text-[#5F6368] mt-1">Attendance auto-protected</div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. STUDENT BUS MODE */}
      {/* ============================================================ */}
      {activeSubMode === 'student' && (
        <div className="space-y-8">
          {/* STEP-BY-STEP STUDENT FLOW */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm space-y-6">
            <div className="border-b border-[#DADCE0] pb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202124]">STUDENT BUS ASSISTANT</h2>
              <span className="text-xs font-mono text-[#4285F4] bg-[#E8F0FE] px-2.5 py-1 rounded border border-[#4285F4]/30">
                4-STEP SMART COMMUTE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* STEP 1: WHERE ARE YOU? */}
              <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="text-xs font-mono text-[#4285F4] uppercase font-bold">STEP 1</div>
                <h3 className="font-bold text-sm text-[#202124]">WHERE ARE YOU?</h3>
                <p className="text-xs text-[#5F6368]">Current location: Kanuru, Vijayawada</p>
                <button
                  onClick={handleUseMyLocation}
                  disabled={isLocatingStudent}
                  className="w-full py-2.5 px-3 min-h-[44px] rounded bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 fill-white" />
                  {isLocatingStudent ? 'LOCATING...' : 'USE MY LOCATION'}
                </button>
              </div>

              {/* STEP 2: NEAREST BOARDING POINT */}
              <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="text-xs font-mono text-[#34A853] uppercase font-bold">STEP 2</div>
                <h3 className="font-bold text-sm text-[#202124]">NEAREST BOARDING POINT</h3>
                <div className="space-y-1">
                  <div className="font-bold text-base text-[#202124]">{nearestBPInfo.boardingPoint.name}</div>
                  <div className="text-xs text-[#5F6368]">450 m away ({nearestBPInfo.walkMinutes} min walk)</div>
                </div>
              </div>

              {/* STEP 3: BEST BUS */}
              <div className="p-4 rounded-lg bg-[#E8F0FE] border border-[#4285F4]/40 space-y-3">
                <div className="text-xs font-mono text-[#1A73E8] uppercase font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> STEP 3
                </div>
                <h3 className="font-bold text-sm text-[#202124]">BEST BUS RECOMMENDED</h3>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-[#1A73E8]">
                    {recommendation?.recommendedBus.busNumber || 'BUS 07'}
                  </div>
                  <div className="text-xs text-[#3C4043]">
                    {recommendation?.recommendedBus.etaMinutes || 7} min away • Seats available
                  </div>
                </div>
              </div>

              {/* STEP 4: TRAVEL */}
              <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="text-xs font-mono text-[#FBBC05] uppercase font-bold">STEP 4</div>
                <h3 className="font-bold text-sm text-[#202124]">TRAVEL TIMELINE</h3>
                <div className="text-xs space-y-1">
                  <div>Boarding: <strong className="text-[#202124]">8:14 AM</strong></div>
                  <div>Campus Arrival: <strong className="text-[#34A853]">8:52 AM</strong></div>
                </div>
              </div>

            </div>

            {/* HERO ACTION BUTTON */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setSelectedBusId(recommendation?.recommendedBus.busId || 'BUS-07')}
                className="w-full sm:w-auto px-8 py-3.5 min-h-[48px] rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all"
              >
                <Bus className="w-5 h-5 fill-white" />
                TRACK MY BUS LIVE
              </button>
            </div>
          </div>

          {/* OTHER BUSES */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#202124]">OTHER BUSES ON YOUR CORRIDOR</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherBuses.map((bus) => (
                <div key={bus.busId} className="p-4 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-[#202124]">{bus.busNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      bus.status === 'DELAYED' ? 'bg-[#FEF7E0] text-[#B06000]' : 'bg-[#E6F4EA] text-[#137333]'
                    }`}>
                      {bus.etaMinutes} min ETA
                    </span>
                  </div>
                  <div className="text-xs text-[#5F6368]">
                    Route: <span className="text-[#202124] font-medium">{bus.routeId}</span>
                  </div>
                  <div className="text-xs text-[#5F6368]">
                    Occupancy: <span className="text-[#202124] font-medium">{bus.occupancyCount} / {bus.capacity} seats</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE MAP */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#202124]">LIVE BUS SPATIAL MAP</h3>
            <div className="h-[450px] rounded-lg overflow-hidden border border-[#DADCE0]">
              <LiveBusMap
                buses={liveBusList}
                selectedBusId={selectedBusId}
                studentLocation={studentLocation}
                nearestBoardingPoint={selectedBoardingPoint}
                onSelectBus={(id) => setSelectedBusId(id)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. DRIVER MODE */}
      {/* ============================================================ */}
      {activeSubMode === 'driver' && (
        <div className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#DADCE0] pb-4">
            <div>
              <div className="text-xs font-mono text-[#EA4335] uppercase font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#EA4335] animate-pulse" />
                DRIVER GPS TELEMETRY
              </div>
              <h2 className="text-2xl font-bold text-[#202124] mt-1">DRIVER MODE</h2>
            </div>
            
            {/* GPS STATUS BADGE */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
              isDriverGpsActive 
                ? 'bg-[#E6F4EA] text-[#137333] border border-[#34A853]' 
                : 'bg-[#F1F3F4] text-[#5F6368] border border-[#DADCE0]'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDriverGpsActive ? 'bg-[#34A853] animate-ping' : 'bg-[#5F6368]'}`} />
              {isDriverGpsActive ? '● LIVE GPS' : '● DEMO GPS / OFFLINE'}
            </span>
          </div>

          {/* LARGE DRIVER BUS CARD */}
          <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#DADCE0] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#5F6368] uppercase font-bold">ASSIGNED VEHICLE</span>
                <h3 className="text-3xl font-bold text-[#202124] mt-0.5">BUS 07</h3>
                <p className="text-sm text-[#4285F4] font-bold">Vijayawada → SRM AP</p>
              </div>
              <div className="text-right text-xs text-[#5F6368] space-y-1">
                <div>Driver: Ramesh Kumar</div>
                <div>Phone: +91 98765 43210</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs pt-3 border-t border-[#DADCE0]">
              <div>
                <span className="text-[#5F6368] font-mono block">CURRENT SPEED</span>
                <span className="text-xl font-bold text-[#34A853] font-mono">
                  {currentSelectedBus.speed || 48} km/h
                </span>
              </div>
              <div>
                <span className="text-[#5F6368] font-mono block">CURRENT LOCATION</span>
                <span className="text-sm font-bold text-[#202124] font-mono">
                  {currentSelectedBus.latitude.toFixed(3)}, {currentSelectedBus.longitude.toFixed(3)}
                </span>
              </div>
              <div>
                <span className="text-[#5F6368] font-mono block">LAST UPDATE</span>
                <span className="text-xs font-bold text-[#5F6368] font-mono">Just now</span>
              </div>
            </div>
          </div>

          {/* ONE HUGE BUTTON */}
          <div className="pt-2">
            <button
              onClick={handleToggleDriverGps}
              className={`w-full py-5 rounded-xl text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 shadow-md transition-all ${
                isDriverGpsActive
                  ? 'bg-[#EA4335] hover:bg-[#D93025] text-white'
                  : 'bg-[#34A853] hover:bg-[#2D9247] text-white'
              }`}
            >
              <Radio className="w-6 h-6 fill-white" />
              {isDriverGpsActive ? 'STOP LIVE GPS' : 'START LIVE GPS'}
            </button>
          </div>

          {/* REPORT ROAD ISSUE BUTTONS */}
          <div className="space-y-3 pt-4 border-t border-[#DADCE0]">
            <h4 className="text-sm font-bold text-[#202124] uppercase font-mono">REPORT ROAD ISSUE</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {['Traffic', 'Road Block', 'Accident', 'Mechanical', 'Other'].map((issue) => (
                <button
                  key={issue}
                  onClick={() => handleQuickReportIncident(issue)}
                  className="py-3 px-2 rounded-lg bg-[#F8F9FA] hover:bg-[#FEF7E0] border border-[#DADCE0] hover:border-[#FBBC05] text-xs font-bold text-[#202124] flex items-center justify-center gap-1 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#EA4335]" />
                  {issue}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. LIVE BUS MAP & FLEET */}
      {/* ============================================================ */}
      {activeSubMode === 'fleet' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#202124]">FLEET CONTROL ROOM &amp; SPATIAL MAP</h3>
            <div className="h-[480px] rounded-lg overflow-hidden border border-[#DADCE0]">
              <LiveBusMap
                buses={liveBusList}
                selectedBusId={selectedBusId}
                studentLocation={studentLocation}
                nearestBoardingPoint={selectedBoardingPoint}
                onSelectBus={(id) => setSelectedBusId(id)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
