import React from "react";

const RecyclingPointManagement = () => (
  <div style={{
    background: "#fffde7",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(255,193,7,0.07)",
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h2 style={{ color: "#FFC107", marginBottom: "1rem" }}>Recycling Point Management</h2>
    <p style={{ color: "#388e3c", fontSize: "1.1rem", marginBottom: "2rem" }}>
      Manage recycling locations.<br />
      <span style={{ color: "#FFC107", fontWeight: "bold" }}>Enable recycling for all!</span>
    </p>
    {/* Manage recycling points here */}
  </div>
);

export default RecyclingPointManagement;
