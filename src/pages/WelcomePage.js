import React, { useState, useEffect } from "react";
import "./welcome.css";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import flowers from "../assets/flowers.png";
import { FaInstagram, FaFacebook, FaGlobe, FaShoppingCart } from "react-icons/fa";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [fade, setFade] = useState(false); // For fade-in/out animations

  useEffect(() => {
    setFade(true); // Trigger fade-in on mount
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      handleNavigate(`/search?q=${searchTerm}`);
    }
  };

  const handleNavigate = (path) => {
    setFade(false); // Trigger fade-out
    setTimeout(() => {
      navigate(path);
    }, 400); // Match CSS transition duration
  };

  return (
    <div className={`welcome-container ${fade ? "fade-in" : ""}`}>
      <div className="welcome-header">
        <img src={logo} className="welcome-logo" alt="logo" />

        <form onSubmit={handleSearch} className="welcome-search">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <nav>
          <span className="cart-icon" onClick={() => handleNavigate("/cart")}>
            <FaShoppingCart size={22} />
          </span>
          <button className="logout-btn" onClick={() => handleNavigate("/")}>
            Log Out
          </button>
        </nav>
      </div>

      <div className="welcome-content">
        <h2>Welcome to PrintHub Shop</h2>
        <p>
          Every card tells a story <br />
          Start ordering now.
        </p>

        <button className="browse-btn" onClick={() => handleNavigate("/cards")}>
          Browse Cards
        </button>

        <div className="socials">
          <FaInstagram className="social-icon" />
          <FaFacebook className="social-icon" />
          <FaGlobe className="social-icon" />
        </div>
      </div>

      <div className="welcome-side">
        <img src={flowers} alt="flowers" />
      </div>
    </div>
  );
}
