import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/account');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none relative">
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-stack-md max-w-container-max mx-auto">
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              className="md:hidden p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
            <Link to="/" className="font-display-lg text-display-lg-mobile md:text-display-lg font-black tracking-tighter text-on-surface dark:text-inverse-on-surface">
              <img src="https://lh3.googleusercontent.com/aida/AP1WRLtbjd3JvAlcFvA5h5MHPfo1G2ERzqVmwDwWoKK0FnfYfHrp5nIfWkoC7y1XHwbfPNKQIl63vHHYDx7NIqExKMBweOxsXgtH0XtL6gQMCOciQHm529whq9F8ySG5RrxNQCvlPjMFviBnQ5XHnRwTKo50zHK3s2d-R9PLFrVl33AkyhrfRGuMjbAeyV1Xz10JYGm3zbVbEZHnyD8XYbmpQsUasrXL8JEPy_6xNK42hcQ4dU3fTBHo2TaeAPc" alt="Pabon Maker Logo" className="h-6 md:h-10 w-auto object-contain" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant dark:text-surface-variant font-medium hover:text-secondary'}`}
              >
                Home
              </NavLink>
              <NavLink 
                to="/categories" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant dark:text-surface-variant font-medium hover:text-secondary'}`}
              >
                Categories
              </NavLink>
              <NavLink 
                to="/best-sellers" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant dark:text-surface-variant font-medium hover:text-secondary'}`}
              >
                Best Sellers
              </NavLink>
              <NavLink 
                to="/#contact" 
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant dark:text-surface-variant font-medium hover:text-secondary'}`}
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button onClick={handleAccountClick} className="hidden sm:block p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="hidden sm:block p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <Link to="/cart" className="p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95 relative block">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="absolute top-1 right-1 bg-secondary-container text-white text-[10px] px-1.5 rounded-full font-bold">2</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline shadow-lg z-40">
            <div className="flex flex-col px-margin-mobile py-4 space-y-4">
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-label-caps text-sm transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container font-bold' : 'text-on-surface-variant dark:text-surface-variant font-medium'}`}
              >
                Home
              </NavLink>
              <NavLink 
                to="/categories" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-label-caps text-sm transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container font-bold' : 'text-on-surface-variant dark:text-surface-variant font-medium'}`}
              >
                Categories
              </NavLink>
              <NavLink 
                to="/best-sellers" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-label-caps text-sm transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container font-bold' : 'text-on-surface-variant dark:text-surface-variant font-medium'}`}
              >
                Best Sellers
              </NavLink>
              <NavLink 
                to="/#contact" 
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={({ isActive }) => `font-label-caps text-sm transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container font-bold' : 'text-on-surface-variant dark:text-surface-variant font-medium'}`}
              >
                Contact
              </NavLink>
              <div className="border-t border-outline-variant/30 dark:border-outline/30 pt-4 flex gap-4">
                <button onClick={handleAccountClick} className="flex items-center gap-2 text-on-surface-variant dark:text-surface-variant text-sm font-medium hover:text-secondary">
                  <span className="material-symbols-outlined text-[20px]">person</span> Account
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant dark:text-surface-variant text-sm font-medium hover:text-secondary">
                  <span className="material-symbols-outlined text-[20px]">favorite</span> Wishlist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="w-full px-margin-mobile md:px-margin-desktop py-3 bg-surface border-t border-outline-variant/30 animate-in slide-in-from-top-2">
            <div className="max-w-3xl mx-auto flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-outline-variant focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary transition-all shadow-sm">
               <span className="material-symbols-outlined text-outline">search</span>
               <input 
                 type="text" 
                 placeholder="Search for components, tools, or part numbers..." 
                 className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface px-2" 
                 autoFocus 
               />
               <button onClick={() => setIsSearchOpen(false)} className="text-on-surface-variant hover:text-error flex items-center justify-center">
                 <span className="material-symbols-outlined text-[20px]">close</span>
               </button>
            </div>
          </div>
        )}
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
