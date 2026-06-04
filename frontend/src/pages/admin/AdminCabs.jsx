import "./AdminCabs.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminCabs() {
  const [cabs, setCabs] = useState([]);
  const [editingId, setEditingId] = useState(null);

 const [form, setForm] = useState({
  cab_name: "",
  category: "",
  seats: "",
  ac_type: "",
  price_per_km: "",
  availability: true,
  image: null,
});

  useEffect(() => {
    fetchCabs();
  }, []);

  const token = localStorage.getItem("token");

  const fetchCabs = async () => {
    try {
      const response = await api.get("/cabs");
      setCabs(response.data.cabs || []);
    } catch (error) {
      console.log("Fetch cabs error:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const resetForm = () => {
    setForm({
      cab_name: "",
      category: "",
      seats: "",
      ac_type: "",
      price_per_km: "",
      availability: true,
      image: null,
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/cabs/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        const formData = new FormData();

        formData.append("cab_name", form.cab_name);
        formData.append("category", form.category);
        formData.append("seats", form.seats);
        formData.append("ac_type", form.ac_type);
        formData.append("price_per_km", form.price_per_km);
        formData.append("availability", form.availability);

        if (form.image) {
          formData.append("image", form.image);
        }

        await api.post("/cabs", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      fetchCabs();
    } catch (error) {
      console.log("Save cab error:", error.response?.data || error);
      alert(error.response?.data?.message || "Cab save failed");
    }
  };

  const handleEdit = (cab) => {
    setEditingId(cab.id);

    setForm({
      cab_name: cab.cab_name || "",
      category: cab.category || "",
      seats: cab.seats || "",
      ac_type: cab.ac_type || "",
      price_per_km: cab.price_per_km || "",
      availability: cab.availability ?? true,
      image: null,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this cab?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/cabs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCabs();
    } catch (error) {
      console.log("Delete cab error:", error.response?.data || error);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="cabs-page">
        <div className="cabs-header">
          <div>
            <p>Fleet Management</p>
            <h1>Manage Cabs</h1>
          </div>
          <span>{cabs.length} Cabs</span>
        </div>

        <form className="cab-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="cab_name"
            placeholder="Cab Name"
            value={form.cab_name}
            onChange={handleChange}
            required
          />

          <select
  name="category"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option value="Standard">Standard</option>
  <option value="SUV">SUV</option>
  <option value="Sedan">Sedan</option>
  <option value="Traveller">Traveller</option>
</select>

          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={form.seats}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="ac_type"
            placeholder="AC Type"
            value={form.ac_type}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price_per_km"
            placeholder="Price Per KM"
            value={form.price_per_km}
            onChange={handleChange}
            required
          />

          <select
  name="availability"
  value={form.availability}
  onChange={(e) =>
    setForm({
      ...form,
      availability: e.target.value === "true",
    })
  }
>
  <option value="true">Available</option>
  <option value="false">Not Available</option>
</select>

          {!editingId && (
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          )}

          <div className="form-actions">
            <button type="submit">
              {editingId ? "Update Cab" : "Add Cab"}
            </button>

            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="cabs-grid">
          {cabs.map((cab) => (
            <div className="cab-admin-card" key={cab.id}>
              <div className="cab-image-box">
                {cab.image ? (
                  <img
                    src={cab.image}
                    alt={cab.cab_name}
                  />
                ) : (
                  <span>🚕</span>
                )}
              </div>

              <div className="cab-info">
                <h3>{cab.cab_name}</h3>
                <p>{cab.category}</p>

                <div className="cab-details">
                  <span>Seats: {cab.seats}</span>
                  <span>{cab.ac_type}</span>
                  <span>₹{cab.price_per_km}/km</span>
                  <span>{cab.availability}</span>
                </div>

                <div className="cab-actions">
                  <button onClick={() => handleEdit(cab)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(cab.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCabs;