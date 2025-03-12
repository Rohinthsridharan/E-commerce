import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import Sidebar from './ArtistSidebar';

const ArtistProductUpload = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productFiles, setProductFiles] = useState([]);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const loggedInArtistId = localStorage.getItem("artistId");
    if (!loggedInArtistId) {
      console.error("❌ Artist ID not found in localStorage!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: parseFloat(productPrice),
      image: productFiles.length > 0 ? URL.createObjectURL(productFiles[0]) : null,
      artistId: loggedInArtistId,
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProductName('');
    setProductPrice('');
    setProductFiles([]);
  };

  const onsubmit = () => {
    alert("Product posted succesfully");
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar /> 
      <main className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product Management</h2>
        </div>

        <div className="card border-warning">
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

              <Form.Group className="mb-4">
                <Form.Label>Product Images</Form.Label>
                <div className="border border-warning rounded p-4 text-center">
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) => setProductFiles([...e.target.files])}
                    className="d-none"
                    id="fileInput"
                  />
                  <Button
                    as="label"
                    htmlFor="fileInput"
                    variant="outline-warning"
                    className="w-100"
                  >
                    <Upload size={16} className="me-2" />
                    Upload Product Images
                  </Button>
                  <div className="mt-2">
                    {productFiles.map((file, index) => (
                      <div key={index} className="text-muted small">{file.name}</div>
                    ))}
                  </div>
                </div>
              </Form.Group>

              <Button variant="warning" type="submit" className="w-100" onClick={onsubmit}>
                Submit Product
              </Button>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistProductUpload;
