import React from "react";

const categories = ["All", "Sofa", "Electronics", "Clothes", "Books", "Other"];


const CategoryFilter = ({ selected, onChange }) => (
	<div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.7rem" }}>
		<span style={{ color: "#388e3c", fontWeight: "500" }}>Categories:</span>
		{categories.map((cat) => (
			<button
				key={cat}
				onClick={() => onChange(cat)}
				style={{
					background: selected === cat ? "#388e3c" : "#e8f5e9",
					color: selected === cat ? "#fff" : "#388e3c",
					border: "1px solid #388e3c",
					borderRadius: "1rem",
					padding: "0.4rem 1rem",
					fontWeight: "500",
					cursor: "pointer",
					transition: "background 0.2s, color 0.2s"
				}}
			>
				{cat}
			</button>
		))}
	</div>
);

export default CategoryFilter;
