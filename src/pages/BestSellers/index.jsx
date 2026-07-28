import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ComparisonTable from './components/ComparisonTable';
import ConfiguratorFAB from './components/ConfiguratorFAB';

export default function BestSellers() {
  return (
    <MainLayout>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative">
        <HeroSection />
        <ProductGrid />
        <ComparisonTable />
      </div>
      <ConfiguratorFAB />
    </MainLayout>
  );
}
