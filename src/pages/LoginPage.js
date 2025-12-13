import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import sideCard from '../assets/sideCard.png';
import './LoginPage.css';

import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice"; 

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login function
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      const payload = resultAction.payload;

      // Save user and token to localStorage
      if (payload.user) localStorage.setItem("user", JSON.stringify(payload.user));
      if (payload.token) localStorage.setItem("token", payload.token);

      // Automatically navigate based on role without showing alert
      if (payload.user.role === "admin") navigate("/admin");
      else navigate("/welcome");

    } else {
      // If login failed
      alert(resultAction.payload?.error || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};


  return (
    <div className="login-page d-flex">

      {/* Left: login form */}
      <div className="login-left d-flex flex-column justify-content-center align-items-center p-4">
        <div className="login-card shadow-sm">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <img src={logo} alt="logo" className="logo"/>
          </div>

          <h4 className="text-center mb-3">Login to Your Account</h4>

          <form className="px-4 pb-3 w-100" onSubmit={handleLogin}>
            <div className="mb-3">
              <input 
                className="form-control" 
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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

      <div className="login-side-image d-none d-md-block">
        <img src={sideCard} alt="side" className="h-100 w-100 object-cover" />
      </div>
    </div>
  );
}
