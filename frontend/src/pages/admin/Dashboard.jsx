import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import AdminLayout from "../../layouts/AdminLayout";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.stats || response.data;

      setStats({
        totalBookings: Number(data.totalBookings || data.total_bookings || 0),
        totalCustomers: Number(data.totalCustomers || data.total_customers || 0),
        totalCabs: Number(data.totalCabs || data.total_cabs || 0),
        totalTours: Number(data.totalTours || data.total_tours || 0),
        totalOffers: Number(data.totalOffers || data.total_offers || 0),
        totalEnquiries: Number(data.totalEnquiries || data.total_enquiries || 0),
      });
    } catch (error) {
      console.log("Dashboard API Error:", error.response?.data || error);
      navigate("/admin/login");
    }
  };

  if (!stats) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <AdminLayout>
  <div className="dashboard-page">
    <div className="dashboard-hero">
      <div>
        <p className="dashboard-small">Welcome Back</p>
        <h1>Admin Dashboard</h1>
        <span>Live overview of bookings, customers, cabs and enquiries</span>
      </div>

      
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📋</div>
        <h3>Total Bookings</h3>
        <h2>{stats.totalBookings}</h2>
        <div className="stat-bar"><span style={{ width: "75%" }}></span></div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <h3>Total Customers</h3>
        <h2>{stats.totalCustomers}</h2>
        <div className="stat-bar"><span style={{ width: "55%" }}></span></div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🚖</div>
        <h3>Total Cabs</h3>
        <h2>{stats.totalCabs}</h2>
        <div className="stat-bar"><span style={{ width: "90%" }}></span></div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🧳</div>
        <h3>Total Tours</h3>
        <h2>{stats.totalTours}</h2>
        <div className="stat-bar"><span style={{ width: "35%" }}></span></div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🏷️</div>
        <h3>Total Offers</h3>
        <h2>{stats.totalOffers}</h2>
        <div className="stat-bar"><span style={{ width: "45%" }}></span></div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✉️</div>
        <h3>Total Enquiries</h3>
        <h2>{stats.totalEnquiries}</h2>
        <div className="stat-bar"><span style={{ width: "30%" }}></span></div>
      </div>
    </div>

    <div className="dashboard-visuals">
      <div className="chart-card">
        <h3>Platform Overview</h3>

        <div className="bar-chart">
  <div>
    <span style={{ height: `${Math.min(Math.max(stats.totalBookings * 18, 25), 150)}px` }}></span>
    <p>Bookings</p>
  </div>

  <div>
    <span style={{ height: `${Math.min(Math.max(stats.totalCustomers * 18, 25), 150)}px` }}></span>
    <p>Customers</p>
  </div>

  <div>
    <span style={{ height: `${Math.min(Math.max(stats.totalCabs * 18, 25), 150)}px` }}></span>
    <p>Cabs</p>
  </div>

  <div>
    <span style={{ height: `${Math.min(Math.max(stats.totalTours * 18, 25), 150)}px` }}></span>
    <p>Tours</p>
  </div>
</div>
      </div>

      <div className="quick-card">
  <h3>Quick Actions</h3>

  <button onClick={() => navigate("/admin/cabs")}>
    Manage Cabs
  </button>

  <button onClick={() => navigate("/admin/bookings")}>
    View Bookings
  </button>

  <button onClick={() => navigate("/admin/enquiries")}>
    View Enquiries
  </button>
</div>
    </div>
  </div>
</AdminLayout>
  );
}

export default Dashboard;