import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/orders");
    setOrders(res.data);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Orders</h2>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o.userId.fullName}</td>
                <td>{o.itemName}</td>
                <td>{o.quantity}</td>
                <td>{o.price}</td>
                <td>{o.isPaid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
