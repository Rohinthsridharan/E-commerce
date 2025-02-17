"use client";

import { useState } from "react";
import { Link } from "react-router-dom";  // Correcting the import for Link
import "bootstrap/dist/css/bootstrap.min.css";

const initialArtists = [
  { id: "A001", name: "Rohinth", email: "rohinth@gmail.com" },
  { id: "A002", name: "Jane Smith", email: "udaya@gmail.com" },
];

export default function Artists() {
  const [artists, setArtists] = useState(initialArtists);
  const [newArtist, setNewArtist] = useState({ name: "", email: "" });
  const [showModal, setShowModal] = useState(false);

  const addArtist = () => {
    const id = `A${(artists.length + 1).toString().padStart(3, "0")}`;
    const password = Math.random().toString(36).slice(-8);
    setArtists([...artists, { ...newArtist, id, password }]);
    setNewArtist({ name: "", email: "" });
    setShowModal(false);
    alert(`New artist added with ID: ${id} and temporary password: ${password}`);
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h2 className="fs-5 fw-bold mb-4">Admin Panel</h2>
        <nav className="nav flex-column">
          {["Dashboard", "Orders", "Artists", "Payments"].map((item, index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="nav-link text-white py-2 px-3">
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Artists</h1>
          <button className="btn btn-warning" onClick={() => setShowModal(true)}>
            Add New Artist
          </button>
        </div>

        <div className="container">
          <div className="table-responsive border rounded p-3 shadow">
            <table className="table table-striped table-bordered">
              <thead className="table-secondary">
                <tr>
                  <th>Artist ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist) => (
                  <tr key={artist.id}>
                    <td>{artist.id}</td>
                    <td>{artist.name}</td>
                    <td>{artist.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bootstrap Modal for Add Artist */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Artist</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control mb-2"
                    value={newArtist.name}
                    onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={newArtist.email}
                    onChange={(e) => setNewArtist({ ...newArtist, email: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-warning" onClick={addArtist}>
                    Add Artist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
