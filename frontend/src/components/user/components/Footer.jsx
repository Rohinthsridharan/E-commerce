import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Artify. All rights reserved.</p>
        <p>
          <a href="/userdashboard" className="text-white me-3 ">About Us</a> | 
          <a href="/contact" className="text-white mx-3">Contact</a> | 
          <a href="/privacypolicy" className="text-white ms-3">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;