function Offers({ offers, scrollToBooking }) {
  const activeOffers = offers.filter((offer) => offer.active);

  if (activeOffers.length === 0) return null;

  return (
    <section className="offers-section">
      <div className="offers-bg-label">Limited Fare Benefits</div>

      <div className="offers-header">
        <p className="section-small">Special Offer</p>
        <h2 className="section-title">Private Ride Deals</h2>
        <p>
          Premium taxi offers for airport transfers, family tours and outstation journeys.
        </p>
      </div>

      <div className="offers-public-grid">
        {activeOffers.map((offer) => (
          <div className="offer-box" key={offer.id}>
            <div className="offer-content">
              <span className="offer-pill">Coupon • {offer.coupon_code}</span>
              <h2>{offer.title}</h2>

              <p>
                Use coupon code <b>{offer.coupon_code}</b> and get{" "}
                <b>
                  {offer.discount_type === "percentage"
                    ? `${offer.discount_value}% OFF`
                    : `₹${offer.discount_value} OFF`}
                </b>
              </p>

              <p className="offer-minimum">
                Minimum booking amount: ₹{offer.min_booking_amount}
              </p>
            </div>

            <div className="offer-action">
              <div className="offer-code-card">
                <small>Use Code</small>
                <strong>{offer.coupon_code}</strong>
              </div>
              <button onClick={scrollToBooking}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Offers;
