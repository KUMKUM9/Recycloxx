import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => (
  <div style={{
    border: "1px solid #e0e0e0",
    padding: "1rem",
    borderRadius: "1rem",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    marginBottom: "1.5rem",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}>
    <img
      src={listing.image}
      alt={listing.title}
      style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "0.7rem", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(56,142,60,0.07)" }}
    />
    <h3 style={{ color: "#222", marginBottom: "0.5rem", fontWeight: "600", fontSize: "1.2rem" }}>{listing.title}</h3>
    <p style={{ color: "#555", marginBottom: "0.5rem", fontSize: "0.98rem" }}>{listing.description?.slice(0, 100)}</p>
    <p style={{ color: "#757575", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }}>Category: {listing.category}</p>
    <p style={{ color: "#388e3c", fontWeight: "700", fontSize: "1.08rem", marginBottom: "0.7rem" }}>
      ₹{listing.price}
    </p>
    <Link
      to={'/listing/' + listing._id}
      style={{
        background: "#1976d2",
        color: "#fff",
        padding: "0.5rem 1.5rem",
        borderRadius: "1rem",
        textDecoration: "none",
        fontWeight: "500",
        fontSize: "1rem",
        transition: "background 0.2s"
      }}
    >
      View Details
    </Link>
  </div>
);

export default ListingCard;
