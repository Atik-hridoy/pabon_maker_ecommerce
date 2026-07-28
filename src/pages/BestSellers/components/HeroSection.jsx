import React from 'react';

export default function HeroSection() {
  return (
    <section className="mb-stack-lg relative overflow-hidden rounded-xl bg-surface-container p-stack-lg border border-outline-variant">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        {/* Decorative background area */}
      </div>
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-primary rounded mb-stack-md">
          <span className="material-symbols-outlined mr-2 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
          <span className="font-label-caps uppercase tracking-wider">Trending Hardware 2024</span>
        </div>
        <h1 className="font-display-lg text-display-lg mb-stack-sm text-primary">Best Sellers &amp; Developer Kits</h1>
        <p className="text-on-surface-variant text-headline-md font-body-base mb-stack-md leading-relaxed">
          Precision engineered components trusted by over 15,000+ engineers. From MK-Ultra high-performance boards to lab-grade sensors.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-secondary-container text-on-primary px-8 py-3 font-bold rounded shadow-lg hover:brightness-110 active:scale-95 transition-all">Explore All Parts</button>
          <button className="border-[1.5px] border-primary text-primary px-8 py-3 font-bold rounded hover:bg-primary hover:text-on-primary active:scale-95 transition-all">Documentation</button>
        </div>
      </div>
    </section>
  );
}
