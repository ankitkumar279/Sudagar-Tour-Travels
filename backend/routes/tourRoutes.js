const express = require("express");
const {
  addTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getSingleTour);

router.post("/", protect, addTour);
router.put("/:id", protect, updateTour);
router.delete("/:id", protect, deleteTour);

module.exports = router;