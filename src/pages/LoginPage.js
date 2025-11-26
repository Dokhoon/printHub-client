import React from 'react';
import { FcGoogle } from 'react-icons/fc';        // Google icon
import { FaApple } from 'react-icons/fa';        // Apple icon
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import sideCard from '../assets/sideCard.png';
import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-page d-flex">
      {/* Left: login form */}
      <div className="login-left d-flex flex-column justify-content-center align-items-center p-4">
        <div className="login-card shadow-sm">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <img src={logo} alt="logo" className="logo"/>
          </div>
          <h4 className="text-center mb-3">Login to Your Account</h4>
          <form className="px-4 pb-3 w-100">
            <div className="mb-3">
              <input className="form-control" placeholder="Enter your Name" />
            </div>
            <div className="mb-2">
              <input type="password" className="form-control" placeholder="Enter your Password" />
            </div>
            <div className="text-end mb-3">
              <a href="#" className="text-danger small">Forgot Password?</a>
            </div>
            <div className="d-grid mb-2">
              <button className="btn btn-secondary">Login</button>
            </div>
             <p className="text-center small">
              No Account? <Link to="/register">SIGN UP</Link>
            </p>
            <div className="text-center mt-2 small text-muted">OR LOGIN USING</div>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <button className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center">
                <FcGoogle size={20} className="me-1" /> Google
              </button>
              <button className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center">
                <FaApple size={20} className="me-1" /> Apple
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right: side image */}
      <div className="login-side-image d-none d-md-block">
        <img src={sideCard} alt="side" className="h-100 w-100 object-cover" />
      </div>
    </div>
  );
}
