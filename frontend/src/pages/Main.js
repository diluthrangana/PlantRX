import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.hero}>
        <h1 style={styles.title}>Virtual Supermarket</h1>
        <p style={styles.subtitle}>Step into the Future of Shopping in 3D!</p>
        <div style={styles.buttonContainer}>
          <Link to="/login">
            <button style={styles.button} className="transparent-button">Login</button>
          </Link>
          <Link to="/signup">
            <button style={styles.button} className="transparent-button">Create Account</button>
          </Link>
          <Link to="/supermarket">
            <button style={styles.startButton} className="transparent-button">🛒 Start Shopping</button>
          </Link>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes floatEffect {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .transparent-button {
            border: 1px solid rgba(255, 255, 255, 0.6); /* Super thin white stroke */
            background: transparent;
            color: white;
            font-weight: bold;
            padding: 12px 24px;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 10px; /* Curved corners */
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* White aura effect */
          }

          .transparent-button:hover {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    position: "relative",
    backgroundImage: "url('/assets/supermarket1.jpg')", // Set your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Subtle dark overlay for better readability
  },
  hero: {
    position: "relative",
    textAlign: "center",
    padding: "50px",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 1s ease-in-out, floatEffect 3s infinite ease-in-out",
    zIndex: 2,
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "white",
    textShadow: "0 0 10px rgba(255, 255, 255, 0.8)", // Soft white glow
  },
  subtitle: {
    fontSize: "20px",
    opacity: 0.9,
    marginBottom: "20px",
    color: "white",
    textShadow: "0 0 8px rgba(255, 255, 255, 0.6)", // White aura effect
  },
  buttonContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
};
