const pool = require("../config/db");

// Add offer
const addOffer = async (req, res) => {
  try {
    const {
      coupon_code,
      title,
      discount_type,
      discount_value,
      min_booking_amount,
      expiry_date,
      active,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO offers
      (coupon_code, title, discount_type, discount_value, min_booking_amount, expiry_date, active)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        coupon_code,
        title,
        discount_type,
        discount_value,
        min_booking_amount,
        expiry_date,
        active,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Offer added successfully",
      offer: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all offers
const getOffers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM offers ORDER BY id DESC");

    res.json({
      success: true,
      total: result.rows.length,
      offers: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update offer
const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      coupon_code,
      title,
      discount_type,
      discount_value,
      min_booking_amount,
      expiry_date,
      active,
    } = req.body;

    const result = await pool.query(
      `UPDATE offers
       SET coupon_code = $1,
           title = $2,
           discount_type = $3,
           discount_value = $4,
           min_booking_amount = $5,
           expiry_date = $6,
           active = $7
       WHERE id = $8
       RETURNING *`,
      [
        coupon_code,
        title,
        discount_type,
        discount_value,
        min_booking_amount,
        expiry_date,
        active,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.json({
      success: true,
      message: "Offer updated successfully",
      offer: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete offer
const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM offers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Validate coupon
const validateCoupon = async (req, res) => {
  try {
    const { coupon_code, booking_amount } = req.body;

    const result = await pool.query(
      "SELECT * FROM offers WHERE coupon_code = $1",
      [coupon_code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const offer = result.rows[0];
    const today = new Date();
    const expiryDate = new Date(offer.expiry_date);

    if (!offer.active) {
      return res.status(400).json({
        success: false,
        message: "Coupon is not active",
      });
    }

    if (expiryDate < today) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    if (Number(booking_amount) < Number(offer.min_booking_amount)) {
      return res.status(400).json({
        success: false,
        message: `Minimum booking amount should be ${offer.min_booking_amount}`,
      });
    }

    let discountAmount = 0;

    if (offer.discount_type === "percentage") {
      discountAmount =
        (Number(booking_amount) * Number(offer.discount_value)) / 100;
    } else if (offer.discount_type === "flat") {
      discountAmount = Number(offer.discount_value);
    }

    const finalAmount = Number(booking_amount) - discountAmount;

    res.json({
      success: true,
      message: "Coupon applied successfully",
      coupon: offer.coupon_code,
      discount_type: offer.discount_type,
      discount_value: offer.discount_value,
      booking_amount: Number(booking_amount),
      discount_amount: discountAmount,
      final_amount: finalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addOffer,
  getOffers,
  updateOffer,
  deleteOffer,
  validateCoupon,
};