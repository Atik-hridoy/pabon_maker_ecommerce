import React from 'react';

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 circuit-pattern"></div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-16 w-full">
        <div className="text-left space-y-6">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white font-black leading-tight">ADVANCED ELECTRONIC <span className="text-secondary-container">CIRCUITS &amp; MODULES</span> FOR INNOVATORS.</h1>
          <p className="font-body-base text-body-base text-on-primary-container max-w-lg">Engineered for high precision and unwavering reliability. Browse our curated selection of microcontrollers, sensors, and development tools designed for professional makers and elite engineers.</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-secondary-container text-white px-8 py-4 font-bold rounded hover:opacity-90 transition-all active:scale-95">Shop Components</button>
            <button className="border-2 border-white text-white px-8 py-4 font-bold rounded hover:bg-white hover:text-primary-container transition-all active:scale-95">Explore Development Kits</button>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center relative h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Abstract Podium */}
            <div className="w-64 h-8 bg-on-primary-container opacity-20 absolute bottom-12 rounded-full blur-xl"></div>
            <div className="w-48 h-64 bg-primary-container border border-outline-variant/20 rounded-xl skew-x-12 absolute transform -rotate-12 animate-float"></div>
            
            {/* Floating Microcontroller Render */}
            <div className="relative z-20 animate-float" style={{ animationDelay: '-1s' }}>
              <img 
                className="w-80 h-80 object-contain drop-shadow-[0_20px_50px_rgba(254,107,0,0.3)]" 
                alt="High-performance microcontroller unit" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjb6tp314KD3SQLvUm5vv8VUwmJcROtdaTsqvD1sj-uY1XRmvGu4Uy5EUbGj-4aOwRb00XG_ca3zi3apLTkHLm1IenmqOzkPIbU1rV5DJh4tymPfSD6Y-JwYo94NnBI2XmsD-vM9m-lvSaThYYTrVREFMrdNRs4IrealV-mBYn-YvuBLJ_I5O_1MqvhF14yy18trHKx8CkhCILFNHpayHHdtpuuYQuHlKBKp8jjsv1r2_ij_MYjgnfP4DpACqnI8DQaE7ETgDQ6Z56" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
