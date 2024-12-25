const express = require("express");
const Place = require("../models/Place");
const router = express.Router();

// Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new place
router.post("/", async (req, res) => {
  const { name, info, image, price } = req.body;
  try {
    const place = new Place({ name, info, image, price });
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ message: "Error adding place" });
  }
});

// Delete a place
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.json({ message: "Place deleted" });
  } catch (error) {
    res.status(404).json({ message: "Place not found" });
  }
});

module.exports = router;
