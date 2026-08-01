import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import { storage } from '../../utils/localStorage';
import { cartService } from '../../utils/cartService';
import logo from '../../assets/logo.jpg';
import gsap from 'gsap';

import { getStoreConfig } from '../../api/adminService';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirect, setAuthRedirect] = useState(null);
  const [authRedirectState, setAuthRedirectState] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(cartService.getCartCount());
  const [scrolled, setScrolled] = useState(false);
  const [siteName, setSiteName] = useState('PABON MAKER');
  const navigate = useNavigate();
  const navRef = useRef(null);

  const isLoggedIn = storage.isLoggedIn();

  useEffect(() => {
    const loadSiteName = async () => {
      try {
        const res = await getStoreConfig();
        if (res && res.site_name) {
          setSiteName(res.site_name);
        }
      } catch (err) {
        console.error("Failed to load store config in navbar", err);
      }
    };
    loadSiteName();

    const handleConfigUpdate = (e) => {
      if (e.detail && e.detail.site_name) {
        setSiteName(e.detail.site_name);
      }
    };
    window.addEventListener('store_config_updated', handleConfigUpdate);
    return () => window.removeEventListener('store_config_updated', handleConfigUpdate);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(cartService.getCartCount());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccountClick = () => {
    if (storage.isLoggedIn()) {
      navigate('/account');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  useEffect(() => {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Ticker / Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-container via-secondary-container to-primary-container text-white py-1.5 text-[11px] font-medium tracking-wide border-b border-white/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="font-bold">PROMOTION:</span>
            <span>Get Flat 15% OFF on first order • Use Code: <span className="font-bold underline cursor-pointer">MAKER15</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[10px] uppercase font-bold text-white/80">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">local_shipping</span> Fast Nationwide Delivery</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">verified</span> 100% Genuine Components</span>
          </div>
        </div>
      </div>

      {/* Floating Modern Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white/80 dark:bg-inverse-surface/90 backdrop-blur-xl shadow-lg border-b border-outline-variant/50' : 'py-3 bg-white dark:bg-inverse-surface border-b border-outline-variant'}`}>
        <nav ref={navRef} className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              className="md:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[24px]">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-9 md:h-11 px-2.5 py-1 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm group-hover:border-secondary transition-all flex items-center justify-center gap-2">
                <img src={logo} alt="Pabon Maker Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-105" />
                <span className="font-display-lg text-base md:text-lg font-black tracking-tighter text-primary uppercase">{siteName}</span>
              </div>
            </Link>

            {/* Desktop Modern Navigation Pills */}
            <div className="hidden md:flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-outline-variant/60 shadow-inner">
              <NavLink 
                to="/" 
                className={({ isActive }) => `px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-secondary-container text-white shadow-sm' 
                    : 'text-on-surface-variant hover:text-primary hover:bg-white/60'
                }`}
              >
                Home
              </NavLink>
              <NavLink 
                to="/categories" 
                className={({ isActive }) => `px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-secondary-container text-white shadow-sm' 
                    : 'text-on-surface-variant hover:text-primary hover:bg-white/60'
                }`}
              >
                Explore
              </NavLink>
              <NavLink 
                to="/best-sellers" 
                className={({ isActive }) => `px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-secondary-container text-white shadow-sm' 
                    : 'text-on-surface-variant hover:text-primary hover:bg-white/60'
                }`}
              >
                Best Sellers
              </NavLink>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-primary hover:bg-white/60 transition-all"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right Controls & Quick Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Inline Expanding Search Bar */}
            {isSearchOpen ? (
              <form 
                onSubmit={handleSearchSubmit} 
                className="flex items-center gap-2 bg-surface-container-lowest border-2 border-secondary rounded-full px-3 py-1.5 shadow-md w-40 xs:w-56 sm:w-72 md:w-80 transition-all duration-300 ease-out animate-in fade-in zoom-in-95"
              >
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search components, sensors..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-on-surface placeholder:text-outline-variant p-0" 
                  autoFocus 
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="text-outline-variant hover:text-on-surface shrink-0">
                    <span className="material-symbols-outlined text-[16px]">clear</span>
                  </button>
                )}
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-on-surface-variant hover:text-error shrink-0 p-0.5">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-secondary transition-all flex items-center justify-center active:scale-95"
                title="Search"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
            )}

            {/* Wishlist Shortcut */}
            <Link 
              to="/account" 
              state={{ tab: 'wishlist' }} 
              className="hidden sm:flex p-2.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-secondary transition-all flex items-center justify-center"
              title="Wishlist"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </Link>

            {/* Account / Login Status Button */}
            <button 
              onClick={handleAccountClick} 
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-bold ${
                isLoggedIn 
                  ? 'border-secondary/40 bg-secondary/5 text-primary hover:bg-secondary/10' 
                  : 'border-outline-variant bg-surface-container-low text-on-surface-variant hover:border-secondary hover:text-secondary'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isLoggedIn ? 'text-secondary' : ''}`}>
                {isLoggedIn ? 'account_circle' : 'person'}
              </span>
              <span>{isLoggedIn ? 'My Account' : 'Sign In'}</span>
            </button>

            {/* Cart Button with Count Badge */}
            <Link 
              to="/cart" 
              className="relative flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-bold text-xs shadow-md hover:bg-on-primary-fixed-variant transition-all transform active:scale-95 group shrink-0"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">shopping_cart</span>
              <span className="hidden xs:inline font-label-caps">Cart</span>
              <span className="bg-secondary-container text-white px-1.5 py-0.5 rounded-full text-[10px] font-black min-w-[20px] text-center shadow-inner">
                {cartCount}
              </span>
            </Link>

          </div>
        </nav>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            {/* Drawer Container */}
            <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300">
              
              {/* Drawer Top Header */}
              <div className="p-6 bg-gradient-to-r from-primary-container to-on-surface text-white flex justify-between items-center relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <img src={logo} alt="Logo" className="h-6 w-auto object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white uppercase">{siteName}</h3>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest font-label-caps">Engineering & Hardware</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* User Profile Card Snippet */}
              <div className="p-4 bg-surface-container-low border-b border-outline-variant/60">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-white font-bold flex items-center justify-center text-sm shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-on-surface">Welcome Back!</p>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Pro Tier Member</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/account'); }}
                      className="px-3 py-1.5 bg-surface-container rounded-xl text-xs font-bold text-primary hover:bg-secondary-container hover:text-white transition-all"
                    >
                      Dashboard
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gradient-to-r from-secondary/10 to-secondary-container/10 p-3.5 rounded-2xl border border-secondary/20">
                    <div>
                      <p className="text-xs font-bold text-on-surface">Join Pabon Maker</p>
                      <p className="text-[11px] text-on-surface-variant">Access member discounts & orders</p>
                    </div>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); handleAccountClick(); }}
                      className="px-4 py-2 bg-secondary-container text-white rounded-xl text-xs font-bold shadow-md hover:brightness-110 transition-all"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>

              {/* Main Navigation Links */}
              <div className="p-6 flex-1 space-y-3">
                <p className="text-[10px] font-label-caps text-outline uppercase tracking-widest mb-1">Navigation Menu</p>
                
                <NavLink 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
                    isActive 
                      ? 'bg-secondary-container text-white shadow-md' 
                      : 'text-on-surface bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">home</span>
                    <span>Home Page</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </NavLink>

                <NavLink 
                  to="/categories" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
                    isActive 
                      ? 'bg-secondary-container text-white shadow-md' 
                      : 'text-on-surface bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    <span>Explore Categories</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </NavLink>

                <NavLink 
                  to="/best-sellers" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
                    isActive 
                      ? 'bg-secondary-container text-white shadow-md' 
                      : 'text-on-surface bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                    <span>Best Sellers</span>
                  </div>
                  <span className="bg-error/20 text-error px-2 py-0.5 rounded text-[10px] uppercase font-black">HOT</span>
                </NavLink>

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm text-on-surface bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    <span>Contact & Support</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              {/* Bottom Quick Shortcuts */}
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/60 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/cart" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 bg-white rounded-2xl border border-outline-variant flex items-center gap-3 shadow-sm hover:border-secondary transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-outline font-bold uppercase">Cart</p>
                      <p className="text-xs font-bold text-on-surface">{cartCount} Items</p>
                    </div>
                  </Link>

                  <Link 
                    to="/account" 
                    state={{ tab: 'wishlist' }} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 bg-white rounded-2xl border border-outline-variant flex items-center gap-3 shadow-sm hover:border-secondary transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-error/10 text-error flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-outline font-bold uppercase">Saved</p>
                      <p className="text-xs font-bold text-on-surface">Wishlist</p>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} redirectPath={authRedirect} redirectState={authRedirectState} />
    </>
  );
}
