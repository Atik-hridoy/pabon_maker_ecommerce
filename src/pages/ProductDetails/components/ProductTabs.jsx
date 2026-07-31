import React from 'react';

export default function ProductTabs() {
  return (
    <section className="mb-16">
      <h3 className="font-headline-md text-headline-md text-primary border-b border-outline-variant pb-4 mb-8">Reviews (128)</h3>
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-outline-variant text-center">
              <p className="text-4xl font-bold text-primary">4.9</p>
              <div className="flex justify-center text-secondary-container my-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                ))}
              </div>
              <p className="text-body-sm text-on-surface-variant">Based on 128 verified purchases</p>
            </div>
            <button className="w-full py-3 border-2 border-primary font-bold rounded hover:bg-primary hover:text-white transition-all">Write a Review</button>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="border-b border-outline-variant pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">Engr. Alex M.</span>
                <span className="text-body-sm text-on-surface-variant italic">2 weeks ago</span>
              </div>
              <div className="flex text-secondary-container mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                ))}
              </div>
              <p className="text-body-base text-on-surface-variant font-medium mb-1">Exceptional clock stability.</p>
              <p className="text-body-sm text-on-surface-variant">Using this for a custom flight controller. The DSP instructions made the PID loops much cleaner to implement. Rock solid performance even at higher temps.</p>
            </div>
            <div className="border-b border-outline-variant pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">HardwareHacker88</span>
                <span className="text-body-sm text-on-surface-variant italic">1 month ago</span>
              </div>
              <div className="flex text-secondary-container mb-2">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                ))}
                <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 0"}}>star</span>
              </div>
              <p className="text-body-base text-on-surface-variant font-medium mb-1">Solid for the price.</p>
              <p className="text-body-sm text-on-surface-variant">Documentation is thorough. The chip runs cool. Only wish the breakout pins were spaced slightly differently for my specific shield, but that's a minor gripe.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
