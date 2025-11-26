import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import mainPage from '../assets/mainPage.jpg';
import './MainPage.css'

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="main-page h-100 position-relative">
      <header className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" className="logo me-3"/>
          <h5 className="mb-0">PrintHub</h5>
        </div>
        <div>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </header>

      <div className="hero position-relative">
        <img src={mainPage} alt="mainPage" className="w-100 h-100 object-cover" />
        <div className="hero-overlay d-flex flex-column justify-content-center align-items-center text-center">
          <h2 className="text-white">Browse ready-made cards with heartfelt messages</h2>
          <p className="text-white mt-2">Choose your favorite and order in minutes</p>
        </div>
      </div>
      <footer className="p-3 small text-muted">&nbsp;</footer>
    </div>
  );
}
