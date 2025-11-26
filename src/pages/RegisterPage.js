import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice";
import logo from "../assets/logo.png";
import sideCard from "../assets/sideCard.png";
import "./Registration.css";

export default function Registration() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser(formData));
  };

  return (
    <div className="reg-container">
      <div className="reg-left">
        <div className="reg-card">
          <img src={logo} alt="Logo" className="reg-logo" />
          <h2 className="reg-title">Create Account</h2>

          <form className="reg-form" onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

            <label>Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

            <label>Gender</label>
            <div className="gender-row">
              <label>
                <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
              </label>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>

      <div className="reg-right">
        <img src={sideCard} alt="Side" />
      </div>
    </div>
  );
}
