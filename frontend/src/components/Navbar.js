import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const applyHoverEffect = (e) => {
    e.target.style.transform = "scale(1.1)";
    e.target.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
  };

  const removeHoverEffect = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "none";
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#8EB486",
        boxShadow: "none",
        zIndex: 1000,
        padding: "5px 20px",
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
          <img src={logo} alt="Logo" style={{ height: "30px" }} />
        </div>

        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ margin: "0 20px" }}>
            <Link
              to="/home"
              style={linkStyle}
              onMouseEnter={applyHoverEffect}
              onMouseLeave={removeHoverEffect}
            >
              Home
            </Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link
              to="/about"
              style={linkStyle}
              onMouseEnter={applyHoverEffect}
              onMouseLeave={removeHoverEffect}
            >
              About
            </Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link
              to="/services"
              style={linkStyle}
              onMouseEnter={applyHoverEffect}
              onMouseLeave={removeHoverEffect}
            >
              Services
            </Link>
          </li>
          <li style={{ margin: "0 20px" }}>
            <Link
              to="/contact"
              style={linkStyle}
              onMouseEnter={applyHoverEffect}
              onMouseLeave={removeHoverEffect}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="mobile-menu" onClick={toggleMenu}>
          <span style={{ fontSize: "30px", color: "#fff" }}>&#9776;</span>
        </div>
      </div>

      {isMenuOpen && (
        <ul
          style={{
            position: "absolute",
            width: "150px",
            top: "50px",
            right: 0,
            backgroundColor: "#997C70",
            color: "#fff",
            listStyle: "none",
            padding: "10px 10px",
            margin: 0,
            textAlign: "left",
          }}
        >
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/login"
              style={linkStyle}
              onMouseEnter={applyHoverEffect}
              onMouseLeave={removeHoverEffect}
            >
              <FaUserAlt style={{ marginRight: "10px" }} /> Change User
            </Link>
          </li>
          <li style={{ padding: "10px 0" }}>
            <Link
              to="/"
              style={linkStyle}
              onMouseEnter={applyHoverEffect}
              onMouseLeave={removeHoverEffect}
            >
              <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  position: "relative",
  padding: "5px 10px",
  fontSize: "16px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  display: "inline-block",
};

export default Navbar;
