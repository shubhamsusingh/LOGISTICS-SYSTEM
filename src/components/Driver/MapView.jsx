import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, MAP_STYLE, MAP_OPTIONS } from "../../constants";
import MapMockView from "./MapMockView";
import styles from "../../pages/Driver/Dashboard.module.css";

const WAREHOUSE = {
  lat: 21.98940,
  lng: 72.86751,
  name: "Warehouse",
};

const MapView = ({ stops = [] }) => {
  const [selected, setSelected] = useState(null);

  // Polyline: warehouse first, then stops exactly as API order
  const polylinePath = [
    { lat: WAREHOUSE.lat, lng: WAREHOUSE.lng },
    ...stops.map((stop) => ({
      lat: parseFloat(stop.latitude),
      lng: parseFloat(stop.longitude),
    })),
  ];

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={MAP_STYLE}
          center={{ lat: WAREHOUSE.lat, lng: WAREHOUSE.lng }}
          zoom={13}
          options={MAP_OPTIONS}
        >
          <Polyline
            path={polylinePath}
            options={{
              strokeColor:   "#1565c0",
              strokeWeight:  3.5,
              strokeOpacity: 0.9,
            }}
          />

          {/* Warehouse marker */}
          <Marker
            position={{ lat: WAREHOUSE.lat, lng: WAREHOUSE.lng }}
            onClick={() => setSelected({ _isWarehouse: true })}
            label={{ text: "W", color: "#fff", fontWeight: "bold", fontSize: "12px" }}
            icon={{
              path:         window.google?.maps?.SymbolPath?.CIRCLE || 0,
              scale:        16,
              fillColor:    "#0f2d52",
              fillOpacity:  1,
              strokeColor:  "#fff",
              strokeWeight: 2,
            }}
          />

          {/* Stop markers in API order */}
          {stops.map((stop) => (
            <Marker
              key={stop.stop_id}
              position={{
                lat: parseFloat(stop.latitude),
                lng: parseFloat(stop.longitude),
              }}
              onClick={() => setSelected(stop)}
              label={{ text: String(stop.stop_order), color: "#fff", fontWeight: "bold", fontSize: "12px" }}
              icon={{
                path:         window.google?.maps?.SymbolPath?.CIRCLE || 0,
                scale:        14,
                fillColor:    "#e53935",
                fillOpacity:  1,
                strokeColor:  "#fff",
                strokeWeight: 2,
              }}
            />
          ))}

          {/* Warehouse info window */}
          {selected?._isWarehouse && (
            <InfoWindow
              position={{ lat: WAREHOUSE.lat, lng: WAREHOUSE.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0d2137", padding: "2px 4px" }}>
                🏭 Warehouse
                <div style={{ fontSize: 11, fontWeight: 400, marginTop: 2 }}>Start of route</div>
              </div>
            </InfoWindow>
          )}

          {/* Stop info window */}
          {selected && !selected._isWarehouse && (
            <InfoWindow
              position={{
                lat: parseFloat(selected.latitude),
                lng: parseFloat(selected.longitude),
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0d2137", padding: "2px 4px" }}>
                📍 Stop {selected.stop_order}: {selected.center_name}
                <div style={{ fontSize: 11, fontWeight: 400, marginTop: 2 }}>{selected.address}</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapView;