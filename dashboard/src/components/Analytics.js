import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { watchlist } from "../data/data";

const Analytics = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [holding, setHolding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolding = async () => {
      try {
        const response = await axios.get(
          "https://tradex-stock-trading-platform.onrender.com/allHoldings"
        );

        const holdings = response.data;

        const stockHolding = holdings.find(
          (stock) =>
            stock.name.toUpperCase() === symbol.toUpperCase()
        );

        setHolding(stockHolding || null);
      } catch (error) {
        console.error("Error fetching holding:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolding();
  }, [symbol]);

  // Get stock information from watchlist
  const stock = watchlist.find(
    (item) => item.name.toUpperCase() === symbol.toUpperCase()
  );

  const stockName = stock?.name || symbol.toUpperCase();

  // Current price
  const currentPrice = holding
    ? Number(holding.price)
    : Number(stock?.price || 0);

  // If user owns the stock
  const quantity = holding ? Number(holding.qty) : 0;

  const averageCost = holding ? Number(holding.avg) : 0;

  const investment = averageCost * quantity;

  const currentValue = currentPrice * quantity;

  const pnl = currentValue - investment;

  const pnlPercentage =
    investment > 0 ? (pnl / investment) * 100 : 0;

  if (loading) {
    return (
      <div className="analytics-page">
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div
      className="analytics-page"
      style={{
        padding: "30px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>
            {stockName} Analytics
          </h1>

          <p style={{ marginTop: "8px", color: "#666" }}>
            Detailed performance of {stockName}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#387ed1",
            color: "white",
          }}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Current Price */}
      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "#f7f7f7",
          marginBottom: "25px",
        }}
      >
        <p style={{ margin: 0, color: "#777" }}>
          Current Price
        </p>

        <h2 style={{ marginTop: "8px" }}>
          ₹{currentPrice.toFixed(2)}
        </h2>
      </div>

      {/* Analytics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="analytics-card">
          <p>Quantity</p>
          <h2>{quantity}</h2>
        </div>

        <div className="analytics-card">
          <p>Average Cost</p>
          <h2>₹{averageCost.toFixed(2)}</h2>
        </div>

        <div className="analytics-card">
          <p>Investment</p>
          <h2>₹{investment.toFixed(2)}</h2>
        </div>

        <div className="analytics-card">
          <p>Current Value</p>
          <h2>₹{currentValue.toFixed(2)}</h2>
        </div>

        <div className="analytics-card">
          <p>P&L</p>
          <h2 className={pnl >= 0 ? "profit" : "loss"}>
            {pnl >= 0 ? "+" : ""}
            ₹{pnl.toFixed(2)}
          </h2>
        </div>

        <div className="analytics-card">
          <p>P&L %</p>
          <h2 className={pnl >= 0 ? "profit" : "loss"}>
            {pnl >= 0 ? "+" : ""}
            {pnlPercentage.toFixed(2)}%
          </h2>
        </div>
      </div>

      {/* Position Status */}
      <div
        style={{
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <h3>Position Summary</h3>

        {holding ? (
          <>
            <p>
              You currently hold{" "}
              <strong>{quantity}</strong> shares of{" "}
              <strong>{stockName}</strong>.
            </p>

            <p>
              Your average buying price is{" "}
              <strong>₹{averageCost.toFixed(2)}</strong>.
            </p>

            <p>
              Current market value is{" "}
              <strong>₹{currentValue.toFixed(2)}</strong>.
            </p>

            <p>
              Your current P&L is{" "}
              <strong
                className={pnl >= 0 ? "profit" : "loss"}
              >
                {pnl >= 0 ? "+" : ""}
                ₹{pnl.toFixed(2)}
              </strong>
            </p>
          </>
        ) : (
          <p>
            You currently don't hold {stockName}.
            <br />
            Use the Buy button from the watchlist to create a
            position.
          </p>
        )}
      </div>
    </div>
  );
};

export default Analytics;