import React from "react";

const MyListings = () => (
  <div style={{
    background: "#e8f5e9",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(56,142,60,0.07)",
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    textAlign: "center"
  }}>
    <h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>My Listings</h2>
    <p style={{ color: "#1976d2", fontSize: "1.1rem", marginBottom: "2rem" }}>
      View and manage your listed items.<br />
      <span style={{ color: "#388e3c", fontWeight: "bold" }}>Contribute to Reduce, Reuse, Recycle!</span>
    </p>
    {/* List user's listings here */}
  </div>
);

export default MyListings;
