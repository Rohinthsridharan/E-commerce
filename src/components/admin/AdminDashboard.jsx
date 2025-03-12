import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";

export default function ArtistDashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [activeArtists, setActiveArtists] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // ✅ Total Orders State
  
  // eslint-disable-next-line no-unused-vars
    const [overviewData, setOverviewData] = useState([
      { name: "Jan", total: 2400 },
      { name: "Feb", total: 1398 },
      { name: "Mar", total: 9800 },
      { name: "Apr", total: 3908 },
      { name: "May", total: 4800 },
      { name: "Jun", total: 3800 },
      { name: "Jul", total: 4300 },
      { name: "Aug", total: 5300 },
      { name: "Sep", total: 4800 },
      { name: "Oct", total: 6000 },
      { name: "Nov", total: 4300 },
      { name: "Dec", total: 7800 },
    ]);
  useEffect(() => {
    loadPendingPayments();
    loadActiveArtists();
    loadTotalOrders(); // ✅ Load orders dynamically
    renderChart();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      chartInstance.current?.destroy();
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  // ✅ Function to load active artist count
  const loadActiveArtists = () => {
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || [];
    setActiveArtists(storedArtists.length);
  };

  // ✅ Function to load total orders
  const loadTotalOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setTotalOrders(storedOrders.length);
  };

  const loadPendingPayments = () => {
    const storedPayments = JSON.parse(localStorage.getItem("paymentRequests")) || [];
    const totalPending = storedPayments
      .filter(payment => payment.status === "Pending")
      .reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);
    setPendingPayments(totalPending);
  };

  const handleStorageChange = (event) => {
    if (event.key === "artists") {
      loadActiveArtists();
    }
    if (event.key === "paymentRequests") {
      loadPendingPayments();
    }
    if (event.key === "orders") {
      loadTotalOrders(); // ✅ Update order count dynamically
    }
  };

  const renderChart = () => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "Sales",
            data: [120, 190, 300, 500, 250, 350, 400], // Example data
            borderColor: "#ffc107",
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            borderWidth: 3,
            tension: 0.4, // ✅ Makes the curve smooth
            pointRadius: 5,
            pointBackgroundColor: "#ffc107",
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
  };

  return (
    <div className="d-flex bg-light">
      <Sidebar />

      <main className="flex-grow-1 px-3 py-4">
        <h1 className="fw-bold mb-3">Dashboard</h1>

        <div className="container-fluid">
          <div className="row g-3 mb-3">
            {[
              { title: "Total Orders", value: totalOrders }, // ✅ Dynamic total orders
              { title: "Active Artists", value: activeArtists },
              { title: "Pending Payments", value: `₹${pendingPayments.toFixed(2)}` },
            ].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow border-start border-warning p-3">
                  <h5 className="text-muted">{item.title}</h5>
                  <p className="fs-2 fw-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card shadow border-warning p-3">
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
