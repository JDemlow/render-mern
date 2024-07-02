import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import buildingsRouter from "./routes/buildings.js";

// Explicitly specify the path to the .env file
dotenv.config({ path: "./backend/.env" });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
console.log("MongoDB URI:", uri); // Check the value

mongoose
  .connect(uri) // Removed useNewUrlParser and useUnifiedTopology
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define Routes
app.use("/buildings", buildingsRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
