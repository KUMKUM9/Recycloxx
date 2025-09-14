import React from "react";

const MyProducts = () => (
  <div style={{
    background: "#e8f5e9",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(56,142,60,0.07)",
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>My Products</h2>
    <p style={{ color: "#1976d2", fontSize: "1.1rem", marginBottom: "2rem" }}>
      Manage your eco-friendly products.<br />
      <span style={{ color: "#388e3c", fontWeight: "bold" }}>Design for sustainability!</span>
    </p>
    {/* List manufacturer's products here */}
  </div>
);

export default MyProducts;
