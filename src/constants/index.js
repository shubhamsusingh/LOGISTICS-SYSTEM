// constants/index.js

export const GOOGLE_MAPS_API_KEY = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || "";

export const ROUTE_INFO = {
  vehicle: "MH12AB1234",
  driver: "Rajesh Singh",
  date: "01 April 2026",
  totalLoad: 850,
};

export const STOPS = [
  { id: 0, label: "Warehouse",          lat: 28.6139, lng: 77.209 },
  { id: 1, label: "Anganwadi Center A", lat: 28.6239, lng: 77.219 },
  { id: 2, label: "Dairy Center B",     lat: 28.6319, lng: 77.229 },
  { id: 3, label: "Anganwadi Center C", lat: 28.6389, lng: 77.239 },
  { id: 4, label: "Anganwadi Center D", lat: 28.6289, lng: 77.249 },
];

export const NOTIFICATIONS = [
  { id: 1, icon: "⚙️", text: "Vehicle maintenance due soon!",           cls: "notifWarn"    },
  { id: 2, icon: "🚧", text: "Traffic advisory: Expect delays on route", cls: "notifDanger"  },
  { id: 3, icon: "✅", text: "Route optimized successfully",             cls: "notifSuccess" },
];

export const MAP_CENTER  = { lat: 28.629, lng: 77.229 };
export const MAP_STYLE   = { width: "100%", height: "300px" };
export const POLYLINE_PATH = STOPS.map(({ lat, lng }) => ({ lat, lng }));

export const MAP_OPTIONS = {
  styles: [
    { featureType: "water",     elementType: "geometry",        stylers: [{ color: "#aadaff" }] },
    { featureType: "road",      elementType: "geometry",        stylers: [{ color: "#ffffff" }] },
    { featureType: "road",      elementType: "geometry.stroke", stylers: [{ color: "#d0dce8" }] },
    { featureType: "poi",                                        stylers: [{ visibility: "off" }] },
    { featureType: "landscape", elementType: "geometry",        stylers: [{ color: "#f0f5fb" }] },
  ],
};
