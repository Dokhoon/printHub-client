import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import mainPage from "../assets/mainPage.jpg";
import "./MainPage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      {/* Header */}
      <header className="header glass">
        <div className="brand">
          <img src={logo} alt="logo" className="logo" />
          <h5>PrintHub</h5>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-outline-dark btn-animate"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="btn btn-dark btn-animate"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src={mainPage} alt="mainPage" className="hero-img" />

        <div className="hero-overlay">
          <div className="hero-content fade-up">
            <h2>Browse ready-made cards with heartfelt messages</h2>
            <p>Choose your favorite and order in minutes</p>
          </div>
        </div>
      </section>
    </div>
  );
}
