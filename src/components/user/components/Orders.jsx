import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Orders = () => {
    const location = useLocation();
    const state = location.state;

    // Create image URL first (will be null if no picture)
    const imageUrl = state?.picture ? URL.createObjectURL(state.picture) : null;

    // Cleanup effect - must be called unconditionally
    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]); // Add imageUrl as dependency

    if (!state) {
        return (
            <div>
                <Navbar />
                <center>
                    <h2 style={{ paddingTop: '80px' }}>
                        No order details found. Please complete your checkout.
                    </h2>
                </center>
            </div>
        );
    }

    const { product } = state;

    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <h2 className="text-center mb-4">Order Details</h2>
                <div className="ecommerce-box">
                    <div className="image-container">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Uploaded Reference"
                                className="product-image"
                            />
                        ) : (
                            <p>No image uploaded</p>
                        )}
                    </div>
                    <div className="product-details text-center">
                        <h5 className="product-name">{product.name}</h5>
                        <p className="product-price">₹{product.price.toFixed(2)}</p>
                        {state.description && (
                            <p className="product-description">{state.description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;