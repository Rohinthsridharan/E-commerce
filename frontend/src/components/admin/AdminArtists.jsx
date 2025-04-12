// // import { useState, useEffect } from "react";
// // import Sidebar from "./Sidebar";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
// // import axios from "axios";

// // const AdminArtists = () => {
// //   const [artists, setArtists] = useState([]);
// //   const [newArtist, setNewArtist] = useState({ name: "", email: "", password: "" });
// //   const [showModal, setShowModal] = useState(false);
// //   const [error, setError] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const artistsPerPage = 5;

// //   useEffect(() => {
// //     const fetchArtists = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get("http://localhost:5000/api/auth/artists", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setArtists(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to load artists.");
// //       }
// //     };
// //     fetchArtists();
// //   }, []);

// //   const isValidEmail = (email) => {
// //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
// //   };

// //   const addArtist = async () => {
// //     if (!newArtist.name || !newArtist.email || !newArtist.password) {
// //       setError("All fields are required!");
// //       return;
// //     }
// //     if (!isValidEmail(newArtist.email)) {
// //       setError("Invalid Email Format!");
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await axios.post("http://localhost:5000/api/auth/register/artist", newArtist, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setArtists([...artists, res.data.user]);
// //       setNewArtist({ name: "", email: "", password: "" });
// //       setShowModal(false);
// //       setError("");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to add artist!");
// //     }
// //   };

// //   const indexOfLastArtist = currentPage * artistsPerPage;
// //   const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
// //   const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);
// //   const totalPages = Math.ceil(artists.length / artistsPerPage);

// //   return (
// //     <div className="d-flex bg-light min-vh-100">
// //       <Sidebar />
// //       <main className="flex-grow-1 p-4">
// //         <h1 className="fw-bold mb-4">Artists</h1>
// //         <div className="card border-warning">
// //           <div className="card-body">
// //             {error && <div className="alert alert-danger">{error}</div>}
// //             {artists.length === 0 && !error ? (
// //               <p className="text-center">No artists found.</p>
// //             ) : (
// //               <>
// //                 <div className="table-responsive">
// //                   <Table striped hover>
// //                     <thead>
// //                       <tr>
// //                         <th>S.no</th>
// //                         <th>Artist ID</th>
// //                         <th>Name</th>
// //                         <th>Email</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {currentArtists.map((artist, index) => (
// //                         <tr key={artist._id}>
// //                           <td>{indexOfFirstArtist + index + 1}</td>
// //                           <td>#{artist._id.slice(-6)}</td>
// //                           <td>{artist.name}</td>
// //                           <td>{artist.email}</td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </Table>
// //                 </div>
// //                 {totalPages > 1 && (
// //                   <div className="d-flex justify-content-center mt-3">
// //                     <Pagination>
// //                       <Pagination.Prev
// //                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// //                         disabled={currentPage === 1}
// //                       />
// //                       {[...Array(totalPages).keys()].map(num => (
// //                         <Pagination.Item
// //                           key={num + 1}
// //                           active={num + 1 === currentPage}
// //                           onClick={() => setCurrentPage(num + 1)}
// //                         >
// //                           {num + 1}
// //                         </Pagination.Item>
// //                       ))}
// //                       <Pagination.Next
// //                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// //                         disabled={currentPage === totalPages}
// //                       />
// //                     </Pagination>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //             <Button className="btn btn-warning mt-3" onClick={() => setShowModal(true)}>
// //               + Add Artist
// //             </Button>
// //           </div>
// //         </div>
// //         <Modal show={showModal} onHide={() => setShowModal(false)}>
// //           <Modal.Header closeButton>
// //             <Modal.Title>Add New Artist</Modal.Title>
// //           </Modal.Header>
// //           <Modal.Body>
// //             <Form>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Name</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="Enter artist name"
// //                   value={newArtist.name}
// //                   onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
// //                 />
// //               </Form.Group>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Email</Form.Label>
// //                 <Form.Control
// //                   type="email"
// //                   placeholder="Enter email"
// //                   value={newArtist.email}
// //                   onChange={(e) => setNewArtist({ ...newArtist, email: e.target.value })}
// //                 />
// //               </Form.Group>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Password</Form.Label>
// //                 <Form.Control
// //                   type="password"
// //                   placeholder="Enter password"
// //                   value={newArtist.password}
// //                   onChange={(e) => setNewArtist({ ...newArtist, password: e.target.value })}
// //                 />
// //               </Form.Group>
// //               {error && <p className="text-danger">{error}</p>}
// //             </Form>
// //           </Modal.Body>
// //           <Modal.Footer>
// //             <Button variant="secondary" onClick={() => setShowModal(false)}>
// //               Cancel
// //             </Button>
// //             <Button variant="primary" onClick={addArtist}>
// //               Add Artist
// //             </Button>
// //           </Modal.Footer>
// //         </Modal>
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminArtists;

// import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
// import axios from "axios";

// const AdminArtists = () => {
//   const [artists, setArtists] = useState([]);
//   const [newArtist, setNewArtist] = useState({ name: "", email: "", password: "", gmailAppPassword: "" }); // Added gmailAppPassword
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const artistsPerPage = 5;

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/auth/artists", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setArtists(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load artists.");
//       }
//     };
//     fetchArtists();
//   }, []);

//   const isValidEmail = (email) => {
//     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   };

//   const addArtist = async () => {
//     if (!newArtist.name || !newArtist.email || !newArtist.password || !newArtist.gmailAppPassword) {
//       setError("All fields are required!");
//       return;
//     }
//     if (!isValidEmail(newArtist.email)) {
//       setError("Invalid Email Format!");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post("http://localhost:5000/api/auth/register/artist", newArtist, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setArtists([...artists, res.data.user]);
//       setNewArtist({ name: "", email: "", password: "", gmailAppPassword: "" }); // Reset gmailAppPassword
//       setShowModal(false);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add artist!");
//     }
//   };

//   const indexOfLastArtist = currentPage * artistsPerPage;
//   const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
//   const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);
//   const totalPages = Math.ceil(artists.length / artistsPerPage);

//   return (
//     <div className="d-flex bg-light min-vh-100">
//       <Sidebar />
//       <main className="flex-grow-1 p-4">
//         <h1 className="fw-bold mb-4">Artists</h1>
//         <div className="card border-warning">
//           <div className="card-body">
//             {error && <div className="alert alert-danger">{error}</div>}
//             {artists.length === 0 && !error ? (
//               <p className="text-center">No artists found.</p>
//             ) : (
//               <>
//                 <div className="table-responsive">
//                   <Table striped hover>
//                     <thead>
//                       <tr>
//                         <th>S.no</th>
//                         <th>Artist ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentArtists.map((artist, index) => (
//                         <tr key={artist._id}>
//                           <td>{indexOfFirstArtist + index + 1}</td>
//                           <td>{artist.artistId || "N/A"}</td>
//                           <td>{artist.name}</td>
//                           <td>{artist.email}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//                 {totalPages > 1 && (
//                   <div className="d-flex justify-content-center mt-3">
//                     <Pagination>
//                       <Pagination.Prev
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                       />
//                       {[...Array(totalPages).keys()].map(num => (
//                         <Pagination.Item
//                           key={num + 1}
//                           active={num + 1 === currentPage}
//                           onClick={() => setCurrentPage(num + 1)}
//                         >
//                           {num + 1}
//                         </Pagination.Item>
//                       ))}
//                       <Pagination.Next
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                       />
//                     </Pagination>
//                   </div>
//                 )}
//               </>
//             )}
//             <Button className="btn btn-warning mt-3" onClick={() => setShowModal(true)}>
//               + Add Artist
//             </Button>
//           </div>
//         </div>
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add New Artist</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter artist name"
//                   value={newArtist.name}
//                   onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={newArtist.email}
//                   onChange={(e) => setNewArtist({ ...newArtist, email: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter password"
//                   value={newArtist.password}
//                   onChange={(e) => setNewArtist({ ...newArtist, password: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Gmail App Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter Gmail app password"
//                   value={newArtist.gmailAppPassword}
//                   onChange={(e) => setNewArtist({ ...newArtist, gmailAppPassword: e.target.value })}
//                 />
//               </Form.Group>
//               {error && <p className="text-danger">{error}</p>}
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={addArtist}>
//               Add Artist
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </main>
//     </div>
//   );
// };

// export default AdminArtists;

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import axios from "axios";

const AdminArtists = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: "", email: "", password: "", gmailAppPassword: "" });
  const [editArtist, setEditArtist] = useState(null); // For editing existing artists
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if adding or editing
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/artists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtists(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load artists.");
      }
    };
    fetchArtists();
  }, []);

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const addArtist = async () => {
    if (!newArtist.name || !newArtist.email || !newArtist.password || !newArtist.gmailAppPassword) {
      setError("All fields are required!");
      return;
    }
    if (!isValidEmail(newArtist.email)) {
      setError("Invalid Email Format!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/auth/register/artist", newArtist, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtists([...artists, res.data.user]);
      setNewArtist({ name: "", email: "", password: "", gmailAppPassword: "" });
      setShowModal(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add artist!");
    }
  };

  const updateArtist = async () => {
    if (!editArtist.name || !editArtist.email || !editArtist.gmailAppPassword) {
      setError("Name, email, and Gmail app password are required!");
      return;
    }
    if (!isValidEmail(editArtist.email)) {
      setError("Invalid Email Format!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/auth/artists/${editArtist._id}`,
        editArtist,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArtists(artists.map(a => (a._id === editArtist._id ? res.data.user : a)));
      setEditArtist(null);
      setShowModal(false);
      setIsEditMode(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update artist!");
    }
  };

  const openEditModal = (artist) => {
    setEditArtist({ ...artist, password: "", gmailAppPassword: "" }); // Don’t prefill sensitive fields
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setNewArtist({ name: "", email: "", password: "", gmailAppPassword: "" });
    setEditArtist(null);
    setError("");
  };

  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);
  const totalPages = Math.ceil(artists.length / artistsPerPage);

  return (
    <div className="d-flex bg-light min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-4">Artists</h1>
        <div className="card border-warning">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {artists.length === 0 && !error ? (
              <p className="text-center">No artists found.</p>
            ) : (
              <>
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Artist ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentArtists.map((artist, index) => (
                        <tr key={artist._id}>
                          <td>{indexOfFirstArtist + index + 1}</td>
                          <td>{artist.artistId || "N/A"}</td>
                          <td>{artist.name}</td>
                          <td>{artist.email}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" onClick={() => openEditModal(artist)}>
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      />
                      {[...Array(totalPages).keys()].map(num => (
                        <Pagination.Item
                          key={num + 1}
                          active={num + 1 === currentPage}
                          onClick={() => setCurrentPage(num + 1)}
                        >
                          {num + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                )}
              </>
            )}
            <Button className="btn btn-warning mt-3" onClick={() => setShowModal(true)}>
              + Add Artist
            </Button>
          </div>
        </div>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditMode ? "Edit Artist" : "Add New Artist"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter artist name"
                  value={isEditMode ? editArtist?.name || "" : newArtist.name}
                  onChange={(e) =>
                    isEditMode
                      ? setEditArtist({ ...editArtist, name: e.target.value })
                      : setNewArtist({ ...newArtist, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={isEditMode ? editArtist?.email || "" : newArtist.email}
                  onChange={(e) =>
                    isEditMode
                      ? setEditArtist({ ...editArtist, email: e.target.value })
                      : setNewArtist({ ...newArtist, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
                  value={isEditMode ? editArtist?.password || "" : newArtist.password}
                  onChange={(e) =>
                    isEditMode
                      ? setEditArtist({ ...editArtist, password: e.target.value })
                      : setNewArtist({ ...newArtist, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gmail App Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={isEditMode ? "Enter new Gmail app password (optional)" : "Enter Gmail app password"}
                  value={isEditMode ? editArtist?.gmailAppPassword || "" : newArtist.gmailAppPassword}
                  onChange={(e) =>
                    isEditMode
                      ? setEditArtist({ ...editArtist, gmailAppPassword: e.target.value })
                      : setNewArtist({ ...newArtist, gmailAppPassword: e.target.value })
                  }
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={isEditMode ? updateArtist : addArtist}>
              {isEditMode ? "Update Artist" : "Add Artist"}
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default AdminArtists;