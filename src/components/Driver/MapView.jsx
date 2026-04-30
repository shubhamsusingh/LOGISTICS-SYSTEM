import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../../pages/Driver/Dashboard.module.css";

const WAREHOUSE = {
  lat: 21.98940,
  lng: 72.86751,
  name: "Warehouse",
};

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons
const warehouseIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #0f2d52;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  ">W</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const createStopIcon = (stopNumber) => L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #e53935;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  ">${stopNumber}</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Component to fit map bounds
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
};

const MapView = ({ stops = [] }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapType, setMapType] = useState("street"); // "street" or "satellite"
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (stops.length === 0) return;

    const fetchRoute = async () => {
      setLoading(true);
      try {
        // Build coordinates string: warehouse + all stops
        const coordinates = [
          `${WAREHOUSE.lng},${WAREHOUSE.lat}`,
          ...stops.map(stop => `${stop.longitude},${stop.latitude}`)
        ].join(';');

        // OSRM API - completely free, no API key required
        const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes?.[0]) {
          // Convert GeoJSON coordinates [lng, lat] to Leaflet format [lat, lng]
          const coords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRouteCoordinates(coords);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        // Fallback to straight lines if routing fails
        const fallbackCoords = [
          [WAREHOUSE.lat, WAREHOUSE.lng],
          ...stops.map(s => [parseFloat(s.latitude), parseFloat(s.longitude)])
        ];
        setRouteCoordinates(fallbackCoords);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [stops]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = document.getElementById("map-container");
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // Calculate bounds for all points
  const allPoints = [
    [WAREHOUSE.lat, WAREHOUSE.lng],
    ...stops.map(s => [parseFloat(s.latitude), parseFloat(s.longitude)])
  ];

  // Tile layer URLs
  const tileUrls = {
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  const attributions = {
    street: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    satellite: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  };

  return (
    <div
      id="map-container"
      className={styles.mapContainer}
      style={{
        position: "relative",
        height: isFullscreen ? "100vh" : "400px",
        width: "100%",
      }}
    >
      <MapContainer
        center={[WAREHOUSE.lat, WAREHOUSE.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: isFullscreen ? "0" : "8px" }}
        scrollWheelZoom={false}
      >
        {/* Dynamic tile layer based on map type */}
        <TileLayer
          attribution={attributions[mapType]}
          url={tileUrls[mapType]}
        />

        {/* Fit bounds to show all markers */}
        <FitBounds bounds={allPoints} />

        {/* Road-based route line */}
        {routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            color="#1565c0"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* Warehouse marker */}
        <Marker
          position={[WAREHOUSE.lat, WAREHOUSE.lng]}
          icon={warehouseIcon}
        >
          <Popup>
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              🏭 Warehouse
              <div style={{ fontSize: 11, fontWeight: 400, marginTop: 4 }}>
                Start of route
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Stop markers */}
        {stops.map((stop) => (
          <Marker
            key={stop.stop_id}
            position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}
            icon={createStopIcon(stop.stop_order)}
          >
            <Popup>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                📍 Stop {stop.stop_order}: {stop.center_name}
                <div style={{ fontSize: 11, fontWeight: 400, marginTop: 4 }}>
                  {stop.address}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Control buttons */}
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
        {/* Map Type Toggle */}
        <div style={{
          background: "white",
          borderRadius: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          overflow: "hidden",
          display: "flex",
        }}>
          <button
            onClick={() => setMapType("street")}
            style={{
              padding: "8px 12px",
              border: "none",
              background: mapType === "street" ? "#1565c0" : "white",
              color: mapType === "street" ? "white" : "#333",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🗺️ Map
          </button>
          <button
            onClick={() => setMapType("satellite")}
            style={{
              padding: "8px 12px",
              border: "none",
              background: mapType === "satellite" ? "#1565c0" : "white",
              color: mapType === "satellite" ? "white" : "#333",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🛰️ Satellite
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          style={{
            padding: "8px 12px",
            border: "none",
            background: "white",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            color: "#333",
          }}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? "⤓ Exit" : "⤢ Full"}
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(255,255,255,0.95)",
          padding: "8px 12px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}>
          🗺️ Calculating route...
        </div>
      )}
    </div>
  );
};

export default MapView;