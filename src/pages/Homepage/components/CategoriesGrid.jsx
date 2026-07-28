import React from 'react';

export default function CategoriesGrid() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-max-width mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-code-label text-code-label text-primary uppercase tracking-widest">Inventory</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-2">Hardware Categories</h2>
          </div>
          <a className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all" href="#">
            View All Collections <span className="material-symbols-outlined">trending_flat</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter h-[800px] md:h-[600px]">
          {/* Arduino Large Card */}
          <div className="md:col-span-2 md:row-span-2 bento-card relative overflow-hidden rounded-2xl border border-outline-variant group transition-all duration-700 opacity-100">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="A macro shot of an Arduino Uno board resting on a pristine white surface. Soft overhead lighting highlights the blue solder mask and the silver metallic headers. The composition is artistic and minimalist, emphasizing the iconic design of the microcontroller in a clean-room aesthetic." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCigePqxRUPrByroq9y8eQwpWurus09r2wVof2itSlDxIaH67KgWfSJA9X53l583NuBhP47nRBJ9gc_NCOZKdoygBPuzbzswQfBN43vS9mNCkxNufMJHkNKdAcb-n9rbbrz-1RL6YygW8SBs-dHIHjAKmX2JfO_J7L5sqA_nXk3EBqNj4cin7tmnbn8Fa7EoSPVWYciaiZTc3qpxzGvHDSh1L_BnSKi7qWOSKXoeCv0p2a9P62SqaQmEuKXPVscKjl1gn_I18oU_w2A')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Arduino Ecosystem</h3>
              <p className="text-on-surface-variant mb-6 max-w-sm">From Uno to Portenta, find every controller for your next automation project.</p>
              <button className="px-6 py-3 bg-surface-container-highest text-primary font-bold rounded hover:bg-primary hover:text-on-primary transition-colors">Browse Kits</button>
            </div>
          </div>
          {/* IoT Card */}
          <div className="md:col-span-2 bento-card relative overflow-hidden rounded-2xl border border-outline-variant group bg-surface-container transition-all duration-700 opacity-100">
            <div className="flex h-full p-8 items-center gap-8">
              <div className="flex-1">
                <h3 className="font-title-sm text-title-sm text-on-surface mb-2">IoT &amp; Connectivity</h3>
                <p className="text-caption font-caption text-on-surface-variant">ESP32, LoRaWAN, and Zigbee modules for seamless networking.</p>
              </div>
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-outline-variant/30 flex-shrink-0">
                <img className="w-full h-full object-cover" data-alt="Close up of a modern ESP32 wifi module with its distinctive silver shielding and tiny antenna, laid out on a blueprint design background. Corporate tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMRhWO_CMAWBECMvGo56Kmj0er-tQgMYL3WOE7Ec-rs0CPz9wtfJWG7rtbWwW8JQBzZJLC28Jv8gyapOYkhhOjOhiNq8TEFnqD3NP9gbt6uJ2vu-AT8Lq3PBiuSY1jSOuhXbCJ_9H5pGn5_geI0b1u3HCtBqRPBoij_lf_K8zn62B3XnzTQjHvBy6NhJgmmVCdEKQHXrtIkj2Pa6Ew8a1WwjD6VPXtGa5JPGfH1gc4yGlu8m6XVjHz7VwpZiRtOzd2q8gA4iGoQQ9G" />
              </div>
            </div>
          </div>
          {/* Power Electronics */}
          <div className="md:col-span-1 bento-card flex flex-col p-8 rounded-2xl border border-outline-variant bg-surface-container-lowest justify-between transition-all duration-700 opacity-100">
            <div className="w-12 h-12 bg-primary-container/20 rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            <div>
              <h3 className="font-title-sm text-title-sm text-on-surface mb-1">Power</h3>
              <p className="text-caption font-caption text-on-surface-variant">Regulators, Buck converters, LiPo management.</p>
            </div>
          </div>
          {/* Sensors */}
          <div className="md:col-span-1 bento-card flex flex-col p-8 rounded-2xl border border-outline-variant bg-inverse-surface text-inverse-on-surface justify-between transition-all duration-700 opacity-100">
            <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">sensors</span>
            </div>
            <div>
              <h3 className="font-title-sm text-title-sm mb-1">Sensors</h3>
              <p className="text-caption font-caption opacity-70">IMUs, LiDAR, and environmental probes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
