const pool = require("../config/db");

const getCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      customers: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM bookings WHERE customer_id = $1 ORDER BY created_at DESC",
      [id]
    );

    res.json({
      success: true,
      bookings: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerBookings,
};