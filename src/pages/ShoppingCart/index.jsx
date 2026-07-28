import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

export default function ShoppingCart() {
  return (
    <MainLayout>
      <div className="pt-12 max-w-max-width mx-auto px-margin-desktop w-full flex-grow">
        <h1 className="font-headline-md text-headline-md mb-8">Shopping Cart <span className="text-on-surface-variant font-normal text-title-sm">(2 items)</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start pb-24">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 group transition-all hover:shadow-sm">
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" data-alt="A professional high-resolution studio photograph of a blue Arduino-compatible microcontroller board on a clean white surface with sharp shadows, showing intricate circuit traces and golden pins. The lighting is laboratory-clean and emphasizes the technical precision of the component." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdINrRxw74_UnY31_ScGWM0F1WAp3GuhG8_1G7uL6cl6-gI6VahjHToqigkk31JLZX-hZb7WPqGuyEOT8w6B7M5sbMu0NnzbbUkwME3CDeE3w4SkwkaqNgGmB90Nbrj1NgAdLfy5zTRU6T3iQjblVK_6pecB0SGReoOM0NG9SI1YxezcagSE1m54AxMNz0lX7vWSAg3J07beiSTaNGJj5RoY7zrjvLZuoBozm9WWhT2iGP-WINe9w6BWXz8SU6J4CjjV2b0XKr344A" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-code-label text-code-label text-primary bg-primary-fixed px-2 py-0.5 rounded-sm">MICROCONTROLLER</span>
                      <h3 className="font-title-sm text-title-sm mt-1">ATmega328P Development Board</h3>
                      <p className="text-on-surface-variant font-caption text-caption mt-1">SKU: PM-ATM-328P-V3</p>
                    </div>
                    <span className="font-title-sm text-title-sm text-primary">$24.99</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center border border-outline-variant rounded-full overflow-hidden">
                      <button className="px-4 py-2 hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-sm leading-none">remove</span></button>
                      <span className="px-4 py-2 font-code-label border-x border-outline-variant min-w-[48px] text-center">01</span>
                      <button className="px-4 py-2 hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-sm leading-none">add</span></button>
                    </div>
                    <button className="flex items-center gap-2 text-error font-caption hover:opacity-80 transition-opacity">
                      <span className="material-symbols-outlined text-base">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-outline-variant/30">
                <div className="bg-surface-container-low p-4 rounded flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <div>
                      <span className="font-code-label text-[10px] text-on-surface-variant tracking-widest uppercase">Learning Recommendation</span>
                      <p className="font-body-md text-sm font-semibold">Starter Circuitry Bundle: LEDs, Resistors &amp; Breadboard</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white font-code-label text-xs hover:bg-on-primary-fixed-variant transition-colors whitespace-nowrap">
                    Add Bundle +$12.00
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 group transition-all hover:shadow-sm">
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" data-alt="A macro shot of professional-grade copper-braided jumper wires with gold-plated connectors, neatly coiled. The background is a soft blue-grey gradient. The image style is clean, modern, and commercial, highlighting the quality of the technical hardware components." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKmRJzRg9twp1PZthjIGg_dmkqIjmTyZ6cL-tkiPG7SWiLyETQqXJyAgJW8DU5jSahHT5V1bZjz9l_9BnYdRRPJCKj59mENR0V6Z1bOzoCdU5fAk7aS1G-OHZa6lpQqp9ClLKTNQyeHnZ9G5Ec9MfkFj2mXjJIA2De_6vV9vaOssnzv2VIVio3Np2nLT0V2K3kKTUdlYbFaFzS7Y1WA2qNyKH1ICp-J0464ZMWa6JUY-KV3ZAYk84T7bzdyi4ROK121_SiAU5Frpgc" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-code-label text-code-label text-secondary bg-secondary-fixed px-2 py-0.5 rounded-sm">PROTOTYPING</span>
                      <h3 className="font-title-sm text-title-sm mt-1">Premium Jumper Wire Pack (65pcs)</h3>
                      <p className="text-on-surface-variant font-caption text-caption mt-1">SKU: PM-JW-65P-MULTI</p>
                    </div>
                    <span className="font-title-sm text-title-sm text-primary">$8.50</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center border border-outline-variant rounded-full overflow-hidden">
                      <button className="px-4 py-2 hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-sm leading-none">remove</span></button>
                      <span className="px-4 py-2 font-code-label border-x border-outline-variant min-w-[48px] text-center">02</span>
                      <button className="px-4 py-2 hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-sm leading-none">add</span></button>
                    </div>
                    <button className="flex items-center gap-2 text-error font-caption hover:opacity-80 transition-opacity">
                      <span className="material-symbols-outlined text-base">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-outline-variant/30">
                <div className="bg-surface-container-low p-4 rounded flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <div>
                      <span className="font-code-label text-[10px] text-on-surface-variant tracking-widest uppercase">Learning Recommendation</span>
                      <p className="font-body-md text-sm font-semibold">Prototyping Mastery Workshop (Digital Access)</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white font-code-label text-xs hover:bg-on-primary-fixed-variant transition-colors whitespace-nowrap">
                    Add Access +$15.00
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <a className="flex items-center gap-2 text-primary font-body-md hover:underline transition-all" href="#">
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </a>
            </div>
          </div>

          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-surface-container border border-outline-variant rounded-lg p-8">
              <h2 className="font-headline-md text-2xl mb-8">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-on-surface-variant font-body-md">Subtotal</span>
                  <div className="flex-grow mx-2 h-px circuit-line opacity-30 mb-1"></div>
                  <span className="font-code-label">$41.99</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-on-surface-variant font-body-md">Shipping</span>
                  <div className="flex-grow mx-2 h-px circuit-line opacity-30 mb-1"></div>
                  <span className="font-code-label text-secondary">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-on-surface-variant font-body-md">Estimated Tax</span>
                  <div className="flex-grow mx-2 h-px circuit-line opacity-30 mb-1"></div>
                  <span className="font-code-label">$3.45</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t-2 border-outline-variant space-y-8">
                <div className="flex justify-between items-center">
                  <span className="font-title-sm text-title-sm">Total</span>
                  <span className="font-display-lg text-3xl text-primary">$45.44</span>
                </div>
                <div className="space-y-4">
                  <button className="w-full bg-primary text-white font-title-sm py-4 rounded-sm hover:bg-on-primary-fixed-variant transition-all flex items-center justify-center gap-3 group">
                    Proceed to Checkout
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 text-on-surface-variant font-caption py-2 border border-outline-variant/30 rounded">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    Secure 256-bit SSL Encrypted Payment
                  </div>
                </div>
              </div>
              <div className="mt-12 space-y-4">
                <p className="font-code-label text-xs uppercase tracking-widest text-on-surface-variant">We Accept</p>
                <div className="flex gap-4 opacity-60">
                  <span className="material-symbols-outlined text-3xl">credit_card</span>
                  <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg flex gap-4">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              <div>
                <p className="font-body-md text-sm font-semibold">Free shipping eligibility</p>
                <p className="text-on-surface-variant font-caption">Add $58.01 more to your cart to qualify for free express shipping.</p>
                <div className="w-full bg-surface-container h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "42%" }}></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
