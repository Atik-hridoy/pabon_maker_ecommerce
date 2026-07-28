import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Hero from './components/Hero';
import Features from './components/Features';
import CategoriesGrid from './components/CategoriesGrid';
import ProductDisplay from './components/ProductDisplay';
import PromoBanner from './components/PromoBanner';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState('Microcontrollers & SOCs');

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
      <Metrics />
      <Testimonials />
    </MainLayout>
  );
}
