import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext"; 
import plantsData from "../data/plantsData"; 

const AddPlantingPlan = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useUser(); 
  const [plantName, setPlantName] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [capital, setCapital] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [level, setLevel] = useState(""); 
  const [error, setError] = useState(null);

  // Extract plant names from plantsData
  const plantNames = plantsData.Plants.map((plant) => plant.name);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!plantName || !plantingDate || !areaSize || !capital) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      
      await axios.post("http://localhost:5000/api/planting-plans", {
        email: user.email, // Use the email from the context
        plantName,
        plantingDate,
        areaSize,
        capital,
        level: 1, // Include level in the request
      });

      // Notify parent component about successful submission
      onSubmit();
      onClose(); // Close modal after submission
    } catch (error) {
      setError("An error occurred while submitting the plan.");
      onSubmit();
      onClose();
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Add Planting Plan</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Plant Name</label>
            <select
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              style={styles.input}
            >
              <option value="">Select a plant</option>
              {plantNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Planting Date</label>
            <input
              type="date"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Area Size (in acres)</label>
            <input
              type="number"
              value={areaSize}
              onChange={(e) => setAreaSize(e.target.value)}
              placeholder="Enter area size"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Capital (Rs)</label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="Enter capital amount"
              style={styles.input}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.buttons}>
            <button type="submit" style={styles.submitButton}>
              Add Plan
            </button>
            <button type="button" onClick={onClose} style={styles.closeButton}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    width: "350px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddPlantingPlan;
