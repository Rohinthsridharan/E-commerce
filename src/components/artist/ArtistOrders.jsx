import React, { useState, useEffect } from 'react';
import { Form, Table, Button, Pagination } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import Sidebar from "./ArtistSidebar"; // Import Sidebar component

const ArtistOrders = () => {
  const [orders, setOrders] = useState([]);
  const [proofs, setProofs] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedProofs = JSON.parse(localStorage.getItem("proofs")) || {};
    const loggedInArtistId = localStorage.getItem("artistId");

    if (loggedInArtistId) {
      const artistOrders = storedOrders.filter(order => order.artistId === loggedInArtistId);
      setOrders(artistOrders);
    } else {
      setOrders([]);
    }

    setProofs(storedProofs);
  }, []);

  const clearAllOrders = () => {
    setOrders([]);
    localStorage.removeItem("orders");
    localStorage.removeItem("proofs");
  };

  const handleDownload = (imageUrl, orderId) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.setAttribute('download', `order-${orderId}-image.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image.');
    }
  };

  const handleFileUpload = (event, orderId) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedProofs = { ...proofs, [orderId]: reader.result };
      setProofs(updatedProofs);
      localStorage.setItem("proofs", JSON.stringify(updatedProofs));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const toggleDescription = (orderId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="d-flex min-vh-100 bg-light">
          <Sidebar /> 
      <main className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Order Management</h2>
        </div>

        <div className="card border-warning">
          <div className="card-body">
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Picture</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => {
                    const isExpanded = expandedDescriptions[order.id];
                    const shortDescription = order.description?.length > 20 ?
                      order.description.slice(0, 20) + "..." : order.description;

                    return (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.product.name}</td>
                        <td>
                          {order.pictureUrl ? (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleDownload(order.pictureUrl, order.id)}
                            >
                              Download
                            </Button>
                          ) : (
                            <span className="text-muted">No Image</span>
                          )}
                        </td>
                        <td>
                          {order.description?.length > 20 ? (
                            <>
                              {isExpanded ? order.description : shortDescription}
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => toggleDescription(order.id)}
                              >
                                {isExpanded ? "Read Less" : "Read More"}
                              </Button>
                            </>
                          ) : (
                            order.description || <span className="text-muted">No Description</span>
                          )}
                        </td>
                        <td>₹{order.total}</td>
                        <td>{order.date}</td>
                        <td>
                          <Form.Select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`border-${order.status === 'completed' ? 'success' : 'warning'}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </Form.Select>
                        </td>
                        <td>
                          {order.status === 'completed' && proofs[order.id] ? (
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => window.open(proofs[order.id], '_blank')}
                            >
                              View Proof
                            </Button>
                          ) : (
                            order.status === 'completed' && (
                              <>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`proof-upload-${order.id}`}
                                  style={{ display: 'none' }}
                                  onChange={(e) => handleFileUpload(e, order.id)}
                                />
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  onClick={() => document.getElementById(`proof-upload-${order.id}`).click()}
                                >
                                  <Upload size={16} className="me-1" />
                                  Add Proof
                                </Button>
                              </>
                            )
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
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

            {/* Clear Orders Button */}
            <div className="d-flex justify-content-center mt-3">
              <Button variant="danger" size="sm" className="w-auto px-3" onClick={clearAllOrders}>
                Clear All Orders
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistOrders;
