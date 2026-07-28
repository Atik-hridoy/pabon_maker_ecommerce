import React from 'react';

export default function Features() {
  return (
    <section className="bg-white border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg grid grid-cols-2 md:grid-cols-4 gap-8">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-secondary">verified</span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface font-bold">Premium Quality</p>
            <p className="text-[11px] text-outline font-medium">Certified Components</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-secondary">lock</span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface font-bold">Secure Payments</p>
            <p className="text-[11px] text-outline font-medium">SSL Encrypted</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-secondary">local_shipping</span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface font-bold">Fast Global Shipping</p>
            <p className="text-[11px] text-outline font-medium">Next Day Dispatch</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-secondary">support_agent</span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface font-bold">Expert Support</p>
            <p className="text-[11px] text-outline font-medium">Engineer to Engineer</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
