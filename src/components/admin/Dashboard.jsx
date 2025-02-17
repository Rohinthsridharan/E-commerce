import { NavLink } from "react-router-dom"; // Using NavLink
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import { House, Cart, People, CreditCard } from "react-bootstrap-icons";

const navItems = [
  { name: "Dashboard", to: "/", icon: <House size={20} className="me-2" /> },
  { name: "Orders", to: "/orders", icon: <Cart size={20} className="me-2" /> },
  { name: "Artists", to: "/artists", icon: <People size={20} className="me-2" /> },
  { name: "Payments", to: "/payments", icon: <CreditCard size={20} className="me-2" /> },
];

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "#ffc107",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, []);

  return (
    <div className="d-flex min-vh-100 bg-light">
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
        <h1 className="fw-bold mb-4">Dashboard</h1>

        {/* Stats Cards */}
        <div className="container">
          <div className="row g-4 mb-4">
            {[{ title: "Total Orders", value: "1,234" }, { title: "Active Artists", value: "56" }, { title: "Pending Payments", value: "$12,345" }].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow border-start border-warning p-3">
                  <h5 className="text-muted">{item.title}</h5>
                  <p className="fs-2 fw-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sales Chart */}
          <div className="card shadow p-4">
            <h5 className="text-muted mb-3">Sales Overview</h5>
            <div className="w-100" style={{ height: "300px" }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
