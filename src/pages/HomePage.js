import React from "react";

const HomePage = () => (
	<div style={{
		background: "linear-gradient(90deg, #e8f5e9 0%, #e3f2fd 100%)",
		minHeight: "70vh",
		padding: "3rem 2rem",
		textAlign: "center"
	}}>
		<h2 style={{ color: "#388e3c", fontSize: "2.2rem", marginBottom: "1rem" }}>Welcome to Recyclox</h2>
		<p style={{ fontSize: "1.2rem", color: "#1976d2", marginBottom: "2rem" }}>
			Find, swap, sell or recycle items. <br />
			<span style={{ color: "#388e3c", fontWeight: "bold" }}>Embrace the 3R Principle: Reduce, Reuse, Recycle</span>
		</p>
		<div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
			<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", padding: "1.5rem", width: "220px" }}>
				<h3 style={{ color: "#388e3c" }}>Reduce</h3>
				<p style={{ color: "#555" }}>Choose sustainable products and minimize waste.</p>
			</div>
			<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", padding: "1.5rem", width: "220px" }}>
				<h3 style={{ color: "#1976d2" }}>Reuse</h3>
				<p style={{ color: "#555" }}>Swap, donate, or repurpose items for a second life.</p>
			</div>
			<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", padding: "1.5rem", width: "220px" }}>
				<h3 style={{ color: "#FFC107" }}>Recycle</h3>
				<p style={{ color: "#555" }}>Recycle responsibly and help protect our planet.</p>
			</div>
		</div>
	</div>
);

export default HomePage;
