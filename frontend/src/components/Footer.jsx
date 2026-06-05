import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2
  className="footer-admin-trigger"
  onDoubleClick={() => {
    window.location.href = "/admin/login";
  }}
>
  Sudagar Tour & Travels
</h2>
        <p>
          Safe, comfortable and affordable taxi service for local rides,
          airport transfers, outstation trips and tour packages.
        </p>
      </div>

      <div>
        <h3>Quick Links</h3>
        <p>Home</p>
        <p>Get Taxi</p>
        <p>Services</p>
        <p>Contact</p>
      </div>

      <div>
        <h3>Contact Us</h3>
        <p>📞 +91 7678680381 / 9810169445 </p>
        <p>📍 Faridabad, Haryana</p>
        <p>✉️ sudagartourtravels@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
