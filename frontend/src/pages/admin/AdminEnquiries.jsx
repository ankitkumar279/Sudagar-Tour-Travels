import "./AdminEnquiries.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await api.get("/enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnquiries(response.data.enquiries || []);
    } catch (error) {
      console.log("Fetch enquiries error:", error.response?.data || error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/enquiries/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchEnquiries();
    } catch (error) {
      console.log("Update enquiry status error:", error.response?.data || error);
      alert("Status update failed");
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm("Delete this enquiry?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/enquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchEnquiries();
    } catch (error) {
      console.log("Delete enquiry error:", error.response?.data || error);
      alert("Delete failed");
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const text = `
      ${enquiry.name}
      ${enquiry.email}
      ${enquiry.phone}
      ${enquiry.subject}
      ${enquiry.message}
      ${enquiry.status}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="enquiries-page">
        <div className="enquiries-header">
          <div>
            <p>Contact Messages</p>
            <h1>Manage Enquiries</h1>
          </div>

          <span>{filteredEnquiries.length} Enquiries</span>
        </div>

        <div className="enquiry-tools">
          <input
            type="text"
            placeholder="Search by name, phone, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="enquiries-grid">
          {filteredEnquiries.map((enquiry) => (
            <div className="enquiry-card" key={enquiry.id}>
              <div className="enquiry-top">
                <div>
                  <h3>{enquiry.name}</h3>
                  <p>{enquiry.phone || "No phone"}</p>
                </div>

                <span className={`enquiry-status ${enquiry.status || "new"}`}>
                  {enquiry.status || "new"}
                </span>
              </div>

              <div className="enquiry-details">
                <p>
                  <b>Email:</b> {enquiry.email || "No email"}
                </p>

                <p>
                  <b>Subject:</b> {enquiry.subject || "No subject"}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {enquiry.created_at
                    ? new Date(enquiry.created_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <p className="message-preview">
                {enquiry.message
                  ? enquiry.message.slice(0, 110) + "..."
                  : "No message"}
              </p>

              <div className="enquiry-actions">
                <button onClick={() => setSelectedMessage(enquiry)}>
                  View Message
                </button>

                <select
                  value={enquiry.status || "new"}
                  onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  className="delete-btn"
                  onClick={() => deleteEnquiry(enquiry.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredEnquiries.length === 0 && (
            <div className="empty-box">No enquiries found</div>
          )}
        </div>

        {selectedMessage && (
          <div
            className="message-overlay"
            onClick={() => setSelectedMessage(null)}
          >
            <div
              className="message-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="message-top">
                <div>
                  <p>Message Details</p>
                  <h2>{selectedMessage.subject || "No Subject"}</h2>
                </div>

                <button onClick={() => setSelectedMessage(null)}>✕</button>
              </div>

              <div className="message-info">
                <p>
                  <b>Name:</b> {selectedMessage.name}
                </p>

                <p>
                  <b>Email:</b> {selectedMessage.email || "No email"}
                </p>

                <p>
                  <b>Phone:</b> {selectedMessage.phone || "No phone"}
                </p>
              </div>

              <div className="full-message">
                {selectedMessage.message || "No message"}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminEnquiries;