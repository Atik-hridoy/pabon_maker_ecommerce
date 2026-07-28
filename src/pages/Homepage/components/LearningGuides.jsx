import React from 'react';

export default function LearningGuides() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-20"></div>
      <div className="max-w-max-width mx-auto px-margin-desktop relative z-10">
        <div className="flex items-center justify-between mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface">Top Learning Guides</h2>
          <button className="text-primary font-bold flex items-center gap-2">
            Browse Academy
            <span className="material-symbols-outlined">school</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Guide 1 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-6 relative">
              <img className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A top-down view of an organized workbench with an oscilloscope, a soldering iron, and several schematic diagrams spread out. The scene is lit with warm workstation lamps, creating a focused, educational atmosphere for electronics beginners." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Kfa9khPE3X0aBHYGMR84F0AfY_VqnhAGdaiKG5wiamvAAs5WghlMLDSrDczkeIQIm-mHsd5yV9FUcMeNKsEczsPF9wYKwW5Tp6XFBILT_zBHc7zsGP6ArRbVgIKv69yxlvhxPavVxNaiyzNZDf6Mcxz---L7DLDWrEhQjmXLxfuusZ7VFSQg3UUlkUxV817KzC8qmXhOrv4G4WL_mSW5TtBfybQGBBRDdtWm0m8xvP7MoWl1HMaGBa1jnoYiCltXYQ2oT5UQedYf" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-caption font-code-label">BEGINNER</span>
              </div>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors mb-2">Foundations of Circuit Design</h3>
            <p className="text-on-surface-variant font-body-md line-clamp-2">Master Ohm's Law and basic schematic reading in this comprehensive 12-part series.</p>
          </div>
          {/* Guide 2 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-6 relative">
              <img className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A dark-themed workspace showing a laptop screen with C++ code next to an illuminated ESP32 board. The RGB LEDs on the board are glowing in a spectrum, reflecting the IoT coding theme. High-tech and modern vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9W2P2ppJibytT_BBaZro4OIGM2Oy1JLYvK2DmjGPF9xYsEuuQG2fgDuak3PFNa5I8QKC9pMcOIL-0Ui-ylpj0MtDDL1OMedXFRvNcmbqskqzEC_91KDHz-6bqa1X6kfBzWNAWlUL6ynBt9hnJEafE74EPPgqBNgzdXQb72KALSbOEx8RVeno2emUAW9GgIRzZbPp805AZF8M3GH39xE-HZ_-72zDgX-NROC6Y3us_sRLf-ymm7ePjOOEFcfeEiTaud0241Dt90yeC" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-caption font-code-label">ADVANCED</span>
              </div>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors mb-2">Mastering IoT with ESP32</h3>
            <p className="text-on-surface-variant font-body-md line-clamp-2">Connect your devices to the cloud using MQTT and custom dashboarding.</p>
          </div>
          {/* Guide 3 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-6 relative">
              <img className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A professional 3D CAD rendering of a multi-layer PCB layout. Transparent layers show copper traces, vias, and component footprints in a complex, beautiful engineering pattern." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgmK1NzZPYi6UV8y9owAwbsMywv51zPKichDF-oNcRGquyNK2c_FYh4lp6Q1duwYDza43tESNFpbH7W0Hv6HJDmvlA0yIniBUXZFWLByyJh7YxfZ9O_CvuB2e6MxGOlyDnqjgRH9uYJue45uk--IMt0ssZnsRjYK58By9mQQkTZEBww40dIV-k1bxN9SolWWHmMTxVEWdZi6ufZQbE9XLUSm3I1SH3CwaJU_Pyo5SPBfexxt9QvzXTJcZoE45_tiwJdXDoThuYEn5H" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-caption font-code-label">INTERMEDIATE</span>
              </div>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors mb-2">PCB Layout Best Practices</h3>
            <p className="text-on-surface-variant font-body-md line-clamp-2">Learn to design noise-free, manufacturable boards using industry-standard tools.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
