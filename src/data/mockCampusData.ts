import type { 
  CampusSystem, 
  BusRoute, 
  Student, 
  Faculty, 
  AchievementRecord, 
  QuizFailureRecord, 
  RouteIncident, 
  AccessRecord, 
  CampusEvent 
} from '../types/campus';

export const INITIAL_SYSTEMS: CampusSystem[] = [
  {
    id: 'transport',
    name: 'Transport Management',
    category: 'Mobility & Logistics',
    iconName: 'Bus',
    status: 'operational',
    lastSync: '10s ago',
    activeSubsystems: 12,
    description: 'Fleet tracking, route optimization, driver telemetry, and GPS location feeds.'
  },
  {
    id: 'academic_erp',
    name: 'Academic ERP',
    category: 'Core Administration',
    iconName: 'GraduationCap',
    status: 'operational',
    lastSync: '4s ago',
    activeSubsystems: 24,
    description: 'Student registration, course schedules, academic records, and credit management.'
  },
  {
    id: 'lms',
    name: 'Learning Management System (LMS)',
    category: 'Academics & Pedagogy',
    iconName: 'BookOpen',
    status: 'operational',
    lastSync: '1s ago',
    activeSubsystems: 18,
    description: 'Quiz telemetry, submission tracking, topic mastery analytics, and concept evaluation.'
  },
  {
    id: 'student_affairs',
    name: 'Student Affairs',
    category: 'Governance & Extracurricular',
    iconName: 'Award',
    status: 'operational',
    lastSync: '30s ago',
    activeSubsystems: 8,
    description: 'Hackathon approvals, external event participation, achievements, and club activities.'
  },
  {
    id: 'faculty_calendar',
    name: 'Faculty Calendar & Rosters',
    category: 'Resource Scheduling',
    iconName: 'Calendar',
    status: 'operational',
    lastSync: '15s ago',
    activeSubsystems: 14,
    description: 'Faculty office hours, mentoring slots, lecture slots, and committee availability.'
  },
  {
    id: 'attendance',
    name: 'Attendance & OD Management',
    category: 'Academic Compliance',
    iconName: 'CheckCircle2',
    status: 'operational',
    lastSync: '2s ago',
    activeSubsystems: 10,
    description: 'Biometric gate logs, classroom RFID checks, On-Duty (OD) approval workflows.'
  },
  {
    id: 'route_intelligence',
    name: 'Route Intelligence',
    category: 'Spatial & Traffic GIS',
    iconName: 'MapPin',
    status: 'operational',
    lastSync: '5s ago',
    activeSubsystems: 6,
    description: 'Campus road hazards, traffic bottleneck alerts, construction rerouting engines.'
  },
  {
    id: 'access_control',
    name: 'Access Control & Security',
    category: 'Campus Physical Security',
    iconName: 'ShieldAlert',
    status: 'operational',
    lastSync: '1s ago',
    activeSubsystems: 32,
    description: 'Turnstile gates, hostel entry turnstiles, dean office clearance flags, privacy protection.'
  }
];

export const INITIAL_BUSES: BusRoute[] = [
  {
    id: 'BUS-07',
    busNumber: 'Bus 07',
    routeCode: 'R-NORTH-01',
    driverName: 'Ramesh Kumar',
    driverPhone: '+91 98765 43210',
    occupancyPercent: 88,
    capacity: 50,
    currentLocation: 'Outer Ring Road - Stop 3',
    nextStop: 'Campus Main Gate',
    etaMinutes: 28,
    delayMinutes: 18,
    status: 'DELAYED',
    affectedStudentCount: 42,
    routeStops: ['City Center', 'Metro Junction', 'Outer Ring Road - Stop 3', 'Campus Main Gate', 'Tech Block']
  },
  {
    id: 'BUS-04',
    busNumber: 'Bus 04',
    routeCode: 'R-NORTH-02',
    driverName: 'Suresh Verma',
    driverPhone: '+91 98765 43211',
    occupancyPercent: 44,
    capacity: 50,
    currentLocation: 'Metro Junction',
    nextStop: 'Outer Ring Road - Stop 3',
    etaMinutes: 10,
    delayMinutes: 0,
    status: 'ON_TIME',
    affectedStudentCount: 0,
    routeStops: ['City Center', 'Metro Junction', 'Outer Ring Road - Stop 3', 'Campus Main Gate', 'Tech Block']
  },
  {
    id: 'BUS-12',
    busNumber: 'Bus 12',
    routeCode: 'R-EAST-01',
    driverName: 'Vikram Singh',
    driverPhone: '+91 98765 43212',
    occupancyPercent: 92,
    capacity: 55,
    currentLocation: 'East Annex Bypass',
    nextStop: 'Hostel Circle',
    etaMinutes: 14,
    delayMinutes: 5,
    status: 'ON_TIME',
    affectedStudentCount: 3,
    routeStops: ['East Terminal', 'Green Avenue', 'East Annex Bypass', 'Hostel Circle', 'Science Complex']
  },
  {
    id: 'BUS-09',
    busNumber: 'Bus 09',
    routeCode: 'R-SOUTH-03',
    driverName: 'Mahesh Babu',
    driverPhone: '+91 98765 43213',
    occupancyPercent: 100,
    capacity: 50,
    currentLocation: 'South Gate Highway',
    nextStop: 'Library Plaza',
    etaMinutes: 22,
    delayMinutes: 12,
    status: 'DELAYED',
    affectedStudentCount: 38,
    routeStops: ['South Station', 'Tech Park North', 'South Gate Highway', 'Library Plaza', 'Academic Block A']
  },
  {
    id: 'BUS-02',
    busNumber: 'Bus 02',
    routeCode: 'R-WEST-01',
    driverName: 'Prakash Rao',
    driverPhone: '+91 98765 43214',
    occupancyPercent: 60,
    capacity: 50,
    currentLocation: 'West Gate Flyover',
    nextStop: 'Student Center',
    etaMinutes: 8,
    delayMinutes: 0,
    status: 'ON_TIME',
    affectedStudentCount: 0,
    routeStops: ['West Colony', 'Market Square', 'West Gate Flyover', 'Student Center', 'Tech Block']
  },
  {
    id: 'BUS-05',
    busNumber: 'Bus 05',
    routeCode: 'R-NORTH-03',
    driverName: 'Anand Sharma',
    driverPhone: '+91 98765 43215',
    occupancyPercent: 78,
    capacity: 50,
    currentLocation: 'Subway Underpass',
    nextStop: 'Campus Main Gate',
    etaMinutes: 15,
    delayMinutes: 0,
    status: 'ON_TIME',
    affectedStudentCount: 0,
    routeStops: ['Airport Road', 'Subway Underpass', 'Campus Main Gate', 'Engineering Block']
  },
  {
    id: 'BUS-08',
    busNumber: 'Bus 08',
    routeCode: 'R-EAST-02',
    driverName: 'Karthik N',
    driverPhone: '+91 98765 43216',
    occupancyPercent: 82,
    capacity: 50,
    currentLocation: 'Industrial Estate',
    nextStop: 'East Gate',
    etaMinutes: 18,
    delayMinutes: 8,
    status: 'REROUTED',
    affectedStudentCount: 15,
    routeStops: ['Tech Hub East', 'Industrial Estate', 'East Gate', 'Research Block']
  },
  {
    id: 'BUS-11',
    busNumber: 'Bus 11',
    routeCode: 'R-SOUTH-01',
    driverName: 'Rajesh G',
    driverPhone: '+91 98765 43217',
    occupancyPercent: 50,
    capacity: 50,
    currentLocation: 'South Ring Road',
    nextStop: 'Sports Complex',
    etaMinutes: 12,
    delayMinutes: 0,
    status: 'ON_TIME',
    affectedStudentCount: 0,
    routeStops: ['South Suburb', 'South Ring Road', 'Sports Complex', 'Hostel Block C']
  },
  {
    id: 'BUS-15',
    busNumber: 'Bus 15',
    routeCode: 'R-WEST-02',
    driverName: 'Deepak M',
    driverPhone: '+91 98765 43218',
    occupancyPercent: 95,
    capacity: 50,
    currentLocation: 'Overbridge Road',
    nextStop: 'West Gate',
    etaMinutes: 25,
    delayMinutes: 15,
    status: 'DELAYED',
    affectedStudentCount: 29,
    routeStops: ['West Suburb', 'Overbridge Road', 'West Gate', 'Academic Block B']
  },
  {
    id: 'BUS-03',
    busNumber: 'Bus 03',
    routeCode: 'R-CENTRAL-01',
    driverName: 'Gopal Reddy',
    driverPhone: '+91 98765 43219',
    occupancyPercent: 30,
    capacity: 50,
    currentLocation: 'Campus Shuttle Loop',
    nextStop: 'Admin Building',
    etaMinutes: 4,
    delayMinutes: 0,
    status: 'ON_TIME',
    affectedStudentCount: 0,
    routeStops: ['Main Gate', 'Library', 'Admin Building', 'Hostels', 'Tech Block']
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-24CSE001',
    name: 'Aarav Sharma',
    rollNo: '24CSE00123',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    email: 'aarav.sharma@campus.edu',
    mentorName: 'Dr. K. Srinivas',
    gpa: 3.92,
    attendancePercent: 91.5,
    accessStatus: 'VERIFIED',
    assignedBusId: 'BUS-07'
  },
  {
    id: 'STU-24CSE042',
    name: 'Ganesh Pirinti',
    rollNo: '24CSE00042',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    email: 'ganesh.p@campus.edu',
    mentorName: 'Dr. R. Sundaram',
    gpa: 3.78,
    attendancePercent: 88.0,
    accessStatus: 'VERIFY_DEAN_OFFICE',
    accessRestrictionReason: 'Pending semester lab fee receipt clearance & project submission verification.',
    assignedBusId: 'BUS-07'
  },
  {
    id: 'STU-24ECE015',
    name: 'Ananya Roy',
    rollNo: '24ECE00015',
    department: 'Electronics & Communication',
    year: '2nd Year',
    email: 'ananya.roy@campus.edu',
    mentorName: 'Prof. Meera Menon',
    gpa: 3.85,
    attendancePercent: 94.2,
    accessStatus: 'VERIFIED',
    assignedBusId: 'BUS-04'
  },
  {
    id: 'STU-24AIML089',
    name: 'Vikram Patel',
    rollNo: '24AIML00089',
    department: 'AI & Data Science',
    year: '3rd Year',
    email: 'vikram.p@campus.edu',
    mentorName: 'Dr. K. Srinivas',
    gpa: 3.45,
    attendancePercent: 82.1,
    accessStatus: 'VERIFIED',
    assignedBusId: 'BUS-09'
  },
  {
    id: 'STU-24CSE104',
    name: 'Priya Nair',
    rollNo: '24CSE00104',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    email: 'priya.nair@campus.edu',
    mentorName: 'Dr. R. Sundaram',
    gpa: 3.96,
    attendancePercent: 96.0,
    accessStatus: 'VERIFIED',
    assignedBusId: 'BUS-07'
  },
  {
    id: 'STU-24MECH033',
    name: 'Rohan Verma',
    rollNo: '24MECH00033',
    department: 'Mechanical Engineering',
    year: '2nd Year',
    email: 'rohan.v@campus.edu',
    mentorName: 'Dr. S. Kulkarni',
    gpa: 3.12,
    attendancePercent: 79.4,
    accessStatus: 'RESTRICTED',
    accessRestrictionReason: 'Hostel administrative hold — requires clearance form.',
    assignedBusId: 'BUS-12'
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: 'FAC-001',
    name: 'Dr. K. Srinivas',
    department: 'Computer Science & Engineering',
    designation: 'Professor & HOD',
    availableSlotToday: '4:00 PM – 4:30 PM',
    officeRoom: 'Tech Block 402',
    email: 'ksrinivas@campus.edu'
  },
  {
    id: 'FAC-002',
    name: 'Prof. Meera Menon',
    department: 'Electronics & Communication',
    designation: 'Associate Professor',
    availableSlotToday: '3:30 PM – 4:00 PM',
    officeRoom: 'ECE Block 204',
    email: 'mmenon@campus.edu'
  },
  {
    id: 'FAC-003',
    name: 'Dr. R. Sundaram',
    department: 'Computer Science & Engineering',
    designation: 'Professor',
    availableSlotToday: '5:00 PM – 5:30 PM',
    officeRoom: 'Tech Block 410',
    email: 'rsundaram@campus.edu'
  },
  {
    id: 'FAC-004',
    name: 'Dr. S. Kulkarni',
    department: 'Mechanical Engineering',
    designation: 'Assistant Professor',
    availableSlotToday: '2:30 PM – 3:00 PM',
    officeRoom: 'Mech Wing 108',
    email: 'skulkarni@campus.edu'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementRecord[] = [
  {
    id: 'ACH-2026-01',
    studentId: 'STU-24CSE001',
    studentName: 'Aarav Sharma',
    rollNo: '24CSE00123',
    title: 'Smart Campus AI Challenge',
    eventName: 'Google Solution Hunt 2026 (National Final)',
    prize: '1st Place Winner (₹2,50,000)',
    date: '29 Sep 2026',
    odGenerated: true,
    odStatus: 'approved',
    classesAffectedCount: 4,
    attendanceEntriesUpdated: 6,
    affectedClassNames: ['Data Structures (CS301)', 'AI & ML (CS305)', 'Database Systems (CS303)', 'Operating Systems Lab (CS307L)']
  },
  {
    id: 'ACH-2026-02',
    studentId: 'STU-24CSE042',
    studentName: 'Ganesh Pirinti',
    rollNo: '24CSE00042',
    title: 'Agentic Hackathon 2026',
    eventName: 'IIT TechFest National Hackathon',
    prize: 'Runner Up - Best System Architecture',
    date: '28 Sep 2026',
    odGenerated: true,
    odStatus: 'pending',
    classesAffectedCount: 3,
    attendanceEntriesUpdated: 3,
    affectedClassNames: ['Data Structures (CS301)', 'Computer Networks (CS304)', 'Discrete Math (MA301)']
  },
  {
    id: 'ACH-2026-03',
    studentId: 'STU-24CSE104',
    studentName: 'Priya Nair',
    rollNo: '24CSE00104',
    title: 'ACM ICPC Regional Finals',
    eventName: 'International Collegiate Programming Contest',
    prize: 'Rank 4 (Qualified for Asia West)',
    date: '25 Sep 2026',
    odGenerated: true,
    odStatus: 'approved',
    classesAffectedCount: 5,
    attendanceEntriesUpdated: 8,
    affectedClassNames: ['Algorithm Design (CS401)', 'Cloud Computing (CS403)', 'Compiler Design (CS405)', 'Distributed Systems (CS407)', 'Minor Project']
  }
];

export const INITIAL_QUIZ_FAILURES: QuizFailureRecord[] = [
  {
    id: 'QZ-101',
    studentId: 'STU-24CSE042',
    studentName: 'Ganesh Pirinti',
    rollNo: '24CSE00042',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    quizTitle: 'Quiz #03: Linked Lists & Pointers',
    scorePercent: 38,
    weakConcept: 'Pointer manipulation & memory leaks in doubly linked lists',
    recommendedFacultyId: 'FAC-001',
    recommendedFacultyName: 'Dr. K. Srinivas',
    mentoringSlot: 'Today @ 4:00 PM – 4:30 PM (Tech Block 402)',
    scheduled: false
  },
  {
    id: 'QZ-102',
    studentId: 'STU-24AIML089',
    studentName: 'Vikram Patel',
    rollNo: '24AIML00089',
    courseCode: 'CS305',
    courseName: 'Artificial Intelligence & ML',
    quizTitle: 'Quiz #02: Gradient Descent Math',
    scorePercent: 42,
    weakConcept: 'Partial derivatives & backpropagation chain rule',
    recommendedFacultyId: 'FAC-003',
    recommendedFacultyName: 'Dr. R. Sundaram',
    mentoringSlot: 'Today @ 5:00 PM – 5:30 PM (Tech Block 410)',
    scheduled: true
  },
  {
    id: 'QZ-103',
    studentId: 'STU-24MECH033',
    studentName: 'Rohan Verma',
    rollNo: '24MECH00033',
    courseCode: 'ME201',
    courseName: 'Thermodynamics',
    quizTitle: 'Quiz #04: Carnot Cycle',
    scorePercent: 34,
    weakConcept: 'Entropy calculation in non-equilibrium processes',
    recommendedFacultyId: 'FAC-004',
    recommendedFacultyName: 'Dr. S. Kulkarni',
    mentoringSlot: 'Today @ 2:30 PM – 3:00 PM (Mech Wing 108)',
    scheduled: false
  }
];

export const INITIAL_ROUTE_INCIDENTS: RouteIncident[] = [
  {
    id: 'INC-01',
    type: 'Road Block',
    location: 'Outer Ring Road (Near Stop 3)',
    severity: 'HIGH',
    reportedAt: '13:40',
    alternateRouteSuggested: 'Reroute via Metro Flyover Bypass (Adds +4 mins, bypasses bottleneck)',
    affectedBusIds: ['BUS-07', 'BUS-04'],
    status: 'ACTIVE'
  },
  {
    id: 'INC-02',
    type: 'Flooding',
    location: 'South Gate Highway Underpass',
    severity: 'CRITICAL',
    reportedAt: '13:30',
    alternateRouteSuggested: 'Reroute via East Gate Elevated Link',
    affectedBusIds: ['BUS-09'],
    status: 'ACTIVE'
  },
  {
    id: 'INC-03',
    type: 'Construction',
    location: 'Industrial Estate Avenue',
    severity: 'MEDIUM',
    reportedAt: '12:15',
    alternateRouteSuggested: 'Lane restriction in effect; single file movement',
    affectedBusIds: ['BUS-08'],
    status: 'ACTIVE'
  }
];

export const INITIAL_ACCESS_RECORDS: AccessRecord[] = [
  {
    id: 'ACC-01',
    studentId: 'STU-24CSE001',
    studentName: 'Aarav Sharma',
    rollNo: '24CSE00123',
    department: 'Computer Science',
    accessStatus: 'VERIFIED',
    publicSecurityMessage: 'All clear. Gate turnstile open.',
    adminReason: 'Active student account, clear fees, OD verified.',
    lastUpdated: '13:45'
  },
  {
    id: 'ACC-02',
    studentId: 'STU-24CSE042',
    studentName: 'Ganesh Pirinti',
    rollNo: '24CSE00042',
    department: 'Computer Science',
    accessStatus: 'VERIFY_DEAN_OFFICE',
    publicSecurityMessage: 'Access requires administrator verification.',
    adminReason: 'Pending semester lab fee clearance & project submission clearance.',
    lastUpdated: '13:42'
  },
  {
    id: 'ACC-03',
    studentId: 'STU-24MECH033',
    studentName: 'Rohan Verma',
    rollNo: '24MECH00033',
    department: 'Mechanical Engineering',
    accessStatus: 'RESTRICTED',
    publicSecurityMessage: 'Access requires administrator verification.',
    adminReason: 'Hostel warden administrative hold — night pass violation query.',
    lastUpdated: '11:20'
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'EVT-1001',
    type: 'BUS_DELAY',
    title: 'Bus 07 Traffic Delay — 18 Min Delay',
    sourceSystem: 'transport',
    timestamp: '13:44:12',
    entityId: 'BUS-07',
    entityName: 'Bus 07 (North Route)',
    affectedSystems: ['transport', 'academic_erp', 'attendance', 'faculty_calendar'],
    affectedPeopleCount: 42,
    affectedPeople: [
      { id: 'STU-24CSE001', name: 'Aarav Sharma', role: 'student', details: 'Assigned passenger — 2nd period class at risk' },
      { id: 'STU-24CSE042', name: 'Ganesh Pirinti', role: 'student', details: 'Assigned passenger — CS301 lab at risk' },
      { id: 'FAC-001', name: 'Dr. K. Srinivas', role: 'faculty', details: 'Lecturer for CS301 starting @ 14:00' }
    ],
    affectedResources: ['Bus Route R-NORTH-01', 'Tech Block Hall 401'],
    priority: 'HIGH',
    description: 'Outer Ring Road congestion delayed Bus 07 by 18 minutes. 42 students expected late for Period 2 lectures.',
    recommendedActions: [
      {
        id: 'ACT-101',
        title: 'Notify Affected Students',
        description: 'Send push notification with live ETA and delay cause to all 42 passengers.',
        targetSystem: 'transport',
        actionType: 'NOTIFICATION',
        automated: true,
        status: 'pending',
        impactMetric: '42 notifications dispatched'
      },
      {
        id: 'ACT-102',
        title: 'Reroute Alternate Bus 04',
        description: 'Dispatch Bus 04 (currently 44% capacity) to pick up overflow at Stop 3.',
        targetSystem: 'transport',
        actionType: 'REROUTE',
        automated: true,
        status: 'pending',
        impactMetric: '22 students rerouted (ETA saved: 12 min)'
      },
      {
        id: 'ACT-103',
        title: 'Flag Faculty & Flag Grace Attendance',
        description: 'Notify Dr. K. Srinivas and update RFID gate grace window by 15 mins for Period 2.',
        targetSystem: 'attendance',
        actionType: 'ACADEMIC_GRACE',
        automated: false,
        status: 'pending',
        impactMetric: 'Zero wrongful absence penalties'
      }
    ],
    rawPayload: { busId: 'BUS-07', delayMinutes: 18, location: 'Outer Ring Road' },
    status: 'active'
  },
  {
    id: 'EVT-1002',
    type: 'HACKATHON_WIN',
    title: 'Hackathon Achievement Verified — Aarav Sharma',
    sourceSystem: 'student_affairs',
    timestamp: '13:30:00',
    entityId: 'ACH-2026-01',
    entityName: 'Aarav Sharma (24CSE00123)',
    affectedSystems: ['student_affairs', 'academic_erp', 'attendance', 'faculty_calendar'],
    affectedPeopleCount: 5,
    affectedPeople: [
      { id: 'STU-24CSE001', name: 'Aarav Sharma', role: 'student', details: '1st Place — Solution Hunt Challenge' },
      { id: 'FAC-001', name: 'Dr. K. Srinivas', role: 'faculty', details: 'Department Head & Faculty In-charge' }
    ],
    affectedResources: ['4 Lecture Periods', 'OD Attendance Log', 'Faculty Roster'],
    priority: 'MEDIUM',
    description: 'National Level Hackathon 1st Place verified by Student Affairs. Automatic On-Duty (OD) attendance credit workflow initiated.',
    recommendedActions: [
      {
        id: 'ACT-201',
        title: 'Generate Automated On-Duty (OD)',
        description: 'Create OD pass for 29 Sep 2026 covering 4 missed lecture periods.',
        targetSystem: 'attendance',
        actionType: 'OD_CREDIT',
        automated: true,
        status: 'executed',
        impactMetric: '6 attendance marks automatically adjusted to OD'
      },
      {
        id: 'ACT-202',
        title: 'Notify Department Faculty',
        description: 'Send OD notification to course instructors to waive missed pop-quizzes.',
        targetSystem: 'faculty_calendar',
        actionType: 'FACULTY_NOTIFY',
        automated: true,
        status: 'executed',
        impactMetric: '4 faculty calendars updated'
      }
    ],
    rawPayload: { studentId: 'STU-24CSE001', event: 'Google Solution Hunt 2026' },
    status: 'mitigated'
  },
  {
    id: 'EVT-1003',
    type: 'QUIZ_FAILURE',
    title: 'LMS Concept Failure Alert — Ganesh (38%)',
    sourceSystem: 'lms',
    timestamp: '13:15:00',
    entityId: 'QZ-101',
    entityName: 'Ganesh Pirinti (24CSE00042)',
    affectedSystems: ['lms', 'faculty_calendar', 'academic_erp'],
    affectedPeopleCount: 2,
    affectedPeople: [
      { id: 'STU-24CSE042', name: 'Ganesh Pirinti', role: 'student', details: 'Score 38% in Linked Lists' },
      { id: 'FAC-001', name: 'Dr. K. Srinivas', role: 'faculty', details: 'Matched mentor with open slot @ 4:00 PM' }
    ],
    affectedResources: ['LMS Quiz Analytics', 'Dr. K. Srinivas Office Hours'],
    priority: 'HIGH',
    description: 'LMS quiz telemetry flagged concept breakdown in Pointer Manipulation. Context Engine matched available faculty office slot.',
    recommendedActions: [
      {
        id: 'ACT-301',
        title: 'Schedule Micro-Mentoring Session',
        description: 'Book 30-minute 1-on-1 session with Dr. K. Srinivas for Today at 4:00 PM.',
        targetSystem: 'faculty_calendar',
        actionType: 'CALENDAR_BOOKING',
        automated: false,
        status: 'pending',
        impactMetric: 'Mentoring slot reserved & calendar sync'
      },
      {
        id: 'ACT-302',
        title: 'Push Adaptive Remedial Module',
        description: 'Send interactive visual pointer visualization module to LMS student dashboard.',
        targetSystem: 'lms',
        actionType: 'CONTENT_PUSH',
        automated: true,
        status: 'pending',
        impactMetric: 'Targeted remediation assigned'
      }
    ],
    rawPayload: { studentId: 'STU-24CSE042', score: 38, concept: 'Pointers' },
    status: 'active'
  },
  {
    id: 'EVT-1004',
    type: 'ROAD_BLOCK',
    title: 'Severe Obstruction — Outer Ring Road',
    sourceSystem: 'route_intelligence',
    timestamp: '13:40:00',
    entityId: 'INC-01',
    entityName: 'Outer Ring Road (Near Stop 3)',
    affectedSystems: ['route_intelligence', 'transport', 'academic_erp'],
    affectedPeopleCount: 65,
    affectedPeople: [
      { id: 'DRIVER-07', name: 'Ramesh Kumar', role: 'staff', details: 'Driver Bus 07' },
      { id: 'DRIVER-04', name: 'Suresh Verma', role: 'staff', details: 'Driver Bus 04' }
    ],
    affectedResources: ['Outer Ring Road Sector', 'Bus Routes R-NORTH-01 & R-NORTH-02'],
    priority: 'CRITICAL',
    description: 'Constructive crane breakdown blocking 2 lanes. Spatial GIS calculates 22-min delay unless rerouted.',
    recommendedActions: [
      {
        id: 'ACT-401',
        title: 'Broadcast Reroute Map to Drivers',
        description: 'Push Metro Flyover Bypass route vector directly to Bus 07 & Bus 04 telemetry displays.',
        targetSystem: 'transport',
        actionType: 'REROUTE',
        automated: true,
        status: 'pending',
        impactMetric: 'ETA penalty reduced from 22m to 4m'
      }
    ],
    rawPayload: { location: 'Outer Ring Road', severity: 'HIGH' },
    status: 'active'
  },
  {
    id: 'EVT-1005',
    type: 'ACCESS_STATUS_CHANGE',
    title: 'Privacy-Preserving Access Hold Issued',
    sourceSystem: 'access_control',
    timestamp: '13:42:00',
    entityId: 'ACC-02',
    entityName: 'Ganesh Pirinti (24CSE00042)',
    affectedSystems: ['access_control', 'academic_erp'],
    affectedPeopleCount: 1,
    affectedPeople: [
      { id: 'STU-24CSE042', name: 'Ganesh Pirinti', role: 'student', details: 'Status set to VERIFY' }
    ],
    affectedResources: ['Gate Turnstile 4', 'Hostel Gate B'],
    priority: 'MEDIUM',
    description: 'Clearance requirement flagged. CampusOS enforces Zero-Leak privacy: Security display shows generic "VERIFY", protecting student academic privacy.',
    recommendedActions: [
      {
        id: 'ACT-501',
        title: 'Notify Dean Office Desk',
        description: 'Send internal admin notification to Dean Office clerk with fee clearance documents.',
        targetSystem: 'academic_erp',
        actionType: 'ADMIN_ALERT',
        automated: true,
        status: 'pending',
        impactMetric: 'Admin desk alerted; security view sanitized'
      }
    ],
    rawPayload: { studentId: 'STU-24CSE042', status: 'VERIFY_DEAN_OFFICE' },
    status: 'active'
  }
];
