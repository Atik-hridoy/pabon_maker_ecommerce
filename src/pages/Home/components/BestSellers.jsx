import React from 'react';

export default function BestSellers() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-2 uppercase">Trending Hardware</p>
            <h2 className="font-headline-md text-headline-md text-on-surface">BEST SELLERS</h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 border border-outline-variant flex items-center justify-center rounded hover:border-secondary transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="w-10 h-10 border border-outline-variant flex items-center justify-center rounded hover:border-secondary transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Product Card 1 */}
          <div className="product-card-hover group border border-outline-variant p-6 transition-all bg-white relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-secondary-container text-white px-2 py-1 text-[10px] font-black rounded uppercase">New</span>
            </div>
            <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center p-4">
              <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" data-alt="A professional high-resolution render of an advanced 32-bit development board featuring a dark blue PCB and gold-plated pins." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBviCHEDJ3V0nHRlAPoLNQJpHicu0X5hPxQYmuTrHqtbF2A0Ek-FL0UoHZxqzK8IeJYjBH6MNGhH62I8nuNuuQynt_ldN_AJ75eHqpLmVT3YiynT0nNYTZVmIjpMesO922vWTYESkZIRfXOje1feq0kdwDkSbcWtmd4--VZ1SW1ftS1rdaPaJv-ZI_zURq6qXWE8_h5B1jQdWhbeSNzBxs76Smdk8L5KCiYKT9kXqD73cmVgQi-DuZb0DZCKfOoza5pk0zwOBckifTG"/>
            </div>
            <div className="space-y-2">
              <div className="flex text-secondary-container gap-0.5">
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="text-outline text-[11px] font-medium ml-1">(48)</span>
              </div>
              <h3 className="font-body-base font-bold text-on-surface line-clamp-2">MK-Ultra 32-bit SoC Dev Board</h3>
              <p className="font-technical-data text-technical-data text-on-primary-container">3.3V - 5V | Dual Core</p>
              <div className="flex items-center justify-between pt-4">
                <span className="text-headline-md font-black text-on-surface">$24.99</span>
                <button className="bg-primary-container text-white p-2 rounded hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          {/* Product Card 2 */}
          <div className="product-card-hover group border border-outline-variant p-6 transition-all bg-white relative">
            <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center p-4">
              <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" data-alt="A high-precision optical distance sensor module with a sleek black housing and visible lens." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd32I9bq6A7RVh9YWUD0StycQcfKspSBe34SKSEWt1Vxxtgk1mP_WRubPrW5gbLHKzDDv3DFg7LOHoWAnucRD6QMpOAWMdXYYE2IwhKla1s_cFfoQizDmK2JxLGwkFu3JZhPV0C7ow0EwMJ0L4Vje4n12v06LX1t3Tr4jgK_bNhbKGB8mR45VUlQHEqQdDXvbi3enKNzs0dKB1YFGQM1FuF2mIFQhpRCGFtqfrB_UlEWhbibXBSTKMI745hy8o0KL6MwDtIB_qifUP"/>
            </div>
            <div className="space-y-2">
              <div className="flex text-secondary-container gap-0.5">
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 0"}}>star</span>
                <span className="text-outline text-[11px] font-medium ml-1">(102)</span>
              </div>
              <h3 className="font-body-base font-bold text-on-surface line-clamp-2">Laser-Precision ToF Sensor Module</h3>
              <p className="font-technical-data text-technical-data text-on-primary-container">5V DC | 0.1mm Accuracy</p>
              <div className="flex items-center justify-between pt-4">
                <span className="text-headline-md font-black text-on-surface">$18.50</span>
                <button className="bg-primary-container text-white p-2 rounded hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          {/* Product Card 3 */}
          <div className="product-card-hover group border border-outline-variant p-6 transition-all bg-white relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-error text-white px-2 py-1 text-[10px] font-black rounded uppercase">Sale</span>
            </div>
            <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center p-4">
              <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" data-alt="Professional render of a compact IoT Wi-Fi and Bluetooth module with a gold-etched PCB antenna." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWvwrNFgo6k6IqX5KMcnsUXJWtCJeuDYqvJA4HbfmaWVK5ar0zeHESwsWZU2CeSK0k3p8pikA9VW2uS68NsH6GFjhZ1MMK-S19Y6CwmurxBPTKkmVmcFJYgPAYhyZsQgdd5qGqUpj7pVzlBOIfiD2Pm_QTYc5eD8amRyVwrzErNLADUPSWByz3BqJN4ywbRLCzWaRB4BR5BNK8CbVobA6cGbZPV2g0fJo2lK0r5jAqBVCCLa4zsSot88jt8mY36l22VpgoQJSw_wYD"/>
            </div>
            <div className="space-y-2">
              <div className="flex text-secondary-container gap-0.5">
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="text-outline text-[11px] font-medium ml-1">(215)</span>
              </div>
              <h3 className="font-body-base font-bold text-on-surface line-clamp-2">IoT Connect Pro WiFi/BLE Chip</h3>
              <p className="font-technical-data text-technical-data text-on-primary-container">Ultra Low Power | 2.4GHz</p>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col">
                  <span className="text-outline line-through text-xs">$12.00</span>
                  <span className="text-headline-md font-black text-secondary">$7.99</span>
                </div>
                <button className="bg-primary-container text-white p-2 rounded hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          {/* Product Card 4 */}
          <div className="product-card-hover group border border-outline-variant p-6 transition-all bg-white relative">
            <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center p-4">
              <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" data-alt="A detailed mechanical render of a NEMA 17 stepper motor with a precision-ground shaft and rugged metal housing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-4V5HZhlCgjUjhhjeq3OTIas00jLs8P-WpXGBSl5flOoJ4AeG-tj0_Qf6ZBx7P_xuGtQDWnszeYQop93CXK7uNPd0SSndS5D0MesTrbr4YIa90qz-QEGRPME-WnGohpRi9DIFo8N_rErrCXuRWQZzIOb7c2YavaZip4DoqNf6RjC_jvn-iGBQOrv1uR4QpPTnep_I6khxfmlSzPppVw_mpCANaDIquCxgw8RmFYs0P3OsX28Una3pjT3bi8Wus0RIQ_1rbGsCDQO_"/>
            </div>
            <div className="space-y-2">
              <div className="flex text-secondary-container gap-0.5">
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="text-outline text-[11px] font-medium ml-1">(63)</span>
              </div>
              <h3 className="font-body-base font-bold text-on-surface line-clamp-2">Precision NEMA 17 Stepper Motor</h3>
              <p className="font-technical-data text-technical-data text-on-primary-container">1.8° Step | 12-24V DC</p>
              <div className="flex items-center justify-between pt-4">
                <span className="text-headline-md font-black text-on-surface">$32.00</span>
                <button className="bg-primary-container text-white p-2 rounded hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
