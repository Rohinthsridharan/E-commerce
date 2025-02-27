import React from 'react';
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Upload, CreditCard, LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard", key: "dashboard", icon: <LayoutDashboard size={20} className="me-2" /> },
  { name: "Orders", key: "orders", icon: <ShoppingCart size={20} className="me-2" /> },
  { name: "Upload Art", key: "product-upload", icon: <Upload size={20} className="me-2" /> },
  { name: "Payments", key: "payments", icon: <CreditCard size={20} className="me-2" /> },
];


export default function ArtistSidebar({ activeTab, setActiveTab }) {

   const navigate = useNavigate();
   const handleLogout = () => {
       navigate("/login");
  };

  return (
    <div className="bg-dark text-white d-flex flex-column min-vh-100" style={{ width: '250px' }}>
      <div className="p-3 border-bottom border-warning">
        <h3 className="m-0">Artist</h3>
      </div>
      <div className="flex-grow-1">
        <ul className="nav flex-column p-2">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <button
                onClick={() => setActiveTab(item.key)}
                className={`nav-link text-white py-2 px-3 rounded d-flex align-items-center ${
                  activeTab === item.key ? 'bg-warning text-dark fw-bold' : ''
                }`}
                style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-top border-warning p-3">
              <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center" onClick={handleLogout}>
                <LogOut size={20} className="me-2" />
                Logout
              </button>
      </div>
    </div>
  );
}
