import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import PageHeader from './components/PageHeader';
import BentoCategories from './components/BentoCategories';
import SupportCTA from './components/SupportCTA';

export default function CategoryBrowse() {
  return (
    <MainLayout>
      <main className="min-h-screen relative overflow-hidden">
        <PageHeader />
        <BentoCategories />
        <SupportCTA />
      </main>
    </MainLayout>
  );
}
