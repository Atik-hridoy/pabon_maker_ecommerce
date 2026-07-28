import React from 'react';

export default function PromoBanner() {
  return (
    <section className="bg-primary-container overflow-hidden relative py-20">
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/5 backdrop-blur-md p-10 md:p-16 border border-white/10 rounded-2xl">
          <div className="space-y-4 text-center md:text-left">
            <span className="bg-secondary-container text-white px-4 py-1 font-black rounded-full text-xs uppercase tracking-widest">Industrial Clearance</span>
            <h2 className="font-display-lg-mobile md:text-display-lg text-white font-black">UP TO 35% OFF</h2>
            <p className="text-headline-md text-on-primary-container font-medium">Industrial Grade Sensors &amp; Development Boards</p>
          </div>
          <button className="bg-white text-primary-container px-12 py-5 font-black text-lg rounded-lg hover:bg-secondary-container hover:text-white transition-all transform active:scale-95 shadow-xl">
            SHOP SALE NOW
          </button>
        </div>
      </div>
    </section>
  );
}
