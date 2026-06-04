import { memo, useRef, useState } from "react";

const TourCard = memo(function TourCard({ tour }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? "tour-card tour-card-open" : "tour-card"}>
      <div className="tour-img">
        {tour.image_url ? (
          <img src={tour.image_url} alt={tour.title} loading="lazy" />
        ) : (
          "🧳"
        )}
      </div>

      <div className="tour-content">
        <p className="tour-location">📍 {tour.location}</p>

        <div className="tour-top">
          <span className="tour-status">
            {tour.availability ? "Available" : "Closed"}
          </span>

          <div className="tour-tags-public">
            <span>⏱ {tour.duration}</span>
            <span>₹{tour.price}</span>
          </div>
        </div>

        <p className="tour-desc-public">
          {open
            ? tour.description
            : `${tour.description?.slice(0, 145)}${
                tour.description?.length > 145 ? "..." : ""
              }`}
        </p>

        {tour.description?.length > 145 && (
          <button
            type="button"
            className="read-more-btn"
            onClick={() => setOpen(!open)}
          >
            {open ? "Show Less" : "Read More"}
          </button>
        )}

        <button
          className="explore-tour-btn"
          onClick={() => (window.location.href = `/tour-enquiry/${tour.id}`)}
        >
          Explore Tour
        </button>
      </div>
    </div>
  );
});

function TourSection({ tours, tourLoading }) {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current?.scrollBy({ left: -620, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current?.scrollBy({ left: 620, behavior: "smooth" });
  };

  return (
    <section className="tours-section">
      <p className="section-small">Explore</p>
      <h2 className="section-title">Popular Tours</h2>

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
        <div className="tour-slider-wrap">
         <button className="tour-slide-btn left" onClick={slideLeft}>
  ❬
</button>

          <div className="tour-slider" ref={sliderRef}>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <button className="tour-slide-btn right" onClick={slideRight}>
  ❭
</button>
        </div>
      )}
    </section>
  );
}

export default memo(TourSection);
