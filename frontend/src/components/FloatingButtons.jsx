import "./FloatingButtons.css";

function FloatingButtons() {
  const phoneNumber =
    import.meta.env.VITE_WHATSAPP_NUMBER;

  const callNumber =
    import.meta.env.VITE_CALL_NUMBER;

  const message =
    "Hello Sudagar Tour & Travels, I want to book a taxi.";

  return (
    <div className="floating-buttons">
      <a
        className="float-btn whatsapp-btn"
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>

      <a className="float-btn call-btn" href={`tel:${callNumber}`}>
        📞
      </a>
    </div>
  );
}

export default FloatingButtons;