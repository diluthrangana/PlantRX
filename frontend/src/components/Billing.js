import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(billingInfo);
    navigate("/login"); 
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Billing Information</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={billingInfo.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={billingInfo.address}
              onChange={handleChange}
              placeholder="Enter your address"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={billingInfo.cardNumber}
              onChange={handleChange}
              placeholder="Enter your card number"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={billingInfo.expirationDate}
              onChange={handleChange}
              placeholder="MM/YY"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>CVV</label>
            <input
              type="text"
              name="cvv"
              value={billingInfo.cvv}
              onChange={handleChange}
              placeholder="CVV"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit Billing Info
          </button>
          <button type="button" onClick={handleSkip} style={styles.transparentButton}>
            Skip
          </button>
        </form>
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
  transparentButton: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    color: "#444",
    backgroundColor: "transparent",
    border: "2px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    marginTop: "10px",
  },
};

export default Billing;
