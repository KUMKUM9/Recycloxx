import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

// Dummy test users
const INITIAL_USERS = [
  { email: "testuser@example.com", password: "test123" },
  { email: "demo@recyclox.com", password: "demo123" },
  { email: "user@sample.com", password: "userpass" }
];

const Auth = () => {
  const { setUser } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userType, setUserType] = useState("normal");
  const [error, setError] = useState("");
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("recyclox_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [isRegister, setIsRegister] = useState(false);

  // Auto-login if user is remembered
  React.useEffect(() => {
    const remembered = localStorage.getItem("recyclox_remembered_user");
    if (remembered && setUser) {
      setUser(JSON.parse(remembered));
    }
  }, [setUser]);

  // Dummy login function (no backend)
  const login = () => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setError("");
      const userObj = {
        email: found.email,
        phone: found.phone || "",
        address: found.address || "",
        profilePhoto: found.profilePhoto || null,
        userType: found.userType || "normal"
      };
      setUser(userObj);
      if (rememberMe) {
        localStorage.setItem("recyclox_remembered_user", JSON.stringify(userObj));
      } else {
        localStorage.removeItem("recyclox_remembered_user");
      }
      alert("Logged in as " + email);
    } else {
      setError("Invalid email or password");
    }
  };

  // Dummy register function (no backend)
  const register = () => {
    if (!email || !password || !phone || !address) {
      setError("All fields except profile photo are required");
      return;
    }
    if (users.find(u => u.email === email)) {
      setError("Email already exists");
      return;
    }
    const newUsers = [
      ...users,
      {
        email,
        password,
        phone,
        address,
        profilePhoto,
        userType
      }
    ];
    setUsers(newUsers);
    localStorage.setItem("recyclox_users", JSON.stringify(newUsers));
    setError("");
    alert("Registered! You can now login.");
    setIsRegister(false);
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setProfilePhoto(null);
    setUserType("normal");
  };

  return (
    <div style={{
      background: "#e8f5e9",
      borderRadius: "1rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: "2rem",
      maxWidth: "350px",
      margin: "2rem auto",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#388e3c", marginBottom: "1rem" }}>{isRegister ? "Register" : "Login"}</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: "0.7rem", padding: "0.5rem", width: "90%", borderRadius: "0.5rem", border: "1px solid #388e3c" }}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: "0.7rem", padding: "0.5rem", width: "90%", borderRadius: "0.5rem", border: "1px solid #388e3c" }}
      /><br />
      {isRegister && (
        <>
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ marginBottom: "0.7rem", padding: "0.5rem", width: "90%", borderRadius: "0.5rem", border: "1px solid #388e3c" }}
          /><br />
          <input
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            style={{ marginBottom: "0.7rem", padding: "0.5rem", width: "90%", borderRadius: "0.5rem", border: "1px solid #388e3c" }}
          /><br />
          <div style={{ marginBottom: "0.7rem", textAlign: "left", width: "90%", margin: "0 auto" }}>
            <label style={{ color: "#388e3c", fontWeight: "bold" }}>User Type:</label><br />
            <select
              value={userType}
              onChange={e => setUserType(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #388e3c" }}
            >
              <option value="normal">Normal User (Buy/Sell)</option>
              <option value="manufacturer">Manufacturer (Upcycled/Faulty)</option>
              <option value="recycler">Recycler</option>
            </select>
          </div>
          <div style={{ marginBottom: "0.7rem", textAlign: "left", width: "90%", margin: "0 auto" }}>
            <label style={{ color: "#388e3c", fontWeight: "bold" }}>Profile Photo (optional):</label><br />
            <input
              type="file"
              accept="image/*"
              onChange={e => setProfilePhoto(e.target.files[0])}
              style={{ width: "100%" }}
            />
          </div>
        </>
      )}
      {!isRegister && (
        <div style={{ marginBottom: "0.7rem", textAlign: "left", width: "90%", margin: "0 auto" }}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
            />
            Remember Me
          </label>
        </div>
      )}
      {isRegister ? (
        <button
          onClick={register}
          style={{
            background: "#388e3c",
            color: "#fff",
            border: "none",
            borderRadius: "1rem",
            padding: "0.5rem 1.5rem",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      ) : (
        <button
          onClick={login}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "1rem",
            padding: "0.5rem 1.5rem",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      )}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
          style={{
            background: "#fff",
            color: "#388e3c",
            border: "1px solid #388e3c",
            borderRadius: "1rem",
            padding: "0.4rem 1.2rem",
            cursor: "pointer",
            marginTop: "0.5rem"
          }}
        >
          {isRegister ? "Back to Login" : "Register"}
        </button>
      </div>
      {error && <div style={{ color: "#d84315", marginTop: "1rem" }}>{error}</div>}
      <div style={{ marginTop: "2rem", color: "#757575", fontSize: "0.95rem" }}>
        <strong>Test Users:</strong>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map(u => (
            <li key={u.email}>
              {u.email} / <span style={{ fontFamily: "monospace" }}>{u.password}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Auth;
