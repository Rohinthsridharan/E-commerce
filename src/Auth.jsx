import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError("");
    setCredentials({ fullname: "", username: "", password: "", confirmPassword: "" });
  };

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

 const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!isValidEmail(credentials.username)) {
      setError("Invalid Email Format!");
      return;
    }
  
    if (isRegister) {
      if (credentials.password !== credentials.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
  
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const newUserId = `U${(users.length + 1).toString().padStart(3, "0")}`;
  
      const newUser = {
        id: newUserId,
        name: credentials.fullname,
        email: credentials.username,
        password: credentials.password,
      };
  
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("Registration successful! You can now log in.");
      toggleForm();
      return;
    }
  
    // Admin and Artist Login
    if (credentials.username === "Admin@gmail.com" && credentials.password === "rohinth") {
      localStorage.setItem("user", JSON.stringify({ name: "Admin", email: "Admin@gmail.com" }));
      navigate("/admindashboard");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let artists = JSON.parse(localStorage.getItem("artists")) || [];
  
    let user = users.find((u) => u.email === credentials.username && u.password === credentials.password);
    let artist = artists.find((a) => a.email === credentials.username && a.password === credentials.password);
  
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/userdashboard");
    } else if (artist) {
      localStorage.setItem("user", JSON.stringify(artist));
      localStorage.setItem("artistId", artist.id); // ✅ Store artistId in localStorage
      navigate("/artistdashboard");
    } else {
      setError("Invalid credentials!");
    }
  }; 

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input type="text" name="fullname" placeholder="Full Name" required onChange={handleChange} value={credentials.fullname} />
          )}
          <input type="text" name="username" placeholder="Email" required onChange={handleChange} value={credentials.username} />
          {error && <p className="error-message">{error}</p>}
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={credentials.password} />
          {isRegister && (
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} value={credentials.confirmPassword} />
          )}
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>
        <p onClick={toggleForm} className="toggle-text">
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
