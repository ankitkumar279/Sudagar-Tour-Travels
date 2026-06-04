import { memo } from "react";

const TourCard = memo(function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <div className="tour-img">
        {tour.image_url ? <img src={tour.image_url} alt={tour.title} loading="lazy" /> : "🧳"}
      </div>

      <div className="tour-content">
        <p className="tour-location">📍 {tour.location}</p>

        <div className="tour-top">
          <span className="tour-status">{tour.availability ? "Available" : "Closed"}</span>

          <div className="tour-tags-public">
            <span>⏱ {tour.duration}</span>
            <span>₹{tour.price}</span>
          </div>
        </div>

        <p className="tour-desc-public">{tour.description}</p>
       <button onClick={() => window.location.href = `/tour-enquiry/${tour.id}`}>
  Explore Tour
</button>
      </div>
    </div>
  );
});

function TourSection({ tours, tourLoading }) {
  return (
    <section className="tours-section">
      <p className="section-small">Explore</p>
      <h2 className="section-title">Popular Tours</h2>

      <div className="tour-grid">
        {tourLoading ? (
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
          tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        )}
      </div>
    </section>
  );
}

export default memo(TourSection);
