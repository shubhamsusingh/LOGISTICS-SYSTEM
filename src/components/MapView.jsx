// components/MapView.jsx
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const center = {
  lat: 28.6139,
  lng: 77.209,
};

const path = [
  { lat: 28.6139, lng: 77.209 },
  { lat: 28.6239, lng: 77.219 },
  { lat: 28.6339, lng: 77.229 },
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
