import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Hero from './components/Hero';
import Features from './components/Features';
import CategoriesGrid from './components/CategoriesGrid';
import BestSellers from './components/BestSellers';
import PromoBanner from './components/PromoBanner';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';

export default function Homepage() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <CategoriesGrid />
      <BestSellers />
      <PromoBanner />
      <Metrics />
      <Testimonials />
    </MainLayout>
  );
}
