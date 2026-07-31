import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/best-sellers" element={<BestSellers />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/shipping" element={<Shipping />} />
        <Route path="/checkout/payment" element={<Payment />} />
        <Route path="/checkout/review" element={<Review />} />
        <Route path="/checkout/confirmation" element={<Confirmation />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
