import React from "react";

const ManufacturerDashboard = () => (
	<div style={{
		background: "#e8f5e9",
		borderRadius: "1rem",
		boxShadow: "0 2px 8px rgba(56,142,60,0.07)",
		padding: "2rem",
		maxWidth: "600px",
		margin: "2rem auto",
		textAlign: "center"
	}}>
		<h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>Manufacturer Dashboard</h2>
		<p style={{ color: "#1976d2", fontSize: "1.1rem", marginBottom: "2rem" }}>
			Manage products and bulk faulty clothes here.<br />
			<span style={{ color: "#388e3c", fontWeight: "bold" }}>Partner for a circular economy!</span>
		</p>
		<div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
			<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(56,142,60,0.07)", padding: "1.2rem", width: "160px" }}>
				<h4 style={{ color: "#388e3c" }}>My Products</h4>
				<p style={{ color: "#555" }}>Manage your eco-friendly products.</p>
			</div>
			<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(25,118,210,0.07)", padding: "1.2rem", width: "160px" }}>
				<h4 style={{ color: "#1976d2" }}>Waste Requirements</h4>
				<p style={{ color: "#555" }}>List and request recyclable materials.</p>
			</div>
			<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(255,193,7,0.07)", padding: "1.2rem", width: "160px" }}>
				<h4 style={{ color: "#FFC107" }}>Bulk Faulty Clothes</h4>
				<p style={{ color: "#555" }}>Manage bulk recycling of faulty clothes.</p>
			</div>
		</div>
	</div>
);

export default ManufacturerDashboard;
