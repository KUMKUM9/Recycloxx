import React from "react";

const BulkFaultyClothes = () => (
  <div style={{
    background: "#fffde7",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(255,193,7,0.07)",
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h2 style={{ color: "#FFC107", marginBottom: "1rem" }}>Bulk Faulty Clothes</h2>
    <p style={{ color: "#388e3c", fontSize: "1.1rem", marginBottom: "2rem" }}>
      Manage bulk recycling of faulty clothes.<br />
      <span style={{ color: "#FFC107", fontWeight: "bold" }}>Recycle textiles for a greener future!</span>
    </p>
    {/* List bulk faulty clothes here */}
  </div>
);

export default BulkFaultyClothes;
