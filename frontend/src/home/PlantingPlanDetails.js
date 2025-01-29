import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import plantsData from "../data/plantsData";

const PlantingPlanDetails = () => {
  const location = useLocation();
  const { planId } = location.state || {}; // Assuming planId is passed in the state
  const [plan, setPlan] = useState(location.state.plan);

  if (!plan) {
    return <p>No planting plan data found.</p>;
  }

  const plantData = plantsData.Plants.find((p) => p.name === plan.plantName);

  // Function to determine filled dots based on plan.level
  const getFilledDots = (level) => {
    return Math.min(level + 1, 6); // Ensure max fill is 6 dots
  };

  // Function to calculate the width of the progress bar based on plan.level
  const getProgressBarWidth = (level) => {
    return `${(level / 5) * 100}%`; // Fills up to 100% at level 5
  };

  // Function to handle level increment and update in database
  const handleNextLevel = async () => {
    const updatedLevel = Math.min(plan.level + 1, 5); // Limit to max level 5

    setPlan((prevPlan) => ({
      ...prevPlan,
      level: updatedLevel,
    }));

    try {
      const response = await fetch(`/api/planting-plans/${planId}/level`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: updatedLevel }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Level updated successfully:", result.data);
      } else {
        console.error("Error updating level:", result.message);
      }
    } catch (error) {
      console.error("Error updating level:", error);
    }
  };

  // Skip the steps that are lower than the current level
  const relevantSteps = plantData
    ? plantData.plantingSteps.filter((step) => step.step === plan.level)
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <div style={styles.topleftSection}>
          <div style={styles.progressContainer}>
            <p style={styles.progressText}>Progress: Level {plan.level}</p>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: getProgressBarWidth(plan.level),
                }}
              ></div>
              {[...Array(6)].map((_, index) => (
                <span
                  key={index}
                  style={{
                    ...styles.dot,
                    backgroundColor:
                      index < getFilledDots(plan.level) ? "#4caf50" : "#ccc",
                  }}
                />
              ))}
            </div>
            <button onClick={handleNextLevel} style={styles.nextLevelButton}>
              Next Level
            </button>
          </div>
        </div>

        <div style={styles.planDetails}>
          <h3>{plan.plantName}</h3>
          <p>Planting Date: {new Date(plan.plantingDate).toLocaleDateString()}</p>
          <p>Area Size: {plan.areaSize} acres</p>
          <p>Capital: ${plan.capital}</p>
          <p>Description: {plan.description}</p>
        </div>
      </div>

      {plantData && relevantSteps.length > 0 && (
        <div style={styles.lowerSection}>
          <div style={styles.lowerleftSection}>
            <p>{plantData.description}</p>
          </div>

          {/* Vertical Line */}
          <div style={styles.verticalLine}></div>

          <div style={styles.lowerrightSection}>
            <h4>Planting Step:</h4>
            {relevantSteps.map((step, index) => (
              <div key={index}>
                <p>
                  Step {step.step}: {step.description}
                </p>
                <ul>
                  {step.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    paddingTop: "80px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#685752",
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "20px",
  },
  topleftSection: {
    width: "900px",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
  },
  progressText: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  progressBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "800px",
    height: "2px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    padding: "2px",
    position: "relative",
  },
  progressBarFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#8EB486",
    borderRadius: "5px",
    zIndex: 1,
  },
  dot: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    transition: "background-color 0.3s ease",
    zIndex: 2,
  },
  planDetails: {
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    width: "60%",
    marginLeft: "20px",
  },
  nextLevelButton: {
    padding: "10px 20px",
    backgroundColor: "#685752",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "50px",
    fontSize: "16px",
  },
  lowerSection: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginTop: "20px",
    // textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  lowerleftSection: {
    flex: 1,
    padding: "20px",
    paddingTop: "60px",
  },
  lowerrightSection: {
    flex: 1,
    padding: "20px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  verticalLine: {
    width: "1px",
    backgroundColor: "#ccc",
    margin: "30px 0",
  },
};

export default PlantingPlanDetails;