import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./search.css";
import logo from '../assets/logo.png';
import flowers from '../assets/flowers.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiShoppingCart } from "react-icons/fi";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() !== "") fetchResults();
    else setResults([]);
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cards/search?q=${query}`);
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (err) {
      console.error("Search error:", err);
      setLoading(false);
    }
  };

  const addItemToCart = (card) => {
    if (card.stock <= 0) {
      toast.error("❌ No stock available");
      return;
    }

    dispatch(
      addToCart({
        id: card._id,
        title: card.title,
        price: card.price,
        quantity: 20,
        imageUrl: card.imageUrl,
      })
    );
    toast.success("✅ Successfully added to cart");
  };

  return (
    <div className="search-body">
      <ToastContainer position="top-center" />

      <header className="search-header">
        <img src={logo} className="search-logo" alt="logo" />
        <nav>
          <button onClick={() => navigate(-1)} className="go-back-btn">
            ← Go Back
          </button>
          <FiShoppingCart
            size={24}
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={() => navigate("/cart")}
          />
        </nav>
      </header>

      <div className="search-content">
        {/* Cards Grid */}
        <div className="search-results">
          <h2>
            Search results for: <span className="keyword">{query}</span>
          </h2>

          {loading && <p>Loading...</p>}
          {!loading && results.length === 0 && <p>No results found.</p>}

          <div className="card-row">
            {results.map((card) => (
              <div key={card._id} className="card-box">
                <h3>{card.title}</h3>
                <img src={card.imageUrl} className="card-image" alt={card.title} />
                {card.description && <p>{card.description}</p>}
                <p className="stock-text">
                  Stock: {card.stock > 0 ? card.stock : "Out of stock"}
                </p>
                <p className="price-text">{card.price} OMR</p>

                {user?.role !== "admin" && (
                  <button
                    className="add-btn"
                    disabled={card.stock <= 0}
                    onClick={() => addItemToCart(card)}
                  >
                    {card.stock <= 0 ? "No Stock" : "Add to Cart"}
                  </button>
                )}
              </div>
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
