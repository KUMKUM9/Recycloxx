import React from "react";

import { useContext } from "react";
import { AuthContext } from "../App";

const Profile = () => {
	const { user } = useContext(AuthContext);
	if (!user) {
		return (
			<div style={{ textAlign: "center", marginTop: "3rem" }}>
				<h2>Please login to view your profile.</h2>
			</div>
		);
	}
	return (
		<div style={{
			background: "#e3f2fd",
			borderRadius: "1rem",
			boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
			padding: "2rem",
			maxWidth: "600px",
			margin: "2rem auto",
			textAlign: "center"
		}}>
			<h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>My Profile</h2>
			{user.profilePhoto && (
				<img
					src={typeof user.profilePhoto === "string" ? user.profilePhoto : URL.createObjectURL(user.profilePhoto)}
					alt="Profile"
					style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
				/>
			)}
			<div style={{ marginBottom: "1rem" }}>
				<strong>Email:</strong> {user.email}<br />
				<strong>Phone:</strong> {user.phone || "-"}<br />
				<strong>Address:</strong> {user.address || "-"}<br />
				<strong>User Type:</strong> {user.userType === "manufacturer" ? "Manufacturer" : user.userType === "recycler" ? "Recycler" : "Normal User"}
			</div>
			<p style={{ color: "#1976d2", fontSize: "1.1rem", marginBottom: "2rem" }}>
				My listings, swaps and orders will appear here.<br />
				<span style={{ color: "#388e3c", fontWeight: "bold" }}>Track your 3R impact!</span>
			</p>
			<div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
				<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(56,142,60,0.07)", padding: "1.2rem", width: "160px" }}>
					<h4 style={{ color: "#388e3c" }}>My Listings</h4>
					<p style={{ color: "#555" }}>View and manage your listed items.</p>
				</div>
				<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(25,118,210,0.07)", padding: "1.2rem", width: "160px" }}>
					<h4 style={{ color: "#1976d2" }}>My Swaps</h4>
					<p style={{ color: "#555" }}>See your swap requests and history.</p>
				</div>
				<div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(255,193,7,0.07)", padding: "1.2rem", width: "160px" }}>
					<h4 style={{ color: "#FFC107" }}>My Orders</h4>
					<p style={{ color: "#555" }}>Track your purchases and recycling orders.</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
