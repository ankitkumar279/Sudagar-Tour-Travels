const express = require("express");
const {
  addEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", addEnquiry);

router.get("/", protect, getEnquiries);
router.put("/:id/status", protect, updateEnquiryStatus);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;