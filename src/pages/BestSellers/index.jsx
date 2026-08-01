import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ProductGrid from './components/ProductGrid';

export default function BestSellers() {
  return (
    <MainLayout>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative">
        <ProductGrid />
      </div>
    </MainLayout>
  );
}
