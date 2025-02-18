// // import React from "react";
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/user/components/HomePage";
// import ShopPage from "./components/user/components/ShopPage";
// import ShoppingBag from "./components/user/components/ShoppingBag";
// import CheckoutPage from "./components/user/components/CheckoutPage";
// import OrdersPage from "./components/user/components/OrdersPage";
// import Orders from "./components/user/components/Orders";
// import ArtistDashboard from "./components/artist/Components/ArtistDashboard";
// import "./App.css";
// import Auth from "./Auth";
// import Dashboard from "./components/admin/Dashboard";




// function App() {
//   const [shoppingBag, setShoppingBag] = useState([]);
//   const [bagCount, setBagCount] = useState(0);

//   const addToBag = (product) => {
//     setShoppingBag((prevBag) => [...prevBag, product]);
//     setBagCount((prevCount) => prevCount + 1);
//   };

//   const removeFromBag = (index) => {
//     setShoppingBag((prevBag) => prevBag.filter((_, i) => i !== index));
//     setBagCount((prevCount) => prevCount - 1);
//   };

//   return (
//     <Router>
//       <div className="container-fluid">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/shop"
//             element={
//               <ShopPage
//                 addToBag={addToBag}
//                 bagCount={bagCount}
//                 setBagCount={setBagCount}
//               />
//             }
//           />
//           <Route
//             path="/shoppingbag"
//             element={
//               <ShoppingBag
//                 shoppingBag={shoppingBag}
//                 removeFromBag={removeFromBag}
//               />
//             }
//           />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/ordersDetails" element={<OrdersPage />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/artist" element={<ArtistDashboard/>} />
//           <Route path="/login" element={<Auth/>} />
//           <Route path="/admin" element={<Dashboard/>} />
//         </Routes>
//       </div>
//     </Router>
//   );
 
// }

// export default App;


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Orders from "./components/admin/Orders";
import Artists from "./components/admin/Artists";
import Payments from "./components/admin/payments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;
