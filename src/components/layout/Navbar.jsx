import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-surface/80 z-50 border-b border-outline-variant/30">
      <div className="max-w-max-width mx-auto flex justify-between items-center px-margin-desktop h-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src="https://lh3.googleusercontent.com/aida/AP1WRLtbjd3JvAlcFvA5h5MHPfo1G2ERzqVmwDwWoKK0FnfYfHrp5nIfWkoC7y1XHwbfPNKQIl63vHHYDx7NIqExKMBweOxsXgtH0XtL6gQMCOciQHm529whq9F8ySG5RrxNQCvlPjMFviBnQ5XHnRwTKo50zHK3s2d-R9PLFrVl33AkyhrfRGuMjbAeyV1Xz10JYGm3zbVbEZHnyD8XYbmpQsUasrXL8JEPy_6xNK42hcQ4dU3fTBHo2TaeAPc" alt="Pabon Maker Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>
          <div className="hidden md:flex gap-6">
            <NavLink 
              to="/category" 
              className={({ isActive }) => `flex items-center gap-1 font-body-md text-body-md transition-all duration-100 ease-in-out ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary pb-1'}`}
            >
              <span className="material-symbols-outlined text-[18px]">memory</span>
              Circuits
            </NavLink>
            <NavLink 
              to="/product" 
              className={({ isActive }) => `flex items-center gap-1 font-body-md text-body-md transition-all duration-100 ease-in-out ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary pb-1'}`}
            >
              <span className="material-symbols-outlined text-[18px]">extension</span>
              Components
            </NavLink>
            <NavLink 
              to="/learning" 
              className={({ isActive }) => `flex items-center gap-1 font-body-md text-body-md transition-all duration-100 ease-in-out ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary pb-1'}`}
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
              Tutorials
            </NavLink>
            <NavLink 
              to="/workshops" 
              className={({ isActive }) => `flex items-center gap-1 font-body-md text-body-md transition-all duration-100 ease-in-out ${isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary pb-1'}`}
            >
              <span className="material-symbols-outlined text-[18px]">handyman</span>
              Workshops
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input className="bg-surface-container border border-outline-variant px-4 py-2 rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:outline-none w-64 transition-all" placeholder="Search components..." type="text" />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline">search</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/cart" className="p-2 text-on-surface-variant hover:text-primary transition-colors block">
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
