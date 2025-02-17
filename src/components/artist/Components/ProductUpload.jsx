import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Upload } from 'lucide-react';

const ProductUpload = ({ 
  productName, 
  productPrice, 
  productDescription, 
  productFiles, 
  handleProductNameChange, 
  handleProductPriceChange, 
  handleProductDescriptionChange, 
  handleFileUpload, 
  handleProductSubmit 
}) => {
  return (
    <div className="p-4">
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
                onChange={handleProductNameChange}
                required
                className="border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={productPrice}
                onChange={handleProductPriceChange}
                required
                className="border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productDescription}
                onChange={handleProductDescriptionChange}
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
                  onChange={handleFileUpload}
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

            <Button variant="warning" type="submit" className="w-100">
              Submit Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;