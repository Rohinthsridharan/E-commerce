import React, { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const Payments = ({ paymentRequests, handlePaymentSubmit }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "warning",
      approved: "success",
      rejected: "danger",
    };
    return (
      <span className={`badge bg-${statusColors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Payment Management</h2>
        {/* <Button 
          variant="warning" 
          onClick={() => setShowPaymentModal(true)}
        >
          New Payment Request
        </Button> */}
      </div>

      <div className="card border-warning">
        <div className="card-body p-0">
          <Table striped hover>
            <thead className="bg-warning">
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentRequests.map(payment => (
                <tr key={payment.id}>
                  <td>#{payment.id}</td>
                  <td>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(payment.amount)}
                  </td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
            <div className='d-flex justify-content-between align-items-center mb-4' >
              <Button 
              variant="warning" 
              onClick={() => setShowPaymentModal(true)} 
              >
              New Payment Request
              </Button>
            </div>
        </div>
      </div>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton className="bg-warning text-dark">
          <Modal.Title>New Payment Request</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handlePaymentSubmit(paymentAmount);
          setShowPaymentModal(false);
        }}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
                className="border-warning"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button variant="warning" type="submit">
              Submit Request
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;