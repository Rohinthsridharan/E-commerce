import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../styles/ShopPage.css';

const ShopPage = ({ addToBag, bagCount, setBagCount }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
<<<<<<< HEAD
        setError(null);
=======
        setError(null); // Clear any previous errors
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
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
<<<<<<< HEAD
      navigate("/login");
=======
      navigate("/login"); // Redirect to login if not authenticated
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
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

  return (
    <div>
      <Navbar bagCount={bagCount} />
<<<<<<< HEAD
      <div className="container my-5">
=======
      <div className="container-fluid my-5">
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
        <h2 className="text-center mb-4">Shop Our Products</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {products.length === 0 && !error ? (
          <p className="text-center">Loading products...</p>
        ) : (
<<<<<<< HEAD
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 mb-4">
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
=======
          <div className="ecommerce-box-list">
            {products.map((product) => (
              <div key={product._id} className="ecommerce-box">
                <div className="image-container">
                  <img
                    src={`http://localhost:5000${product.image}`} // Full URL
                    alt={product.name}
                    className="product-image"
                    style={{ height: "300px", objectFit: "cover" }} // Changed to "cover" for better fit
                    onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback image
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
                      Add to Bag
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="btn btn-success"
                    >
                      Buy Now
                    </button>
>>>>>>> 710881eb97a6d2a170660eaf887e3d5b4069aa23
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