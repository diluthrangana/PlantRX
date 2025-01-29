import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"; // Importing icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#8EB486", // Darker with 0.3 opacity
        boxShadow: "none",
        zIndex: 1000,
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <h1 style={{ color: "#fff", margin: 0 }}>Logo</h1>
        </div>

        {/* Desktop Menu */}
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ margin: "0 20px" }}>
            <Link to="/home" style={linkStyle}>
              Home
            </Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link to="/about" style={linkStyle}>
              About
            </Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link to="/services" style={linkStyle}>
              Services
            </Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link to="/contact" style={linkStyle}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="mobile-menu" onClick={toggleMenu}>
          <span style={{ fontSize: "30px", color: "#fff" }}>&#9776;</span>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <ul
          style={{
            position: "absolute",
            width: "150px",
            top: "60px",
            right: 0,
            backgroundColor: "#997C70", 
            color: "#fff",
            listStyle: "none",
            padding: "20px 20px",
            margin: 0,
            textAlign: "left",
          }}
        >
          <li style={{ padding: "10px 0" }}>
            <Link to="/login" style={linkStyle}>
              <FaUserAlt style={{ marginRight: "10px" }} /> Change User
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link to="/" style={linkStyle}>
              <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

// Style for the links to include hover glow effect
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  position: "relative",
  padding: "5px 10px",
  fontSize: "16px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  display: "inline-block", // Ensure the transform works correctly
};

// Hover effect
const linkHoverStyle = {
  transform: "scale(1.1)", // Scale up the button
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)", // Glow effect
};

// Apply hover effect to all links
const applyHoverEffect = (e) => {
  e.target.style.transform = linkHoverStyle.transform;
  e.target.style.boxShadow = linkHoverStyle.boxShadow;
};

// Remove hover effect when mouse leaves
const removeHoverEffect = (e) => {
  e.target.style.transform = "scale(1)";
  e.target.style.boxShadow = "none";
};

// Add event listeners to all links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', applyHoverEffect);
  link.addEventListener('mouseleave', removeHoverEffect);
});

export default Navbar;