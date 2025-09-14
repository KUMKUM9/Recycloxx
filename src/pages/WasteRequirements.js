import React from "react";

const WasteRequirements = () => (
  <div style={{
    background: "#e3f2fd",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h2 style={{ color: "#1976d2", marginBottom: "1rem" }}>Waste Requirements</h2>
    <p style={{ color: "#388e3c", fontSize: "1.1rem", marginBottom: "2rem" }}>
      List and request recyclable materials.<br />
      <span style={{ color: "#1976d2", fontWeight: "bold" }}>Close the loop with recycling!</span>
    </p>
    {/* List waste requirements here */}
  </div>
);

export default WasteRequirements;
