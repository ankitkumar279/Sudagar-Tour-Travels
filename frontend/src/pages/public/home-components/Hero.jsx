function Hero({ scrollToBooking, scrollToCabs }) {
  return (
    <section className="hero">
      <div className="hero-shell">
        <div className="hero-content">
          

          <h1>
            Travel That Feels <br />
            <span>Personal, Clean & Premium</span>
          </h1>

          <p>
            Book dependable cabs for airport transfers, local rides, outstation
            journeys and curated tours with Sudagar Tour & Travels.
          </p>

          <div className="hero-buttons">
            <button onClick={scrollToBooking}>Book Your Ride</button>
            <button className="outline-btn" onClick={scrollToCabs}>
              View Fleet
            </button>
          </div>

          <div className="hero-trust-row">
            <div><b>24/7</b><span>Support</span></div>
            <div><b>Clean</b><span>Cars</span></div>
            <div><b>Trusted</b><span>Drivers</span></div>
          </div>
        </div>

        
      </div>
    </section>
  );
}

export default Hero;
