import React from "react";
import "./Pages.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="page-container">
      <h2>My Profile</h2>

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <span className="badge">🥉 Beginner Investor</span>
          </div>
        </div>

        <hr />

        <div className="profile-section">
          <h4>📋 Personal Information</h4>

          <p><strong>Full Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Country:</strong> India</p>
          <p><strong>Language:</strong> English</p>
          <p><strong>Member Since:</strong> August 2026</p>
        </div>

        <div className="profile-section">
          <h4>⭐ Profile Completion</h4>

          <progress value="80" max="100"></progress>
          <p>80% Completed</p>
        </div>

        <div className="profile-section">
          <h4>🎯 Investment Interests</h4>

          <div className="tags">
            <span>Stocks</span>
            <span>Mutual Funds</span>
            <span>ETF</span>
            <span>Long Term</span>
          </div>
        </div>

        <div className="profile-section">
          <h4>🏆 Achievements</h4>

          <ul>
            <li>✅ Verified User</li>
            <li>🏅 First Investment</li>
            <li>📈 Portfolio Created</li>
            <li>🔥 Active Investor</li>
          </ul>
        </div>

        <div className="profile-section">
          <h4>📊 Account Statistics</h4>

          <div className="stats">
            <div>
              <h3>13</h3>
              <p>Holdings</p>
            </div>

            <div>
              <h3>5</h3>
              <p>Orders</p>
            </div>

            <div>
              <h3>₹1.25L</h3>
              <p>Portfolio</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h4>✍️ About Me</h4>

          <p>
            Passionate investor exploring the stock market and building
            long-term wealth through disciplined investing.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Profile;