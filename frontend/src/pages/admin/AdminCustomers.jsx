import "./AdminCustomers.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(response.data.customers || []);
    } catch (error) {
      console.log("Fetch customers error:", error.response?.data || error);
    }
  };

  const fetchHistory = async (customer) => {
    try {
      const response = await api.get(`/customers/${customer.id}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedCustomer(customer);
      setHistory(response.data.bookings || []);
    } catch (error) {
      console.log("Fetch history error:", error.response?.data || error);
      alert("Customer history failed");
    }
  };

  const closeHistory = () => {
    setSelectedCustomer(null);
    setHistory([]);
  };

  const filteredCustomers = customers.filter((customer) => {
    const text = `
      ${customer.id}
      ${customer.name}
      ${customer.phone}
      ${customer.email}
      ${customer.customer_type}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="customers-page">
        <div className="customers-header">
          <div>
            <p>Customer Management</p>
            <h1>Manage Customers</h1>
          </div>

          <span>{filteredCustomers.length} Customers</span>
        </div>

        <div className="customer-tools">
          <input
            type="text"
            placeholder="Search by name, phone, email, customer type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="customers-grid">
          {filteredCustomers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <div className="customer-avatar">
                {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
              </div>

              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>{customer.phone}</p>
                <p>{customer.email || "No email"}</p>
              </div>

              <div className="customer-stats">
                <span>
                  Total Bookings: <b>{customer.total_bookings || 0}</b>
                </span>

                <span>
                  Completed Trips: <b>{customer.total_completed_trips || 0}</b>
                </span>

                <span>
                  Amount Spent: <b>₹{customer.total_amount_spent || 0}</b>
                </span>

                <span>
                  Type: <b>{customer.customer_type || "regular"}</b>
                </span>
              </div>

              <button onClick={() => fetchHistory(customer)}>
                View Booking History
              </button>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="empty-box">No customers found</div>
          )}
        </div>

        {selectedCustomer && (
          <div className="history-overlay" onClick={closeHistory}>
            <div className="history-modal" onClick={(e) => e.stopPropagation()}>
              <div className="history-top">
                <div>
                  <p>Booking History</p>
                  <h2>{selectedCustomer.name}</h2>
                </div>

                <button onClick={closeHistory}>✕</button>
              </div>

              <div className="history-list">
                {history.map((booking) => (
                  <div className="history-card" key={booking.id}>
                    <h3>{booking.booking_id}</h3>

                    <p>
                      <b>Pickup:</b> {booking.pickup_location}
                    </p>

                    <p>
                      <b>Drop:</b> {booking.drop_location}
                    </p>

                    <p>
                      <b>Cab:</b> {booking.cab_type || "N/A"}
                    </p>

                    <p>
                      <b>Status:</b> {booking.booking_status || "pending"}
                    </p>

                    <p>
                      <b>Price:</b> ₹{booking.final_price || 0}
                    </p>
                  </div>
                ))}

                {history.length === 0 && (
                  <div className="empty-box">No booking history found</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCustomers;