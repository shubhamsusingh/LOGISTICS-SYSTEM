// components/MapView.jsx
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 28.6139,
  lng: 77.2090,
};

const path = [
  { lat: 28.6139, lng: 77.2090 },
  { lat: 28.6239, lng: 77.2190 },
  { lat: 28.6339, lng: 77.2290 },
];

const MapView = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Polyline path={path} options={{ strokeColor: "green" }} />
        {path.map((pos, i) => (
          <Marker key={i} position={pos} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;