import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <div className="bg-primary-container text-white py-2 px-margin-mobile md:px-margin-desktop flex justify-center items-center">
        <p className="font-body-sm text-body-sm tracking-wide">FREE GLOBAL SHIPPING ON ORDERS OVER $150 — EXPERT TECHNICAL SUPPORT AVAILABLE</p>
      </div>
      <header className="sticky top-0 z-50 bg-surface border-b border-outline-variant shadow-sm">
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-stack-md max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-display-lg text-display-lg-mobile md:text-display-lg font-black tracking-tighter text-on-surface">
              <img src="https://lh3.googleusercontent.com/aida/AP1WRLtbjd3JvAlcFvA5h5MHPfo1G2ERzqVmwDwWoKK0FnfYfHrp5nIfWkoC7y1XHwbfPNKQIl63vHHYDx7NIqExKMBweOxsXgtH0XtL6gQMCOciQHm529whq9F8ySG5RrxNQCvlPjMFviBnQ5XHnRwTKo50zHK3s2d-R9PLFrVl33AkyhrfRGuMjbAeyV1Xz10JYGm3zbVbEZHnyD8XYbmpQsUasrXL8JEPy_6xNK42hcQ4dU3fTBHo2TaeAPc" alt="Pabon Maker Logo" className="h-8 md:h-10 w-auto object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant font-medium hover:text-secondary'}`}
              >
                Home
              </NavLink>
              <NavLink 
                to="/product" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant font-medium hover:text-secondary'}`}
              >
                Components
              </NavLink>
              <NavLink 
                to="/category" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant font-medium hover:text-secondary'}`}
              >
                Categories
              </NavLink>
              <NavLink 
                to="/learning" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant font-medium hover:text-secondary'}`}
              >
                Resources
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <Link to="/cart" className="p-2 text-on-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95 relative block">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="absolute top-1 right-1 bg-secondary-container text-white text-[10px] px-1.5 rounded-full font-bold">2</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
