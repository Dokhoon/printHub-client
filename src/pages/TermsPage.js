import React from "react";
import { Link } from "react-router-dom";
import "./TermsPage.css"; 

export default function TermsPage() {
  return (
    <div className="terms-container">
      <header>
        <h2>Terms & Conditions</h2>
        <Link to="/register" className="back-link">Back to Registration</Link>
      </header>

      <main>
        <p>By creating an account and using PrintHub, you agree to:</p>
        <ol>
          <li>Provide accurate personal information.</li>
          <li>Complete payment before orders are shipped.</li>
          <li>Respect copyrights of all card designs.</li>
          <li>Follow our privacy and data policies.</li>
          <li>Use the platform responsibly and legally.</li>
        </ol>
      </main>
    </div>
  );
}
