import type { 
  EventType, 
  CampusEvent, 
  SystemId, 
  RecommendedAction, 
  AffectedPerson, 
  SimulationStep 
} from '../types/campus';

export interface EventEvaluationResult {
  event: CampusEvent;
  simulationSteps: SimulationStep[];
  affectedSystemIds: SystemId[];
  geminiInsight: string;
}

export class CampusContextEngine {

  /**
   * Process a campus event through the deterministic rules pipeline:
   * SOURCE -> CONTEXT ENGINE -> IMPACT GRAPH -> RECOMMENDED ACTIONS
   */
  public static processEvent(
    type: EventType,
    payload: Record<string, any>
  ): EventEvaluationResult {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const eventId = `EVT-${Date.now().toString().slice(-5)}`;

    switch (type) {
      case 'BUS_DELAY':
        return this.evaluateBusDelay(eventId, timestamp, payload);

      case 'ROAD_BLOCK':
        return this.evaluateRoadBlock(eventId, timestamp, payload);

      case 'HACKATHON_WIN':
        return this.evaluateHackathonWin(eventId, timestamp, payload);

      case 'QUIZ_FAILURE':
        return this.evaluateQuizFailure(eventId, timestamp, payload);

      case 'ACCESS_STATUS_CHANGE':
        return this.evaluateAccessStatusChange(eventId, timestamp, payload);

      default:
        throw new Error(`Unsupported event type: ${type}`);
    }
  }

  private static evaluateBusDelay(
    eventId: string,
    timestamp: string,
    payload: Record<string, any>
  ): EventEvaluationResult {
    const busId = payload.busId || 'BUS-07';
    const delayMinutes = payload.delayMinutes || 18;
    const location = payload.location || 'Outer Ring Road - Stop 3';
    const affectedCount = payload.affectedStudentCount || 42;

    const affectedPeople: AffectedPerson[] = [
      { id: 'STU-24CSE001', name: 'Aarav Sharma', role: 'student', details: `Assigned to ${busId} - CS301 Period 2 risk` },
      { id: 'STU-24CSE042', name: 'Ganesh Pirinti', role: 'student', details: `Assigned to ${busId} - CS301 Period 2 risk` },
      { id: 'STU-24CSE104', name: 'Priya Nair', role: 'student', details: `Assigned to ${busId} - CS301 Period 2 risk` },
      { id: 'FAC-001', name: 'Dr. K. Srinivas', role: 'faculty', details: 'Instructor for CS301 (Starts @ 14:00)' }
    ];

    const recommendedActions: RecommendedAction[] = [
      {
        id: `ACT-${Date.now()}-1`,
        title: 'Dispatch Student Delay Notifications',
        description: `Push real-time SMS & mobile notifications to ${affectedCount} registered passengers with updated ETA (+${delayMinutes} mins).`,
        targetSystem: 'transport',
        actionType: 'NOTIFICATION',
        automated: true,
        status: 'pending',
        impactMetric: `${affectedCount} student alerts dispatched`
      },
      {
        id: `ACT-${Date.now()}-2`,
        title: 'Reroute Alternate Bus 04',
        description: 'Instruct Bus 04 (44% capacity) to pick up overflow at Outer Ring Road Stop 3.',
        targetSystem: 'transport',
        actionType: 'REROUTE',
        automated: true,
        status: 'pending',
        impactMetric: '22 students rerouted; ETA saved by 12 mins'
      },
      {
        id: `ACT-${Date.now()}-3`,
        title: 'Flag Attendance System for Period 2 Grace',
        description: 'Automatically extend classroom RFID attendance grace window by 15 minutes for 42 students.',
        targetSystem: 'attendance',
        actionType: 'ACADEMIC_GRACE',
        automated: false,
        status: 'pending',
        impactMetric: 'Zero wrongful absence flags recorded'
      },
      {
        id: `ACT-${Date.now()}-4`,
        title: 'Alert Faculty Roster',
        description: 'Notify Dr. K. Srinivas that 42 students in CS301 will be 12-15 mins late due to transit delay.',
        targetSystem: 'faculty_calendar',
        actionType: 'FACULTY_NOTIFY',
        automated: true,
        status: 'pending',
        impactMetric: 'Lecture start adjusted automatically'
      }
    ];

    const affectedSystemIds: SystemId[] = [
      'transport',
      'academic_erp',
      'attendance',
      'faculty_calendar'
    ];

    const simulationSteps: SimulationStep[] = [
      { step: 1, label: 'SOURCE DETECTED', title: 'Transport GPS Telemetry', system: 'transport', detail: `${busId} speed dropped < 5 km/h at ${location}. Delay calculated: +${delayMinutes} mins.`, timestamp },
      { step: 2, label: 'CONTEXT ANALYSIS', title: 'Campus Context Engine', system: 'engine', detail: `Cross-referencing ${busId} roster with Academic ERP timetable: 42 students have CS301 lecture @ 14:00.`, timestamp },
      { step: 3, label: 'SYSTEM GRAPH IMPACT', title: 'Propagating System Impact', system: 'academic_erp', detail: 'Triggering sub-events across Transport, ERP Timetable, Biometric Attendance, and Faculty Calendar.', timestamp },
      { step: 4, label: 'ACTION DISPATCH', title: 'Coordinated Interventions', system: 'attendance', detail: 'Generated 4 automated & recommended mitigation actions across 3 campus units.', timestamp }
    ];

    const event: CampusEvent = {
      id: eventId,
      type: 'BUS_DELAY',
      title: `${busId} Delay Alert — ${delayMinutes} Mins Delay`,
      sourceSystem: 'transport',
      timestamp,
      entityId: busId,
      entityName: `${busId} (North Route)`,
      affectedSystems: affectedSystemIds,
      affectedPeopleCount: affectedCount,
      affectedPeople,
      affectedResources: [`Bus Route ${busId}`, 'Tech Block Lecture Hall 401'],
      priority: delayMinutes > 15 ? 'HIGH' : 'MEDIUM',
      recommendedActions,
      description: `${busId} is experiencing an unexpected ${delayMinutes}-minute delay near ${location}. ${affectedCount} students have period 2 classes affected.`,
      rawPayload: payload,
      status: 'active'
    };

    const geminiInsight = `CampusOS Insight: In isolated legacy systems, transport delays remain in the transport department while attendance records unexcused absences and faculty wonder why half the room is empty. CampusOS Context Engine bridges transport telemetry with ERP class rosters and gate attendance. By detecting the ${delayMinutes}-minute delay early, CampusOS automatically flags the biometric attendance grace period and reroutes Bus 04, preventing academic penalties for ${affectedCount} students.`;

    return { event, simulationSteps, affectedSystemIds, geminiInsight };
  }

  private static evaluateRoadBlock(
    eventId: string,
    timestamp: string,
    payload: Record<string, any>
  ): EventEvaluationResult {
    const location = payload.location || 'Main Gate Outer Junction';
    const incidentType = payload.incidentType || 'Road Block';

    const affectedPeople: AffectedPerson[] = [
      { id: 'DRIVER-07', name: 'Ramesh Kumar (Bus 07)', role: 'staff', details: 'Route passes directly through hazard zone' },
      { id: 'DRIVER-04', name: 'Suresh Verma (Bus 04)', role: 'staff', details: 'Route passes directly through hazard zone' },
      { id: 'STU-COMMUTERS', name: '220 Student Commuters', role: 'student', details: 'Commuting via West & North Gate access roads' }
    ];

    const recommendedActions: RecommendedAction[] = [
      {
        id: `ACT-${Date.now()}-1`,
        title: 'Broadcast Reroute Telemetry to Fleet',
        description: `Push real-time detour coordinates (Metro Overpass link) to all buses approaching ${location}.`,
        targetSystem: 'transport',
        actionType: 'REROUTE',
        automated: true,
        status: 'pending',
        impactMetric: '4 bus routes updated in real-time'
      },
      {
        id: `ACT-${Date.now()}-2`,
        title: 'Update Campus Digital Signage & Map Navigation',
        description: 'Publish spatial hazard overlay to RouteOS interactive map and campus entry displays.',
        targetSystem: 'route_intelligence',
        actionType: 'MAP_UPDATE',
        automated: true,
        status: 'pending',
        impactMetric: 'Live navigation map updated for all users'
      },
      {
        id: `ACT-${Date.now()}-3`,
        title: 'Alert Campus Security Control Room',
        description: 'Dispatch physical traffic coordinator to redirect vehicle traffic at South Gate roundabout.',
        targetSystem: 'access_control',
        actionType: 'SECURITY_DISPATCH',
        automated: false,
        status: 'pending',
        impactMetric: 'Traffic officer dispatched to South Gate'
      }
    ];

    const affectedSystemIds: SystemId[] = [
      'route_intelligence',
      'transport',
      'access_control',
      'academic_erp'
    ];

    const simulationSteps: SimulationStep[] = [
      { step: 1, label: 'SPATIAL HAZARD', title: 'Route Intelligence GIS', system: 'route_intelligence', detail: `Incident reported: ${incidentType} at ${location}. Road capacity reduced by 80%.`, timestamp },
      { step: 2, label: 'CONTEXT ENGINE', title: 'Fleet & Transit Intersect', system: 'engine', detail: 'Calculated spatial intersection: Buses 07, 04, and 15 affected. Estimated cumulative delay: 28 mins.', timestamp },
      { step: 3, label: 'MULTI-SYSTEM GRAPH', title: 'Updating Spatial Networks', system: 'transport', detail: 'Recalculating optimal graph paths via Metro Overpass bypass vector.', timestamp },
      { step: 4, label: 'ACTION DISPATCH', title: 'Fleet Reroute & Signage Update', system: 'access_control', detail: 'Dispatched dynamic map overlays and driver navigation alerts.', timestamp }
    ];

    const event: CampusEvent = {
      id: eventId,
      type: 'ROAD_BLOCK',
      title: `Road Obstruction Reported — ${location}`,
      sourceSystem: 'route_intelligence',
      timestamp,
      entityId: 'INC-ROAD-01',
      entityName: location,
      affectedSystems: affectedSystemIds,
      affectedPeopleCount: 220,
      affectedPeople,
      affectedResources: [location, 'North Gate Transit Corridor', 'Bus Fleet 07/04/15'],
      priority: 'CRITICAL',
      recommendedActions,
      description: `${incidentType} detected near ${location}. Immediate rerouting required for campus shuttle buses to prevent gridlock.`,
      rawPayload: payload,
      status: 'active'
    };

    const geminiInsight = `CampusOS Insight: A physical road obstruction impacts more than just drivers — it cascades into delayed lectures, congested gates, and missed labs. RouteOS detects the obstruction and immediately feeds the spatial change into Transport Management and Access Control, adjusting bus navigation before drivers hit the bottleneck.`;

    return { event, simulationSteps, affectedSystemIds, geminiInsight };
  }

  private static evaluateHackathonWin(
    eventId: string,
    timestamp: string,
    payload: Record<string, any>
  ): EventEvaluationResult {
    const studentName = payload.studentName || 'Aarav Sharma';
    const rollNo = payload.rollNo || '24CSE00123';
    const eventName = payload.eventName || 'Google Solution Hunt 2026';
    const prize = payload.prize || '1st Place Winner';

    const affectedPeople: AffectedPerson[] = [
      { id: 'STU-24CSE001', name: studentName, role: 'student', details: `${prize} — ${eventName}` },
      { id: 'FAC-001', name: 'Dr. K. Srinivas', role: 'faculty', details: 'HOD Computer Science — Course Instructor' },
      { id: 'FAC-003', name: 'Dr. R. Sundaram', role: 'faculty', details: 'Lab Director & Class Coordinator' }
    ];

    const recommendedActions: RecommendedAction[] = [
      {
        id: `ACT-${Date.now()}-1`,
        title: 'Auto-Generate On-Duty (OD) Pass',
        description: `Generate formal OD pass for ${studentName} (${rollNo}) covering 28-29 Sep 2026.`,
        targetSystem: 'attendance',
        actionType: 'OD_CREDIT',
        automated: true,
        status: 'executed',
        impactMetric: '6 class periods converted to Verified OD'
      },
      {
        id: `ACT-${Date.now()}-2`,
        title: 'Notify Instructors & Adjust Assignment Deadlines',
        description: 'Alert course instructors of verified external participation and grant 48-hour extension on lab submissions.',
        targetSystem: 'academic_erp',
        actionType: 'ACADEMIC_ADJUST',
        automated: true,
        status: 'executed',
        impactMetric: '3 assignment deadlines extended'
      },
      {
        id: `ACT-${Date.now()}-3`,
        title: 'Publish Achievement to Dean Portal & Media Desk',
        description: 'Record achievement in student permanent profile and forward summary to Dean of Student Affairs.',
        targetSystem: 'student_affairs',
        actionType: 'ACHIEVEMENT_RECORD',
        automated: true,
        status: 'executed',
        impactMetric: 'Permanent academic portfolio updated'
      }
    ];

    const affectedSystemIds: SystemId[] = [
      'student_affairs',
      'academic_erp',
      'attendance',
      'faculty_calendar'
    ];

    const simulationSteps: SimulationStep[] = [
      { step: 1, label: 'ACHIEVEMENT VERIFIED', title: 'Student Affairs Portal', system: 'student_affairs', detail: `Verified external award: ${studentName} achieved ${prize} at ${eventName}.`, timestamp },
      { step: 2, label: 'TIMETABLE MATCHING', title: 'Academic ERP Scan', system: 'academic_erp', detail: 'Scanned 28-29 Sep timetable: Identified 4 lecture periods and 2 lab sessions attended off-campus.', timestamp },
      { step: 3, label: 'AUTOMATED OD PIPELINE', title: 'Attendance Engine', system: 'attendance', detail: 'Generated On-Duty (OD) waiver request and pushed to Dr. K. Srinivas for digital signature.', timestamp },
      { step: 4, label: 'CALENDAR & LMS SYNC', title: 'Faculty & LMS Sync', system: 'faculty_calendar', detail: 'Adjusted attendance logs and extended upcoming assignment deadline by 48 hrs.', timestamp }
    ];

    const event: CampusEvent = {
      id: eventId,
      type: 'HACKATHON_WIN',
      title: `Hackathon Achievement Verified — ${studentName}`,
      sourceSystem: 'student_affairs',
      timestamp,
      entityId: rollNo,
      entityName: `${studentName} (${rollNo})`,
      affectedSystems: affectedSystemIds,
      affectedPeopleCount: 4,
      affectedPeople,
      affectedResources: ['Academic Attendance Log', 'Faculty Roster', 'Student Profile'],
      priority: 'MEDIUM',
      recommendedActions,
      description: `Student ${studentName} achieved ${prize} at ${eventName}. Automated OD credit workflow generated.`,
      rawPayload: payload,
      status: 'mitigated'
    };

    const geminiInsight = `CampusOS Insight: Without system integration, students who win major national hackathons often get marked absent, lose attendance percentage, and have to carry paper forms to 5 different faculty members. AchievementOS automatically links Student Affairs verifications directly into the Attendance and Academic ERP systems, auto-generating OD credit and extending assignment deadlines instantly.`;

    return { event, simulationSteps, affectedSystemIds, geminiInsight };
  }

  private static evaluateQuizFailure(
    eventId: string,
    timestamp: string,
    payload: Record<string, any>
  ): EventEvaluationResult {
    const studentName = payload.studentName || 'Ganesh Pirinti';
    const score = payload.scorePercent || 38;
    const course = payload.courseName || 'Data Structures';
    const weakConcept = payload.weakConcept || 'Pointer manipulation in doubly linked lists';

    const affectedPeople: AffectedPerson[] = [
      { id: 'STU-24CSE042', name: studentName, role: 'student', details: `Score ${score}% in ${course}` },
      { id: 'FAC-001', name: 'Dr. K. Srinivas', role: 'faculty', details: 'Faculty Course Lead — Available @ 4:00 PM' }
    ];

    const recommendedActions: RecommendedAction[] = [
      {
        id: `ACT-${Date.now()}-1`,
        title: 'Schedule 1-on-1 Micro-Mentoring Session',
        description: 'Match concept gap with Dr. K. Srinivas office hour slot Today 4:00 PM - 4:30 PM at Tech Block 402.',
        targetSystem: 'faculty_calendar',
        actionType: 'CALENDAR_BOOKING',
        automated: false,
        status: 'pending',
        impactMetric: '1-on-1 micro-session reserved'
      },
      {
        id: `ACT-${Date.now()}-2`,
        title: 'Push Visual Remedial Module to LMS',
        description: 'Assign interactive memory allocation & pointer visualization module to student LMS dashboard.',
        targetSystem: 'lms',
        actionType: 'CONTENT_PUSH',
        automated: true,
        status: 'pending',
        impactMetric: 'Adaptive learning path assigned'
      },
      {
        id: `ACT-${Date.now()}-3`,
        title: 'Notify Academic Advisor',
        description: 'Send early intervention alert to academic advisor for progress monitoring before midterms.',
        targetSystem: 'academic_erp',
        actionType: 'ADVISOR_ALERT',
        automated: true,
        status: 'pending',
        impactMetric: 'Advisor dashboard flagged'
      }
    ];

    const affectedSystemIds: SystemId[] = [
      'lms',
      'faculty_calendar',
      'academic_erp'
    ];

    const simulationSteps: SimulationStep[] = [
      { step: 1, label: 'CONCEPT BREAKDOWN', title: 'LMS Quiz Telemetry', system: 'lms', detail: `Quiz telemetry flagged score of ${score}% for ${studentName} in ${course}. Topic: ${weakConcept}.`, timestamp },
      { step: 2, label: 'FACULTY MATCHING', title: 'Faculty Calendar Engine', system: 'faculty_calendar', detail: 'Scanned CSE faculty office hours: Dr. K. Srinivas has open 30-min slot Today @ 4:00 PM.', timestamp },
      { step: 3, label: 'SCHEDULE INTERVENTION', title: 'MentorOS Orchestrator', system: 'engine', detail: 'Generated 1-on-1 micro-mentoring booking proposal and pushed notification to student.', timestamp },
      { step: 4, label: 'ADAPTIVE CONTENT', title: 'LMS Content Injector', system: 'lms', detail: 'Dispatched targeted visual memory layout practice module to student dashboard.', timestamp }
    ];

    const event: CampusEvent = {
      id: eventId,
      type: 'QUIZ_FAILURE',
      title: `Concept Gap Detected — ${studentName} (${score}%)`,
      sourceSystem: 'lms',
      timestamp,
      entityId: 'QZ-101',
      entityName: `${studentName} — ${course}`,
      affectedSystems: affectedSystemIds,
      affectedPeopleCount: 2,
      affectedPeople,
      affectedResources: ['LMS Quiz Analytics', 'Dr. K. Srinivas Office Hours (Tech 402)'],
      priority: 'HIGH',
      recommendedActions,
      description: `LMS quiz telemetry flagged score of ${score}% in ${course}. Concept gap: "${weakConcept}". Matched available faculty slot for mentoring.`,
      rawPayload: payload,
      status: 'active'
    };

    const geminiInsight = `CampusOS Insight: In traditional universities, failing a quiz simply results in a low grade on a portal. MentorOS turns failing quiz telemetry into immediate action by diagnosing the specific concept gap (${weakConcept}) and matching student calendar with faculty office hours for a 30-minute micro-mentoring session before the next exam.`;

    return { event, simulationSteps, affectedSystemIds, geminiInsight };
  }

  private static evaluateAccessStatusChange(
    eventId: string,
    timestamp: string,
    payload: Record<string, any>
  ): EventEvaluationResult {
    const studentName = payload.studentName || 'Ganesh Pirinti';
    const rollNo = payload.rollNo || '24CSE00042';
    const status = payload.status || 'VERIFY_DEAN_OFFICE';
    const adminReason = payload.adminReason || 'Pending semester lab fee receipt clearance & project submission verification.';

    const affectedPeople: AffectedPerson[] = [
      { id: 'STU-24CSE042', name: studentName, role: 'student', details: `Access status set to ${status}` },
      { id: 'SEC-MAIN', name: 'Security Guard Gate 4', role: 'staff', details: 'Sees sanitized "VERIFY" badge only' }
    ];

    const recommendedActions: RecommendedAction[] = [
      {
        id: `ACT-${Date.now()}-1`,
        title: 'Sanitize Security Guard Display View',
        description: 'Mask sensitive disciplinary/academic details. Display only "ACCESS STATUS: VERIFY" to turnstile guard.',
        targetSystem: 'access_control',
        actionType: 'PRIVACY_MASK',
        automated: true,
        status: 'executed',
        impactMetric: 'Zero privacy data leaked to gate personnel'
      },
      {
        id: `ACT-${Date.now()}-2`,
        title: 'Push Clear Next Steps to Student App',
        description: `Send private mobile notification to ${studentName}: "Please present lab receipt at Dean Office Room 102."`,
        targetSystem: 'access_control',
        actionType: 'STUDENT_NOTIFY',
        automated: true,
        status: 'executed',
        impactMetric: 'Actionable guidance sent to student'
      },
      {
        id: `ACT-${Date.now()}-3`,
        title: 'Notify Dean Administrative Clearance Desk',
        description: 'Flag student record on Dean office administrative portal for priority queue clearance.',
        targetSystem: 'academic_erp',
        actionType: 'ADMIN_NOTIFY',
        automated: true,
        status: 'executed',
        impactMetric: 'Dean office queue updated'
      }
    ];

    const affectedSystemIds: SystemId[] = [
      'access_control',
      'academic_erp'
    ];

    const simulationSteps: SimulationStep[] = [
      { step: 1, label: 'STATUS CHANGE', title: 'Academic ERP Clearance Flag', system: 'academic_erp', detail: `Academic clearance flag updated for ${studentName} (${rollNo}).`, timestamp },
      { step: 2, label: 'LEAST-PRIVILEGE FILTER', title: 'CampusOS Privacy Engine', system: 'access_control', detail: 'Sanitizing data view into 3 role projections: Student, Gate Security, and Administrator.', timestamp },
      { step: 3, label: 'GATE DISPATCH', title: 'Turnstile Security View', system: 'access_control', detail: 'Dispatched sanitized response: "VERIFY AT DEAN OFFICE". Disciplinary/financial reason stripped.', timestamp },
      { step: 4, label: 'STUDENT NOTIFICATION', title: 'Student Mobile View', system: 'access_control', detail: 'Delivered exact room details & document requirements directly to student mobile app.', timestamp }
    ];

    const event: CampusEvent = {
      id: eventId,
      type: 'ACCESS_STATUS_CHANGE',
      title: `Privacy-Preserving Access Hold — ${studentName}`,
      sourceSystem: 'access_control',
      timestamp,
      entityId: rollNo,
      entityName: `${studentName} (${rollNo})`,
      affectedSystems: affectedSystemIds,
      affectedPeopleCount: 2,
      affectedPeople,
      affectedResources: ['Campus Gate Turnstiles', 'Dean Office Clearance Desk'],
      priority: 'MEDIUM',
      recommendedActions,
      description: `Access status updated to VERIFY for ${studentName}. Enforcing least-necessary information sharing across security gates.`,
      rawPayload: { studentName, rollNo, status, adminReason },
      status: 'active'
    };

    const geminiInsight = `CampusOS Insight: Privacy in campus systems is critical. Traditional access systems show raw reason codes (e.g. "Fee Defaulter" or "Disciplinary Hold") on public guard screens, creating embarrassment and privacy violations. AccessOS enforces Least-Necessary Information Sharing: guards see only "VERIFY AT DEAN OFFICE", while the student gets private instructions on their app.`;

    return { event, simulationSteps, affectedSystemIds, geminiInsight };
  }
}
