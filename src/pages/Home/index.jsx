import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Hero from './components/Hero';
import Features from './components/Features';
import CategoriesGrid from './components/CategoriesGrid';
import ProductDisplay from './components/ProductDisplay';
import RecommendedProducts from './components/RecommendedProducts';
import PromoBanner from './components/PromoBanner';

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <MainLayout>
      <Hero />
      <Features />
      <CategoriesGrid 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <ProductDisplay selectedCategory={selectedCategory} />
      <PromoBanner />
      <RecommendedProducts />
    </MainLayout>
  );
}
