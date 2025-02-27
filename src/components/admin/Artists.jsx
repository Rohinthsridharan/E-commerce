import { useState } from "react"; 
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const initialArtists = [
  { id: "A001", name: "Udayakumar", email: "udaya@gmail.com" },
  { id: "A002", name: "Rohinth", email: "rohinth@gmail.com" },
  { id: "A003", name: "Abirami", email: "abirami@gmail.com" },
  { id: "A004", name: "Surya", email: "Surya@gmail.com" },
  { id: "A005", name: "Arjun", email: "arjun@gmail.com" },
];

export default function Artists() {
  const [artists, setArtists] = useState(initialArtists);
  const [newArtist, setNewArtist] = useState({ name: "", email: "" });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const addArtist = () => {
    if (!newArtist.name || !newArtist.email) {
      setError("Both Name and Email are required!");
      return;
    }
    const id = `A${(artists.length + 1).toString().padStart(3, "0")}`;
    const password = Math.random().toString(36).slice(-8);
    setArtists([...artists, { ...newArtist, id, password }]);
    setNewArtist({ name: "", email: "" });
    setShowModal(false);
    setError("");
    alert(`New artist added with ID: ${id} and temporary password: ${password}`);
  };

  return (
    <div className="d-flex bg-light">
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Artists</h1>
          <button className="btn btn-warning px-3 py-1" onClick={() => setShowModal(true)}>
            Add Artist
          </button>
        </div>

        <div className="container">
          <div className="table-responsive border rounded border-warning p-3 shadow">
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
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content rounded-3 shadow-lg">
                <div className="modal-header d-flex justify-content-between">
                  <h5 className="modal-title fs-5">Add New Artist</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  {error && <div className="alert alert-danger p-2 text-center">{error}</div>}
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control mb-3 rounded-3"
                    value={newArtist.name}
                    onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3 rounded-3"
                    value={newArtist.email}
                    onChange={(e) => setNewArtist({ ...newArtist, email: e.target.value })}
                  />
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button className="btn btn-danger px-3" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-warning px-3" onClick={addArtist}>
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
