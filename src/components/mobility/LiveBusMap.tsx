import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { LiveBusTelemetry, BoardingPoint } from '../../services/busTracking';
import { SRM_BOARDING_POINTS, SRM_CAMPUS_LOCATION } from '../../services/busTracking';

interface LiveBusMapProps {
  buses?: LiveBusTelemetry[];
  selectedBusId?: string;
  studentLocation?: { latitude: number; longitude: number } | null;
  nearestBoardingPoint?: BoardingPoint | null;
  activeIncidents?: { location: string; type: string; details: string }[];
  height?: string;
  onSelectBus?: (busId: string) => void;
}

export const LiveBusMap: React.FC<LiveBusMapProps> = ({
  buses = [],
  selectedBusId,
  studentLocation,
  nearestBoardingPoint,
  activeIncidents = [],
  height = '100%',
  onSelectBus
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const busMarkersRef = useRef<Record<string, L.Marker>>({});
  const studentMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [16.4820, 80.6010],
        zoom: 12,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | CampusOS GIS',
        maxZoom: 18
      }).addTo(map);

      // Add SRM AP Campus Marker
      const campusIcon = L.divIcon({
        className: 'custom-campus-marker',
        html: `<div style="background-color:#4285F4; color:white; font-family:'Times New Roman', serif; font-weight:bold; font-size:11px; padding:4px 8px; border-radius:6px; border:2px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.3); text-align:center;">🏫 SRM AP CAMPUS</div>`,
        iconSize: [120, 30],
        iconAnchor: [60, 15]
      });
      L.marker([SRM_CAMPUS_LOCATION.latitude, SRM_CAMPUS_LOCATION.longitude], { icon: campusIcon })
        .addTo(map)
        .bindPopup('<b>SRM University-AP</b><br/>Neerukonda Campus Terminal');

      // Add Boarding Points
      SRM_BOARDING_POINTS.forEach((bp) => {
        const bpIcon = L.divIcon({
          className: 'custom-bp-marker',
          html: `<div style="background-color:#34A853; color:white; font-family:'Times New Roman', serif; font-weight:bold; font-size:10px; padding:2px 6px; border-radius:4px; border:1.5px solid white; box-shadow:0 1px 3px rgba(0,0,0,0.2);">🚏 ${bp.name.split(' ')[0]}</div>`,
          iconSize: [80, 24],
          iconAnchor: [40, 12]
        });
        L.marker([bp.latitude, bp.longitude], { icon: bpIcon })
          .addTo(map)
          .bindPopup(`<b>${bp.name}</b><br/>${bp.landmark}`);
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Update Bus Markers dynamically
    buses.forEach((bus) => {
      const isSelected = bus.busId === selectedBusId;
      const markerColor = bus.status === 'DELAYED' ? '#FBBC05' : bus.status === 'REROUTED' ? '#EA4335' : '#4285F4';

      const busIcon = L.divIcon({
        className: `bus-marker-${bus.busId}`,
        html: `
          <div style="background-color:${markerColor}; color:white; font-family:'Times New Roman', serif; font-weight:bold; font-size:11px; padding:4px 8px; border-radius:6px; border:${isSelected ? '3px solid #1A73E8' : '2px solid white'}; box-shadow:${isSelected ? '0 0 10px rgba(66,133,244,0.8)' : '0 2px 4px rgba(0,0,0,0.3)'}; transform:${isSelected ? 'scale(1.15)' : 'scale(1.0)'}; transition:all 0.3s ease;">
            🚌 ${bus.busNumber} (${bus.etaMinutes}m ETA)
          </div>
        `,
        iconSize: [110, 28],
        iconAnchor: [55, 14]
      });

      if (busMarkersRef.current[bus.busId]) {
        // Smoothly update existing marker position
        busMarkersRef.current[bus.busId].setLatLng([bus.latitude, bus.longitude]);
        busMarkersRef.current[bus.busId].setIcon(busIcon);
      } else {
        // Create new marker
        const marker = L.marker([bus.latitude, bus.longitude], { icon: busIcon }).addTo(map);
        marker.on('click', () => {
          if (onSelectBus) onSelectBus(bus.busId);
        });
        busMarkersRef.current[bus.busId] = marker;
      }

      // Update Popup content
      const popupHtml = `
        <div style="font-family:'Times New Roman', serif; font-size:12px; color:#202124;">
          <h4 style="margin:0 0 4px 0; font-size:14px; font-weight:bold; color:#1A73E8;">${bus.busNumber}</h4>
          <div><b>Route:</b> ${bus.routeId}</div>
          <div><b>ETA to Campus:</b> <span style="color:${bus.etaMinutes > 15 ? '#EA4335' : '#34A853'}; font-weight:bold;">${bus.etaMinutes} min</span></div>
          <div><b>Occupancy:</b> ${bus.occupancyCount} / ${bus.capacity} seats</div>
          <div><b>Status:</b> ${bus.status}</div>
          <div><b>Speed:</b> ${bus.speed} km/h</div>
          <div style="font-size:10px; color:#5F6368; margin-top:4px;">Updated: ${bus.timestamp}</div>
        </div>
      `;
      busMarkersRef.current[bus.busId].bindPopup(popupHtml);
    });

    // Update Student Location Marker if provided
    if (studentLocation) {
      const studentIcon = L.divIcon({
        className: 'custom-student-marker',
        html: `<div style="background-color:#4285F4; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 0 8px rgba(66,133,244,0.8); animation:pulse 1.5s infinite;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      if (studentMarkerRef.current) {
        studentMarkerRef.current.setLatLng([studentLocation.latitude, studentLocation.longitude]);
      } else {
        studentMarkerRef.current = L.marker([studentLocation.latitude, studentLocation.longitude], { icon: studentIcon })
          .addTo(map)
          .bindPopup('<b>YOUR CURRENT LOCATION</b>');
      }
    }
  }, [buses, selectedBusId, studentLocation, nearestBoardingPoint, activeIncidents, onSelectBus]);

  return (
    <div style={{ height }} className="relative w-full rounded-xl overflow-hidden border border-[#DADCE0] shadow-sm select-none">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Status Overlay */}
      <div className="absolute top-3 right-3 z-[400] bg-white/95 border border-[#DADCE0] rounded-md px-3 py-1.5 text-xs font-serif shadow-sm backdrop-blur flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-ping" />
        <span className="font-mono font-bold text-[#202124]">SRM-AP GIS TELEMETRY</span>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 border border-[#DADCE0] rounded-md p-2.5 text-[11px] font-serif shadow-sm backdrop-blur space-y-1 max-w-xs">
        <div className="font-bold text-[#202124] border-b border-[#DADCE0] pb-1 font-mono uppercase text-[10px]">
          SRM-AP Transport Map Legend
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] inline-block" />
            <span>Live Bus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] inline-block" />
            <span>Boarding Stop</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] inline-block" />
            <span>Road Hazard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] inline-block" />
            <span>Delayed Bus</span>
          </div>
        </div>
        <div className="text-[10px] text-[#5F6368] pt-1 font-mono">
          SRM-AP Published Route Seed / Demo Data
        </div>
      </div>
    </div>
  );
};
