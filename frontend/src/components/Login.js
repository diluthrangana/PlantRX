import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      loginUser({ email: email });
      navigate("/home", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Log In</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
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
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.submitButton}>Login</button>
        </form>
        <p style={styles.switchText}>
          Don't have an account? <a href="/signup" style={styles.link}>Register here</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end", 
    alignItems: "center",
    height: "100vh",
    backgroundImage: 'url(../assets/30399.jpg)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
  },
  formWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", 
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    marginRight: "100px", 
  },
  heading: {
    color: "#685752",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#685752",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #997C70",
    borderRadius: "6px",
    backgroundColor: "#FDF7F4", 
    color: "#685752",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  error: {
    color: "#685752",
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    color: "#FFFFFF",
    backgroundColor: "transparent", 
    border: "2px #ffffff solid",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  switchText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#000000",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
