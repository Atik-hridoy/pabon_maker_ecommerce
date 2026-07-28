import React from 'react';

export default function Newsletter() {
  return (
    <section className="max-w-max-width mx-auto px-margin-desktop mb-24">
      <div className="bg-inverse-surface rounded-2xl p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline-md text-headline-md text-inverse-on-surface mb-4">Stay Synchronized</h2>
            <p className="text-inverse-on-surface opacity-70 font-body-lg">Get bi-weekly updates on new components, technical teardowns, and exclusive community discounts.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input className="flex-1 bg-surface/10 border border-outline-variant/30 text-inverse-on-surface px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="engineer@example.com" type="email" />
            <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container transition-all">Subscribe Now</button>
          </div>
        </div>
        {/* Abstract circuit pattern overlay */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'wght' 100" }}>memory</span>
        </div>
      </div>
    </section>
  );
}
