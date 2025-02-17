import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Orders = () => {
    const location = useLocation();
    const product = location.state?.product;

    if (!product) {
        return <div>
            <Navbar/>
            <h1>No product selected. Please go back and choose a product.</h1>
            </div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <h2 className="text-center mb-4">Order Details</h2>
                <div className="ecommerce-box">
                    <div className="image-container">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />
                    </div>
                    <div className="product-details text-center">
                        <h5 className="product-name">{product.name}</h5>
                        <p className="product-price">₹{product.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
