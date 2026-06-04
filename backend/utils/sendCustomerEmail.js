const nodemailer = require("nodemailer");

const sendCustomerEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log("Gmail credentials missing");
      return null;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const result = await transporter.sendMail({
      from: `"Sudagar Tour & Travels" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Customer Gmail email sent:", result.messageId);
    return result;
  } catch (error) {
    console.log("Customer Gmail email failed:", error);
    return null;
  }
};

module.exports = sendCustomerEmail;