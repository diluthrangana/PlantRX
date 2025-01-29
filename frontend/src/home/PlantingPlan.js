import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import AddPlantingPlan from "./AddPlantingPlan"; 
import { useUser } from "../contexts/UserContext"; 

const PlantingPlan = () => {
  const [plantingPlans, setPlantingPlans] = useState([]); 
  const [error, setError] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
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
        const userPlans = response.data.filter((plan) => plan.email === user.email); // Filter by user
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
    marginLeft: "10px",
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
    flexDirection: "row",  
    alignItems: "center",  
    padding: "10px",  
    borderBottom: "1px solid #ddd", 
    boxShadow: "none",  
    cursor: "pointer",
    height: "10px", 
  },
  planName: {
    fontSize: "16px", 
    marginRight: "20px", 
    color: "#666"
  },
  planDate: {
    fontSize: "14px",
    color: "#666",
    marginRight: "20px", 
  },
  planText: {
    fontSize: "14px",
    color: "#666",
    marginRight: "20px", 
  },
};

export default PlantingPlan;
