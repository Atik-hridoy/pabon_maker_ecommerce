import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/index.jsx';
import Categories from './pages/Categories/index.jsx';

import Cart from './pages/Cart/index.jsx';
import BestSellers from './pages/BestSellers/index.jsx';
import ProductDetails from './pages/ProductDetails/index.jsx';
import Shipping from './pages/Checkout/Shipping.jsx';
import Payment from './pages/Checkout/Payment.jsx';
import Review from './pages/Checkout/Review.jsx';
import Confirmation from './pages/Checkout/Confirmation.jsx';
import Account from './pages/Account/index.jsx';
import { storage } from './utils/localStorage';

function ProtectedRoute({ children }) {
  const isLoggedIn = storage.isLoggedIn();
  
  useEffect(() => {
    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/best-sellers" element={<BestSellers />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path="/checkout/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/checkout/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
        <Route path="/checkout/confirmation" element={<Confirmation />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
