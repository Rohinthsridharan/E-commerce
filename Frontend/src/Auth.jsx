import { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State for checkbox
  const [showTerms, setShowTerms] = useState(false); // State for terms modal
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError('');
    setCredentials({ fullname: '', username: '', password: '', confirmPassword: '' });
    setAcceptedTerms(false); // Reset checkbox on toggle
  };

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only check terms acceptance for registration
    if (isRegister && !acceptedTerms) {
      setError('You must accept the Terms and Conditions to proceed.');
      return;
    }
    
    if (!isValidEmail(credentials.username)) {
      setError('Invalid Email Format!');
      return;
    }

    if (isRegister) {
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          name: credentials.fullname,
          email: credentials.username,
          password: credentials.password,
        });
        localStorage.setItem('token', res.data.token);
        alert('Registration successful!');
        navigate('/userdashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed!');
      }
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: credentials.username,
          password: credentials.password,
        });
        localStorage.setItem('token', res.data.token);
        const role = res.data.role;
        if (role === 'admin') navigate('/admindashboard');
        else if (role === 'artist') navigate('/artistdashboard');
        else navigate('/userdashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials!');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              required
              onChange={handleChange}
              value={credentials.fullname}
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="Email"
            required
            onChange={handleChange}
            value={credentials.username}
          />
          {error && <p className="error-message">{error}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={credentials.password}
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              value={credentials.confirmPassword}
            />
          )}
          {/* Show terms checkbox only on register page */}
          {isRegister && (
            <div className="terms-container">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <span className="terms-link" onClick={() => setShowTerms(true)}>
                  Terms and Conditions
                </span>
              </label>
            </div>
          )}
          <button type="submit" disabled={isRegister && !acceptedTerms}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p onClick={toggleForm} className="toggle-text">
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>

      {/* Show terms modal only when registering */}
      {isRegister && showTerms && (
        <div className="terms-modal">
          <div className="terms-content">
            <h3>Terms and Conditions</h3>
            <p>Welcome to Artify! By using this platform, you agree to the following terms:</p>
            <ol>
              <li>
                <strong>Age Restriction:</strong> Users must be 13 years or older to access or use this platform.
              </li>
              <li>
                <strong>Non-Refundable Payments:</strong> All payments made on this platform are non-refundable. No refunds will be issued under any circumstances, and users should be fully aware of this policy before making a purchase.
              </li>
              <li>
                <strong>Purchase Conditions:</strong> Products can only be purchased if customization is required. Ensure your need aligns with the offerings before proceeding.
              </li>
              <li>
                <strong>Data Usage:</strong> This platform may collect and store your personal data (e.g., name, email) as per our Privacy Policy. By agreeing, you consent to this data usage.
              </li>
              <li>
                <strong>Artist Registration:</strong> Artists wishing to join must contact support via the Contact Form. Admin verification includes calls, photos via email, and video chats. Only approved artists can join.
              </li>
              <li>
                <strong>Artist Responsibilities:</strong>
                <ul>
                  <li>Passwords cannot be regenerated; artists must safeguard their credentials.</li>
                  <li>Posting unwanted or illegal images is strictly prohibited and may lead to legal action, including imprisonment.</li>
                  <li>Payments are released only after work is completed, delivery tracking images are uploaded, and the admin approves. Artists must perform effectively to receive payment.</li>
                  <li>Perfection in work is key to success on this platform.</li>
                </ul>
              </li>
              <li>
                <strong>Admin Disclaimer:</strong> The admin is not responsible for any issues, fraud, or disputes arising on this platform. Users and artists should remain vigilant.
              </li>
              <li>
                <strong>Platform Purpose:</strong> We offer high-quality arts at affordable rates from middle-class artists. Use this platform responsibly.
              </li>
              <li>
                <strong>General E-Commerce Terms:</strong>
                <ul>
                  <li>We reserve the right to modify or terminate services at any time without notice.</li>
                  <li>Users are responsible for maintaining the confidentiality of their accounts.</li>
                  <li>Unauthorized use of this platform may result in account suspension.</li>
                </ul>
              </li>
            </ol>
            <button className="close-terms" onClick={() => setShowTerms(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;