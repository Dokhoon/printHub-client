import React, { useEffect, useState } from "react";
import { FaUsers, FaClipboardList, FaRegCreditCard } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../api";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    cards: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get(`${BASE_URL}/api/users`);
        const cardsRes = await axios.get(`${BASE_URL}/api/cards`);
        const ordersRes = await axios.get(`${BASE_URL}/api/orders`);

        setStats({
          users: usersRes.data.length,
          cards: cardsRes.data.length,
          orders: ordersRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          padding: "8px 16px",
          fontSize: "16px",
          backgroundColor: "rgba(112, 108, 109, 0.8)",
          color: "#dbccccff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.8)}
      >
        Logout
      </button>

      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome Admin!</h1>

        <div className="cards-grid">
          {/* Users Card */}
          <div className="dashboard-card card-gradient-blue">
            <FaUsers size={50} className="card-icon" />
            <h3>User Management</h3>
            <p>{stats.users} Users</p>
            <Link to="/admin/users" className="btn btn-light mt-2">
              Manage
            </Link>
          </div>

          {/* Cards Management - CRUD */}
          <div className="dashboard-card card-gradient-purple">
            <FaRegCreditCard size={50} className="card-icon" />
            <h3>Cards Management</h3>
            <p>{stats.cards} Cards</p>
            <Link to="/admin/card-management" className="btn btn-light mt-2">
              Manage
            </Link>
          </div>

          {/* Orders */}
          <div className="dashboard-card card-gradient-green">
            <FaClipboardList size={50} className="card-icon" />
            <h3>Orders</h3>
            <p>{stats.orders} Orders</p>
            <Link to="/admin/orders" className="btn btn-light mt-2">
              Manage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
