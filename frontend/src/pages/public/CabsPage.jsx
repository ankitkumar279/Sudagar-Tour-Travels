import "./CabsPage.css";
import { useEffect, useState } from "react";
import api from "../../api/api";

const luxuryFallbackImages = [
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
];

function CabsPage() {
  const [cabs, setCabs] = useState([]);
  const [cabLoading, setCabLoading] = useState(true);
  const [activeCab, setActiveCab] = useState(0);

  const backendURL = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      setCabLoading(true);
      const response = await api.get("/cabs");
      setCabs(response.data.cabs || []);
    } catch (error) {
      console.log("Cabs page error:", error.response?.data || error);
    } finally {
      setCabLoading(false);
    }
  };

  const getCabImage = (cab, index = 0) => {
  if (cab?.image) {
    return cab.image;
  }

    if (cab?.category === "SUV") {
      return luxuryFallbackImages[1];
    }

    if (cab?.category === "Traveller") {
      return luxuryFallbackImages[2];
    }

    if (cab?.category === "Sedan") {
      return luxuryFallbackImages[3];
    }

    return luxuryFallbackImages[index % luxuryFallbackImages.length];
  };

  const getCabPrice = (cab) => {
    if (cab?.price_per_km) {
      return `₹${cab.price_per_km}/km`;
    }

    return "₹Best Price";
  };

  const goToBooking = () => {
    window.location.href = "/#booking";
  };

 if (cabLoading) {
  return (
    <main className="cabs-page-new">
      <section className="cab-skeleton-container">

        <div className="cab-skeleton-hero"></div>

        <div className="cab-skeleton-title"></div>

        <div className="cab-skeleton-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="cab-skeleton-card" key={item}>
              <div className="cab-skeleton-image"></div>
              <div className="cab-skeleton-line"></div>
              <div className="cab-skeleton-line short"></div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}

  const selectedCab = cabs[activeCab];
  const selectedImage = getCabImage(selectedCab, activeCab);

  return (
    <main className="cabs-page-new">
      <section className="cab-luxury-hero">
        <div className="cab-hero-bg"></div>

        <div className="cab-hero-content">
          <p>Executive Taxi Experience</p>
          <h1>Travel In Comfort, Arrive In Style</h1>
          <span>
            Premium cars, trained drivers, clean interiors and smooth rides for
            airport transfers, local travel and outstation journeys.
          </span>

          <div className="cab-hero-actions">
            <button onClick={goToBooking}>Reserve Your Ride</button>
            <a href="#fleet">Explore Fleet</a>
          </div>
        </div>

        <div className="cab-hero-showcase">
          <img src={selectedImage} alt={selectedCab?.cab_name || "Luxury cab"} />

          <div className="cab-price-glass">
            <small>Selected Ride</small>
            <b>{selectedCab?.cab_name || "Premium Cab"}</b>
            <strong>{getCabPrice(selectedCab)}</strong>
          </div>
        </div>
      </section>

      <section className="cab-luxury-stats">
        <div>
          <h2>24/7</h2>
          <p>Available Service</p>
        </div>

        <div>
          <h2>100%</h2>
          <p>Clean Vehicles</p>
        </div>

        <div>
          <h2>Safe</h2>
          <p>Verified Drivers</p>
        </div>

        <div>
          <h2>Fair</h2>
          <p>Clear Pricing</p>
        </div>
      </section>

      <section className="cab-fleet-section" id="fleet">
        <p className="section-small">Luxury Collection</p>
        <h2 className="section-title">Choose A Ride That Matches Your Journey</h2>

        <div className="cab-luxury-selector">
          {cabs.map((cab, index) => (
            <button
              key={cab.id}
              className={activeCab === index ? "active" : ""}
              onClick={() => setActiveCab(index)}
            >
              <img src={getCabImage(cab, index)} alt={cab.cab_name || "Cab"} />

              <span>{cab.cab_name || "Premium Cab"}</span>
              <small>{getCabPrice(cab)}</small>
            </button>
          ))}
        </div>

        {selectedCab && (
          <div className="cab-feature-panel" key={activeCab}>
            <div className="cab-panel-image">
              <img src={selectedImage} alt={selectedCab.cab_name || "Cab"} />
            </div>

            <div className="cab-panel-content">
              <p>Signature Ride</p>
              <h3>{selectedCab.cab_name || "Premium Cab"}</h3>

              <div className="cab-panel-tags">
                <span>🚕 {selectedCab.category || "Premium"}</span>
                <span>👥 {selectedCab.seats || "4"} Seats</span>
                <span>❄️ {selectedCab.ac_type || "AC"}</span>
                <span>{getCabPrice(selectedCab)}</span>
              </div>

              <p className="cab-panel-desc">
                A comfortable, clean and reliable ride designed for airport
                transfers, city rides, family trips and outstation travel.
              </p>

              <button onClick={goToBooking}>Book This Ride</button>
            </div>
          </div>
        )}
      </section>

      <section className="cab-luxury-banner">
        <div>
          <p>Private Travel Standard</p>
          <h2>Not Just A Taxi. A Better Travel Experience.</h2>
        </div>
      </section>

      <section className="cab-benefits">
        <div>
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80"
            alt="Professional driver"
          />
          <span>01</span>
          <h3>Professional Drivers</h3>
          <p>Polite, experienced and route-aware drivers for a smooth journey.</p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1511527844068-006b95d162c2?auto=format&fit=crop&w=900&q=80"
            alt="Luxury car interior"
          />
          <span>02</span>
          <h3>Premium Comfort</h3>
          <p>Clean interiors, comfortable seats and a relaxing travel experience.</p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
            alt="City taxi service"
          />
          <span>03</span>
          <h3>Easy Booking</h3>
          <p>Book local, airport and outstation rides quickly with clear pricing.</p>
        </div>
      </section>
    </main>
  );
}

export default CabsPage;