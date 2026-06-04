function WhyChooseUs() {
  const features = [
    {
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=85",
      title: "Real Taxi at Airport",
      description:
        "Book reliable airport pickup and drop service anytime you need.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
      title: "Driver Helping Customer",
      description:
        "Experienced and polite drivers for safe, comfortable journeys.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=85",
      title: "Clean Luxury Interior",
      description:
        "Well-maintained vehicles for family, business and tour travel.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=85",
      title: "Happy Family Travelling",
      description:
        "Transparent fares with no hidden charges for every trip.",
    },
  ];

  return (
    <section className="why-section">
      <p className="section-small">Why Choose Us</p>
      <h2 className="section-title">Trusted Taxi Service</h2>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-image">
              <img src={item.image} alt={item.title} />
            </div>

            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;