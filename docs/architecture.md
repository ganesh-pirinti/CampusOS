# CampusOS — System Architecture & Data Flow

This document details the software architecture, data pipelines, and decision-engine mechanics powering **CampusOS** for Google Solution Hunt Challenge 2026 (PS02: *"When Systems Don't Understand Each Other"*).

---

## 🏛️ High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                            SRM-AP CAMPUS CONNECTORS                                |
|  [ Driver GPS ]   [ Academic ERP ]   [ LMS Telemetry ]   [ Student Affairs ]   [ Turnstile Gate ]  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        SYNTHETIC CONNECTOR ADAPTER LAYER                          |
|  - Normalizes raw REST / WebSocket / Biometric feeds into structured JSON events  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                          CAMPUS CONTEXT ENGINE (CORE)                             |
|  1. Event Ingestion Pipeline                                                      |
|  2. Deterministic Rule Graph & Dependency Scanner                                  |
|  3. Multi-Domain Impact Evaluator (Timetables + Absences + Transit ETAs)           |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        CASCADING DECISION & MITIGATION LAYER                       |
|  - Reroutes Buses   - Issues OD Certificates   - Schedules Mentoring   - Applies Grace |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                             CAMPUSOS USER MODULES                                 |
|  [ MobilityOS ]    [ AchievementOS ]    [ MentorOS ]    [ RouteOS ]    [ AccessOS ]    |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                               END USERS & ROLES                                   |
|   Students (Mobile App)   |   Faculty (Roster)   |   Drivers (GPS)   |   Admin/Deans |
+-----------------------------------------------------------------------------------+
```

---

## 🔄 5-Stage Causal Event Pipeline

CampusOS guarantees that every event processed by the Context Engine follows a transparent 5-stage progression:

```
[ 1. EVENT TRIGGER ] ---> [ 2. CONTEXT SYNTHESIS ] ---> [ 3. IMPACT COMPUTED ]
                                                               |
                                                               v
[ 5. AUTOMATED DISPATCH ] <----------------------- [ 4. RECOMMENDATION ]
```

### Stage Breakdown:
1. **Event Trigger**: Telemetry signal received (e.g. *Bus 07 delayed 18 min on NH16 Kaza Tollgate bypass*).
2. **Context Synthesis**: Scans student rosters enrolled in 8:45 AM CSE Dept Object-Oriented Lab session.
3. **Impact Computed**: Calculates that 42 students are delayed and 14 students risk breaching the 75% mandatory attendance threshold.
4. **Recommendation**: Suggests rerouting trailing commuters to Bus 12 and alerting Lab Instructor Dr. K. Rao.
5. **Automated Dispatch**: Dispatches SMS alerts to student mobile apps, updates the live spatial transit map, and logs an automated attendance grace period in the LMS.

---

## 🛡️ Zero-Leak Privacy Architecture (AccessOS)

Traditional campus security systems often leak sensitive student data (e.g. fee payment status, academic probation, or disciplinary warnings) directly to turnstile guards.

CampusOS solves this via a **Least-Necessary Information Sharing (LNIS)** policy filter:

```
[ Academic ERP / Fee Ledger ]
             |
             v
   [ Privacy Shield Filter ]
             |
   +---------+---------+
   |                   |
   v                   v
[ Security Guard ]   [ Authorized Dean ]
- Student ID         - Full Audit Reason
- Time               - Financial / Academic Notes
- ALLOW / VERIFY     - Action Override Controls
```

---

## 📍 SRM-AP Geographic Telemetry

The prototype spatial engine maps real-world SRM University-AP transit corridors:
- **Campus Anchor**: SRM University-AP (Neerukonda, Mangalagiri Mandal, Guntur District — `16.4649, 80.5078`).
- **Primary Route Corridors**:
  - *Vijayawada Corridor* (NH16 / Benz Circle / Kanuru / Tadepalli)
  - *Mangalagiri Corridor* (AIIMS Junction / Bypass)
  - *Guntur Corridor* (Collectorate Junction)
  - *Tenali Corridor* (Tenali Depot / Town Link)
- **Fallback Guarantee**: If browser geolocation or Firebase RTDB configuration is unavailable, the system smoothly falls back to deterministic simulated GPS route streams (`DEMO_GPS`) without interrupting user interactions.
