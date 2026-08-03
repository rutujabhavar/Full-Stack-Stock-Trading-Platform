import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Menu = () => {
   const navigate = useNavigate();   // ✅ Put it here
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // 👇 ADD THIS
  const params = new URLSearchParams(window.location.search);
const userFromUrl = params.get("user");

if (userFromUrl) {
  localStorage.setItem("user", userFromUrl);

  // Remove ?user=... from the URL
  window.history.replaceState({}, "", window.location.pathname);
}





  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

      {/* User Profile */}
<div className="profile-container">

  <div className="profile" onClick={handleProfileClick}>
    <div className="avatar">
      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
    </div>

    <p className="username">
      {user?.name || "User"} ▼
    </p>
  </div>

  {isProfileDropdownOpen && (
    <div className="profile-dropdown">

      <p onClick={() => navigate("/profile")}>
      👤 My Profile
    </p>

    <p onClick={() => navigate("/account")}>
      📊 My Account
    </p>

    <p onClick={() => navigate("/funds")}>
      💰 Funds
    </p>

    <p onClick={() => navigate("/settings")}>
      ⚙️ Settings
    </p>



    <hr />

      <p
        className="logout"
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "http://localhost:3000/login";
        }}
      >
        🚪 Logout
      </p>

    </div>
  )}

</div>
      </div>
    </div>
  );
};

export default Menu;