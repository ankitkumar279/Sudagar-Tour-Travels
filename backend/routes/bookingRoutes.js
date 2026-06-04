const express = require("express");
const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:id/status", updateBookingStatus);

module.exports = router;