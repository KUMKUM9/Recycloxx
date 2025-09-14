import React from "react";

const Header = () => (
	<header style={{
		background: "linear-gradient(90deg, #388e3c 0%, #1976d2 100%)",
		color: "#fff",
		padding: "1.5rem 0",
		textAlign: "center",
		boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
	}}>
		<h1 style={{ letterSpacing: "2px", fontWeight: "700", fontSize: "2.2rem", margin: 0 }}>
			Recyclox
		</h1>
		<p style={{ fontSize: "1.1rem", marginTop: "0.5rem", color: "#e0f2f1" }}>
			Reduce • Reuse • Recycle
		</p>
	</header>
);

export default Header;
