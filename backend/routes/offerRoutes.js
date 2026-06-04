const express = require("express");
const {
  addOffer,
  getOffers,
  updateOffer,
  deleteOffer,
  validateCoupon,
} = require("../controllers/offerController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getOffers);
router.post("/validate", validateCoupon);

router.post("/", protect, addOffer);
router.put("/:id", protect, updateOffer);
router.delete("/:id", protect, deleteOffer);

module.exports = router;