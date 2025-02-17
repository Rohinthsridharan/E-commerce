import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const OrdersPage = () => {
  const location = useLocation();
  const {
    name = "N/A",
    mobile = "N/A",
    email = "N/A",
    paymentType = "COD",
    cardDetails = "",
    address = "N/A",
    pincode = "N/A",
    picture = null, // For the uploaded picture
    description = "", // For the product description
    product,
  } = location.state || {}; // Default to an empty object

  if (!product) {
    return (
      <div>
        <Navbar />
        <h2>No orders found</h2>
      </div>
    ); // Handle missing product details
  }

  return (
    <div className="container my-5">
      <Navbar />
      <h2>Order Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Product: {product?.name}</h5>
          <p><strong>Price:</strong> ₹{product?.price.toFixed(2)}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Payment Type:</strong> {paymentType}</p>
          {paymentType === "Card" && <p><strong>Card Details:</strong> {cardDetails}</p>}
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Pincode:</strong> {pincode}</p>
          {picture && (
            <div>
              <strong>Uploaded Picture:</strong>
              <br />
              <img src={URL.createObjectURL(picture)} alt="Uploaded" style={{ maxWidth: "200px", marginTop: "10px" }} />
            </div>
          )}
          {description && (
            <div>
              <strong>Description:</strong>
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
