import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Table, Button, Pagination } from "react-bootstrap";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 payments per page

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedPayments = JSON.parse(localStorage.getItem("paymentRequests")) || [];

    const paymentsMap = new Map(storedPayments.map(payment => [payment.id, payment]));

    const updatedPayments = storedOrders.map(order => {
      let productPrice = parseFloat(order.total);
      let discountedPrice = isNaN(productPrice) || productPrice <= 0 ? 0 : (productPrice * 0.72).toFixed(2);

      return {
        ...order,
        amount: parseFloat(discountedPrice),
        status: paymentsMap.has(order.id) ? paymentsMap.get(order.id).status : "Pending" // ✅ Ensure correct status
      };
    });

    setPayments(updatedPayments);
    localStorage.setItem("paymentRequests", JSON.stringify(updatedPayments));
  };

  const clearAllPayments = () => {
    setPayments([]);
    localStorage.removeItem("paymentRequests");
  };

  const settlePayment = (id) => {
    setPayments((prevPayments) => {
      const updatedPayments = prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status: "Completed" } : payment
      );

      // ✅ Update both `paymentRequests` and `orders` in localStorage
      localStorage.setItem("paymentRequests", JSON.stringify(updatedPayments));
      localStorage.setItem("orders", JSON.stringify(updatedPayments));

      updatePendingPayments();
      return updatedPayments;
    });
  };

  const updatePendingPayments = () => {
    const storedPayments = JSON.parse(localStorage.getItem("paymentRequests")) || [];

    const totalPending = storedPayments
      .filter(payment => payment.status === "Pending")
      .reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);

    localStorage.setItem("pendingPayments", JSON.stringify(totalPending));
    window.dispatchEvent(new Event("storage"));
  };

  const getStatusBadge = (status) => {
    const badgeColor =
      status === "Completed" ? "success" : status === "Pending" ? "warning" : "secondary";

    return <span className={`badge bg-${badgeColor}`}>{status}</span>;
  };

  // Pagination Calculation
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const currentPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-4">Payments</h1>
        <div className="container-fluid">
          <div className="table-responsive border rounded border-warning p-3 shadow">
            <Table striped bordered hover className="text-center align-middle">
              <thead className="table-secondary">
                <tr>
                  <th>Order ID</th>
                  <th>Artist ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>#{payment.id}</td>
                    <td>{payment.artistId || "N/A"}</td>
                    <td>₹{payment.amount.toFixed(2)}</td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>{payment.status === "Pending" ? (
                      <Button variant="warning" size="sm" onClick={() => settlePayment(payment.id)}>
                        Settle
                      </Button>
                    ) : (
                      <Button variant="success" size="sm" disabled>
                        Completed
                      </Button>
                    )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination Controls */}
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
            <div className="d-flex justify-content-center mt-3">
              <Button variant="danger" size="sm" className="w-auto px-3" onClick={clearAllPayments}>
                Clear All Payments
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
