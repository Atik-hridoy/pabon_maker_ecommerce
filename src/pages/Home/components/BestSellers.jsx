import React from 'react';
import HeroSection from '../../BestSellers/components/HeroSection';
import ProductGrid from '../../BestSellers/components/ProductGrid';
import ComparisonTable from '../../BestSellers/components/ComparisonTable';

export default function BestSellers() {
  return (
    <section className="py-stack-lg bg-background" id="bestsellers">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-stack-lg">
        <HeroSection />
        <ProductGrid />
        <ComparisonTable />
      </div>
    </section>
  );
}
