import "./TourEnquiry.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

function TourEnquiry() {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    travelDate: "",
    pickupLocation: "",
    message: "",
  });

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      const res = await api.get(`/tours/${id}`);
      setTour(res.data.tour);
    } catch (error) {
      console.log("Tour fetch error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      await api.post("/enquiries", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Tour Booking Enquiry - ${tour?.title}`,
        message: `
Tour Name: ${tour?.title}
Location: ${tour?.location}
Duration: ${tour?.duration}
Price: ₹${tour?.price}

Customer Details:
Persons: ${form.persons}
Travel Date: ${form.travelDate}
Pickup Location: ${form.pickupLocation}

Message:
${form.message || "No extra message"}
        `,
      });

    toast.success(
  "Thank you! Your tour enquiry has been submitted successfully.",
  {
    duration: 4000,
  }
);

      setForm({
        name: "",
        email: "",
        phone: "",
        persons: "",
        travelDate: "",
        pickupLocation: "",
        message: "",
      });
    } catch (error) {
      console.log("Tour enquiry error:", error.response?.data || error);
     toast.error(
  "Unable to submit enquiry. Please try again.",
  {
    duration: 4000,
  }
);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <h2 className="tour-enquiry-loading">Loading Tour...</h2>;
  }

  return (
    <main className="tour-enquiry-page">
      <section
        className="tour-enquiry-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.72)), url(${tour?.image_url})`,
        }}
      >
        <div>
          <p>Premium Tour Enquiry</p>
          <h1>{tour?.title}</h1>
          <span>📍 {tour?.location}</span>
        </div>
      </section>

      <section className="tour-enquiry-wrap">
        <div className="tour-summary-card">
          <img src={tour?.image_url} alt={tour?.title} />

          <h2>{tour?.title}</h2>
          <p>{tour?.description}</p>

          <div className="tour-summary-info">
            <span>⏱ {tour?.duration}</span>
            <span>₹{tour?.price}</span>
            <span>{tour?.availability ? "Available" : "Closed"}</span>
          </div>
        </div>

        <form className="tour-enquiry-form" onSubmit={submitEnquiry}>
          <p>Book Your Experience</p>
          <h2>Send Tour Enquiry</h2>

          <div className="form-row">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              name="persons"
              type="number"
              min="1"
              placeholder="How many persons?"
              value={form.persons}
              onChange={handleChange}
              required
            />

            <input
              name="travelDate"
              type="date"
              value={form.travelDate}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="pickupLocation"
            placeholder="Pickup Location"
            value={form.pickupLocation}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Any special request?"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Submit Tour Enquiry"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default TourEnquiry;