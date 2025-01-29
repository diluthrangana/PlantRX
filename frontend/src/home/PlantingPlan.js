import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AddPlantingPlan from "./AddPlantingPlan"; // Import the AddPlantingPlan modal
import { useUser } from "../contexts/UserContext"; // Custom context for user data

const PlantingPlan = () => {
  const [plantingPlans, setPlantingPlans] = useState([]); // Store planting plans
  const [error, setError] = useState(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const { user } = useUser(); // Get the logged-in user's data
  const navigate = useNavigate(); // Hook for navigation

  // Fetch planting plans
  useEffect(() => {
    if (!user || !user.email) {
      setError("User is not logged in.");
      return;
    }

    const fetchPlantingPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/planting-plans");
        const userPlans = response.data.filter((plan) => plan.email === user.email); // Filter by user
        setPlantingPlans(userPlans);
      } catch (error) {
        setError("Error fetching planting plans");
      }
    };

    fetchPlantingPlans();
  }, [user]);

  // Navigate to plan details
  const handleCardClick = (plan) => {
    navigate("/planting-plan-details", { state: { plan } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Planting Plans</h2>
      <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
        + Add Plan
      </button>

      {error && <p style={styles.errorMessage}>{error}</p>}

      {Array.isArray(plantingPlans) && plantingPlans.length === 0 ? (
        <p style={styles.noPlansText}>No planting plans found. Add your first plan!</p>
      ) : (
        <div style={styles.plantingPlans}>
          {plantingPlans.map((plan) => (
            <div
              key={plan._id}
              style={styles.planCard}
              onClick={() => handleCardClick(plan)}
            >
              <h3 style={styles.planName}>{plan.plantName}</h3>
              <p style={styles.planDate}>
                Planting Date: {new Date(plan.plantingDate).toLocaleDateString()}
              </p>
              <p style={styles.planText}>Area Size: {plan.areaSize} acres</p>
              <p style={styles.planText}>Capital: ${plan.capital}</p>
              <p style={styles.planText}>Level: {plan.level}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <AddPlantingPlan
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {
            setIsModalOpen(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    marginTop: "40px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    width: "75%",
  },
  header: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#997C70",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#685752",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  noPlansText: {
    fontSize: "16px",
    color: "#555",
  },
  plantingPlans: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  planCard: {
    display: "flex",
    flexDirection: "row",  // Items will be displayed horizontally
    alignItems: "center",  // Align text and data horizontally
    padding: "10px",  // Reduced padding for smaller height
    borderBottom: "1px solid #ddd",  // Border between each plan item
    boxShadow: "none",  // Optional: Remove shadow to make it flatter
    cursor: "pointer",
    height: "10px", // Adjust the height dynamically
  },
  planName: {
    fontSize: "16px", // Reduced font size for name
    marginRight: "20px", // Space between name and other details
    color: "#666"
  },
  planDate: {
    fontSize: "14px",
    color: "#666",
    marginRight: "20px", // Space between date and other details
  },
  planText: {
    fontSize: "14px",
    color: "#666",
    marginRight: "20px", // Space between texts
  },
};

export default PlantingPlan;
