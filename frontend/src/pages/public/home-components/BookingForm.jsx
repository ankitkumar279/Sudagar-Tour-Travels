function BookingForm({
  bookingForm,
  handleBookingChange,
  submitBooking,
  calculatePrice,
  applyCoupon,
  pickupSuggestions,
  dropSuggestions,
  selectLocation,
  estimatedDistance,
}) {
  return (
    <section className="booking-box">
      <div className="booking-header">
        <span>Fast taxi reservation</span>
        <h2>Book Your Ride</h2>
        <p>Local rides, airport transfers and outstation trips with clear pricing.</p>
      </div>

      <form className="booking-form" onSubmit={submitBooking}>
        <div className="booking-grid">
          <input type="text" name="name" placeholder="Full Name" value={bookingForm.name} onChange={handleBookingChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={bookingForm.phone} onChange={handleBookingChange} required />
          <input type="email" name="email" placeholder="Email Address" value={bookingForm.email} onChange={handleBookingChange} />

          <div className="location-field">
            <input type="text" name="pickup_location" placeholder="Pickup Location" value={bookingForm.pickup_location} onChange={handleBookingChange} required />
            {pickupSuggestions.length > 0 && (
              <div className="suggestion-box">
                {pickupSuggestions.map((place) => (
                  <p key={place.place_id} onClick={() => selectLocation("pickup", place.display_name)}>
                    {place.display_name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="location-field">
            <input type="text" name="drop_location" placeholder="Drop Location" value={bookingForm.drop_location} onChange={handleBookingChange} required />
            {dropSuggestions.length > 0 && (
              <div className="suggestion-box">
                {dropSuggestions.map((place) => (
                  <p key={place.place_id} onClick={() => selectLocation("drop", place.display_name)}>
                    {place.display_name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input type="datetime-local" name="pickup_datetime" value={bookingForm.pickup_datetime} onChange={handleBookingChange} required />

          <select name="trip_type" value={bookingForm.trip_type} onChange={handleBookingChange}>
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
            <option value="local">Local</option>
            <option value="outstation">Outstation</option>
            <option value="airport">Airport Transfer</option>
          </select>

          <select name="cab_type" value={bookingForm.cab_type} onChange={handleBookingChange}>
            <option value="Standard">Standard</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Traveller">Traveller</option>
          </select>

          <input type="number" name="passengers" placeholder="Passengers" value={bookingForm.passengers} onChange={handleBookingChange} />
        </div>

        <button className="fare-btn" type="button" onClick={calculatePrice}>
          Calculate Fare
        </button>

        <div className="price-preview">
          <div>
            <span>Distance</span>
            <b>{estimatedDistance || 0} KM</b>
          </div>
          <div>
            <span>Original</span>
            <b>₹{bookingForm.original_price || 0}</b>
          </div>
          <div>
            <span>Discount</span>
            <b>₹{bookingForm.discount_amount || 0}</b>
          </div>
          <div>
            <span>Final Price</span>
            <b>₹{bookingForm.final_price || 0}</b>
          </div>
        </div>

        <div className="coupon-row">
          <input type="text" name="coupon_code" placeholder="Coupon Code" value={bookingForm.coupon_code} onChange={handleBookingChange} />
          <button type="button" onClick={applyCoupon}>Apply Coupon</button>
        </div>

        <button className="book-submit-btn" type="submit">
          Book Taxi Now
        </button>
      </form>
    </section>
  );
}

export default BookingForm;