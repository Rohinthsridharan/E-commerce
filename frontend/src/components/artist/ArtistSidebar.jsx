import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Upload, CreditCard, LogOut, Menu ,User} from "lucide-react";

const navItems = [
  { name: "Dashboard", to: "/artistdashboard", icon: <LayoutDashboard size={20} className="me-2" /> },
  { name: "Orders", to: "/artistorders", icon: <ShoppingCart size={20} className="me-2" /> },
  { name: "Upload Art", to: "/artistproductupload", icon: <Upload size={20} className="me-2" /> },
  { name: "Payments", to: "/artistpayments", icon: <CreditCard size={20} className="me-2" /> },
  { name: "Profile", to: "/profile", icon: <User size={20} className="me-2" /> },
];

export default function ArtistSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Tracks if sidebar is persistently open
  const [isHovered, setIsHovered] = useState(false); // Tracks hover state

  const handleToggle = () => {
    setIsOpen(!isOpen); // Toggle open/closed state on icon click
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Expand on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Collapse when hover ends
  };

  const handleLogout = () => {
    navigate("/");
  };

  const sidebarWidth = isOpen || isHovered ? '250px' : '60px'; // Full width when open or hovered, collapsed otherwise

  return (
    <div
      className="bg-dark text-white d-flex flex-column min-vh-100 transition-all"
      style={{ width: sidebarWidth, transition: 'width 0.3s ease' }} // Smooth transition
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-3 border-bottom border-warning d-flex align-items-center justify-content-between">
        {/* Toggle Icon */}
        <button onClick={handleToggle} className="btn btn-link text-white p-0">
          <Menu size={24} />
        </button>
        {/* Title, visible only when open or hovered */}
        {(isOpen || isHovered) && <h3 className="m-0 ms-2">Artist</h3>}
      </div>
      <div className="flex-grow-1">
        <ul className="nav flex-column p-2">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-link text-white py-2 px-2 rounded ${isActive ? 'bg-warning' : ''}`}
              >
                {item.icon}
                {(isOpen || isHovered) && item.name} {/* Show text only when open or hovered */}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-top border-warning p-3">
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          onClick={handleLogout}
        >
          <LogOut size={20} className="me-2" />
          {(isOpen || isHovered) && "Logout"} {/* Show text only when open or hovered */}
        </button>
      </div>
    </div>
  );
}