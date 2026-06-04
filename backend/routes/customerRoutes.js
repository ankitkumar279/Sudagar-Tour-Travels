const express = require("express");
const {
  getCustomers,
  getCustomerBookings,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id/bookings", getCustomerBookings);

module.exports = router;