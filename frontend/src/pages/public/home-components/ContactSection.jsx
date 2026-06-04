function ContactSection({ contactForm, handleContactChange, submitEnquiry }) {
  return (
    <section className="contact-section">
      <div className="contact-left">
        <p className="section-small">Contact Us</p>
        <h2 className="section-title">Plan Your Next Ride</h2>

        <p className="contact-text">
          Book local rides, airport transfers, outstation trips and tour packages with Sudagar Tour & Travels.
        </p>

        <div className="contact-info">
          <div className="contact-item"><span>📞</span><p>+91 800-5-800</p></div>
          <div className="contact-item"><span>📍</span><p>Faridabad, Haryana</p></div>
          <div className="contact-item"><span>✉️</span><p>sudagartours@gmail.com</p></div>
        </div>

        <div className="contact-note">
          <b>Fast confirmation</b>
          <small>Our team usually confirms ride details shortly after enquiry.</small>
        </div>
      </div>

      <form className="contact-form" onSubmit={submitEnquiry}>
        <div className="form-title">
          <span>Ride Enquiry</span>
          <h3>Send us your trip details</h3>
        </div>

        <input type="text" name="name" placeholder="Your Name" value={contactForm.name} onChange={handleContactChange} required />
        <input type="email" name="email" placeholder="Email Address" value={contactForm.email} onChange={handleContactChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={contactForm.phone} onChange={handleContactChange} required />
        <input type="text" name="subject" placeholder="Subject" value={contactForm.subject} onChange={handleContactChange} required />
        <textarea name="message" rows="5" placeholder="Write Your Message" value={contactForm.message} onChange={handleContactChange} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default ContactSection;
