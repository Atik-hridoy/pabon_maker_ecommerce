import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/index.jsx';
import Categories from './pages/Categories/index.jsx';

import Cart from './pages/Cart/index.jsx';
import BestSellers from './pages/BestSellers/index.jsx';
import ProductDetails from './pages/ProductDetails/index.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/best-sellers" element={<BestSellers />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
