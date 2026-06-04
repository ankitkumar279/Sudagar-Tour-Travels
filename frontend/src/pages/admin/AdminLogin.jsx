import "./AdminLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="admin-login">
      <div className="login-brand">
        <h1>Sudagar Tour & Travels</h1>
        <p>Admin Panel for taxi bookings, cabs, tours and enquiries.</p>
      </div>

      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <p>Login to manage your taxi platform</p>

        {error && <div className="login-error">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default AdminLogin;