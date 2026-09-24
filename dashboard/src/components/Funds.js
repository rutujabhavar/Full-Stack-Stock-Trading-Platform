import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // ==========================================
  // FETCH FUNDS
  // ==========================================

  const fetchFunds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/funds"
      );

      console.log("Funds:", response.data);

      setFunds(response.data);
    } catch (error) {
      console.error("Error fetching funds:", error);

      alert(
        "Unable to fetch funds. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);


  // ==========================================
  // FORMAT MONEY
  // ==========================================

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toFixed(2)}`;
  };


  // ==========================================
  // ADD FUNDS
  // ==========================================

  const handleAddFunds = async () => {
    const enteredAmount = Number(amount);

    if (!enteredAmount || enteredAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      setProcessing(true);

      const response = await axios.post(
        "http://localhost:3002/addFunds",
        {
          amount: enteredAmount,
        }
      );

      console.log("Add Funds:", response.data);

      setFunds(response.data.funds);

      setAmount("");

      alert(
        `₹${enteredAmount.toFixed(2)} added successfully!`
      );
    } catch (error) {
      console.error("Add funds error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add funds."
      );
    } finally {
      setProcessing(false);
    }
  };


  // ==========================================
  // WITHDRAW FUNDS
  // ==========================================

  const handleWithdraw = async () => {
    const enteredAmount = Number(amount);

    if (!enteredAmount || enteredAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      setProcessing(true);

      const response = await axios.post(
        "http://localhost:3002/withdrawFunds",
        {
          amount: enteredAmount,
        }
      );

      console.log("Withdraw:", response.data);

      setFunds(response.data.funds);

      setAmount("");

      alert(
        `₹${enteredAmount.toFixed(2)} withdrawn successfully!`
      );
    } catch (error) {
      console.error("Withdraw error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to withdraw funds."
      );
    } finally {
      setProcessing(false);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="funds">
        <h2>Loading Funds...</h2>
      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (!funds) {
    return (
      <div className="funds">
        <h2>Unable to load funds</h2>

        <button
          className="btn"
          onClick={fetchFunds}
        >
          Try Again
        </button>
      </div>
    );
  }


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="funds">

      {/* ==========================================
          ADD / WITHDRAW FUNDS
      ========================================== */}

      <div className="funds-actions">

        <div className="funds-action-text">
          Instant, zero-cost fund transfers with UPI
        </div>

        <input
          type="number"
          placeholder="Enter Amount"
          className="fund-input"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          min="1"
        />

        <button
          className="btn btn-green"
          onClick={handleAddFunds}
          disabled={processing}
        >
          {processing ? "Processing..." : "Add Funds"}
        </button>

        <button
          className="btn btn-blue"
          onClick={handleWithdraw}
          disabled={processing}
        >
          {processing ? "Processing..." : "Withdraw"}
        </button>

      </div>


      {/* ==========================================
          EQUITY
      ========================================== */}

      <h3 className="title">
        Equity
      </h3>


      <div className="funds-container">

        {/* ==========================================
            FUNDS CARD
        ========================================== */}

        <div className="funds-card">

          <div className="fund-row">
            <span>
              Available Balance
            </span>

            <strong>
              {formatMoney(
                funds.availableBalance
              )}
            </strong>
          </div>


          <div className="fund-row">
            <span>
              Used Margin
            </span>

            <strong>
              {formatMoney(
                funds.usedMargin
              )}
            </strong>
          </div>


          <div className="fund-row">
            <span>
              Total Balance
            </span>

            <strong>
              {formatMoney(
                funds.totalBalance
              )}
            </strong>
          </div>


          <hr />


          <div className="fund-row">
            <span>
              Available Cash
            </span>

            <strong>
              {formatMoney(
                funds.availableBalance
              )}
            </strong>
          </div>


          <div className="fund-row">
            <span>
              Opening Balance
            </span>

            <strong>
              ₹1,00,000.00
            </strong>
          </div>


          <div className="fund-row">
            <span>
              Collateral
            </span>

            <strong>
              ₹0.00
            </strong>
          </div>

        </div>


        {/* ==========================================
            COMMODITY CARD
        ========================================== */}

        <div className="commodity-card">

          <p>
            You don't have a commodity account.
          </p>

          <button className="btn btn-blue">
            Open Account
          </button>

        </div>

      </div>

    </div>
  );
};

export default Funds;