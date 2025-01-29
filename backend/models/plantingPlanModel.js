const mongoose = require("mongoose");

const plantingPlanSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
  },
  plantingDate: {
    type: Date,
    required: true,
  },
  areaSize: {
    type: Number,
    required: true,
    min: 0,
  },
  capital: {
    type: Number,
    required: true,
    min: 0,
  },
  email: { // Store user email
    type: String,
    required: false,
  },
  level: { // Add level to the schema
    type: Number,
    required: true,
  },
});

const PlantingPlan = mongoose.model("PlantingPlan", plantingPlanSchema);
module.exports = PlantingPlan;
