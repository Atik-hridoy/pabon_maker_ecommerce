import React from 'react';

export default function Features() {
  return (
    <section className="bg-white border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-lowest md:bg-transparent hover:bg-surface-container-lowest transition-all">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container flex items-center justify-center rounded-lg hover:bg-secondary-container hover:text-white transition-all shrink-0">
            <span className="material-symbols-outlined text-secondary text-[20px] md:text-[24px]">verified</span>
          </div>
          <div>
            <p className="font-label-caps text-xs md:text-label-caps text-on-surface font-bold">Premium Quality</p>
            <p className="text-[10px] md:text-[11px] text-on-surface-variant font-medium">Certified Components</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-lowest md:bg-transparent hover:bg-surface-container-lowest transition-all">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container flex items-center justify-center rounded-lg hover:bg-secondary-container hover:text-white transition-all shrink-0">
            <span className="material-symbols-outlined text-secondary text-[20px] md:text-[24px]">lock</span>
          </div>
          <div>
            <p className="font-label-caps text-xs md:text-label-caps text-on-surface font-bold">Secure Payments</p>
            <p className="text-[10px] md:text-[11px] text-on-surface-variant font-medium">100% SSL Encrypted</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-lowest md:bg-transparent hover:bg-surface-container-lowest transition-all">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container flex items-center justify-center rounded-lg hover:bg-secondary-container hover:text-white transition-all shrink-0">
            <span className="material-symbols-outlined text-secondary text-[20px] md:text-[24px]">local_shipping</span>
          </div>
          <div>
            <p className="font-label-caps text-xs md:text-label-caps text-on-surface font-bold">Fast Dispatch</p>
            <p className="text-[10px] md:text-[11px] text-on-surface-variant font-medium">Nationwide Shipping</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-lowest md:bg-transparent hover:bg-surface-container-lowest transition-all">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container flex items-center justify-center rounded-lg hover:bg-secondary-container hover:text-white transition-all shrink-0">
            <span className="material-symbols-outlined text-secondary text-[20px] md:text-[24px]">support_agent</span>
          </div>
          <div>
            <p className="font-label-caps text-xs md:text-label-caps text-on-surface font-bold">Expert Support</p>
            <p className="text-[10px] md:text-[11px] text-on-surface-variant font-medium">Technical Assistance</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
