import "./home-css/HomeBase.css";
import "./home-css/HeroBooking.css";
import "./home-css/CardsSections.css";
import "./home-css/ToursOffersContact.css";
import "./home-css/ModalLoader.css";
import "./home-css/Animations.css";
import "./home-css/HomeResponsive.css";

import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

import Hero from "./home-components/Hero";
import BookingForm from "./home-components/BookingForm";
import Services from "./home-components/Services";
import WhyChooseUs from "./home-components/WhyChooseUs";
import CabSection from "./home-components/CabSection";
import TourSection from "./home-components/TourSection";
import Offers from "./home-components/Offers";
import Testimonials from "./home-components/Testimonials";
import ContactSection from "./home-components/ContactSection";
import BookingModal from "./home-components/BookingModal";

const emptyBookingForm = {
  name: "",
  phone: "",
  email: "",
  pickup_location: "",
  drop_location: "",
  pickup_datetime: "",
  return_datetime: "",
  trip_type: "one-way",
  cab_type: "Sedan",
  passengers: 1,
  special_instructions: "",
  original_price: 0,
  coupon_code: "",
  discount_amount: 0,
  final_price: 0,
};

const emptyContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Home() {
  const [cabs, setCabs] = useState([]);
  const [tours, setTours] = useState([]);
  const [offers, setOffers] = useState([]);
  const [cabLoading, setCabLoading] = useState(true);
  const [tourLoading, setTourLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [estimatedDistance, setEstimatedDistance] = useState("");
  const [bookingForm, setBookingForm] = useState(emptyBookingForm);
  const [contactForm, setContactForm] = useState(emptyContactForm);

  useEffect(() => {
    fetchCabs();
    fetchTours();
    fetchOffers();
  }, []);

  // Debounce pickup search so API is not called on every key press
  useEffect(() => {
    const timer = setTimeout(() => {
      searchLocationSuggestions(bookingForm.pickup_location, "pickup");
    }, 500);

    return () => clearTimeout(timer);
  }, [bookingForm.pickup_location]);

  // Debounce drop search so API is not called on every key press
  useEffect(() => {
    const timer = setTimeout(() => {
      searchLocationSuggestions(bookingForm.drop_location, "drop");
    }, 500);

    return () => clearTimeout(timer);
  }, [bookingForm.drop_location]);

  const fetchCabs = async () => {
    try {
      setCabLoading(true);
      const response = await api.get("/cabs");
      setCabs(response.data.cabs || []);
    } catch (error) {
      console.log("Public cabs error:", error.response?.data || error);
    } finally {
      setCabLoading(false);
    }
  };

  const fetchTours = async () => {
    try {
      setTourLoading(true);
      const response = await api.get("/tours");
      setTours(response.data.tours || []);
    } catch (error) {
      console.log("Public tours error:", error.response?.data || error);
    } finally {
      setTourLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await api.get("/offers");
      setOffers(response.data.offers || []);
    } catch (error) {
      console.log("Public offers error:", error.response?.data || error);
    }
  };

  const handleBookingChange = (e) => {
    setBookingForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactChange = (e) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectLocation = (type, value) => {
    setBookingForm((prev) => ({
      ...prev,
      [type === "pickup" ? "pickup_location" : "drop_location"]: value,
    }));

    if (type === "pickup") setPickupSuggestions([]);
    if (type === "drop") setDropSuggestions([]);
  };

  const searchLocationSuggestions = async (address, type) => {
    if (!address || address.length < 3) {
      if (type === "pickup") setPickupSuggestions([]);
      if (type === "drop") setDropSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(address)}`
      );

      const data = await response.json();

      if (type === "pickup") setPickupSuggestions(data);
      if (type === "drop") setDropSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoordinates = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );

    const data = await response.json();

    if (!data.length) {
      throw new Error("Address not found");
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  };

  const getDistanceKm = async () => {
    const pickup = await getCoordinates(bookingForm.pickup_location);
    const drop = await getCoordinates(bookingForm.drop_location);

    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${pickup.lon},${pickup.lat};${drop.lon},${drop.lat}?overview=false`
    );

    const data = await response.json();

    if (!data.routes || !data.routes.length) {
      throw new Error("Route not found");
    }

    return data.routes[0].distance / 1000;
  };

  const calculatePrice = async () => {
    if (!bookingForm.pickup_location || !bookingForm.drop_location) {
      toast.error("Please enter pickup and drop location");
      return;
    }

    try {
      const distanceKm = await getDistanceKm();
      setEstimatedDistance(distanceKm.toFixed(2));

      const priceRates = {
        Standard: 14,
        Sedan: 16,
        SUV: 20,
        Traveller: 28,
      };

      let totalPrice = Math.ceil(distanceKm * (priceRates[bookingForm.cab_type] || 16));

      if (bookingForm.trip_type === "round-trip") totalPrice *= 2;
      if (bookingForm.trip_type === "airport") totalPrice += 300;

      setBookingForm((prev) => ({
        ...prev,
        original_price: totalPrice,
        final_price: totalPrice,
        discount_amount: 0,
        special_instructions: `Estimated distance: ${distanceKm.toFixed(2)} KM`,
      }));

      toast.success(`Price calculated: ₹${totalPrice}`);
    } catch (error) {
      console.log(error);
      toast.error("Could not calculate distance. Try a clearer address.");
    }
  };

  const applyCoupon = async () => {
    if (!bookingForm.coupon_code) {
      toast("Please enter coupon code");
      return;
    }

    try {
      const response = await api.post("/offers/validate", {
        coupon_code: bookingForm.coupon_code,
        booking_amount: bookingForm.original_price || 1000,
      });

      setBookingForm((prev) => ({
        ...prev,
        original_price: response.data.booking_amount,
        discount_amount: response.data.discount_amount,
        final_price: response.data.final_amount,
      }));

      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon");
    }
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/bookings", bookingForm);

      setBookingId(response.data.booking?.booking_id || "");
      setBookingSuccess(true);

      setTimeout(() => {
        setBookingSuccess(false);
      }, 5000);

      setBookingForm(emptyBookingForm);
      setEstimatedDistance("");
      setPickupSuggestions([]);
      setDropSuggestions([]);
    } catch (error) {
      console.log("Booking error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();

    try {
      await api.post("/enquiries", contactForm);
      toast.success("Message sent successfully");
      setContactForm(emptyContactForm);
    } catch (error) {
      console.log("Enquiry error:", error.response?.data || error);
      toast.error("Message failed");
    }
  };

  const scrollToBooking = () => {
    document.querySelector(".booking-box")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCabs = () => {
    document.querySelector(".tariff-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Hero scrollToBooking={scrollToBooking} scrollToCabs={scrollToCabs} />

      <BookingForm
        bookingForm={bookingForm}
        handleBookingChange={handleBookingChange}
        submitBooking={submitBooking}
        calculatePrice={calculatePrice}
        applyCoupon={applyCoupon}
        pickupSuggestions={pickupSuggestions}
        dropSuggestions={dropSuggestions}
        selectLocation={selectLocation}
        estimatedDistance={estimatedDistance}
      />

      <Services />
      <WhyChooseUs />
      <CabSection cabs={cabs} cabLoading={cabLoading} scrollToBooking={scrollToBooking} />
      <TourSection tours={tours} tourLoading={tourLoading} />
      <Offers offers={offers} scrollToBooking={scrollToBooking} />
      <Testimonials />

      <ContactSection
        contactForm={contactForm}
        handleContactChange={handleContactChange}
        submitEnquiry={submitEnquiry}
      />

      <BookingModal
        bookingSuccess={bookingSuccess}
        bookingId={bookingId}
        setBookingSuccess={setBookingSuccess}
      />
    </main>
  );
}

export default Home;
