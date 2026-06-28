import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:3002/api/auth/signup",
        formData
      );


      alert("Signup Successful!");

      navigate("/login");

      console.log(res.data);


    } catch (err) {


      if (err.response?.data?.message === "User already exists") {

        alert("User already exists. Please login");

        navigate("/login");


      } else {

        alert(
          err.response?.data?.message || "Signup Failed"
        );

      }

    }
  };


  return (

    <div className="auth-container">


      <form onSubmit={handleSubmit} className="auth-form">


        <h2>Signup</h2>


        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />


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
          Signup
        </button>


      </form>


    </div>

  );
}


export default Signup;