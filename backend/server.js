require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cabRoutes = require("./routes/cabRoutes");
const tourRoutes = require("./routes/tourRoutes");
const offerRoutes = require("./routes/offerRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Taxi backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend API working",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Database connected successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/cabs", cabRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;