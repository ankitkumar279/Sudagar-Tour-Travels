import "./AdminOffers.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    coupon_code: "",
    title: "",
    discount_type: "percentage",
    discount_value: "",
    min_booking_amount: "",
    expiry_date: "",
    active: true,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await api.get("/offers");

      setOffers(response.data.offers || []);
    } catch (error) {
      console.log("Fetch offers error:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "active" ? value === "true" : value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      coupon_code: "",
      title: "",
      discount_type: "percentage",
      discount_value: "",
      min_booking_amount: "",
      expiry_date: "",
      active: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/offers/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post("/offers", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      resetForm();
      fetchOffers();
    } catch (error) {
      console.log("Save offer error:", error.response?.data || error);
      alert(error.response?.data?.message || "Offer save failed");
    }
  };

  const handleEdit = (offer) => {
    setEditingId(offer.id);

    setForm({
      coupon_code: offer.coupon_code || "",
      title: offer.title || "",
      discount_type: offer.discount_type || "percentage",
      discount_value: offer.discount_value || "",
      min_booking_amount: offer.min_booking_amount || "",
      expiry_date: offer.expiry_date
        ? offer.expiry_date.split("T")[0]
        : "",
      active: Boolean(offer.active),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this offer?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOffers();
    } catch (error) {
      console.log("Delete offer error:", error.response?.data || error);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="offers-page">
        <div className="offers-header">
          <div>
            <p>Offers Management</p>
            <h1>Manage Coupons</h1>
          </div>

          <span>{offers.length} Offers</span>
        </div>

        <form className="offer-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="coupon_code"
            placeholder="Coupon Code"
            value={form.coupon_code}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Offer Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="discount_type"
            value={form.discount_type}
            onChange={handleChange}
          >
            <option value="percentage">Percentage</option>
            <option value="flat">Flat</option>
          </select>

          <input
            type="number"
            name="discount_value"
            placeholder="Discount Value"
            value={form.discount_value}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="min_booking_amount"
            placeholder="Minimum Booking Amount"
            value={form.min_booking_amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            required
          />

          <select
            name="active"
            value={String(form.active)}
            onChange={handleChange}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <div className="offer-actions">
            <button type="submit">
              {editingId ? "Update Offer" : "Add Offer"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="offers-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <div className="offer-top">
                <span className="coupon-code">
                  {offer.coupon_code}
                </span>

                <span
                  className={
                    offer.active ? "offer-status active" : "offer-status inactive"
                  }
                >
                  {offer.active ? "Active" : "Inactive"}
                </span>
              </div>

              <h3>{offer.title}</h3>

              <div className="offer-info">
                <span>
                  {offer.discount_type === "percentage"
                    ? `${offer.discount_value}% OFF`
                    : `₹${offer.discount_value} OFF`}
                </span>

                <span>
                  Min ₹{offer.min_booking_amount}
                </span>
              </div>

              <p className="expiry">
                Expiry:{" "}
                {offer.expiry_date
                  ? new Date(offer.expiry_date).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="offer-buttons">
                <button onClick={() => handleEdit(offer)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(offer.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {offers.length === 0 && (
            <div className="empty-box">
              No offers found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOffers;