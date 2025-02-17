import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Orders from './Orders';
import ProductUpload from './ProductUpload';
import Payments from './Payments';

const ArtistDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([
    { id: "1", customer: "John Doe", product: "Handmade Vase", total: 89.99, status: "completed", proof: "delivery_confirmation.jpg" },
    { id: "2", customer: "Jane Smith", product: "Ceramic Bowl", total: 45.0, status: "in_progress" },
    { id: "3", customer: "Alice Johnson", product: "Pottery Set", total: 129.99, status: "pending" },
    { id: "4", customer: "Bob Williams", product: "Clay Sculpture", total: 199.99, status: "completed", proof: "sculpture_delivered.jpg" },
    { id: "5", customer: "Emma Brown", product: "Ceramic Mug", total: 24.99, status: "in_progress" },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [overviewData, setOverviewData] = useState([
    { name: "Jan", total: 2400 },
    { name: "Feb", total: 1398 },
    { name: "Mar", total: 9800 },
    { name: "Apr", total: 3908 },
    { name: "May", total: 4800 },
    { name: "Jun", total: 3800 },
    { name: "Jul", total: 4300 },
    { name: "Aug", total: 5300 },
    { name: "Sep", total: 4800 },
    { name: "Oct", total: 6000 },
    { name: "Nov", total: 4300 },
    { name: "Dec", total: 7800 },
  ]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productFiles, setProductFiles] = useState([]);
  const [paymentRequests, setPaymentRequests] = useState([
    { id: "1", amount: 1250.0, status: "approved", date: "2024-02-01" },
    { id: "2", amount: 850.0, status: "approved", date: "2024-01-28" },
    { id: "3", amount: 1500.0, status: "pending", date: "2024-02-05" },
  ]);
// eslint-disable-next-line no-unused-vars
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", { productName, productPrice, productDescription, productFiles });
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductFiles([]);
  };

  const handlePaymentSubmit = (amount) => {
    const newRequest = {
      id: (paymentRequests.length + 1).toString(),
      amount: parseFloat(amount),
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };
    setPaymentRequests([...paymentRequests, newRequest]);
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' , overflowY :'auto' ,width:'100%'}}>
      {isSidebarOpen && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
      <main className="flex-grow-1 bg-light">
        {activeTab === 'dashboard' && <Dashboard overviewData={overviewData} orders={orders} />}
        {activeTab === 'orders' && <Orders orders={orders} handleStatusChange={handleStatusChange} />}
        {activeTab === 'product-upload' && (
          <ProductUpload 
            productName={productName}
            productPrice={productPrice}
            productDescription={productDescription}
            productFiles={productFiles}
            handleProductNameChange={(e) => setProductName(e.target.value)}
            handleProductPriceChange={(e) => setProductPrice(e.target.value)}
            handleProductDescriptionChange={(e) => setProductDescription(e.target.value)}
            handleFileUpload={(e) => setProductFiles([...e.target.files])}
            handleProductSubmit={handleProductSubmit}
          />
        )}
        {activeTab === 'payments' && <Payments paymentRequests={paymentRequests} handlePaymentSubmit={handlePaymentSubmit} />}
      </main>
    </div>
  );
};

export default ArtistDashboard;