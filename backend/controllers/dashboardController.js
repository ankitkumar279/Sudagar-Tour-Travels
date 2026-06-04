const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM bookings) AS total_bookings,
        (SELECT COUNT(*) FROM customers) AS total_customers,
        (SELECT COUNT(*) FROM cabs) AS total_cabs,
        (SELECT COUNT(*) FROM tour_packages) AS total_tours,
        (SELECT COUNT(*) FROM offers) AS total_offers,
        (SELECT COUNT(*) FROM enquiries) AS total_enquiries,
        (SELECT COUNT(*) FROM bookings WHERE status = 'pending') AS pending_bookings,
        (SELECT COUNT(*) FROM bookings WHERE status = 'completed') AS completed_bookings,
        (SELECT COUNT(*) FROM bookings WHERE status = 'cancelled') AS cancelled_bookings,
        (SELECT COUNT(*) FROM enquiries WHERE status = 'new') AS new_enquiries
    `);

    res.json({
  success: true,
  stats: {
    total_bookings: Number(stats.rows[0].total_bookings),
    total_customers: Number(stats.rows[0].total_customers),
    total_cabs: Number(stats.rows[0].total_cabs),
    total_tours: Number(stats.rows[0].total_tours),
    total_offers: Number(stats.rows[0].total_offers),
    total_enquiries: Number(stats.rows[0].total_enquiries),
  },
});
  } catch (error) {
    console.log("Dashboard stats error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };