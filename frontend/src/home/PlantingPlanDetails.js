import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access state data

const PlantingPlanDetails = () => {
  const location = useLocation(); // Access the passed state
  const { plan } = location.state || {}; // Extract plan data from state

  if (!plan) {
    return <p>No planting plan data found.</p>;
  }

  // Function to calculate progress based on level (you can adjust the max level if needed)
  const calculateProgress = (level) => {
    const maxLevel = 100; // Define the max level as 100 for a full progress bar
    return (level / maxLevel) * 100; // Return percentage
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Planting Plan Details</h2>
      <div style={styles.planDetails}>
        <h3>{plan.plantName}</h3>
        <p>Planting Date: {new Date(plan.plantingDate).toLocaleDateString()}</p>
        <p>Area Size: {plan.areaSize} acres</p>
        <p>Capital: ${plan.capital}</p>
        <p>Description: {plan.description}</p>
        <p>Level: {plan.level}</p>

        {/* Progress bar */}
        <div style={styles.progressContainer}>
          <p style={styles.progressText}>Progress: {plan.level}%</p>
          <div style={styles.progressBarBackground}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${calculateProgress(plan.level)}%`, // Set width based on the level
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  planDetails: {
    padding: "15px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  progressContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  progressText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  progressBarBackground: {
    width: "100%",
    height: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    marginTop: "10px",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4caf50", // Green color for the filled portion
    borderRadius: "5px",
  },
};

export default PlantingPlanDetails;
