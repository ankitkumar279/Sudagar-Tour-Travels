const pool = require("../config/db");
const generateBookingId = require("../utils/generateBookingId");
const sendEmail = require("../utils/sendEmail");
const sendCustomerEmail = require("../utils/sendCustomerEmail");


const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      pickup_location,
      drop_location,
      pickup_datetime,
      return_datetime,
      trip_type,
      cab_type,
      passengers,
      special_instructions,
      original_price,
      coupon_code,
      discount_amount,
      final_price,
    } = req.body;

    let customerResult = await pool.query(
      "SELECT * FROM customers WHERE phone = $1",
      [phone]
    );

    let customer;

    if (customerResult.rows.length === 0) {
      const newCustomer = await pool.query(
        `INSERT INTO customers (name, phone, email, total_bookings)
         VALUES ($1, $2, $3, 1)
         RETURNING *`,
        [name, phone, email]
      );

      customer = newCustomer.rows[0];
    } else {
      const updatedCustomer = await pool.query(
        `UPDATE customers
         SET name = $1, email = $2, total_bookings = total_bookings + 1
         WHERE phone = $3
         RETURNING *`,
        [name, email, phone]
      );

      customer = updatedCustomer.rows[0];
    }

    const bookingId = generateBookingId();

    const bookingResult = await pool.query(
      `INSERT INTO bookings (
        booking_id, customer_id, name, phone, email,
        pickup_location, drop_location, pickup_datetime, return_datetime,
        trip_type, cab_type, passengers, special_instructions,
        original_price, coupon_code, discount_amount, final_price
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12, $13,
        $14, $15, $16, $17
      )
      RETURNING *`,
      [
        bookingId,
        customer.id,
        name,
        phone,
        email,
        pickup_location,
        drop_location,
        pickup_datetime,
        return_datetime || null,
        trip_type,
        cab_type,
        passengers || 1,
        special_instructions,
        original_price || 0,
        coupon_code,
        discount_amount || 0,
        final_price || 0,
      ]
    );

    const booking = bookingResult.rows[0];

    if (email) {
  sendCustomerEmail({
    to: email,
    subject: "Booking Request Received - Sudagar Tour & Travels",
    html: `
      <h2>Booking Request Received</h2>
      <p>Hello ${name},</p>
      <p>Your taxi booking request has been received successfully.</p>

      <h3>Booking Details</h3>
      <p><b>Booking ID:</b> ${booking.booking_id}</p>
      <p><b>Pickup:</b> ${pickup_location}</p>
      <p><b>Drop:</b> ${drop_location}</p>
      <p><b>Date & Time:</b> ${pickup_datetime}</p>
      <p><b>Trip Type:</b> ${trip_type}</p>
      <p><b>Cab Type:</b> ${cab_type}</p>
      <p><b>Passengers:</b> ${passengers || 1}</p>
      <p><b>Final Price:</b> ₹${final_price || 0}</p>

      <br />
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.7;">
  <p style="font-size: 16px; margin-bottom: 18px;">
    Thank you for choosing 
    <strong style="color: #f5b400;">
      Sudagar Tour & Travels
    </strong>.
  </p>

  <p style="font-size: 15px; margin-bottom: 18px;">
    Your booking request has been received successfully. Our team is currently reviewing your details and will contact you shortly to confirm your ride and assist you further.
  </p>

  <div
    style="
      background: #fff8e6;
      border-left: 4px solid #f5b400;
      padding: 14px 18px;
      margin: 20px 0;
      border-radius: 6px;
    "
  >
    <p style="margin: 0; font-size: 15px;">
      🚖 Reliable Service • Professional Drivers • 24/7 Support
    </p>
  </div>

  <p style="font-size: 15px; margin-bottom: 10px;">
    We appreciate your trust in us and look forward to serving you.
  </p>

  <p style="margin-top: 30px; font-size: 15px;">
    Warm Regards,<br />
    <strong>Sudagar Tour & Travels</strong>
  </p>
</div>
    `,
  }).catch((error) => {
    console.log(
      "Customer Gmail email failed:",
      error.message
    );
  });
}

    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Taxi Booking Received",
        html: `
          <h2>New Booking Received</h2>
          <p><b>Booking ID:</b> ${booking.booking_id}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Email:</b> ${email || "No email"}</p>
          <p><b>Pickup:</b> ${pickup_location}</p>
          <p><b>Drop:</b> ${drop_location}</p>
          <p><b>Date & Time:</b> ${pickup_datetime}</p>
          <p><b>Trip Type:</b> ${trip_type}</p>
          <p><b>Cab Type:</b> ${cab_type}</p>
          <p><b>Passengers:</b> ${passengers || 1}</p>
          <p><b>Final Price:</b> ₹${final_price || 0}</p>
        `,
      }).catch((error) => {
        console.log("Admin booking email failed:", error.message);
      });
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
      customer,
    });
  } catch (error) {
    console.log("Booking error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
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

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_status } = req.body;

    const result = await pool.query(
      `UPDATE bookings
       SET booking_status = $1
       WHERE id = $2
       RETURNING *`,
      [booking_status, id]
    );

    res.json({
      success: true,
      message: "Booking status updated",
      booking: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
};