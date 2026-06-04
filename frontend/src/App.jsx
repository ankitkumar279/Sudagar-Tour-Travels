import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/public/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminCabs from "./pages/admin/AdminCabs";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminTours from "./pages/admin/AdminTours";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import FloatingButtons from "./components/FloatingButtons";
import ToursPage from "./pages/public/ToursPage";
import CabsPage from "./pages/public/CabsPage";
import ContactPage from "./pages/public/ContactPage";
import TourEnquiry from "./pages/TourEnquiry/TourEnquiry";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/cabs" element={<AdminCabs />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/tours" element={<AdminTours />} />
        <Route path="/admin/offers" element={<AdminOffers />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/cabs" element={<CabsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tour-enquiry/:id" element={<TourEnquiry />} />

      </Routes>
      {!isAdminPage && <FloatingButtons />}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;