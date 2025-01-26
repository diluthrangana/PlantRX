import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Darker with 0.3 opacity
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
            <Link to="/" style={linkStyle}>
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
            top: "60px",
            left: 0,
            right: 0,
            backgroundColor: "#000",
            color: "#fff",
            listStyle: "none",
            padding: "20px 0",
            margin: 0,
            textAlign: "center",
          }}
        >
          <li style={{ padding: "10px 0" }}>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link to="/about" style={linkStyle}>
              About
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link to="/services" style={linkStyle}>
              Services
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link to="/contact" style={linkStyle}>
              Contact
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
  padding: "5px 0",
  fontSize: "16px",
  transition: "color 0.3s ease",
};

const linkHoverStyle = {
  color: "#fff",
  textDecoration: "none",
  position: "relative",
  padding: "5px 0",
  fontSize: "16px",
  transition: "color 0.3s ease",
  boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)", // Glow effect
};

export default Navbar;
