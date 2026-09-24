import React, { useState } from "react";
import axios from "axios";

const SellActionWindow = ({ uid, onClose }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");

  const handleSellClick = async () => {
    try {
      await axios.post(
        "https://tradex-stock-trading-platform.onrender.com/sellOrder",
        {
          name: uid,
          qty: Number(qty),
          price: Number(price),
        }
      );

      alert("Sell order placed successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to place sell order"
      );
    }
  };

  return (
    <div className="container">
      <h3>Sell {uid}</h3>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter selling price"
        />
      </div>

      <button
        onClick={handleSellClick}
        className="btn btn-danger"
      >
        Sell
      </button>

      <button
        onClick={onClose}
        className="btn btn-secondary"
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default SellActionWindow;
