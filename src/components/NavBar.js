import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Logo from "./Logo";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/NavBar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/track", label: "Track Order" },
];

function NavBar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { cartCount } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const closeMenu = () => setOpenLinks(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Logo size={40} />
          <span>
            Cedar <em>&amp;</em> Saj
          </span>
        </Link>

        <nav className={openLinks ? "nav-links open" : "nav-links"}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Switch light or dark theme">
            {theme === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </button>

          <Link to="/cart" className="icon-btn cart-btn" onClick={closeMenu} aria-label="Open cart">
            <ShoppingBagOutlinedIcon />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          <button className="icon-btn menu-toggle" onClick={toggleNavbar} aria-label="Open menu">
            {openLinks ? <CloseIcon /> : <ReorderIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
