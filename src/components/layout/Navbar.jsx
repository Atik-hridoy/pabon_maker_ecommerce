import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import { storage } from '../../utils/localStorage';
import { cartService } from '../../utils/cartService';
import logo from '../../assets/logo.jpg';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirect, setAuthRedirect] = useState(null);
  const [authRedirectState, setAuthRedirectState] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(cartService.getCartCount());
  const navigate = useNavigate();

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(cartService.getCartCount());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleAccountClick = () => {
    if (storage.isLoggedIn()) {
      navigate('/account');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  React.useEffect(() => {
    const handleOpenAuth = (e) => {
      if (e.detail && e.detail.redirect) {
        setAuthRedirect(e.detail.redirect);
        setAuthRedirectState(e.detail.state || null);
      } else {
        setAuthRedirect(null);
        setAuthRedirectState(null);
      }
      setIsAuthModalOpen(true);
    };
    window.addEventListener('openAuthModal', handleOpenAuth);
    return () => window.removeEventListener('openAuthModal', handleOpenAuth);
  }, []);

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
              <img src={logo} alt="Pabon Maker Logo" className="h-6 md:h-10 w-auto object-contain" />
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
                Explore
              </NavLink>
              <NavLink 
                to="/best-sellers" 
                className={({ isActive }) => `font-label-caps text-label-caps transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container border-b-2 border-secondary font-bold pb-1' : 'text-on-surface-variant dark:text-surface-variant font-medium hover:text-secondary'}`}
              >
                Best Sellers
              </NavLink>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-label-caps text-label-caps transition-colors duration-200 text-on-surface-variant dark:text-surface-variant font-medium hover:text-secondary"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button onClick={handleAccountClick} className="hidden sm:block p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">person</span>
            </button>
            <Link to="/account" state={{ tab: 'wishlist' }} className="hidden sm:block p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined">favorite</span>
            </Link>
            <Link to="/cart" className="p-2 text-on-surface-variant dark:text-surface-variant hover:text-secondary transition-all active:opacity-80 active:scale-95 relative block">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-secondary-container text-white text-[10px] px-1.5 rounded-full font-bold">{cartCount}</span>
              )}
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
                Explore
              </NavLink>
              <NavLink 
                to="/best-sellers" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `font-label-caps text-sm transition-colors duration-200 ${isActive ? 'text-secondary dark:text-secondary-container font-bold' : 'text-on-surface-variant dark:text-surface-variant font-medium'}`}
              >
                Best Sellers
              </NavLink>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="font-label-caps text-sm transition-colors duration-200 text-on-surface-variant dark:text-surface-variant font-medium text-left w-full hover:text-secondary"
              >
                Contact
              </button>
              <div className="border-t border-outline-variant/30 dark:border-outline/30 pt-4 flex gap-4">
                <button onClick={handleAccountClick} className="flex items-center gap-2 text-on-surface-variant dark:text-surface-variant text-sm font-medium hover:text-secondary">
                  <span className="material-symbols-outlined text-[20px]">person</span> Account
                </button>
                <Link to="/account" state={{ tab: 'wishlist' }} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-on-surface-variant dark:text-surface-variant text-sm font-medium hover:text-secondary">
                  <span className="material-symbols-outlined text-[20px]">favorite</span> Wishlist
                </Link>
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
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} redirectPath={authRedirect} redirectState={authRedirectState} />
    </>
  );
}
