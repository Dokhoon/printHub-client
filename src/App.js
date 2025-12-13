import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
import CartPage from "./pages/CartPage";
import ConfirmPage from "./pages/ConfirmPage";
import WelcomePage from "./pages/WelcomePage";
import TermsPage from "./pages/TermsPage";
import SearchPage from "./pages/SearchPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import OrderManagement from "./pages/OrderManagement";
import CardManagement from "./pages/CardManagement";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/orders" element={<OrderManagement />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="admin/card-management" element={<CardManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
