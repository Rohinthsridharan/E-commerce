import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './Sidebar';

const initialPayments = [
  { id: "P001", artistId: "A001", amount: 500, status: "Pending" },
  { id: "P002", artistId: "A002", amount: 750, status: "Paid" },
  { id: "P003", artistId: "A001", amount: 300, status: "Pending" },
];

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments);

  const handleSettle = (id) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, status: "Paid" } : payment
    ));
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-4">Payments</h1>

        <div className="container">
          <div className="table-responsive border rounded border-warning p-3 shadow">
            <table className="table table-striped table-bordered">
              <thead className="table-secondary bold">
                <tr>
                  <th>Payment ID</th>
                  <th>Artist ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.artistId}</td>
                    <td>₹{payment.amount.toFixed(2)}</td>
                    <td>
                      <span className={`badge bg-${payment.status === "Paid" ? "success" : "warning"}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      {payment.status === "Pending" && (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleSettle(payment.id)}
                        >
                          Settle
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
