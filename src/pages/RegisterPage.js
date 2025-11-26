import React, { useState } from "react";
import logo from "../assets/logo.png";
import sideCard from "../assets/sideCard.png";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import "./Registration.css";

export default function Registration() {
  const [gender, setGender] = useState("");

  return (
    <div className="reg-container">

      {/* LEFT SIDE - Form Card */}
      <div className="reg-left">
        <div className="reg-card">
          <img src={logo} alt="Logo" className="reg-logo" />

          <h2 className="reg-title">Create Account</h2>

          <form className="reg-form">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="tel" placeholder="Phone Number" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />

             {/* Date of Birth */}
            <label className="reg-label">Date of Birth</label>
            <input type="date" />

            {/* Gender */}
            <label className="reg-label">Gender</label>
            <div className="gender-row">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={() => setGender("male")}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={() => setGender("female")}
                /> Female
              </label>
            </div>


            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
              </label>
            </div>



            {/* Signup Button */}
            <button type="submit" className="signup-btn">Sign Up</button>

            <p className="or">Or sign up with</p>

            {/* Social Buttons */}
            <div className="social-login">
              <button className="social-btn google">
                <FcGoogle size={20} /> Google
              </button>
              <button className="social-btn apple">
                <FaApple size={20} /> Apple
              </button>
            </div>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="reg-right">
        <img src={sideCard} alt="Side" />
      </div>

    </div>
  );
}
