import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddPlantingPlan from "../components/AddPlantingPlan"; // Import modal

const Home = () => {
  const [plantingPlans, setPlantingPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch planting plans from the database
  const fetchPlantingPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/planting-plans");
      setPlantingPlans(response.data);
    } catch (error) {
      console.error("Error fetching planting plans", error);
    }
  };

  useEffect(() => {
    fetchPlantingPlans();
  }, []);

  // Handle when a new planting plan is submitted and refresh the list
  const handlePlanAdded = () => {
    fetchPlantingPlans();
  };

  return (
    <div style={styles.container}>
      <h2>My Planting Plans</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        style={styles.addButton}
      >
        + Add Plan
      </button>
      <div style={styles.plantingPlans}>
        {plantingPlans.map((plan) => (
          <div key={plan._id} style={styles.planCard}>
            <h3>{plan.plantName}</h3>
            <p>Planting Date: {plan.plantingDate}</p>
          </div>
        ))}
      </div>

      {/* Modal to Add a Planting Plan */}
      <AddPlantingPlan
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onSubmit={handlePlanAdded} // Refresh data when new plan is added
      />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  plantingPlans: {
    display: "flex",
    flexDirection: "column",
  },
  planCard: {
    backgroundColor: "#f5f5f5",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;
