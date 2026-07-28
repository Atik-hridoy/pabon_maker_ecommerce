import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-20 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
