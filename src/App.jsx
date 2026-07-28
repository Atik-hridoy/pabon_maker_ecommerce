import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage/index.jsx';
import CategoryBrowse from './pages/CategoryBrowse/index.jsx';
import LearningCenter from './pages/LearningCenter/index.jsx';
import ProductDetails from './pages/ProductDetails/index.jsx';
import ShoppingCart from './pages/ShoppingCart/index.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category" element={<CategoryBrowse />} />
        <Route path="/learning" element={<LearningCenter />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
