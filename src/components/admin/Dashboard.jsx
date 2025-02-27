import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";

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
    <div className="d-flex bg-light">
      <Sidebar />

      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold mb-4">Dashboard</h1>

        <div className="container">
          <div className="row g-4 mb-4">
            {[{ title: "Total Orders", value: "1,234" }, { title: "Active Artists", value: "5" }, { title: "Pending Payments", value: "₹12,345" }].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow border-start border-warning p-3">
                  <h5 className="text-muted">{item.title}</h5>
                  <p className="fs-2 fw-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card shadow border-warning p-4">
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
