// components/MapView.jsx
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const MapView = ({data}) => {
   // 🔹 Vendor (start point)
  const vendor = data?.vendor;

  const startPoint = vendor
    ? {
        lat: parseFloat(vendor.start_latitude),
        lng: parseFloat(vendor.start_longitude),
      }
    : null;

  // 🔹 Delivery Locations
  const locations = data?.locationList || [];

  const locationPoints = locations.map((loc) => ({
    lat: parseFloat(loc.latitude),
    lng: parseFloat(loc.longitude),
  }));

  // 🔹 Path (start → all locations)
  const path = startPoint ? [startPoint, ...locationPoints] : [];

  // 🔹 Center map on vendor (or fallback)
  const center = startPoint || { lat: 28.6139, lng: 77.2090 };
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