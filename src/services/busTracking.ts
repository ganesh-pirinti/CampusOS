export interface LiveBusTelemetry {
  busId: string;
  busNumber: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  latitude: number;
  longitude: number;
  speed: number; // km/h
  heading: number; // degrees
  timestamp: string;
  routeId: string;
  status: 'ON_TIME' | 'DELAYED' | 'REROUTED' | 'HALTED';
  etaMinutes: number;
  occupancyCount: number;
  capacity: number;
  isLiveGps: boolean;
  incidentAlert?: string;
}

export interface BoardingPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  landmark: string;
}

export const SRM_CAMPUS_LOCATION = {
  name: 'SRM University-AP (Neerukonda Campus)',
  latitude: 16.4649,
  longitude: 80.5078
};

export const SRM_BOARDING_POINTS: BoardingPoint[] = [
  { id: 'BP-01', name: 'Mangalagiri Bypass Stop', latitude: 16.4350, longitude: 80.5550, landmark: 'Near AIIMS Junction Ring Road (SRM-AP Published Route Seed Data)' },
  { id: 'BP-02', name: 'Benz Circle Bus Bay', latitude: 16.5005, longitude: 80.6480, landmark: 'Under Vijayawada Flyover Sector 2 (SRM-AP Seed Data)' },
  { id: 'BP-03', name: 'Kanuru Boarding Point', latitude: 16.4882, longitude: 80.6872, landmark: 'Near VR Siddhartha Gate Corridor (SRM-AP Seed Data)' },
  { id: 'BP-04', name: 'Tadepalli Highway Junction', latitude: 16.4780, longitude: 80.6010, landmark: 'NH16 Krishna River Bridge Toll (SRM-AP Seed Data)' },
  { id: 'BP-05', name: 'Undavalli Center Terminal', latitude: 16.4910, longitude: 80.5850, landmark: 'Prakasam Barrage Approach Road (SRM-AP Seed Data)' },
  { id: 'BP-06', name: 'Guntur Collectorate Stop', latitude: 16.3067, longitude: 80.4365, landmark: 'Main Highway Route Corridor (SRM-AP Seed Data)' },
  { id: 'BP-07', name: 'Tenali Bus Stand Depot', latitude: 16.2430, longitude: 80.6400, landmark: 'Tenali Town Junction (SRM-AP Seed Data)' },
  { id: 'BP-08', name: 'SRM AP Campus Main Gate', latitude: 16.4649, longitude: 80.5078, landmark: 'Neerukonda Campus Entrance (Primary Destination)' }
];

// In-memory real-time bus registry with listener subscriptions (Broadcasting across app/tabs)
const busRegistry: Record<string, LiveBusTelemetry> = {
  'BUS-07': {
    busId: 'BUS-07',
    busNumber: 'Bus 07',
    driverId: 'DRIVER-07',
    driverName: 'Ramesh Kumar',
    driverPhone: '+91 98765 43210',
    latitude: 16.4950,
    longitude: 80.6150,
    speed: 42,
    heading: 215,
    timestamp: new Date().toLocaleTimeString([], { hour12: false }),
    routeId: 'R-NORTH-01',
    status: 'DELAYED',
    etaMinutes: 18,
    occupancyCount: 42,
    capacity: 50,
    isLiveGps: true,
    incidentAlert: 'Traffic delay on Outer Ring Road Sector (+18 min)'
  },
  'BUS-04': {
    busId: 'BUS-04',
    busNumber: 'Bus 04',
    driverId: 'DRIVER-04',
    driverName: 'Suresh Verma',
    driverPhone: '+91 98765 43211',
    latitude: 16.5005,
    longitude: 80.6480,
    speed: 48,
    heading: 220,
    timestamp: new Date().toLocaleTimeString([], { hour12: false }),
    routeId: 'R-NORTH-02',
    status: 'ON_TIME',
    etaMinutes: 10,
    occupancyCount: 22,
    capacity: 50,
    isLiveGps: true
  },
  'BUS-12': {
    busId: 'BUS-12',
    busNumber: 'Bus 12',
    driverId: 'DRIVER-12',
    driverName: 'Vikram Singh',
    driverPhone: '+91 98765 43212',
    latitude: 16.4820,
    longitude: 80.6010,
    speed: 38,
    heading: 210,
    timestamp: new Date().toLocaleTimeString([], { hour12: false }),
    routeId: 'R-EAST-01',
    status: 'ON_TIME',
    etaMinutes: 14,
    occupancyCount: 38,
    capacity: 55,
    isLiveGps: true
  },
  'BUS-09': {
    busId: 'BUS-09',
    busNumber: 'Bus 09',
    driverId: 'DRIVER-09',
    driverName: 'Mahesh Babu',
    driverPhone: '+91 98765 43213',
    latitude: 16.4420,
    longitude: 80.5560,
    speed: 35,
    heading: 45,
    timestamp: new Date().toLocaleTimeString([], { hour12: false }),
    routeId: 'R-SOUTH-03',
    status: 'DELAYED',
    etaMinutes: 22,
    occupancyCount: 50,
    capacity: 50,
    isLiveGps: true
  }
};

type LocationCallback = (buses: Record<string, LiveBusTelemetry>) => void;
const listeners: Set<LocationCallback> = new Set();

// Active Watch Handles
const activeWatchers: Record<string, number | ReturnType<typeof setInterval>> = {};

export function subscribeToBusLocations(callback: LocationCallback): () => void {
  listeners.add(callback);
  callback({ ...busRegistry });
  return () => {
    listeners.delete(callback);
  };
}

export function notifyBusListeners() {
  const currentSnapshot = { ...busRegistry };
  listeners.forEach(cb => cb(currentSnapshot));
}

export function updateBusTelemetry(busId: string, patch: Partial<LiveBusTelemetry>) {
  if (busRegistry[busId]) {
    busRegistry[busId] = {
      ...busRegistry[busId],
      ...patch,
      timestamp: new Date().toLocaleTimeString([], { hour12: false })
    };
  } else {
    busRegistry[busId] = {
      busId,
      busNumber: `Bus ${busId.replace('BUS-', '')}`,
      driverId: `DRIVER-${busId.replace('BUS-', '')}`,
      driverName: 'Campus Driver',
      driverPhone: '+91 98765 00000',
      latitude: 16.4820,
      longitude: 80.6010,
      speed: 35,
      heading: 200,
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      routeId: 'R-CENTRAL',
      status: 'ON_TIME',
      etaMinutes: 12,
      occupancyCount: 30,
      capacity: 50,
      isLiveGps: true,
      ...patch
    };
  }
  notifyBusListeners();
}

/**
 * Start Driver Live GPS tracking using Browser Geolocation API or Smooth Route Simulation fallback.
 */
export function startDriverTracking(
  busId: string,
  onUpdate?: (telemetry: LiveBusTelemetry) => void
): boolean {
  if (activeWatchers[busId]) {
    return true; // Already tracking
  }

  // Attempt real browser geolocation
  if ('geolocation' in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const speed = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 40;
        const heading = pos.coords.heading ? Math.round(pos.coords.heading) : 210;
        
        updateBusTelemetry(busId, {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          speed,
          heading,
          isLiveGps: true
        });

        if (onUpdate && busRegistry[busId]) {
          onUpdate(busRegistry[busId]);
        }
      },
      (err) => {
        console.warn('Browser geolocation denied/error, falling back to simulated GPS vector:', err);
        startSimulatedDriverTracking(busId, onUpdate);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000
      }
    );
    activeWatchers[busId] = watchId;
    return true;
  } else {
    startSimulatedDriverTracking(busId, onUpdate);
    return true;
  }
}

function startSimulatedDriverTracking(
  busId: string,
  onUpdate?: (telemetry: LiveBusTelemetry) => void
) {
  let step = 0;
  // Route vector moving towards SRM Campus (16.4649, 80.5078)
  const routePoints = [
    { lat: 16.5005, lng: 80.6480 }, // Benz Circle
    { lat: 16.4950, lng: 80.6150 }, // Metro Junction
    { lat: 16.4820, lng: 80.6010 }, // Tadepalli
    { lat: 16.4680, lng: 80.5560 }, // Mangalagiri Link
    { lat: 16.4649, lng: 80.5078 }  // SRM Campus
  ];

  const timer = setInterval(() => {
    step = (step + 1) % routePoints.length;
    const pt = routePoints[step];
    
    // Add small realistic GPS jitter
    const jitterLat = pt.lat + (Math.random() - 0.5) * 0.002;
    const jitterLng = pt.lng + (Math.random() - 0.5) * 0.002;
    const speed = Math.floor(35 + Math.random() * 20);

    const etaMinutes = Math.max(2, 18 - step * 4);

    updateBusTelemetry(busId, {
      latitude: jitterLat,
      longitude: jitterLng,
      speed,
      etaMinutes,
      isLiveGps: false
    });

    if (onUpdate && busRegistry[busId]) {
      onUpdate(busRegistry[busId]);
    }
  }, 2000);

  activeWatchers[busId] = timer;
}

export function stopDriverTracking(busId: string) {
  if (activeWatchers[busId]) {
    const handle = activeWatchers[busId];
    if (typeof handle === 'number' && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(handle);
    } else {
      clearInterval(handle as any);
    }
    delete activeWatchers[busId];
  }
}

/**
 * Distance calculation helper (Haversine formula in KM)
 */
export function calculateDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Find nearest boarding point for a student's current location coordinates.
 */
export function findNearestBoardingPoint(
  studentLat: number,
  studentLng: number
): { boardingPoint: BoardingPoint; distanceKm: number; walkMinutes: number } {
  let minDistance = Infinity;
  let nearestBP = SRM_BOARDING_POINTS[0];

  SRM_BOARDING_POINTS.forEach((bp) => {
    const dist = calculateDistanceKm(studentLat, studentLng, bp.latitude, bp.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearestBP = bp;
    }
  });

  const walkMinutes = Math.round((minDistance / 4.5) * 60); // 4.5 km/h avg walk
  return {
    boardingPoint: nearestBP,
    distanceKm: minDistance,
    walkMinutes: Math.max(1, walkMinutes)
  };
}

/**
 * Recommends the best bus for a student based on distance, walk time, bus ETA, capacity, and route status.
 */
export function rankRecommendedBuses(
  studentLat: number,
  studentLng: number,
  buses: LiveBusTelemetry[]
): {
  recommendedBus: LiveBusTelemetry;
  boardingPoint: BoardingPoint;
  totalTravelMinutes: number;
  reason: string;
} {
  const nearest = findNearestBoardingPoint(studentLat, studentLng);

  // Filter available buses and sort by combined travel score
  const sorted = [...buses].sort((a, b) => {
    const scoreA = a.etaMinutes + (a.status === 'DELAYED' ? 15 : 0) + (a.occupancyCount >= a.capacity ? 20 : 0);
    const scoreB = b.etaMinutes + (b.status === 'DELAYED' ? 15 : 0) + (b.occupancyCount >= b.capacity ? 20 : 0);
    return scoreA - scoreB;
  });

  const topBus = sorted[0] || buses[0];
  const totalTravelMinutes = nearest.walkMinutes + topBus.etaMinutes;

  const reason = `Closest boarding point (${nearest.boardingPoint.name}, ${nearest.distanceKm} km walk) + ${topBus.etaMinutes} min ETA + ${topBus.capacity - topBus.occupancyCount} seats available + Route clear.`;

  return {
    recommendedBus: topBus,
    boardingPoint: nearest.boardingPoint,
    totalTravelMinutes,
    reason
  };
}
