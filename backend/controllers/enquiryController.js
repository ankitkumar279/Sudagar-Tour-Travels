const pool = require("../config/db");
const sendEmail = require("../utils/sendEmail");
const sendCustomerEmail = require("../utils/sendCustomerEmail");

const addEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, subject and message are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO enquiries 
      (name, email, phone, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [name, email || null, phone || null, subject, message]
    );

    const enquiry = result.rows[0];

    if (email) {
      sendCustomerEmail({
        to: email,
        subject: "We Received Your Tour Enquiry - Sudagar Tour & Travels",
        html: `
          <div style="font-family:Arial,sans-serif;background:#f7f2e8;padding:30px;">
            <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;">
              <div style="background:#111;padding:26px;text-align:center;">
                <h1 style="color:#ffd000;margin:0;">Sudagar Tour & Travels</h1>
                <p style="color:#ffffff;margin:8px 0 0;">Your enquiry has been received</p>
              </div>

              <div style="padding:30px;color:#222;">
                <h2 style="margin-top:0;">Hello ${name},</h2>

                <p style="font-size:16px;line-height:1.7;">
                  Thank you for contacting Sudagar Tour & Travels. We have received your enquiry successfully.
                  Our team will review your details and contact you shortly.
                </p>

                <div style="background:#fff8dc;border-left:5px solid #ffd000;padding:18px;border-radius:12px;margin:24px 0;">
                  <p><b>Subject:</b> ${subject}</p>
                  <p style="white-space:pre-line;"><b>Your Details:</b><br>${message}</p>
                </div>

                <p style="font-size:16px;">For urgent support, you can reply to this email.</p>

                <p style="margin-top:30px;">
                  Regards,<br/>
                  <b>Sudagar Tour & Travels Team</b>
                </p>
              </div>
            </div>
          </div>
        `,
      }).catch((error) => {
        console.log("Customer enquiry email failed:", error.message);
      });
    }

    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Enquiry Received - ${subject}`,
        html: `
          <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">
            <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;">
              <div style="background:#111;padding:24px;">
                <h2 style="color:#ffd000;margin:0;">New Enquiry Received</h2>
                <p style="color:#fff;margin:8px 0 0;">Sudagar Tour & Travels Admin Notification</p>
              </div>

              <div style="padding:28px;color:#222;">
                <h3>Customer Details</h3>

                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email || "No email"}</p>
                <p><b>Phone:</b> ${phone || "No phone"}</p>
                <p><b>Subject:</b> ${subject}</p>

                <div style="background:#fff8dc;border-left:5px solid #ffd000;padding:18px;border-radius:12px;margin-top:20px;">
                  <h3 style="margin-top:0;">Message</h3>
                  <p style="white-space:pre-line;">${message}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      }).catch((error) => {
        console.log("Admin enquiry email failed:", error.message);
      });
    }

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.log("Enquiry error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM enquiries ORDER BY id DESC");

    res.json({
      success: true,
      total: result.rows.length,
      enquiries: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE enquiries
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry status updated successfully",
      enquiry: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM enquiries WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};  