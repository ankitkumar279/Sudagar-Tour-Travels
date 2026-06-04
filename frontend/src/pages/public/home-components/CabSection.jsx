import { memo } from "react";

const CabCard = memo(function CabCard({ cab, scrollToBooking }) {
  return (
    <div className="cab-card">
      <div className="cab-img">
        {cab.image ? <img src={cab.image} alt={cab.cab_name} loading="lazy" /> : "🚕"}
      </div>

      <h3>{cab.cab_name}</h3>
      <p>{cab.category}</p>

      <div className="public-cab-tags">
        <span>{cab.seats} Seats</span>
        <span>{cab.ac_type}</span>
      </div>

      <h4>₹{cab.price_per_km}/km</h4>
      <button onClick={scrollToBooking}>Book Now</button>
    </div>
  );
});

function CabSection({ cabs, cabLoading, scrollToBooking }) {
  return (
    <section className="tariff-section">
      <p className="section-small">See Our</p>
      <h2 className="section-title">Tariffs</h2>

      <div className="tariff-grid">
        {cabLoading ? (
          <div className="skeleton-grid">
            {[1, 2, 3].map((item) => (
              <div className="skeleton-card" key={item}>
                <div className="skeleton-image"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line small"></div>
              </div>
            ))}
          </div>
        ) : (
          cabs.map((cab) => <CabCard key={cab.id} cab={cab} scrollToBooking={scrollToBooking} />)
        )}
      </div>
    </section>
  );
}

export default memo(CabSection);
