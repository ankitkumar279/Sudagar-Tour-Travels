import "./AdminBookings.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.log("Fetch bookings error:", error.response?.data || error);
    }
  };

  const updateStatus = async (id, booking_status) => {
    try {
      await api.put(
        `/bookings/${id}/status`,
        { booking_status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {
      console.log("Update status error:", error.response?.data || error);
      alert("Status update failed");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const text = `
      ${booking.booking_id}
      ${booking.name}
      ${booking.phone}
      ${booking.pickup_location}
      ${booking.drop_location}
      ${booking.cab_type}
      ${booking.booking_status}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="bookings-page">
        <div className="bookings-header">
          <div>
            <p>Booking Management</p>
            <h1>Manage Bookings</h1>
          </div>

          <span>{filteredBookings.length} Bookings</span>
        </div>

        <div className="booking-tools">
          <input
            type="text"
            placeholder="Search by name, phone, booking id, pickup, drop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-top">
                <div>
                  <h3>{booking.booking_id}</h3>
                  <p>{booking.name} • {booking.phone}</p>
                </div>

                <span className={`status-badge ${booking.booking_status}`}>
                  {booking.booking_status || "pending"}
                </span>
              </div>

              <div className="booking-info-grid">
                <div>
                  <small>Pickup</small>
                  <p>{booking.pickup_location}</p>
                </div>

                <div>
                  <small>Drop</small>
                  <p>{booking.drop_location}</p>
                </div>

                <div>
                  <small>Date & Time</small>
                  <p>
                    {booking.pickup_datetime
                      ? new Date(booking.pickup_datetime).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <small>Cab Type</small>
                  <p>{booking.cab_type || "N/A"}</p>
                </div>

                <div>
                  <small>Passengers</small>
                  <p>{booking.passengers || 1}</p>
                </div>

                <div>
                  <small>Final Price</small>
                  <p>₹{booking.final_price || 0}</p>
                </div>
              </div>

              <div className="booking-actions">
                <select
                  value={booking.booking_status || "pending"}
                  onChange={(e) => updateStatus(booking.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="empty-box">No bookings found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminBookings;