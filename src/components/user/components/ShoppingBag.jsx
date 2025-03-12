import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/ShoppingBag.css';

const ShoppingBag = ({ shoppingBag, removeFromBag }) => {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid my-5">
        <h2 className="text-center mb-4">Your Shopping Bag</h2>
        {shoppingBag.length === 0 ? (
          <p className="text-center">Your bag is empty.</p>
        ) : (
          <div className="row">
            {shoppingBag.map((item, index) => (
              <div key={index} className="col-md-3 mb-3">
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover",padding:"13px",borderRadius:"10px"  }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">₹{item.price.toFixed(2)}</p>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => removeFromBag(index)}
                        className="btn btn-danger flex-fill"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="btn btn-success flex-fill"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingBag;