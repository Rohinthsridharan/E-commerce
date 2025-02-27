// import React from "react";
import "./App.css";
import Auth from "./Auth";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/user/components/HomePage";
import ShopPage from "./components/user/components/ShopPage";
import ShoppingBag from "./components/user/components/ShoppingBag";
import CheckoutPage from "./components/user/components/CheckoutPage";
import OrdersPage from "./components/user/components/OrdersPage";
import Orders from "./components/user/components/Orders";
import ArtistDashboard from "./components/artist/Components/ArtistDashboard";
import ArtistPayments from "./components/artist/Components/Payments";
import ArtistOrders from "./components/artist/Components/Orders";
import Artistproductupload from "./components/artist/Components/ProductUpload";
import AdminDashboard from "./components/admin/Dashboard";
import AdminOrders from "./components/admin/Orders";
import AdminArtists from "./components/admin/Artists";
import AdminPayments from "./components/admin/payments";


function App() {
  const [shoppingBag, setShoppingBag] = useState([]);
  const [bagCount, setBagCount] = useState(0);

  const addToBag = (product) => {
    setShoppingBag((prevBag) => [...prevBag, product]);
    setBagCount((prevCount) => prevCount + 1);
  };

  const removeFromBag = (index) => {
    setShoppingBag((prevBag) => prevBag.filter((_, i) => i !== index));
    setBagCount((prevCount) => prevCount - 1);
  };

  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={ <ShopPage addToBag={addToBag} bagCount={bagCount} setBagCount={setBagCount} />} />
          <Route path="/shoppingbag" element={<ShoppingBag shoppingBag={shoppingBag} removeFromBag={removeFromBag} />  }/>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ordersDetails" element={<OrdersPage />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/artist" element={<ArtistDashboard />} />
          <Route path="/artistorders" element={<ArtistOrders />} /> 
          <Route path="/artistproductupload" element={< Artistproductupload/>} />   
          <Route path="/artistpayments" element={<ArtistPayments />} />  


          <Route path="/login" element={<Auth/>} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminorders" element={<AdminOrders />} />
          <Route path="/adminartists" element={<AdminArtists />} />
          <Route path="/adminpayments" element={<AdminPayments />} />  
          
        </Routes>
      </div>
    </Router>
  );
 
}

export default App;
