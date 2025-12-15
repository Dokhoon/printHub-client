import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cards.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import logo from '../assets/logo.png';
import flowers from '../assets/flowers.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../api";


export default function CardsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");


  // Fetch cards
  useEffect(() => {
    fetch(`${BASE_URL}/api/cards`)
      .then(res => res.json())
      .then(data => {
        setCards(data);
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(c => c.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredCards =
    category === "all" ? cards : cards.filter(c => c.category === category);

  return (
    <div className="cards-body">
      <ToastContainer position="top-center" />

      <header className="cards-header">
        <img src={logo} className="cards-logo" alt="logo" />
        <nav>
          <Link to="/welcome">Home</Link>
          <Link to="/">Log Out</Link>
          <FiShoppingCart
            size={24}
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={() => navigate("/cart")}
          />
        </nav>
      </header>

      <div className="cards-content">
        <div className="cards-page">
          <div className="cards-header-row">
            <h2 className="cards-title">Cards</h2>

            <select
              className="filter-dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Cards</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="card-row">
            {filteredCards.map(card => (
              <Card key={card._id} card={card} dispatch={dispatch} />
            ))}
          </div>
        </div>

        <div className="side-img">
          <img src={flowers} alt="flowers" />
        </div>
      </div>
    </div>
  );
}

function Card({ card, dispatch }) {
  const [quantity, setQuantity] = useState(20);

  const addItemToCart = () => {
    if (card.stock <= 0) {
      toast.error("❌ No stock available");
      return;
    }

    if (quantity > card.stock) {
      toast.error("❌ Not enough stock available");
      return;
    }

    dispatch(
      addToCart({
        id: card._id,
        title: card.title,
        unitPrice: card.price, 
        quantity,
        imageUrl: card.imageUrl,
      })
    );

    toast.success("✅ Added to cart");
  };

  return (
    <div className="card-box">
      <h3>{card.title}</h3>
      <img src={card.imageUrl} className="card-image" alt={card.title} />
      {card.description && <p className="description-text">{card.description}</p>}
      <p className="price-text">{card.price} OMR / 20 pcs</p>

      <div className="qty">
        <button onClick={() => setQuantity(q => Math.max(20, q - 20))} disabled={card.stock <= 0}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => Math.min(q + 20, card.stock))} disabled={card.stock <= 0}>+</button>
      </div>

      <button className="add-btn" disabled={card.stock <= 0} onClick={addItemToCart}>
        {card.stock <= 0 ? "No Stock" : "Add to Cart"}
      </button>
    </div>
  );
}



