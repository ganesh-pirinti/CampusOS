import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { 
  CampusSystem, 
  CampusEvent, 
  BusRoute, 
  Student, 
  Faculty, 
  AchievementRecord, 
  QuizFailureRecord, 
  RouteIncident, 
  AccessRecord, 
  EventType
} from '../types/campus';
import { 
  INITIAL_SYSTEMS, 
  INITIAL_BUSES, 
  INITIAL_STUDENTS, 
  INITIAL_FACULTY, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_QUIZ_FAILURES, 
  INITIAL_ROUTE_INCIDENTS, 
  INITIAL_ACCESS_RECORDS, 
  INITIAL_EVENTS 
} from '../data/mockCampusData';
import { CampusContextEngine } from '../engine/campusContextEngine';
import type { EventEvaluationResult } from '../engine/campusContextEngine';

export type TabId = 
  | 'overview' 
  | 'live_campus'
  | 'mobility' 
  | 'achievement' 
  | 'mentor' 
  | 'route' 
  | 'access' 
  | 'graph' 
  | 'simulator';

interface CampusContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  systems: CampusSystem[];
  events: CampusEvent[];
  buses: BusRoute[];
  students: Student[];
  faculty: Faculty[];
  achievements: AchievementRecord[];
  quizFailures: QuizFailureRecord[];
  routeIncidents: RouteIncident[];
  accessRecords: AccessRecord[];
  
  // Selected event for detail modal
  selectedEventForImpact: CampusEvent | null;
  setSelectedEventForImpact: (event: CampusEvent | null) => void;

  // Active simulation state
  currentSimulation: {
    running: boolean;
    result: EventEvaluationResult | null;
    activeStepIndex: number;
  };

  // Actions
  triggerEvent: (type: EventType, payload?: Record<string, any>) => EventEvaluationResult;
  executeAction: (eventId: string, actionId: string) => void;
  approveOD: (achievementId: string) => void;
  scheduleMentoring: (quizId: string) => void;
  reportDriverIncident: (busId: string, type: string, details: string) => void;
  reportRouteIncident: (type: RouteIncident['type'], location: string, severity: RouteIncident['severity']) => void;
  updateAccessStatus: (studentId: string, status: AccessRecord['accessStatus'], adminReason?: string) => void;
  resetDemoData: () => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [systems, setSystems] = useState<CampusSystem[]>(INITIAL_SYSTEMS);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [buses, setBuses] = useState<BusRoute[]>(INITIAL_BUSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [faculty, setFaculty] = useState<Faculty[]>(INITIAL_FACULTY);
  const [achievements, setAchievements] = useState<AchievementRecord[]>(INITIAL_ACHIEVEMENTS);
  const [quizFailures, setQuizFailures] = useState<QuizFailureRecord[]>(INITIAL_QUIZ_FAILURES);
  const [routeIncidents, setRouteIncidents] = useState<RouteIncident[]>(INITIAL_ROUTE_INCIDENTS);
  const [accessRecords, setAccessRecords] = useState<AccessRecord[]>(INITIAL_ACCESS_RECORDS);
  const [selectedEventForImpact, setSelectedEventForImpact] = useState<CampusEvent | null>(null);

  const [currentSimulation, setCurrentSimulation] = useState<{
    running: boolean;
    result: EventEvaluationResult | null;
    activeStepIndex: number;
  }>({
    running: false,
    result: null,
    activeStepIndex: -1
  });

  const triggerEvent = (type: EventType, payload: Record<string, any> = {}): EventEvaluationResult => {
    const result = CampusContextEngine.processEvent(type, payload);
    
    // Add event to live feed
    setEvents(prev => [result.event, ...prev]);

    // Update system pulse status
    setSystems(prev => prev.map(sys => {
      if (result.affectedSystemIds.includes(sys.id)) {
        return { ...sys, status: 'syncing', lastSync: 'Just now' };
      }
      return sys;
    }));

    // Trigger simulation animation state
    setCurrentSimulation({
      running: true,
      result,
      activeStepIndex: 0
    });

    // Animate steps through interval
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step < result.simulationSteps.length) {
        setCurrentSimulation(prev => ({ ...prev, activeStepIndex: step }));
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentSimulation(prev => ({ ...prev, running: false }));
        }, 1500);
      }
    }, 900);

    return result;
  };

  const executeAction = (eventId: string, actionId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const updatedActions = evt.recommendedActions.map(act => {
          if (act.id === actionId) {
            return { ...act, status: 'executed' as const };
          }
          return act;
        });
        const allDone = updatedActions.every(a => a.status === 'executed');
        return {
          ...evt,
          recommendedActions: updatedActions,
          status: allDone ? 'resolved' : 'mitigated'
        };
      }
      return evt;
    }));
  };

  const approveOD = (achievementId: string) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === achievementId) {
        return { ...ach, odStatus: 'approved', odGenerated: true };
      }
      return ach;
    }));
  };

  const scheduleMentoring = (quizId: string) => {
    setQuizFailures(prev => prev.map(qz => {
      if (qz.id === quizId) {
        return { ...qz, scheduled: true };
      }
      return qz;
    }));
  };

  const reportDriverIncident = (busId: string, _type: string, details: string) => {
    setBuses(prev => prev.map(b => {
      if (b.id === busId) {
        return {
          ...b,
          status: 'DELAYED',
          delayMinutes: (b.delayMinutes || 0) + 15,
          affectedStudentCount: b.capacity
        };
      }
      return b;
    }));

    triggerEvent('BUS_DELAY', {
      busId,
      delayMinutes: 15,
      location: details || 'On Route Corridor',
      affectedStudentCount: 42
    });
  };

  const reportRouteIncident = (
    type: RouteIncident['type'],
    location: string,
    severity: RouteIncident['severity']
  ) => {
    const newInc: RouteIncident = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      type,
      location,
      severity,
      reportedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      alternateRouteSuggested: 'Reroute via Metro Overpass Link (Bypasses hazard zone)',
      affectedBusIds: ['BUS-07', 'BUS-04'],
      status: 'ACTIVE'
    };
    setRouteIncidents(prev => [newInc, ...prev]);

    triggerEvent('ROAD_BLOCK', {
      location,
      incidentType: type,
      severity
    });
  };

  const updateAccessStatus = (
    studentId: string,
    status: AccessRecord['accessStatus'],
    adminReason?: string
  ) => {
    setAccessRecords(prev => prev.map(acc => {
      if (acc.studentId === studentId) {
        return {
          ...acc,
          accessStatus: status,
          adminReason: adminReason || acc.adminReason,
          publicSecurityMessage: status === 'VERIFIED' ? 'All clear. Gate turnstile open.' : 'Access requires administrator verification.',
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return acc;
    }));

    const st = students.find(s => s.id === studentId);
    triggerEvent('ACCESS_STATUS_CHANGE', {
      studentId,
      studentName: st?.name || 'Student',
      rollNo: st?.rollNo || '24CSE001',
      status,
      adminReason
    });
  };

  const resetDemoData = () => {
    setSystems(INITIAL_SYSTEMS);
    setBuses(INITIAL_BUSES);
    setStudents(INITIAL_STUDENTS);
    setFaculty(INITIAL_FACULTY);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setQuizFailures(INITIAL_QUIZ_FAILURES);
    setRouteIncidents(INITIAL_ROUTE_INCIDENTS);
    setAccessRecords(INITIAL_ACCESS_RECORDS);
    setEvents(INITIAL_EVENTS);
  };

  return (
    <CampusContext.Provider
      value={{
        activeTab,
        setActiveTab,
        systems,
        events,
        buses,
        students,
        faculty,
        achievements,
        quizFailures,
        routeIncidents,
        accessRecords,
        selectedEventForImpact,
        setSelectedEventForImpact,
        currentSimulation,
        triggerEvent,
        executeAction,
        approveOD,
        scheduleMentoring,
        reportDriverIncident,
        reportRouteIncident,
        updateAccessStatus,
        resetDemoData
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
