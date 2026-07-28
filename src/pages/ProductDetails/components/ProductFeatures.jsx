import React from 'react';

export default function ProductFeatures() {
  return (
    <section className="mb-24">
      <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-12">Precision Integration</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Large Content Block */}
        <div className="lg:col-span-8 bg-primary-container text-white p-12 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div className="relative z-10 space-y-6 max-w-xl">
            <span className="font-label-caps text-secondary-fixed-dim tracking-[0.2em]">INTEGRATION GUIDE</span>
            <h3 className="text-4xl font-bold leading-tight">Mastering the X4-G2 Architecture</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              Deploy complex algorithms with ease using our unified HAL (Hardware Abstraction Layer). Whether you're interfacing with high-speed ADC or managing low-power sleep states, the X4-G2 provides the deterministic response required for industrial precision.
            </p>
            <button className="bg-white text-primary-container font-bold px-8 py-3 rounded-full hover:bg-secondary-fixed transition-all flex items-center gap-2 group w-fit">
              Download SDK 
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          {/* Decorative Element */}
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 w-3/4 pointer-events-none flex justify-end">
            <span className="material-symbols-outlined text-[400px]" style={{fontVariationSettings: "'wght' 100"}}>memory</span>
          </div>
        </div>
        
        {/* Small Content Block */}
        <div className="lg:col-span-4 bg-white border border-outline-variant p-8 rounded-2xl flex flex-col justify-center space-y-6 part-shadow">
          <div className="w-16 h-16 bg-secondary-container/10 text-secondary-container flex items-center justify-center rounded-xl">
            <span className="material-symbols-outlined text-[32px]">schema</span>
          </div>
          <h3 className="text-2xl font-bold text-primary">Simplified Schematics</h3>
          <p className="text-body-base text-on-surface-variant">
            Get your prototype running faster with our validated reference designs and CAD libraries for Altium, KiCad, and Eagle.
          </p>
          <a className="text-secondary-container font-bold flex items-center gap-2 hover:underline w-fit" href="#">
            View CAD Library
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
