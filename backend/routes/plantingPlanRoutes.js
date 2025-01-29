const express = require("express");
const router = express.Router();
const PlantingPlan = require("../models/plantingPlanModel");
const mongoose = require("mongoose");

// Get all planting plans
router.get("/planting-plans", async (req, res) => {
  try {
    const plans = await PlantingPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching planting plans",
      error: error.message,
    });
  }
});

// Add a new planting plan
router.post("/planting-plans", async (req, res) => {
  try {
    const { plantName, plantingDate, areaSize, capital, email, level } = req.body;

    // Validate required fields
    if (!plantName || !plantingDate || areaSize === undefined || capital === undefined || !email || !level) {
      return res.status(400).json({
        message: "All fields are required (plantName, plantingDate, areaSize, capital, email, level).",
      });
    }

    // Create a new planting plan
    const newPlan = new PlantingPlan({
      plantName,
      plantingDate,
      areaSize,
      capital,
      email,
      level,
    });

    const savedPlan = await newPlan.save();
    res.status(201).json({
      message: "Planting plan added successfully!",
      data: savedPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving planting plan",
      error: error.message,
    });
  }
});

// Delete a planting plan by ID
router.delete("/planting-plans/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid planting plan ID." });
    }

    // Find and delete the plan
    const deletedPlan = await PlantingPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Planting plan not found." });
    }

    res.status(200).json({ message: "Planting plan deleted successfully!", data: deletedPlan });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting planting plan",
      error: error.message,
    });
  }
});

module.exports = router;
