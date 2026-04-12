// components/MapView.jsx
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const MapView = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const singlePoint = data?.singlePoint || null;
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
  const center = singlePoint || startPoint || { lat: 28.6139, lng: 77.209 };

  if (!isLoaded) return <div>Loading map...</div>;
  return (
    // <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {/* Single point marker (DeliveryPoints form) */}
      {singlePoint && <Marker position={singlePoint} />}

      {/* Route + markers (other uses) */}
      {path.length > 0 && (
        <>
          <Polyline path={path} options={{ strokeColor: "green" }} />
          {path.map((pos, i) => (
            <Marker key={i} position={pos} />
          ))}
        </>
      )}
    </GoogleMap>
    // </LoadScript>
  );
};

export default MapView;
