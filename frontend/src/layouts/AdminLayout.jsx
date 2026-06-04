import "./AdminLayout.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <section className="admin-layout">
      {open && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      <aside className={open ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-logo-row">
          <div className="admin-logo">
            <span>🚕</span>
            <div>
              <h2>Sudagar Tour</h2>
              <p>& Travels</p>
            </div>
          </div>

          <button className="close-sidebar" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/admin/bookings" onClick={closeMenu}>Bookings</NavLink>
          <NavLink to="/admin/customers" onClick={closeMenu}>Customers</NavLink>
          <NavLink to="/admin/cabs" onClick={closeMenu}>Cabs</NavLink>
          <NavLink to="/admin/tours" onClick={closeMenu}>Tours</NavLink>
          <NavLink to="/admin/offers" onClick={closeMenu}>Offers</NavLink>
          <NavLink to="/admin/enquiries" onClick={closeMenu}>Enquiries</NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="admin-content">
        <div className="admin-topbar">
          <button className="drawer-btn" onClick={() => setOpen(true)}>
            ☰
          </button>
          <h3>Admin Panel</h3>
        </div>

        {children}
      </main>
    </section>
  );
}

export default AdminLayout;