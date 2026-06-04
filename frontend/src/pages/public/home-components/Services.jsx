const services = [
  {
    title: "Local City Transfer",
    text: "Comfortable rides anywhere inside your city at affordable prices.",
    image:
      "https://images.unsplash.com/photo-1556122071-e404eaedb77f?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Airport Transfer",
    text: "On-time airport pickup and drop service with clean taxis.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Outstation Trip",
    text: "Book reliable taxis for long-distance and outstation travel.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Tour Packages",
    text: "Explore popular destinations with flexible tour packages.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
  },
];

function Services() {
  return (
    <section className="services-section">
      <p className="section-small">Welcome</p>
      <h2 className="section-title">Our Services</h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className="service-card service-image-card"
            key={index}
            style={{ backgroundImage: `url(${service.image})` }}
          >
            <div className="service-overlay"></div>

            <div className="service-content">
              <span>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;