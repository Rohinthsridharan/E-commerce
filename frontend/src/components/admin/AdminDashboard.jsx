import { useEffect, useRef, useState, useCallback } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [activeArtists, setActiveArtists] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [artistOrderData, setArtistOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch orders
        const ordersRes = await axios.get("http://localhost:5000/api/orders/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalOrders(ordersRes.data.length);
        console.log("Full Orders Data:", ordersRes.data);

        // Fetch artists
        const artistsRes = await axios.get("http://localhost:5000/api/auth/artists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActiveArtists(artistsRes.data.length);
        console.log("Full Artists Data:", artistsRes.data);

        // Fetch payments
        const paymentsRes = await axios.get("http://localhost:5000/api/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pending = paymentsRes.data
          .filter((p) => p.status === "Pending")
          .reduce((sum, p) => sum + p.amount, 0);
        setPendingPayments(pending);

        // Calculate artist order counts
        const artistOrderCount = artistsRes.data.map((artist) => {
          const artistOrders = ordersRes.data.filter(
            (order) => order.artistId && order.artistId._id === artist._id
          );
          console.log(`Orders for ${artist.name || artist._id}:`, artistOrders);
          return {
            name: artist.name || artist.username || `Artist ${artist._id}`,
            orderCount: artistOrders.length,
          };
        });
        console.log("Artist Order Count:", artistOrderCount);
        setArtistOrderData(artistOrderCount);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    // Cleanup chart instance on unmount
    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  // Memoize renderChart with useCallback
  const renderChart = useCallback(() => {
    if (!chartRef.current || artistOrderData.length === 0) return;
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    // Determine the maximum order count for Y-axis
    const maxOrderCount = Math.max(
      ...artistOrderData.map((artist) => artist.orderCount),
      totalOrders
    );
    const suggestedMax = Math.max(maxOrderCount + 1, 5); // Add buffer, minimum 5

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: artistOrderData.map((artist) => artist.name),
        datasets: [
          {
            label: "Number of Orders",
            data: artistOrderData.map((artist) => artist.orderCount),
            backgroundColor: "rgba(255, 193, 7, 0.6)",
            borderColor: "#ffc107",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0,
            },
            suggestedMax: suggestedMax,
            title: {
              display: true,
              text: "Number of Orders",
            },
          },
          x: {
            title: {
              display: true,
              text: "Artists",
            },
            ticks: {
              maxRotation: 45,
              minRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Artist Order Distribution",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
      },
      plugins: [
        {
          beforeDraw: (chart) => {
            const width = chart.width;
            if (width < 600) {
              chart.options.scales.x.ticks.maxRotation = 90;
              chart.options.scales.x.ticks.minRotation = 90;
            } else {
              chart.options.scales.x.ticks.maxRotation = 45;
              chart.options.scales.x.ticks.minRotation = 0;
            }
          },
        },
      ],
    });
  }, [artistOrderData, totalOrders]);

  useEffect(() => {
    renderChart();
  }, [renderChart, artistOrderData]);

  return (
    <div className="d-flex bg-light">
      <Sidebar />
      <main className="flex-grow-1 px-3 py-4">
        <h1 className="fw-bold mb-3">Dashboard</h1>
        <div className="row g-3 mb-3">
          {[
            { title: "Total Orders", value: totalOrders },
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
          <h5 className="text-muted mb-3">Artist Order Distribution</h5>
          <div className="w-100" style={{ height: "400px", maxHeight: "50vh" }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;