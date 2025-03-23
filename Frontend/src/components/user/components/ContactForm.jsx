import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContactForm.css';
import Navbar from './Navbar'; // Assuming Navbar exists
import Footer from './Footer'; // Assuming Footer exists

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, description } = formData;

    if (!name || !email || !description) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, description }),
      });

      const result = await response.json();
      if (response.ok) {
        setFormData({ name: '', email: '', description: '' });
        setSubmitted(true);
        setError('');
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-page-wrapper">
      <Navbar />
      <div className="container contact-form-container my-5">
        <h2 className="text-center mb-4 animate-header">Contact Us</h2>
        <form onSubmit={handleSubmit} className="p-4 shadow rounded animate-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control animate-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control animate-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Message</label>
            <textarea
              className="form-control animate-input"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your inquiry"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 animate-button">
            Submit
          </button>
        </form>
        {submitted && (
          <div className="alert alert-success mt-3 text-center animate-success">
            Thank you! Your message has been submitted.
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3 text-center animate-success">
            {error}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContactForm;