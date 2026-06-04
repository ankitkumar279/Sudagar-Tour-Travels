function BookingModal({ bookingSuccess, bookingId, setBookingSuccess }) {
  if (!bookingSuccess) return null;

  return (
    <div className="booking-modal-overlay" onClick={() => setBookingSuccess(false)}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">✅</div>
        <h2>Booking Confirmed</h2>

        <p>
          Your taxi booking has been received successfully. Our team will contact you shortly to confirm your ride.
        </p>

        <div className="booking-id-box">
          Booking ID:
          <span>{bookingId}</span>
        </div>

        <p className="support-text">Our team will contact you shortly for confirmation.</p>
        <button onClick={() => setBookingSuccess(false)}>Back To Home</button>
      </div>
    </div>
  );
}

export default BookingModal;
