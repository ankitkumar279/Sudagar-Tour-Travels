import "./ContactPage.css";
import { useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const emptyContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function ContactPage() {
  const [contactForm, setContactForm] = useState(emptyContactForm);

  const handleContactChange = (e) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();

    try {
      await api.post("/enquiries", contactForm);
      toast.success("Message sent successfully");
      setContactForm(emptyContactForm);
    } catch (error) {
      console.log("Contact page error:", error.response?.data || error);
      toast.error("Message failed");
    }
  };

  return (
    <main className="contact-page-public">
      <section className="contact-hero-premium">
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">
          <p>Contact Sudagar Tour & Travels</p>
          <h1>Let’s Plan Your Comfortable Journey</h1>
          <span>
            Send your enquiry for taxi booking, tour packages, airport transfer
            or outstation travel. Our team will contact you shortly.
          </span>
        </div>
      </section>

      <section className="contact-premium-section">
        <div className="contact-info-card">
          <p className="contact-small">Get In Touch</p>
          <h2>Fast Support For Your Ride & Tour Plans</h2>

          <div className="contact-info-list">
            <div>
              <span>📞</span>
              <div>
                <h3>Call Support</h3>
                <p>Speak directly with our travel team.</p>
              </div>
            </div>

            <div>
              <span>💬</span>
              <div>
                <h3>WhatsApp Booking</h3>
                <p>Quick enquiry for taxi and tour packages.</p>
              </div>
            </div>

            <div>
              <span>📍</span>
              <div>
                <h3>Pickup Assistance</h3>
                <p>Share your pickup and destination details.</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-premium-form" onSubmit={submitEnquiry}>
          <p className="contact-small">Send Message</p>
          <h2>Tell Us What You Need</h2>

          <div className="contact-form-grid">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={handleContactChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={contactForm.email}
              onChange={handleContactChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={contactForm.phone}
              onChange={handleContactChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={contactForm.subject}
              onChange={handleContactChange}
            />
          </div>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={contactForm.message}
            onChange={handleContactChange}
            required
          ></textarea>

          <button type="submit">Send Enquiry</button>
        </form>
      </section>
    </main>
  );
}

export default ContactPage;