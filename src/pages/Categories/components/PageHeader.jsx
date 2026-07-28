import React from 'react';

export default function PageHeader() {
  return (
    <div className="relative">
      {/* Atmospheric Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="circuit-line" style={{ top: '15%', animation: 'slide 8s linear infinite' }}></div>
        <div className="circuit-line" style={{ top: '45%', animation: 'slide 12s linear infinite reverse' }}></div>
        <div className="circuit-line" style={{ top: '75%', animation: 'slide 10s linear infinite' }}></div>
      </div>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-l-4 border-secondary-container pl-6 py-2">
          <div>
            <span className="font-label-caps text-secondary-container uppercase tracking-widest text-label-caps mb-2 block">Catalog Architecture</span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Hardware Categories</h1>
            <p className="text-on-surface-variant max-w-xl mt-4 font-body-base text-body-base">
              Explore our curated selection of high-performance components. Every part is precision-engineered for professional applications, from rapid prototyping to final production scale.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex items-center gap-4 text-technical-data font-technical-data text-on-surface-variant uppercase tracking-wider">
            <span>Active SKUs: 14,204</span>
            <span className="h-4 w-px bg-outline-variant"></span>
            <span>Last Updated: 2h ago</span>
          </div>
        </div>
      </section>
    </div>
  );
}
