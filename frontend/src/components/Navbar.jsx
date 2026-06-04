import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openAdminLogin = () => {
    window.location.href = "/admin/login";
  };

  const goToBooking = () => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .querySelector(".booking-box")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .querySelector(".booking-box")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        <img
          src="/logo.png"
          alt="Sudagar Tour & Travels"
          className="logo-img"
          onDoubleClick={openAdminLogin}
        />

        <div className="logo-text">
          <h2>Sudagar Tour & Travels</h2>
        </div>
      </Link>

      <button
        className="menu-btn"
        type="button"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className={open ? "nav-links active" : "nav-links"}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>

        <button type="button" onClick={goToBooking}>
          Get Taxi
        </button>

        <Link to="/tours" onClick={() => setOpen(false)}>
          Tours
        </Link>

        <Link to="/cabs" onClick={() => setOpen(false)}>
          Cabs
        </Link>

        <Link to="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;