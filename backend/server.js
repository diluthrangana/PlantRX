const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");  // Import CORS middleware
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const plantingPlanRoutes = require("./routes/plantingPlanRoutes");

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins (you can restrict this to your frontend URL for security)
app.use(cors());  // Enable CORS

// Alternatively, you can specify your frontend URL to allow only that origin
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json()); // For parsing JSON bodies
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api", plantingPlanRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
