// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../data/UserContext";  // Import the user context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useUser();  // Access loginUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      loginUser({ email });  // Store user data in context
      navigate("/home", { state: { email } });  // Navigate to Home page with state
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>LogIn</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>
        <p style={styles.switchText}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.link}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    backgroundColor: "#eaeef1",
  },
  formWrapper: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  heading: {
    textAlign: "center",
    color: "#2f3a48",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "600",
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    color: "#444",
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f5f7fa",
    color: "#333",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  error: {
    color: "#f44336",
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#1a73e8",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  },
  switchText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#444",
  },
  link: {
    color: "#1a73e8",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Login;
