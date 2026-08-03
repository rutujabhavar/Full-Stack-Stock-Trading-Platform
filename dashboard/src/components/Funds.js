import React, { useState, useEffect } from "react";


const Funds = () => {
  const [balance, setBalance] = useState(4043.10);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");

    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const addFunds = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const newBalance = balance + Number(amount);

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    alert("Funds Added Successfully!");

    setAmount("");
  };

  const withdrawFunds = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (Number(amount) > balance) {
      alert("Insufficient Balance");
      return;
    }

    const newBalance = balance - Number(amount);

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    alert("Withdrawal Successful!");

    setAmount("");
  };

  return (
    <>
      <div className="funds">

        <p>Instant, zero-cost fund transfers with UPI</p>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn btn-green" onClick={addFunds}>
          Add Funds
        </button>

        <button className="btn btn-blue" onClick={withdrawFunds}>
          Withdraw
        </button>

      </div>

      <div className="row">

        <div className="col">

          <span>
            <p>Equity</p>
          </span>

          <div className="table">

            <div className="data">
              <p>Available Margin</p>
              <p className="imp colored">
                ₹ {balance.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Used Margin</p>
              <p className="imp">₹ 3757.30</p>
            </div>

            <div className="data">
              <p>Available Cash</p>
              <p className="imp">
                ₹ {balance.toFixed(2)}
              </p>
            </div>

            <hr />

            <div className="data">
              <p>Opening Balance</p>
              <p>₹ 4043.10</p>
            </div>

            <div className="data">
              <p>Collateral</p>
              <p>₹ 0.00</p>
            </div>

          </div>

        </div>

        <div className="col">

          <div className="commodity">

            <p>You don't have a commodity account.</p>

            <button
              className="btn btn-blue"
              onClick={() => alert("Commodity Account Opening Coming Soon")}
            >
              Open Account
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default Funds;