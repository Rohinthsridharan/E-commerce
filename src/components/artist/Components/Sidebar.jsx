import React from 'react';
import { LogOut, Package, ShoppingCart, CircleDollarSign, Upload } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: '250px' }}>
      <div className="p-3 border-bottom border-warning">
        <h3 className="m-0">Artify</h3>
      </div>
      <div className="flex-grow-1">
        <ul className="nav flex-column p-2">
          <li className="nav-item">
            <button 
              className={`btn btn-link nav-link text-left text-white ${activeTab === 'dashboard' ? 'bg-warning' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Package className="mr-2" size={18} />
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn btn-link nav-link text-left text-white ${activeTab === 'orders' ? 'bg-warning' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart className="mr-2" size={18} />
              Orders
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn btn-link nav-link text-left text-white ${activeTab === 'product-upload' ? 'bg-warning' : ''}`}
              onClick={() => setActiveTab('product-upload')}
            >
              <Upload className="mr-2" size={18} />
              Add Product
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`btn btn-link nav-link text-left text-white ${activeTab === 'payments' ? 'bg-warning' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <CircleDollarSign className="mr-2" size={18} />
              Payments
            </button>
          </li>
        </ul>
      </div>
      <div className="border-top border-warning p-3">
        <button className="btn btn-link text-white">
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;