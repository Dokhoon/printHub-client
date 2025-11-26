import React from "react";
import "./welcome.css";
import { Link } from "react-router-dom";


import logo from "../assets/logo.png";
import flowers from "../assets/flowers.png";
import { FaInstagram, FaFacebook, FaGlobe, FaShoppingCart } from "react-icons/fa";

export default function WelcomePage() {
  return (
    <div className="welcome-container">

      {/* Header */}
      <div className="welcome-header">
        <img src={logo} className="welcome-logo" alt="logo" />

        <nav>
          <a href="/cart" className="cart-icon">
            <FaShoppingCart size={20} />
          </a>

          <a href="/login">Log Out</a>
        </nav>
      </div>

      {/* Content */}
      <div className="welcome-content">

        <h2>Welcome to PrintHub Shop</h2>
        <p>
          Every card tells a story <br />
          Start ordering now.
        </p>

        <Link to="/cards">
          <button className="browse-btn">Browse Cards</button>
        </Link>

        {/* Social Icons */}
        <div className="socials">
          <FaInstagram className="social-icon" />
          <FaFacebook className="social-icon" />
          <FaGlobe className="social-icon" />
        </div>

      </div>

      {/* Right Image */}
      <div className="welcome-side">
        <img src={flowers} alt="flowers" />
      </div>

    </div>
  );
}
