import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">

        {/* TradeX Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{
            textDecoration: "none",
            gap: "9px",
          }}
        >
          {/* TradeX Symbol */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#387ed1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* T */}
  <path
    d="M4 6H15"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
  />

  <path
    d="M9.5 6V18"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
  />

  {/* Rising market line */}
  <path
    d="M13 17L16 13.5L18 15L21 10"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
          </div>

          {/* TradeX */}
          <span
            style={{
              fontFamily: "'Segoe UI', Arial, sans-serif",
              fontSize: "25px",
              fontWeight: "600",
              letterSpacing: "1px",
              color: "#222",
            }}
          >
            Trade<span style={{ color: "#387ed1" }}>X</span>
          </span>
        </Link>

        {/* Mobile button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ORIGINAL RIGHT-SIDE NAVIGATION */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <form className="d-flex ms-auto" role="search">
            <ul className="navbar-nav mb-lg-0">

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/login"
                >
                  Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/product"
                >
                  Product
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/pricing"
                >
                  Pricing
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/support"
                >
                  Support
                </Link>
              </li>

            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;