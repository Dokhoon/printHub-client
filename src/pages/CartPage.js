import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

import gradu from '../assets/gradu.png';
import birthday from '../assets/birthday.png';
import logo from '../assets/logo.png';

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <div className="cart-container">

      {/* HEADER */}
      <header className="cart-header">
        <img src={logo} className="cart-logo" alt="logo" />
        <h3>My Cart</h3>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Log Out</Link>
        </nav>
      </header>

      {/* CART ITEMS */}
      <div className="cart-box">

        {/* Item 1 */}
        <CartItem
          img={birthday}
          title="Birthday Cards"
          price="10.00 OR"
          qty="30 Pieces"
        />

        {/* Item 2 */}
        <CartItem
          img={gradu}
          title="Graduation Cards"
          price="20.00 OR"
          qty="40 Pieces"
        />

        {/* Total */}
        <div className="total-line">
          <strong>Total: 30.00 OR</strong>
        </div>

        <button className="confirm-btn" onClick={() => navigate("/confirm")}>
          Confirm Order
        </button>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

// Individual Cart Item
function CartItem({ img, title, price, qty }) {
  return (
    <div className="cart-item">
      <img src={img} className="cart-img" alt={title} />
      <div className="item-details">
        <h4>{title}</h4>
        <p className="offer">{price}</p>
        <p className="qty-text">{qty}</p>
      </div>
      <button className="delete-btn">🗑</button>
    </div>
  );
}
