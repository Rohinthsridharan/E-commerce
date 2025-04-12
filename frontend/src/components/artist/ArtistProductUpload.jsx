import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import Sidebar from './ArtistSidebar';
import axios from 'axios';

const ArtistProductUpload = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productFile, setProductFile] = useState(null);
  const [productCategory, setProductCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch artist's products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('Please log in first!');
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/products/artist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err.response?.data);
        setError('Failed to load products.');
      }
    };
    fetchProducts();
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Please log in first!');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('category', productCategory);
    if (productFile) formData.append('image', productFile);

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product posted successfully!');
      setProducts([...products, response.data]); // Add new product to the list
      setProductName('');
      setProductPrice('');
      setProductCategory('');   //reset category
      setProductFile(null);
    } catch (err) {
      console.error('Error:', err.response?.status, err.response?.data);
      alert(`Failed to upload product: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product Management</h2>
        </div>
        <div className="card border-warning mb-4">
          <div className="card-body">
            <Form onSubmit={handleProductSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="border-warning"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  className="border-warning"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required 
                  className="border-warning"
                  placeholder='e.g., Pencil Portrait, Watercolor Painting'
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Product Image</Form.Label>
                <div className="border border-warning rounded p-4 text-center">
                  <Form.Control
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={(e) => setProductFile(e.target.files[0])}
                    className="d-none"
                    id="fileInput"
                  />
                  <Button as="label" htmlFor="fileInput" variant="outline-warning" className="w-100">
                    <Upload size={16} className="me-2" />
                    Upload Product Image (JPEG, PNG, PDF)
                  </Button>
                  {productFile && <div className="mt-2 text-muted small">{productFile.name}</div>}
                </div>
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100">
                Submit Product
              </Button>
            </Form>
          </div>
        </div>

        {/* Display artist's products */}
        <div className="card border-warning">
          <div className="card-body">
            <h3 className="mb-3">Your Products</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {products.length === 0 && !error ? (
              <p className="text-center">No products found.</p>
            ) : (
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>#{product._id.slice(-6)}</td>
                        <td>{product.name || 'N/A'}</td>
                        <td>₹{product.price?.toFixed(2) || 'N/A'}</td>
                        <td>{product.category}</td>
                        <td>
                          {product.image ? (
                            <a href={`http://localhost:5000${product.image}`} target="_blank" rel="noopener noreferrer">
                              View Image
                            </a>
                          ) : (
                            <span className="text-muted">No Image</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistProductUpload;