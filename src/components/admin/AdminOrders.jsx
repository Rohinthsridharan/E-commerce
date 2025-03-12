import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, Badge } from 'react-bootstrap';
import Sidebar from './Sidebar'; // ✅ Import Sidebar

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [proofs, setProofs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Orders per page

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedProofs = JSON.parse(localStorage.getItem("proofs")) || {};

    setOrders(storedOrders);
    setProofs(storedProofs);
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar /> {/* ✅ Sidebar Added */}
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-4">Admin Order Management</h1>

        <div className="card border-warning">
          <div className="card-body">
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Artist ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.artistId}</td>
                      <td>{order.product.name}</td>
                      <td>₹{order.total}</td>
                      <td>{order.date}</td>
                      <td>
                        <Badge 
                          bg={order.status === 'completed' ? 'success' : order.status === 'in_progress' ? 'primary' : 'warning'}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        {proofs[order.id] ? (
                          <Button 
                            variant="outline-warning" 
                            size="sm" 
                            onClick={() => window.open(proofs[order.id], '_blank')}
                          >
                            View Proof
                          </Button>
                        ) : (
                          <span className="text-muted">No Proof</span>
                        )}
                      </td>
                    </tr>
                  ))}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
