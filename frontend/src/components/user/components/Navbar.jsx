import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag as ShoppingBagIcon } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ bagCount }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/userdashboard">
          ARTIFY
        </NavLink>
        <div className="d-flex align-items-center order-lg-2">
          <NavLink to="/shoppingbag" className="nav-link position-relative me-3">
            <ShoppingBagIcon size={24} />
            {bagCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {bagCount}
              </span>
            )}
          </NavLink>
          {token ? (
            <button className="btn btn-outline-danger me-3" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/" className="btn btn-outline-primary me-3">
              Login
            </NavLink>
          )}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>
        </div>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 animate-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop" onClick={() => setIsMenuOpen(false)}>
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/orders" onClick={() => setIsMenuOpen(false)}>
                Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;