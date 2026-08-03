import React from "react";
import "./Pages.css";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="page-container">
      <h2>My Account</h2>

      {/* Profile Information */}
      <div className="card">
        <h3>👤 Profile Information</h3>
        <p><strong>Name:</strong> {user?.name || "User"}</p>
        <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
        <p><strong>Account ID:</strong> ZD102345</p>
        <p><strong>Account Type:</strong> Individual</p>
      </div>

      {/* Wallet */}
      <div className="card">
        <h3>💰 Wallet Summary</h3>
        <p><strong>Available Balance:</strong> ₹15,250</p>
        <p><strong>Used Margin:</strong> ₹3,500</p>
        <p><strong>Total Portfolio Value:</strong> ₹1,25,400</p>
      </div>

      {/* Trading Summary */}
      <div className="card">
        <h3>📈 Trading Summary</h3>
        <p><strong>Today's Profit/Loss:</strong> <span style={{color:"green"}}>+₹1,250</span></p>
        <p><strong>Total Holdings:</strong> 13</p>
        <p><strong>Open Positions:</strong> 2</p>
        <p><strong>Orders Today:</strong> 5</p>
      </div>

      {/* Investment Goal */}
      <div className="card">
        <h3>🎯 Investment Goal</h3>
        <p>Goal: ₹5,00,000</p>
        <p>Current: ₹1,25,400</p>

        <progress value="25" max="100" style={{width:"100%"}}></progress>
        <p>25% Completed</p>
      </div>

      {/* Account Level */}
      <div className="card">
        <h3>🏆 Account Level</h3>
        <p>🥉 Beginner Investor</p>
        <progress value="70" max="100" style={{width:"100%"}}></progress>
        <p>70% Progress to Silver Level</p>
      </div>

      {/* Security */}
      <div className="card">
        <h3>🛡 Security Status</h3>
        <p>✅ Email Verified</p>
        <p>✅ Mobile Verified</p>
        <p>✅ KYC Completed</p>
        <p>✅ PAN Linked</p>
      </div>

      {/* Achievements */}
      <div className="card">
        <h3>🏅 Achievements</h3>
        <ul>
          <li>🏅 First Investment</li>
          <li>🏅 Portfolio Created</li>
          <li>🏅 10 Successful Trades</li>
          <li>🏅 Verified Investor</li>
        </ul>
      </div>

      {/* Last Login */}
      <div className="card">
        <h3>📅 Last Login</h3>
        <p><strong>Device:</strong> Chrome on Windows</p>
        <p><strong>Location:</strong> Nashik, Maharashtra</p>
        <p><strong>Status:</strong> Active Now</p>
      </div>
    </div>
  );
};

export default Account;