export type SystemId = 
  | 'transport' 
  | 'academic_erp' 
  | 'lms' 
  | 'student_affairs' 
  | 'faculty_calendar' 
  | 'attendance' 
  | 'route_intelligence' 
  | 'access_control';

export type EventType = 
  | 'BUS_DELAY' 
  | 'ROAD_BLOCK' 
  | 'HACKATHON_WIN' 
  | 'QUIZ_FAILURE' 
  | 'ACCESS_STATUS_CHANGE';

export type EventPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface CampusSystem {
  id: SystemId;
  name: string;
  category: string;
  iconName: string;
  status: 'operational' | 'syncing' | 'alert' | 'degraded';
  lastSync: string;
  activeSubsystems: number;
  description: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  targetSystem: SystemId;
  actionType: string;
  automated: boolean;
  status: 'pending' | 'executed' | 'dismissed';
  impactMetric: string;
}

export interface AffectedPerson {
  id: string;
  name: string;
  role: 'student' | 'faculty' | 'staff';
  details: string;
}

export interface CampusEvent {
  id: string;
  type: EventType;
  title: string;
  sourceSystem: SystemId;
  timestamp: string;
  entityId: string;
  entityName: string;
  affectedSystems: SystemId[];
  affectedPeopleCount: number;
  affectedPeople: AffectedPerson[];
  affectedResources: string[];
  priority: EventPriority;
  recommendedActions: RecommendedAction[];
  description: string;
  rawPayload: Record<string, any>;
  status: 'active' | 'mitigated' | 'resolved';
}

export interface BusRoute {
  id: string;
  busNumber: string;
  routeCode: string;
  driverName: string;
  driverPhone: string;
  occupancyPercent: number;
  capacity: number;
  currentLocation: string;
  nextStop: string;
  etaMinutes: number;
  delayMinutes: number;
  status: 'ON_TIME' | 'DELAYED' | 'REROUTED' | 'HALTED';
  affectedStudentCount: number;
  routeStops: string[];
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  year: string;
  email: string;
  mentorName: string;
  gpa: number;
  attendancePercent: number;
  accessStatus: 'VERIFIED' | 'VERIFY_DEAN_OFFICE' | 'RESTRICTED';
  accessRestrictionReason?: string;
  assignedBusId?: string;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  availableSlotToday: string;
  officeRoom: string;
  email: string;
}

export interface AchievementRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  title: string;
  eventName: string;
  prize: string;
  date: string;
  odGenerated: boolean;
  odStatus: 'pending' | 'approved' | 'rejected';
  classesAffectedCount: number;
  attendanceEntriesUpdated: number;
  affectedClassNames: string[];
}

export interface QuizFailureRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  courseCode: string;
  courseName: string;
  quizTitle: string;
  scorePercent: number;
  weakConcept: string;
  recommendedFacultyId: string;
  recommendedFacultyName: string;
  mentoringSlot: string;
  scheduled: boolean;
}

export interface RouteIncident {
  id: string;
  type: 'Pothole' | 'Traffic' | 'Road Block' | 'Flooding' | 'Construction' | 'Accident';
  location: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reportedAt: string;
  alternateRouteSuggested: string;
  affectedBusIds: string[];
  status: 'ACTIVE' | 'RESOLVED';
}

export interface AccessRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  department: string;
  accessStatus: 'VERIFIED' | 'VERIFY_DEAN_OFFICE' | 'RESTRICTED';
  publicSecurityMessage: string;
  adminReason: string;
  lastUpdated: string;
}

export interface SimulationStep {
  step: number;
  label: string;
  title: string;
  system: SystemId | 'engine' | 'source';
  detail: string;
  timestamp: string;
}
