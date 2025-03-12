import React, { useState, useEffect } from "react";
import "../styles/Profile.css"; // Updated styles

function Profile({ onClose }) {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  // Load user details from Local Storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Email Validation Function
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSave = () => {
    if (!isValidEmail(user.email)) {
      setError("Invalid Email Format!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user)); // Save updated details to Local Storage
    alert("Profile updated successfully!");
    onClose();
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Edit Profile</h2>

        <label>Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} readOnly /> {/* Email cannot be changed */}
        {error && <p className="error-message">{error}</p>} 

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={user.phone} onChange={handleChange} />

        <div className="profile-buttons">
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
