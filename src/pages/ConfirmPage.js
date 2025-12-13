import React from "react";
import { Link } from "react-router-dom";
import "./confirm.css";

import thankyou from '../assets/thankyou.png';
import logo from '../assets/logo.png';

export default function ConfirmPage() {
  return (
    <div className="confirm-container">

      <header className="confirm-header">
        <div className="header-left">
          <img src={logo} className="confirm-logo" alt="logo" />
          <h3>PrintHub</h3>
        </div>
        <nav>
          <Link to="welcome">Home</Link>
          <Link to="/">Log Out</Link>
        </nav>
      </header>

      <div className="confirm-main">

        <div className="confirm-card">
          <div className="checkmark">✔</div>
          <h2>All done!</h2>
          <p>Thank you for your order. Your items will be processed shortly.</p>
          <Link to="/welcome" className="home-btn">Back to Home</Link>
        </div>

        <div className="confirm-side">
          <img src={thankyou} alt="Thank You" />
        </div>

      </div>

    </div>
  );
}
