import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicVouchers } from '../../../api/checkoutService';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PromoBanner() {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await getPublicVouchers();
        if (Array.isArray(data) && data.length > 0) {
          setVouchers(data);
        }
      } catch (err) {
        console.error("Failed to load active vouchers", err);
      }
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 90%",
          once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (vouchers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % vouchers.length);
      }, 5000); // 5 seconds
      return () => clearInterval(interval);
    }
  }, [vouchers.length]);

  const activeVoucher = vouchers[currentIndex];

  return (
    <section ref={bannerRef} className="relative overflow-hidden py-8 md:py-24 bg-surface-container-lowest">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-on-surface to-primary-container"></div>
      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-fixed/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none" style={{animationDelay: '1s'}}></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div ref={cardRef} className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 bg-white/10 backdrop-blur-xl p-6 md:p-16 border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[220px]">
          
          <div className="space-y-6 text-center md:text-left flex-1 relative w-full overflow-hidden h-[180px] md:h-[150px]">
            {vouchers.length === 0 ? (
              // Default static banner if no active vouchers
              <div className="absolute inset-0 transition-all duration-500 opacity-100 translate-y-0">
                <div className="inline-block px-4 py-1.5 bg-secondary-container/20 border border-secondary-container/50 rounded-full mb-6">
                  <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
                    Industrial Clearance
                  </span>
                </div>
                
                <h2 className="font-display-lg text-4xl md:text-6xl text-white font-black leading-tight tracking-tight mb-6">
                  UP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-secondary">35% OFF</span>
                </h2>
                
                <p className="text-lg text-white/80 font-medium max-w-xl">
                  Equip your lab with professional-grade sensors, high-performance microcontrollers, and premium development boards at unbeatable prices.
                </p>
              </div>
            ) : (
              // Dynamic Vouchers Slider
              vouchers.map((voucher, idx) => (
                <div 
                  key={voucher.code}
                  className={`absolute inset-0 transition-all duration-500 flex flex-col justify-center ${
                    idx === currentIndex 
                      ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' 
                      : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                  }`}
                >
                  <div className="inline-block px-4 py-1.5 bg-secondary-container/20 border border-secondary-container/50 rounded-full self-center md:self-start mb-4">
                    <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
                      Special Offer • Code: {voucher.code}
                    </span>
                  </div>
                  
                  <h2 className="font-display-lg text-4xl md:text-5xl text-white font-black leading-tight tracking-tight mb-2">
                    {voucher.discount_type === 'FLAT' ? (
                      <>FLAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-secondary">৳{voucher.discount_amount} OFF</span></>
                    ) : (
                      <>UP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-secondary">{voucher.discount_amount}% OFF</span></>
                    )}
                  </h2>
                  
                  <p className="text-lg text-white/80 font-medium max-w-xl self-center md:self-start">
                    Spend minimum ৳{voucher.min_order_amount} to get this discount. 
                    {voucher.discount_type === 'PERCENTAGE' && voucher.max_discount_amount > 0 && ` Max discount ৳${voucher.max_discount_amount}.`}
                  </p>
                </div>
              ))
            )}
          </div>
          
          <div className="flex-shrink-0 relative group">
            {/* Button Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-secondary-container rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
            
            <button 
              onClick={() => navigate('/categories')}
              className="relative bg-white text-primary-container px-12 py-5 font-black text-lg rounded-xl hover:bg-secondary-container hover:text-white transition-all transform active:scale-95 shadow-xl flex items-center gap-3"
            >
              SHOP SALE NOW
              <span className="material-symbols-outlined text-2xl transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
          
          {/* Navigation dots for multiple vouchers */}
          {vouchers.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {vouchers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-secondary w-6' : 'bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
