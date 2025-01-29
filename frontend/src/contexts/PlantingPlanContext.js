import React, { createContext, useContext, useState } from "react";

const PlantingPlanContext = createContext();

export const usePlantingPlans = () => useContext(PlantingPlanContext);

export const PlantingPlanProvider = ({ children }) => {
  const [plantingPlans, setPlantingPlans] = useState([]);

  const addPlantingPlan = (newPlan) => {
    setPlantingPlans((prevPlans) => [...prevPlans, newPlan]);
  };

  return (
    <PlantingPlanContext.Provider value={{ plantingPlans, addPlantingPlan }}>
      {children}
    </PlantingPlanContext.Provider>
  );
};
