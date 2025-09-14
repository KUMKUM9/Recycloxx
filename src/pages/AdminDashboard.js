import React from "react";

const AdminDashboard = () => (
  <div style={{
    background: "#e3f2fd",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
    padding: "2rem",
    maxWidth: "600px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h1 style={{ color: "#388e3c", marginBottom: "1rem" }}>Admin Dashboard</h1>
    <p style={{ color: "#1976d2", fontSize: "1.1rem", marginBottom: "2rem" }}>
      Manage users, listings, and recycling points.<br />
      <span style={{ color: "#388e3c", fontWeight: "bold" }}>Empower the 3R Principle for all users!</span>
    </p>
    <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(56,142,60,0.07)", padding: "1.2rem", width: "160px" }}>
        <h4 style={{ color: "#388e3c" }}>User Management</h4>
        <p style={{ color: "#555" }}>Manage platform users.</p>
      </div>
      <div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(25,118,210,0.07)", padding: "1.2rem", width: "160px" }}>
        <h4 style={{ color: "#1976d2" }}>Listing Moderation</h4>
        <p style={{ color: "#555" }}>Moderate listings for quality.</p>
      </div>
      <div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(255,193,7,0.07)", padding: "1.2rem", width: "160px" }}>
        <h4 style={{ color: "#FFC107" }}>Recycling Point Management</h4>
        <p style={{ color: "#555" }}>Manage recycling locations.</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
