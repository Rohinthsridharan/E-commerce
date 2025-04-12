// components/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Navbar from "./user/components/Navbar";
// import Footer from "./Footer";
import "../styles/Profile.css";
import defaultUserIcon from "../../../assets/home/user.png"; // Default user icon

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", address: "", phone: "", profileImage: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData({
          name: res.data.name,
          address: res.data.address || "",
          phone: res.data.phone || ""
        });
        setPreviewImage(res.data.profileImage ? `http://localhost:5000${res.data.profileImage}` : null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append('name', formData.name);
      data.append('address', formData.address);
      data.append('phone', formData.phone);
      if (selectedImage) {
        data.append('profileImage', selectedImage);
      }

      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        data,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      setUser(res.data);
      setIsEditing(false);
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* <Navbar /> */}
      <main className="flex-grow-1 container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <div className="text-center mb-4">
                <img 
                  src={previewImage || defaultUserIcon} 
                  alt="User" 
                  className="rounded-circle" 
                  style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                />
              </div>
              <h2 className="text-center mb-4">Profile</h2>

              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Profile Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email:</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-buttons">
                    <button onClick={() => setIsEditing(false)} className="btn btn-danger">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Name:</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email:</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Address:</label>
                    <p>{user.address || "Not set"}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Phone:</label>
                    <p>{user.phone || "Not set"}</p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Profile;