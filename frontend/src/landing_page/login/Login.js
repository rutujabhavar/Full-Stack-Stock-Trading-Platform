import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
       "https://full-stack-stock-trading-platform-2zk9.onrender.com/api/auth/login",
        formData
      );

         console.log("Response from backend:", res.data);
console.log("Logged in user:", res.data.user);                       // <-- Add this line

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Save logged-in user details
     localStorage.setItem("user", JSON.stringify(res.data.user));

     



//console.log("Saved user:", localStorage.getItem("user"));



alert("Login Successful!");

      alert("Login Successful!");

      // Redirect to dashboard
    window.location.href =
  `https://full-stack-stock-trading-platform-u4ac.onrender.com?user=${encodeURIComponent(
    JSON.stringify(res.data.user)
  )}`;

      // OR if you're using React Router:
      // navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;