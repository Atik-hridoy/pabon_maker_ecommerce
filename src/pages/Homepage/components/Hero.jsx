import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-surface-container-low">
      {/* Background Decoration */}
      <div className="absolute inset-0 circuit-trace opacity-20"></div>
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
      <div className="max-w-max-width mx-auto px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary/20 rounded-full">
            <span className="font-code-label text-code-label text-primary">VERSION 4.2 NOW LIVE</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none">
            Engineer Your <span className="text-primary italic">Ideas.</span><br />
            Master the Circuit.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Premium electronic components and industry-grade learning pathways. From basic Arduino kits to advanced IoT architecture, we provide the precision you need.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2">
              Explore Components
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="px-8 py-4 border border-outline text-primary font-bold rounded-lg hover:bg-primary/5 transition-all">
              Learning Hub
            </button>
          </div>
        </div>
        <div className="hidden lg:block relative">
          <div className="relative z-10 rounded-2xl overflow-hidden border border-outline-variant shadow-2xl">
            <img className="w-full aspect-square object-cover" data-alt="A professional studio photograph of a highly complex, futuristic printed circuit board with glowing electric blue LED paths and high-end macro details. The background is a clean, minimalist laboratory setting with soft focus on precision tools. The lighting is crisp and cold, emphasizing the metallic textures and engineering excellence of the hardware." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT_45k-03IFAjsz2iAhk9-QbPC3s0gS3crpl8F2W6TIlcW1kkxbs96bihGnA1mX13E7FYx_ayfeY9-fBjtrh33XCrCJjgjoLqEArQBuFn9fz-RzbNQhefCeWCi3WRcefEw4VxULhqABmcbjbIlfXAu3kdugEXbRO6X3JobRfph0UGtj4uQbGOpLBz-Y9gztRvfmKuEwOllW1Es0Rb9vjHkvkd-WOLFWxtTiR9ushXZ6EdRfyTH-dCRMHvbKamo1hcecr_h8_HCO9iE" />
          </div>
          {/* Floating Tech Spec */}
          <div className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-xl border border-outline-variant/30 shadow-xl z-20 max-w-[240px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>developer_board</span>
              <span className="font-code-label text-code-label uppercase">Module Alpha-9</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-caption font-caption">
                <span className="text-on-surface-variant">Voltage</span>
                <span className="text-primary">3.3V - 5V</span>
              </div>
              <div className="border-t border-dotted border-outline-variant w-full"></div>
              <div className="flex justify-between items-center text-caption font-caption">
                <span className="text-on-surface-variant">Interface</span>
                <span className="text-primary">I2C / SPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
