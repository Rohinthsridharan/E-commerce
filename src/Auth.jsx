import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();  // Initialize navigate function

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission

    // Assuming the login or register process is successful
    // After successful login/signup, redirect to the desired page
    navigate("/");  // Replace "/dashboard" with your desired route
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && <input type="text" placeholder="Full Name" required />}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {isRegister && <input type="password" placeholder="Confirm Password" required />}
          <button type="submit">{isRegister ? "Register" : "Login"} </button>
        </form>
        <p onClick={toggleForm} className="toggle-text">
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Auth;