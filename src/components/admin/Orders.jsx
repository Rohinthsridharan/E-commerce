import { NavLink } from 'react-router-dom'; // Correctly import NavLink
import "bootstrap/dist/css/bootstrap.min.css";
import { House, Cart, People, CreditCard } from "react-bootstrap-icons";

const orders = [
  { id: "1", userId: "U001", artistId: "A001", date: "2023-06-01", price: 59.99 },
  { id: "2", userId: "U002", artistId: "A002", date: "2023-06-02", price: 79.99 },
  { id: "3", userId: "U003", artistId: "A001", date: "2023-06-03", price: 49.99 },
];
const navItems = [
  { name: "Dashboard", to: "/", icon: <House size={20} className="me-2" /> },
  { name: "Orders", to: "/orders", icon: <Cart size={20} className="me-2" /> },
  { name: "Artists", to: "/artists", icon: <People size={20} className="me-2" /> },
  { name: "Payments", to: "/payments", icon: <CreditCard size={20} className="me-2" /> },
];

export default function Orders() {
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
        <h1 className="fw-bold mb-4">Orders</h1>

        <div className="container">
          <div className="table-responsive border rounded p-3 shadow">
            <table className="table table-striped table-bordered">
              <thead className="table-secondary">
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Artist ID</th>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.artistId}</td>
                    <td>{order.date}</td>
                    <td>${order.price.toFixed(2)}</td>
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
