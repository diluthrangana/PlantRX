import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  const [plantingPlans, setPlantingPlans] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      setError("User is not logged in.");
      return;
    }

    const fetchPlantingPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/planting-plans");
        const userPlans = response.data.filter((plan) => plan.email === user.email);
        setPlantingPlans(userPlans);
      } catch (error) {
        setError("Error fetching planting plans");
      }
    };

    fetchPlantingPlans();
  }, [user]);

  const handleCardClick = (plan) => {
    navigate("/planting-plan-details", { state: { plan } });
  };

  const handleRemove = async (planId) => {
    try {
      await axios.delete(`http://localhost:5000/api/planting-plans/${planId}`);
      // Remove the plan from the state
      setPlantingPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));
    } catch (error) {
      setError("Error removing planting plan.");
    }
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.errorMessage}>{error}</p>}

      {Array.isArray(plantingPlans) && plantingPlans.length === 0 ? (
        <p style={styles.noPlansText}>No planting plans found. Add your first plan!</p>
      ) : (
        <div style={styles.plantingPlans}>
          {plantingPlans.map((plan) => {
            const imagePath = require(`../assets/plants/${plan.plantName}.jpg`);

            return (
              <div
                key={plan._id}
                style={{
                  ...styles.planCard,
                  backgroundImage: `url(${imagePath.default || imagePath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => handleCardClick(plan)} // Make the card clickable
              >
                <div style={styles.overlay}>
                  <h3 style={styles.planName}>{plan.plantName}</h3>
                  <p style={styles.planDate}>
                    Planting Date: {new Date(plan.plantingDate).toLocaleDateString()}
                  </p>
                  <p style={styles.planText}>Area Size: {plan.areaSize} acres</p>
                  <p style={styles.planText}>Capital: ${plan.capital}</p>
                  <p style={styles.planText}>Level: {plan.level}</p>
                  <button
                    style={styles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when removing
                      handleRemove(plan._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    width: "75%",
    marginTop: "50px",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "10px",
    marginTop: "20px",
  },
  planCard: {
    position: "relative",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    width: "90%",
    height: "200px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: "8px",
    padding: "10px",
  },
  planName: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "white",
    textAlign: "left",
    paddingLeft: "10px",
  },
  planDate: {
    fontSize: "14px",
    marginBottom: "1px",
    color: "white",
    textAlign: "left",
    paddingLeft: "10px",
  },
  planText: {
    fontSize: "14px",
    marginBottom: "1px",
    color: "white",
    textAlign: "left",
    paddingLeft: "10px",
  },
  removeButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "5px",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "flex-end",
  },
};

export default Home;
