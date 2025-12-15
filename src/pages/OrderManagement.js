import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./OrderManagement.css"; 
import BASE_URL from "../api";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders`);
      setOrders(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="mb-3">
          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() => navigate("/admin")}
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "50px",
            }}
            title="Back to Dashboard"
          >
            <MdArrowBack style={{ marginRight: "5px" }} />
          </button>
        </div>

        <h2>Orders</h2>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o.userId.fullName}</td>
                <td>{o.itemName}</td>
                <td>{o.quantity}</td>
                <td>{o.unitPrice}</td>
                <td>{o.totalPrice}</td>
                <td>{new Date(o.createdAt).toLocaleString("en-OM", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                }</td>
                <td>
                  {o.location ? (
                    <button
                      onClick={() => window.open(`https://www.google.com/maps?q=${o.location.lat},${o.location.lon}`, "_blank")}
                      style={{
                        padding: "4px 8px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#383a3bff",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                    >
                      View Location
                    </button>
                  ) : (
                    "No location"
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}