import React from 'react';

export default function Metrics() {
  return (
    <section className="py-20 bg-surface border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-gutter text-center">
        <div className="space-y-2">
          <p className="text-secondary font-black text-4xl md:text-5xl">10K+</p>
          <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Makers &amp; Engineers</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary font-black text-4xl md:text-5xl">4.9</p>
          <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Global Rating</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary font-black text-4xl md:text-5xl">1000+</p>
          <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Components</p>
        </div>
        <div className="space-y-2">
          <p className="text-secondary font-black text-4xl md:text-5xl">100%</p>
          <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Secure Checkout</p>
        </div>
      </div>
    </section>
  );
}
