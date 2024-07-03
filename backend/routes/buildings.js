// routes/buildings.js
import express from "express";
import Building from "../models/building.js";

const router = express.Router();

// GET all buildings with pagination
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const buildings = await Building.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(buildings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific building by ID
router.get("/:id", async (req, res) => {
  try {
    console.log(`Fetching building with ID: ${req.params.id}`);
    const building = await Building.findById(req.params.id);
    if (building == null) {
      return res.status(404).json({ message: "Cannot find building" });
    }
    res.json(building);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
