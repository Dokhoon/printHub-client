import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cards.css";

import gradu from '../assets/gradu.png';
import birthday from '../assets/birthday.png';
import welcome from '../assets/welcome.png';
import flowers from '../assets/flowers.png';
import logo from '../assets/logo.png';

export default function CardsPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");

  const cards = [
    { title: "Graduation Card", img: gradu, category: "graduation" },
    { title: "Birthday Card", img: birthday, category: "birthday" },
    { title: "Welcome Card", img: welcome, category: "welcome" },
  ];

  const filteredCards =
    category === "all"
      ? cards
      : cards.filter((c) => c.category === category);

  return (
    <div className="cards-body">

      {/* HEADER */}
      <header className="cards-header">
        <img src={logo} className="cards-logo" alt="logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Log Out</Link>
        </nav>
      </header>

      <div className="cards-content">

        {/* LEFT CONTENT */}
        <div className="cards-page">

          <div className="cards-header-row">
            <h2 className="cards-title">Cards</h2>

            {/* CATEGORY DROPDOWN */}
            <select
              className="filter-dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Cards</option>
              <option value="graduation">Graduation</option>
              <option value="birthday">Birthday</option>
              <option value="welcome">Welcome</option>
            </select>
          </div>

          {/* CARDS */}
          <div className="card-row">
            {filteredCards.map((card, i) => (
              <Card
                key={i}
                title={card.title}
                img={card.img}
                navigate={navigate}
              />
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="side-img">
          <img src={flowers} alt="flowers" />
        </div>

      </div>
    </div>
  );
}

/* ---------- CARD COMPONENT ---------- */

function Card({ title, img, navigate }) {
  const [quantity, setQuantity] = React.useState(20);

  return (
    <div className="card-box">

      <h3>{title}</h3>

      <img src={img} className="card-image" alt={title} />

      <p className="price-text">
        {quantity} pieces for {quantity / 2} OR
      </p>

      {/* REMOVE DROPDOWN — using buttons instead */}
      <div className="qty">
        <button onClick={() => setQuantity(q => Math.max(10, q - 10))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 10)}>+</button>
      </div>

      <button
        className="add-btn"
        onClick={() =>
          alert(`Added ${quantity} pieces of ${title} to cart`)
        }
      >
        Add to Cart
      </button>

    </div>
  );
}
