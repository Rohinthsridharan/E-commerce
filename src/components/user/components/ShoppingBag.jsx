import React from "react";
import Navbar from "./Navbar"; // Import Navbar

const ShoppingBag = ({ shoppingBag, removeFromBag }) => {

  return (
    <div>
      <Navbar /> 
      <div className="container my-5">
        <h2 className="text-center mb-4">Your Shopping Bag</h2>
        {shoppingBag.length === 0 ? (
          <p className="text-center">Your bag is empty.</p>
        ) : (
          <div className="row">
            {shoppingBag.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">₹{item.price.toFixed(2)}</p>
                    <button
                      onClick={() => removeFromBag(index)}
                      className="btn btn-danger w-100"
                    >
                      Remove
                    </button>
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
