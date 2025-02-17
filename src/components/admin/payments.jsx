import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const payments = [
  { id: "P001", artistId: "A001", amount: 500, status: "Pending" },
  { id: "P002", artistId: "A002", amount: 750, status: "Paid" },
  { id: "P003", artistId: "A001", amount: 300, status: "Pending" },
];

export default function Payments() {
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
        <h1 className="fw-bold mb-4">Payments</h1>

        <div className="container">
          <div className="table-responsive border rounded p-3 shadow">
            <table className="table table-striped table-bordered">
              <thead className="table-secondary">
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
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>{payment.status}</td>
                    <td>
                      {payment.status === "Pending" && (
                        <button className="btn btn-warning btn-sm">Settle</button>
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
