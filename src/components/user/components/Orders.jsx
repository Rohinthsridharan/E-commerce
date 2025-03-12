import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "react-bootstrap";

const Orders = () => {
    const location = useLocation();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orderDetails")) || [];
        setOrders(Array.isArray(storedOrders) ? storedOrders : []);
    }, []);

    useEffect(() => {
        if (location.state) {
            const storedOrders = JSON.parse(localStorage.getItem("orderDetails")) || [];
            const isDuplicate = storedOrders.some(order => JSON.stringify(order) === JSON.stringify(location.state));
            
            if (!isDuplicate) {
                const updatedOrders = [...storedOrders, location.state];
                setOrders(updatedOrders);
                localStorage.setItem("orderDetails", JSON.stringify(updatedOrders));
                updatePaymentRequests(location.state);
            }
        }
    }, [location.state]);

    const updatePaymentRequests = (order) => {
        let payments = JSON.parse(localStorage.getItem("paymentRequests")) || [];
        payments.push({
            id: payments.length + 1,
            amount: order.product.price,
            status: "Pending",
            date: new Date().toISOString().split("T")[0]
        });
        localStorage.setItem("paymentRequests", JSON.stringify(payments));
    };

    const deleteOrder = (index) => {
        const updatedOrders = [...orders];
        updatedOrders.splice(index, 1);
        setOrders(updatedOrders);
        localStorage.setItem("orderDetails", JSON.stringify(updatedOrders));
    };

    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <h2 className="text-center mb-4">Your Orders</h2>
                {orders.length === 0 ? (
                    <center>
                        <h4 style={{ paddingTop: '80px' }}>No orders found. Please complete your checkout.</h4>
                    </center>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className="ecommerce-box my-4 p-3 border rounded shadow">
                            <div className="image-container text-center">
                                {order.pictureUrl ? (
                                    <img src={order.pictureUrl} alt="Uploaded Reference" className="product-image" />
                                ) : (
                                    <p>No image uploaded</p>
                                )}
                            </div>
                            <div className="product-details text-center mt-3">
                                <h5 className="product-name">{order.product.name}</h5>
                                <p className="product-price">₹{order.product.price.toFixed(2)}</p>
                                {order.description && <p className="product-description">{order.description}</p>}
                                <Button variant="danger" size="sm" onClick={() => deleteOrder(index)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
