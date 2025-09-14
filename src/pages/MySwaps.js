import React from "react";

const MySwaps = () => (
  <div style={{
    background: "#e3f2fd",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h2 style={{ color: "#1976d2", marginBottom: "1rem" }}>My Swaps</h2>
    <p style={{ color: "#388e3c", fontSize: "1.1rem", marginBottom: "2rem" }}>
      See your swap requests and history.<br />
      <span style={{ color: "#1976d2", fontWeight: "bold" }}>Swapping is Reusing!</span>
    </p>
    {/* List user's swap requests here */}
  </div>
);

export default MySwaps;
