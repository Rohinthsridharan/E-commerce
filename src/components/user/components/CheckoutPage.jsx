import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

const CheckoutPage = ({ product }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    paymentType: "COD", // Default to COD
    cardDetails: "",
    address: "",
    pincode: "",
    picture: null, // For the uploaded picture
    description: "", // For the product description
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Only keep the first file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success alert
    alert("Order placed successfully!");

    // Navigate to OrdersPage with form data and product details
    navigate("/orders", {
      state: {
        ...formData,
        product: {
          name: product?.name || "10B pencil Portrait", // Fallback to "Unknown Product"
          price: product?.price || 399.99, // Fallback to 0
        },
      },
    });
  };

  return (
    <div className="checkout-container">
      <div className="container my-5">
        <h2 className="text-center mb-4">Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><label htmlFor="name" className="form-label">Name</label></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="mobile" className="form-label">Mobile</label></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="email" className="form-label">Email</label></td>
                <td>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="paymentType" className="form-label">Payment Type</label></td>
                <td>
                  <select
                    className="form-control"
                    id="paymentType"
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="COD">Cash on Delivery (COD)</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="net-banking">Net Banking</option>
                  </select>
                </td>
              </tr>
              {formData.paymentType === "Card" && (
                <tr>
                  <td><label htmlFor="cardDetails" className="form-label">Card Details</label></td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="cardDetails"
                      name="cardDetails"
                      value={formData.cardDetails}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td><label htmlFor="address" className="form-label">Address</label></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="pincode" className="form-label">Pincode</label></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="picture" className="form-label">Upload Picture</label></td>
                <td>
                  <input
                    type="file"
                    className="form-control"
                    id="picture"
                    name="picture"
                    onChange={handleFileChange}
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="description" className="form-label">Product Description</label></td>
                <td>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
