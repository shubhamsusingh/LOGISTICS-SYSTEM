// components/MapView.jsx

import { useState } from "react";
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, STOPS, MAP_CENTER, MAP_STYLE, MAP_OPTIONS, POLYLINE_PATH } from "../../constants";
import MapMockView from "./MapMockView";
import styles from "../../pages/Driver/Dashboard.module.css";

const MapView = () => {
  const [selected, setSelected] = useState(null);

  if (!GOOGLE_MAPS_API_KEY) {
    return <MapMockView />;
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={MAP_STYLE}
          center={MAP_CENTER}
          zoom={13}
          options={MAP_OPTIONS}
        >
          <Polyline
            path={POLYLINE_PATH}
            options={{
              strokeColor:   "#1565c0",
              strokeWeight:  3.5,
              strokeOpacity: 0.9,
              icons: [
                {
                  icon:   { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                  offset: "0",
                  repeat: "20px",
                },
              ],
            }}
          />
          {STOPS.map((stop) => (
            <Marker
              key={stop.id}
              position={{ lat: stop.lat, lng: stop.lng }}
              onClick={() => setSelected(stop)}
              label={{
                text:       stop.id === 0 ? "W" : String(stop.id),
                color:      "#fff",
                fontWeight: "bold",
                fontSize:   "12px",
              }}
              icon={{
                path:         window.google?.maps?.SymbolPath?.CIRCLE || 0,
                scale:        14,
                fillColor:    stop.id === 0 ? "#0f2d52" : "#e53935",
                fillOpacity:  1,
                strokeColor:  "#fff",
                strokeWeight: 2,
              }}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0d2137", padding: "2px 4px" }}>
                {selected.id === 0 ? "🏭 " : `📍 Stop ${selected.id}: `}
                {selected.label}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapView;
