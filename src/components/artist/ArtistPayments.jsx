import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import Sidebar from "./ArtistSidebar";

const ArtistPayments = () => {
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 8;

  useEffect(() => {
    const loggedInArtistId = localStorage.getItem("artistId");

    if (!loggedInArtistId) {
      console.error("❌ Artist ID not found in localStorage!");
      return;
    }

    const storedPayments = JSON.parse(localStorage.getItem("paymentRequests")) || [];
    const artistPayments = storedPayments.filter(payment => payment.artistId === loggedInArtistId);

    setPaymentRequests(artistPayments);
  }, []);

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = paymentRequests.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(paymentRequests.length / paymentsPerPage);

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Payments</h2>
        </div>
        <div className="card border-warning">
          <div className="card-body p-0">
            <Table striped hover>
              <thead className="bg-warning">
                <tr>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.length > 0 ? (
                  currentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>#{payment.id}</td>
                      <td>₹{payment.amount}</td>
                      <td>
                        <span className={`badge bg-${payment.status === "Completed" ? "success" : "warning"}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>{payment.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">No payments found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
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
      </main>
    </div>
  );
};

export default ArtistPayments;
