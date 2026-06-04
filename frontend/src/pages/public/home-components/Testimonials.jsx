function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonial-copy">
        <p className="section-small">Real Reviews</p>
        <h2 className="section-title">Trusted By Daily Travellers</h2>
        <p>
          Customers choose Sudagar Tour & Travels for clean vehicles, punctual pickups and comfortable long-distance rides.
        </p>
      </div>

      <div className="testimonials-grid">
        <div className="testimonial-card featured-review">
          <div className="review-stars">★★★★★</div>
          <p>“Very clean taxi and driver was on time. Best service for airport drop.”</p>
          <div className="review-person">
            <span>RS</span>
            <div>
              <h4>Rahul Sharma</h4>
              <small>Airport Transfer</small>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="review-stars">★★★★★</div>
          <p>“We booked SUV for family trip. Comfortable car and affordable price.”</p>
          <div className="review-person">
            <span>AV</span>
            <div>
              <h4>Amit Verma</h4>
              <small>Family Tour</small>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="review-stars">★★★★★</div>
          <p>“Good taxi service. Easy booking and polite driver.”</p>
          <div className="review-person">
            <span>PS</span>
            <div>
              <h4>Priya Singh</h4>
              <small>Local Ride</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
