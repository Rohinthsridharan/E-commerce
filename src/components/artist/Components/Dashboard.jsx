import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign, ShoppingCart } from 'lucide-react';
import { Table } from 'react-bootstrap';

const Dashboard = ({ overviewData, orders }) => {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card border-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Total Revenue</h5>
                <CircleDollarSign size={20} className="text-warning" />
              </div>
              <h3 className="card-text">$45,231.89</h3>
              <small className="text-muted">+20.1% from last month</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card border-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Orders</h5>
                <ShoppingCart size={20} className="text-warning" />
              </div>
              <h3 className="card-text">+573</h3>
              <small className="text-muted">+201 since last hour</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card border-warning">
            <div className="card-body">
              <h5 className="card-title mb-4">Sales Overview</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overviewData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#ffc107" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card border-warning">
            <div className="card-body">
              <h5 className="card-title mb-4">Recent Orders</h5>
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customer}</td>
                        <td>${order.total}</td>
                        <td>
                          <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;