import { NavLink } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { House, Cart, People, CreditCard } from "react-bootstrap-icons";

const payments = [
  { id: "P001", artistId: "A001", amount: 500, status: "Pending" },
  { id: "P002", artistId: "A002", amount: 750, status: "Paid" },
  { id: "P003", artistId: "A001", amount: 300, status: "Pending" },
];

const navItems = [
  { name: "Dashboard", to: "/", icon: <House size={20} className="me-2" /> },
  { name: "Orders", to: "/orders", icon: <Cart size={20} className="me-2" /> },
  { name: "Artists", to: "/artists", icon: <People size={20} className="me-2" /> },
  { name: "Payments", to: "/payments", icon: <CreditCard size={20} className="me-2" /> },
];

export default function Payments() {
  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 min-vh-100" style={{ width: "250px" }}>
              <h2 className="fs-4 fw-bold mb-4">Admin Panel</h2>
              <nav className="nav flex-column">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className="nav-link text-white py-2 px-3 rounded"
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#007bff" : "transparent",
                    })}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
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
