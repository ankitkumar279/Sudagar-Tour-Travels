import "./ToursPage.css";
import { useEffect, useState } from "react";
import api from "../../api/api";

const fallbackImages = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=80",
];

function ToursPage() {
  const [tours, setTours] = useState([]);
  const [tourLoading, setTourLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const backendURL = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    if (!tours.length) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % tours.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [tours]);

  const fetchTours = async () => {
    try {
      setTourLoading(true);
      const response = await api.get("/tours");
      setTours(response.data.tours || []);
    } catch (error) {
      console.log("Tours page error:", error.response?.data || error);
    } finally {
      setTourLoading(false);
    }
  };

  const getTourImage = (tour, index = 0) => {
    if (tour?.image_url) return tour.image_url;
    if (tour?.image) return `${backendURL}/uploads/${tour.image}`;
    return fallbackImages[index % fallbackImages.length];
  };

  const goToBooking = () => {
    window.location.href = "/#booking";
  };

  if (tourLoading) {
    return (
      <main className="tours-page-new">
        <section className="tour-premium-loader">
          <div className="tour-loader-hero"></div>
          <div className="tour-loader-row">
            <div></div>
            <div></div>
          </div>
        </section>
      </main>
    );
  }

  const heroTour = tours[activeSlide];

  return (
    <main className="tours-page-new">
      <section className="tour-premium-hero">
        <img
          key={activeSlide}
          src={getTourImage(heroTour, activeSlide)}
          alt={heroTour?.title || "Tour"}
        />

        <div className="tour-hero-shade"></div>

        <div className="tour-hero-inner">
          <div className="tour-hero-left">
            <p className="tour-eyebrow">Sudagar Private Journeys</p>
            <h1>{heroTour?.title || "Discover India In Comfort"}</h1>
            <span>{heroTour?.description || "Premium tour packages with comfortable travel and trusted service."}</span>

            <div className="tour-hero-actions">
              <button onClick={goToBooking}>Plan This Journey</button>
              <a href="#tour-collection">View Collection</a>
            </div>
          </div>

          <div className="tour-hero-card">
            <small>Featured Escape</small>
            <h3>{heroTour?.location || "India"}</h3>

            <div>
              <b>{heroTour?.availability ? "Available" : "Closed"}</b>
              <b>{heroTour?.duration || "Flexible"}</b>
              <b>₹{heroTour?.price || "Best Price"}</b>
            </div>
          </div>
        </div>

        <div className="tour-hero-dots">
          {tours.map((_, index) => (
            <button
              key={index}
              className={activeSlide === index ? "active" : ""}
              onClick={() => setActiveSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      <section className="tour-intro-strip">
        <div>
          <h2>Handpicked Trips</h2>
          <p>Designed for families, groups, airport travel, weekend escapes and comfortable private tours.</p>
        </div>

        <div>
          <h2>Clean Travel</h2>
          <p>Reliable cabs, polite drivers and smooth planning from pickup to destination.</p>
        </div>

        <div>
          <h2>Clear Pricing</h2>
          <p>Simple package details with no confusing layout or hidden presentation.</p>
        </div>
      </section>

      <section className="tour-editorial-section" id="tour-collection">
        <div className="tour-section-heading">
          <p>Premium Tour Collection</p>
          <h2>Choose Your Next Private Escape</h2>
        </div>

        <div className="tour-editorial-list">
          {tours.map((tour, index) => (
            <article className="tour-editorial-card" key={tour.id}>
              <div className="tour-card-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="tour-card-image">
                <img src={getTourImage(tour, index)} alt={tour.title} />
              </div>

              <div className="tour-card-content">
                <p>{tour.location}</p>
                <h3>{tour.title}</h3>

                <div className="tour-card-meta">
                  <span>{tour.availability ? "Available" : "Closed"}</span>
                  <span>{tour.duration}</span>
                  <span>₹{tour.price}</span>
                </div>

                <p className="tour-desc">{tour.description}</p>

                <button onClick={goToBooking}>Reserve Package</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ToursPage;