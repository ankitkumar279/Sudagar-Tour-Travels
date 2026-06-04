import "./AdminTours.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminTours() {
  const [tours, setTours] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    description: "",
    image_url: "",
    availability: true,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await api.get("/tours");
      setTours(response.data.tours || []);
    } catch (error) {
      console.log("Fetch tours error:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "availability" ? value === "true" : value,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      location: "",
      duration: "",
      price: "",
      description: "",
      image_url: "",
      availability: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/tours/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/tours", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      resetForm();
      fetchTours();
    } catch (error) {
      console.log("Save tour error:", error.response?.data || error);
      alert(error.response?.data?.message || "Tour save failed");
    }
  };

  const handleEdit = (tour) => {
    setEditingId(tour.id);

    setForm({
      title: tour.title || "",
      location: tour.location || "",
      duration: tour.duration || "",
      price: tour.price || "",
      description: tour.description || "",
      image_url: tour.image_url || "",
      availability: Boolean(tour.availability),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this tour package?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTours();
    } catch (error) {
      console.log("Delete tour error:", error.response?.data || error);
      alert("Tour delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="tours-page">
        <div className="tours-header">
          <div>
            <p>Tour Package Management</p>
            <h1>Manage Tours</h1>
          </div>

          <span>{tours.length} Tours</span>
        </div>

        <form className="tour-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Tour Title" value={form.title} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input type="text" name="duration" placeholder="Duration e.g. 3 Days / 2 Nights" value={form.duration} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input type="text" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />

          <select name="availability" value={String(form.availability)} onChange={handleChange}>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

          <textarea name="description" placeholder="Tour Description" value={form.description} onChange={handleChange} rows="4"></textarea>

          <div className="tour-form-actions">
            <button type="submit">{editingId ? "Update Tour" : "Add Tour"}</button>

            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="tours-grid-admin">
          {tours.map((tour) => (
            <div className="tour-admin-card" key={tour.id}>
              <div className="tour-image">
                {tour.image_url ? <img src={tour.image_url} alt={tour.title} /> : <span>🧳</span>}
              </div>

              <div className="tour-content">
                <div className="tour-top">
                  {/* <h3>{tour.title}</h3> */}
                  <span>{tour.availability ? "Available" : "Not Available"}</span>
                </div>

                <p className="tour-location">📍 {tour.location}</p>

                <div className="tour-tags">
                  <span>⏱ {tour.duration}</span>
                  <span>₹{tour.price}</span>
                </div>

                <p className="tour-desc">{tour.description || "No description added."}</p>

                <div className="tour-actions">
                  <button onClick={() => handleEdit(tour)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(tour.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {tours.length === 0 && <div className="empty-box">No tours found</div>}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminTours;