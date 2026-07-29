import React from 'react';

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden py-24 bg-surface-container-lowest">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/10 backdrop-blur-xl p-10 md:p-16 border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          
          <div className="space-y-6 text-center md:text-left flex-1">
            <div className="inline-block px-4 py-1.5 bg-secondary-container/20 border border-secondary-container/50 rounded-full">
              <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
                Industrial Clearance
              </span>
            </div>
            
            <h2 className="font-display-lg text-4xl md:text-6xl text-white font-black leading-tight tracking-tight">
              UP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-secondary">35% OFF</span>
            </h2>
            
            <p className="text-lg text-white/80 font-medium max-w-xl">
              Equip your lab with professional-grade sensors, high-performance microcontrollers, and premium development boards at unbeatable prices.
            </p>
          </div>
          
          <div className="flex-shrink-0 relative group">
            {/* Button Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-secondary-container rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
            
            <button className="relative bg-white text-primary-container px-12 py-5 font-black text-lg rounded-xl hover:bg-secondary-container hover:text-white transition-all transform active:scale-95 shadow-xl flex items-center gap-3">
              SHOP SALE NOW
              <span className="material-symbols-outlined text-2xl transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
