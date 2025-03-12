import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, Button, Form } from "react-bootstrap";

export default function AdminArtists() {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: "", email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || [];
    setArtists(storedArtists);
  }, []);

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const addArtist = () => {
    if (!newArtist.name || !newArtist.email || !newArtist.password) {
      setError("All fields are required!");
      return;
    }
    if (!isValidEmail(newArtist.email)) {
      setError("Invalid Email Format!");
      return;
    }

    let existingArtists = JSON.parse(localStorage.getItem("artists")) || [];
    const newArtistId = `A${(existingArtists.length + 1).toString().padStart(3, "0")}`;
    const updatedArtists = [...existingArtists, { ...newArtist, id: newArtistId }];

    localStorage.setItem("artists", JSON.stringify(updatedArtists));
    setArtists(updatedArtists);
    setNewArtist({ name: "", email: "", password: "" });
    setShowModal(false);
    setError("");
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-3">Artists</h1>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>S.no</th>
              <th>Artist ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, index) => (
              <tr key={artist.id}>
                <td>{index + 1}</td>
                <td>{artist.id}</td>
                <td>{artist.name}</td>
                <td>{artist.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button className="btn btn-warning" onClick={() => setShowModal(true)}>+ Add Artist</Button>

        {/* Add Artist Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Artist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter artist name"
                  value={newArtist.name}
                  onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={newArtist.email}
                  onChange={(e) => setNewArtist({ ...newArtist, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={newArtist.password}
                  onChange={(e) => setNewArtist({ ...newArtist, password: e.target.value })}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={addArtist}>Add Artist</Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}
