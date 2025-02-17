import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import profile from "../../../assets/home/user.png";
import "../styles/Navbar.css";

function Navbar({ bagCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      <header className="navbar">
        <div className="profile-container">
          <img src={profile} alt="profile" />
          <h1>Artify</h1>
        </div>
        <button className="menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <Link to="/" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/shoppingbag" onClick={() => setMenuOpen(false)}>
            Shopping Bag {bagCount > 0 && `(${bagCount})`}
          </Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
