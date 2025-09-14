import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useGamePoints } from '../context/GamePointsContext';
import { AuthContext } from '../App';

const navStyle = {
  display: "flex",
  gap: "1.5rem",
  padding: "1rem 2rem",
  background: "#e8f5e9",
  borderBottom: "2px solid #388e3c",
  alignItems: "center",
  fontWeight: "500",
  fontSize: "1.08rem"
};

const linkStyle = {
  color: "#388e3c",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  transition: "background 0.2s, color 0.2s",
  position: "relative"
};

const hoverStyle = {
  background: "#338a86",
  color: "#fff"
};

const activeStyle = {
  background: "#388e3c",
  color: "#fff"
};


const getLinks = (user) => [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/listing/new", label: "Add Listing" },
  { to: "/map", label: "Recycle Points" },
  ...(user ? [{ to: "/game", label: "Play & Earn" }] : []),
  ...(user ? [{ to: "/profile", label: "Profile" }] : [{ to: "/auth", label: "Login / Signup" }])
];

const Navbar = () => {
  const [hovered, setHovered] = React.useState(null);
  const { points } = useGamePoints();
  const { user } = useContext(AuthContext);
  const links = getLinks(user);
  
  return (
    <nav style={navStyle}>
      {user && (
        <div style={{ marginLeft: 'auto', color: '#338a86', fontWeight: 'bold' }}>
          🏆 Points: {points}
        </div>
      )}
      {links.map((link, idx) => (
        <Link
          key={link.to}
          to={link.to}
          style={hovered === idx ? { ...linkStyle, ...hoverStyle } : linkStyle}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
