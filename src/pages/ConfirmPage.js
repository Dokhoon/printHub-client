import React from "react";
import { Link } from "react-router-dom";
import "./confirm.css";

import thankyou from '../assets/thankyou.png';
import logo from '../assets/logo.png';

export default function ConfirmPage() {
  return (
    <div className="confirm-container">

      {/* HEADER */}
      <header className="confirm-header">
        <div className="header-left">
          <img src={logo} className="confirm-logo" alt="logo" />
          <h3>PrintHub</h3>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Log Out</Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <div className="confirm-main">

        {/* Confirmation Card */}
        <div className="confirm-card">
          <div className="checkmark">✔</div>
          <h2>All done!</h2>
          <p>Thank you for your order. Your items will be processed shortly.</p>
          <Link to="/" className="home-btn">Back to Home</Link>
        </div>

        {/* Side Image */}
        <div className="confirm-side">
          <img src={thankyou} alt="Thank You" />
        </div>

      </div>

    </div>
  );
}
