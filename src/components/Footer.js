import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Logo from "./Logo";
import "../styles/Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Logo size={44} />
            <span>Cedar &amp; Saj</span>
          </div>
          <p>Home-style Lebanese food from our family kitchen in Beirut, made fresh every day.</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://wa.me/9611000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/track">Track Your Order</Link></li>
          </ul>
        </div>

        <div>
          <h4>Visit Us</h4>
          <ul className="footer-info">
            <li><PlaceOutlinedIcon /> Hamra Street, Beirut, Lebanon</li>
            <li><PhoneOutlinedIcon /> +961 1 000 000</li>
            <li><AccessTimeIcon /> Every day, 8:00 AM – 11:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {year} Cedar &amp; Saj · CSCI426 Advanced Web Programming project. Restaurant details are fictional.
      </div>
    </footer>
  );
}

export default Footer;
