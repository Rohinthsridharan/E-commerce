// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import '../styles/ShopPage.css';

// const ShopPage = ({ addToBag, bagCount, setBagCount }) => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products");
//         setProducts(res.data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching products:', err.response?.data);
//         setError('Failed to load products. Please try again later.');
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleBuyNow = (product) => {
//     navigate("/checkout", { state: { product } });
//   };

//   const handleAddToBag = async (product) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please log in to add items to your bag!");
//       navigate("/login");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/cart",
//         { productId: product._id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       addToBag(product);
//       setBagCount(bagCount + 1);
//       alert(`${product.name} has been added to your bag!`);
//     } catch (err) {
//       console.error('Error adding to bag:', err.response?.data);
//       alert(`Failed to add ${product.name} to bag: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   return (
//     <div>
//       <Navbar bagCount={bagCount} />
//       <div className="container my-5">
//         <h2 className="text-center mb-4">Shop Our Products</h2>
//         {error && <div className="alert alert-danger text-center">{error}</div>}
//         {products.length === 0 && !error ? (
//           <p className="text-center">Loading products...</p>
//         ) : (
//           <div className="row">
//             {products.map((product) => (
//               <div key={product._id} className="col-md-3 mb-4">
//                 <div className="ecommerce-box p-3 border rounded shadow">
//                   <div className="image-container text-right">
//                     <img
//                       src={`http://localhost:5000${product.image}`}
//                       alt={product.name}
//                       className="product-image"
//                       onError={(e) => (e.target.src = "/placeholder.jpg")}
//                     />
//                   </div>
//                   <div className="product-details text-center mt-3">
//                     <h5 className="product-name">{product.name}</h5>
//                     <p className="product-price">₹{product.price.toFixed(2)}</p>
//                     <div className="action-buttons">
//                       <button
//                         onClick={() => handleAddToBag(product)}
//                         className="btn btn-primary"
//                       >   
//                         Add to Bag
//                       </button>
//                       <button
//                         onClick={() => handleBuyNow(product)}
//                         className="btn btn-success"
//                       >
//                         Buy Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ShopPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FormControl } from "react-bootstrap"; // Using FormControl for consistency
import '../styles/ShopPage.css';

const ShopPage = ({ addToBag, bagCount, setBagCount }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchCategory, setSearchCategory] = useState(''); // State for category search

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err.response?.data);
        setError('Failed to load products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const handleAddToBag = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your bag!");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToBag(product);
      setBagCount(bagCount + 1);
      alert(`${product.name} has been added to your bag!`);
    } catch (err) {
      console.error('Error adding to bag:', err.response?.data);
      alert(`Failed to add ${product.name} to bag: ${err.response?.data?.message || err.message}`);
    }
  };

  // Filter products by category with fallback for undefined category
  const filteredProducts = products.filter(product =>
    (product.category || '').toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div>
      <Navbar bagCount={bagCount} />
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center mb-0">Shop Our Products</h2>
          <FormControl
            type="text"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            placeholder="Search by Category (e.g., Pencil Portrait, Watercolor Painting)..."
            className="w-25 border-warning"
            style={{ maxWidth: "300px" }} // Limit max width for responsiveness
          />
        </div>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {filteredProducts.length === 0 && !error ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-4"> {/* Changed to col-md-4 for 3 cards per row */}
                <div className="ecommerce-box p-3 border rounded shadow">
                  <div className="image-container text-right">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                    />
                  </div>
                  <div className="product-details text-center mt-3">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleAddToBag(product)}
                        className="btn btn-primary"
                      >
                        Add to Bag
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="btn btn-success"
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
      <Footer />
    </div>
  );
};

export default ShopPage;