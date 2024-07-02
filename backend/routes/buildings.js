import express from "express";
import Building from "../models/building.js";

const router = express.Router();

// GET all buildings with pagination
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;

  try {
    const buildings = await Building.find().limit(limit).skip(skip);
    const total = await Building.countDocuments();
    res.json({ buildings, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
