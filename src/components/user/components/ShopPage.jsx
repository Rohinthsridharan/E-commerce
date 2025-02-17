// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import art1 from "../../../assets/home/art1.1.jpg";
import art2 from "../../../assets/home/art4.2.jpg";
import art3 from "../../../assets/home/art5.4.jpg";
import art4 from "../../../assets/home/art9.3.jpg";
import art5 from "../../../assets/home/art5.5.jpg";
import art6 from "../../../assets/home/u1.jpg";
import art7 from "../../../assets/home/u2.jpg";
import art8 from "../../../assets/home/u7.jpg";
import art9 from "../../../assets/home/u8.jpg";
import Footer from "./Footer";

const ShopPage = ({ addToBag, bagCount, setBagCount }) => {
  const navigate = useNavigate();

  // Combined handleBuyNow function
  const handleBuyNow = (product) => {
    navigate( "/checkout", { state: { product } });
  };

  const handleAddToBag = (product) => {
    addToBag(product);
    setBagCount(bagCount + 1);
    alert(`${product.name} has been added to your bag!`);
  };

  const sampleProducts = [
    { id: 1, name: "10B portrait", price: 399.99, image: art1 },
    { id: 2, name: "8B portrait", price: 589.99, image: art2 },
    { id: 3, name: "4B & 2B portrait", price: 939.99, image: art3 },
    { id: 4, name: "Color Pencil Drawing", price: 1049.99, image: art4 },
    { id: 5, name: "Coffee Painting", price: 1559.99, image: art5 },
    { id: 6, name: "portrait 6", price: 499.99, image: art6 },
    { id: 7, name: "portrait 7", price: 699.99, image: art7 },
    { id: 8, name: "portrait 8", price: 899.99, image: art8 },
    { id: 9, name: "portrait 9", price: 1099.99, image: art9 },
  ];

  return (
    <div>
      <Navbar bagCount={bagCount} />
      <div className="container my-5">
        <h2 className="text-center mb-4">Shop Our Products</h2>
        <div className="ecommerce-box-list">
          {sampleProducts.map((product) => (
            <div key={product.id} className="ecommerce-box">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  style={{ height: "300px", objectFit: "fill" }} 
                />
              </div>
              <div className="product-details">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">₹{product.price.toFixed(2)}</p>
                <div className="action-buttons">
                  <button
                    onClick={() => handleAddToBag(product)}
                    className="btn btn-primary"
                  >
                    Add to bag
                  </button>
                  <button
                    onClick={() => handleBuyNow(product, "checkout")}
                    className="btn btn-success"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
