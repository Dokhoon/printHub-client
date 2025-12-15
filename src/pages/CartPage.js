import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./cart.css";
import BASE_URL from "../api";
// import { Link } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;

  const [message, setMessage] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.unitPrice * item.quantity) / 20,
    0
  );

  const handleConfirmOrder = async () => {
    if (!userId) {
      alert("❌ You must be logged in to confirm order");
      return;
    }

    if (!lat || !lon) {
      alert("❌ Please select your delivery location");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/orders/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            cardId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          location: { lat, lon },
        }),
      });

      const data = await res.json();

      if (!data || !data.success) {
        setMessage(`❌ ${data?.message || "Unknown error"}`);
        return;
      }

      setMessage("✅ Order confirmed successfully!");
      dispatch(clearCart());
      setFadeOut(true);
      setTimeout(() => navigate("/confirm"), 500);
    } catch (err) {
      setMessage(`❌ Server error: ${err.message}`);
    }
  };

  return (
    <div className={`cart-container ${fadeOut ? "fade-out" : "fade-in"}`}>
      <header className="cart-header">
        <img src={logo} className="cart-logo" alt="logo" />
        <h3>My Cart</h3>
        <nav>
          <button onClick={() => navigate("/welcome")}>Home</button>
          <button onClick={() => navigate("/")}>Log Out</button>
        </nav>
      </header>

      {message && <div className="cart-message">{message}</div>}

      <div className="cart-box">
        {cartItems.length === 0 && <p>Your cart is empty</p>}

        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} dispatch={dispatch} />
        ))}

        {cartItems.length > 0 && (
          <div className="location-section">
            <h4>Select Delivery Location</h4>

            <button
              className="location-btn"
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                  },
                  (err) => {
                    alert("Unable to get location: " + err.message);
                  }
                );
              }}
            >
              Use My Current Location
            </button>

            {/* Preview map */}
            {lat && lon && (
              <iframe
                title="map-preview"
                src={`https://maps.google.com/maps?q=${lat},${lon}&h1=es;&output=embed`}
                width="100%"
                height="200"
                style={{
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="total-line">
              <strong>Total: {total} OMR</strong>
            </div>

            <button className="confirm-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>

            <button className="clear-btn" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
          </>
        )}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

    
    </div>
  );
}

function CartItem({ item, dispatch }) {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} className="cart-img" alt={item.title} />

      <div className="item-details">
        <h4>{item.title}</h4>
        <p className="offer">{(item.unitPrice * item.quantity) / 20} OMR</p>
        <p className="qty-text">{item.quantity} Pieces</p>
      </div>

      <button
        className="delete-btn"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        🗑
      </button>
    </div>
  );
}
