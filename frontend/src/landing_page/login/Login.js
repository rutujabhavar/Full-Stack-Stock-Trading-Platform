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
       "https://full-stack-stock-trading-platform-s07k.onrender.com/api/auth/login",
        formData
      );


      localStorage.setItem("token", res.data.token);


      alert("Login Successful!");


   window.location.href = "https://full-stack-stock-trading-platform-pv1o.onrender.com";


    } catch (err) {

      alert(
        err.response?.data?.message || "Login Failed"
      );

    }

  };


  return (

    <div className="auth-container">


      <form 
        onSubmit={handleSubmit} 
        className="auth-form"
      >


        <h2>Login</h2>


        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />


        <button type="submit">
          Login
        </button>


      </form>


    </div>

  );
}


export default Login;