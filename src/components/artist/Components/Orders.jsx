import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import { Ship } from 'lucide-react';

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
      </div>

      <div className="card border-warning">
        <div className="card-body">
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Proof</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>₹{order.total}</td>
                    <td>
                      <Form.Select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`border-${order.status === 'completed' ? 'success' : 'warning'}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Button variant="outline-warning" size="sm">
                        {order.proof ? 'View Proof' : 'Add Proof'}
                      </Button>
                    </td>
                    <td>
                      {order.status === 'completed' && (
                        <Button variant="warning" size="sm">
                          <Ship size={16} className="me-1" />
                          Ship Now
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;