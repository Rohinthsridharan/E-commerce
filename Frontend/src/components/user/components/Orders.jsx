import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
<<<<<<< HEAD
import { Button, Badge } from "react-bootstrap"; // Added Badge import
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import Footer from './Footer';
=======
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
<<<<<<< HEAD
        console.log('Fetched orders:', res.data);
=======
        console.log('Fetched orders:', res.data); // Debug log
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err.response?.data);
        setError('Failed to load orders.');
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchOrders();
  }, [navigate]);
<<<<<<< HEAD

=======
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
  const deleteOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order._id !== orderId));
      alert("Order deleted successfully!");
    } catch (err) {
      console.error('Error deleting order:', err.response?.data);
      alert(`Failed to delete order: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <Navbar />
=======
      <Navbar /> {/* Add bagCount if needed */}
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
      <div className="container my-5">
        <h2 className="text-center mb-4">Your Orders</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {orders.length === 0 && !error ? (
          <div className="text-center" style={{ paddingTop: "80px" }}>
            <h4>No orders found. Please complete your checkout.</h4>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="row">
            {orders.map((order) => (
              <div key={order._id} className="col-md-3 mb-4">
                <div className="ecommerce-box p-3 border rounded shadow">
                  <div className="image-container text-right">
                    {order.pictureUrl ? (
                      <img
                        src={`http://localhost:5000${order.pictureUrl}`}
                        alt="Uploaded Reference"
                        className="product-image"
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                    ) : (
                      <p>No image uploaded</p>
                    )}
                  </div>
                  <div className="product-details text-center mt-3">
                    <h5 className="product-name">{order.productId?.name || "N/A"}</h5>
                    <p className="product-price">₹{order.total?.toFixed(2) || "N/A"}</p>
                    {order.description && <p className="product-description">{order.description}</p>}
                    <Badge
                      bg={
                        order.status === 'completed'
                          ? 'success'
                          : order.status === 'in_progress'
                          ? 'primary'
                          : 'warning'
                      }
                      className="mb-2"
                    >
                      {order.status
                        ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                        : "Unknown"}
                    </Badge>
                    <div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
=======
          orders.map((order) => (
            <div key={order._id} className="ecommerce-box my-4 p-3 border rounded shadow">
              <div className="image-container text-center">
                {order.pictureUrl ? (
                  <img
                    src={`http://localhost:5000${order.pictureUrl}`}
                    alt="Uploaded Reference"
                    className="product-image"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                ) : (
                  <p>No image uploaded</p>
                )}
              </div>
              <div className="product-details text-center mt-3">
                <h5 className="product-name">{order.productId?.name || "N/A"}</h5>
                <p className="product-price">₹{order.total?.toFixed(2) || "N/A"}</p>
                {order.description && <p className="product-description">{order.description}</p>}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
    </div>
  );
};

export default Orders;