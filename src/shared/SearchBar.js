import React from "react";

const SearchBar = () => (
	<div style={{ marginBottom: "1rem" }}>
		<input
			placeholder="Search listings..."
			style={{
				padding: "0.7rem 1.2rem",
				borderRadius: "1rem",
				border: "1.5px solid #388e3c",
				width: "220px",
				fontSize: "1rem",
				outline: "none",
				boxShadow: "0 1px 4px rgba(56,142,60,0.08)"
			}}
		/>
	</div>
);

export default SearchBar;
