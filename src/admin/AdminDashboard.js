import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Welcome, Admin!</h1>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card p-3 text-center">
              <h3>Manage Users</h3>
              <Link to="/admin/users" className="btn btn-primary mt-2">Go</Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 text-center">
              <h3>Manage Orders</h3>
              <Link to="/admin/orders" className="btn btn-primary mt-2">Go</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
