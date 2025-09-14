import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const overpassUrl = "https://overpass-api.de/api/interpreter";

function fetchRecyclePoints(lat, lng, radius = 10000) {
  // Default radius is 10km
  const query = `[out:json];node[amenity=recycling](around:${radius},${lat},${lng});out;`;
  return fetch(overpassUrl, {
    method: "POST",
    body: query,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
    .then(res => res.json())
    .then(data =>
      (data.elements || []).map(e => ({
        id: e.id,
        name: e.tags.name || "Recycling Point",
        lat: e.lat,
        lng: e.lon,
        address: e.tags.address || ""
      }))
    );
}

async function geocodeLocation(location) {
  // Use Nominatim API to get lat/lng for a location string
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
  const res = await axios.get(url);
  if (res.data && res.data.length > 0) {
    return {
      lat: parseFloat(res.data[0].lat),
      lng: parseFloat(res.data[0].lon)
    };
  }
  return null;
}

const RecyclePointsMap = () => {
  const [userLocation, setUserLocation] = useState({ lat: 17.385, lng: 78.4867 }); // Default: Hyderabad
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchRecyclePoints(userLocation.lat, userLocation.lng, 10000)
      .then(data => {
        setPoints(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userLocation]);

  // Custom red marker icon for user location
  const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Move map to searched location
  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchLocation) return;
    setLoading(true);
    const loc = await geocodeLocation(searchLocation);
    if (loc) {
      setUserLocation(loc);
      setSearched(true);
      // Fetch recycling points for searched location within 10km
      fetchRecyclePoints(loc.lat, loc.lng, 10000)
        .then(data => {
          setPoints(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      alert("Location not found");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#e8f5e9", minHeight: "80vh", padding: "2rem", borderRadius: "1rem" }}>
      <h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>Recycle Points Map</h2>
      <form onSubmit={handleSearch} style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search location (e.g. Mumbai, India)"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: "1rem",
            border: "1.5px solid #388e3c",
            width: "260px",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 1px 4px rgba(56,142,60,0.08)"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "1rem",
            padding: "0.5rem 1.5rem",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </form>
      <div style={{ height: "60vh", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 8px rgba(56,142,60,0.07)" }}>
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <ChangeMapView center={[userLocation.lat, userLocation.lng]} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* User location marker with red icon */}
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <strong style={{ color: "#d84315" }}>{searched ? "Searched location" : "You are here"}</strong>
            </Popup>
          </Marker>
          {/* Recycling points markers */}
          {points.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <div style={{ minWidth: "180px" }}>
                  <strong style={{ color: "#388e3c", fontSize: "1.08rem" }}>{p.name}</strong>
                  <br />
                  <span style={{ color: "#1976d2", fontSize: "0.98rem" }}>{p.address}</span>
                  <br />
                  <span style={{ color: "#757575", fontSize: "0.95rem" }}>Lat: {p.lat.toFixed(4)}, Lng: {p.lng.toFixed(4)}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {loading && <div style={{ textAlign: "center", marginTop: "1rem", color: "#757575" }}>Loading nearby recycling points...</div>}
      {!loading && points.length === 0 && <div style={{ textAlign: "center", marginTop: "1rem", color: "#d84315" }}>No recycling points found nearby.</div>}
      {/* Advanced UI: List of recycling points as cards */}
      <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
        {points.map((p) => (
          <div key={p.id} style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(56,142,60,0.07)", padding: "1.2rem", minWidth: "220px" }}>
            <h3 style={{ color: "#388e3c", marginBottom: "0.5rem", fontSize: "1.08rem" }}>{p.name}</h3>
            <p style={{ color: "#1976d2", marginBottom: "0.5rem", fontSize: "0.98rem" }}>{p.address}</p>
            <p style={{ color: "#757575", fontSize: "0.95rem" }}>Lat: {p.lat.toFixed(4)}, Lng: {p.lng.toFixed(4)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecyclePointsMap;
