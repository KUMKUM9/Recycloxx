import React from "react";

const Footer = () => (
	<footer style={{
		background: "linear-gradient(90deg, #388e3c 0%, #1976d2 100%)",
		color: "#fff",
		padding: "1rem 0",
		textAlign: "center",
		fontWeight: "500",
		letterSpacing: "1px",
		marginTop: "2rem"
	}}>
		<span>Recyclox &copy; {new Date().getFullYear()} | Embrace the 3R Principle: Reduce, Reuse, Recycle</span>
	</footer>
);

export default Footer;
