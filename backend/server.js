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

const testApi = (req, res) => {
  res.json({
    success: true,
    message: "Backend API working",
  });
};

const dbTestApi = async (req, res) => {
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
};

app.get("/test", testApi);
app.get("/api/test", testApi);

app.get("/db-test", dbTestApi);
app.get("/api/db-test", dbTestApi);

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

app.use("/bookings", bookingRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/customers", customerRoutes);
app.use("/api/customers", customerRoutes);

app.use("/cabs", cabRoutes);
app.use("/api/cabs", cabRoutes);

app.use("/tours", tourRoutes);
app.use("/api/tours", tourRoutes);

app.use("/offers", offerRoutes);
app.use("/api/offers", offerRoutes);

app.use("/enquiries", enquiryRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use("/dashboard", dashboardRoutes);
app.use("/api/dashboard", dashboardRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
