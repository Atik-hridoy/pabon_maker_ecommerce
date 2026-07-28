import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

export default function ProductDetails() {
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none"></div>
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 pt-12 pb-24">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="aspect-video bg-surface-container rounded-xl overflow-hidden group relative border border-outline-variant">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A professional studio product shot of an Arduino Uno Starter Kit spread out on a clean white laboratory surface. The image shows the micro-controller, various resistors, LEDs, and jumper wires arranged neatly. Bright, high-key lighting creates soft shadows, maintaining a corporate modern and technical aesthetic with vibrant blue accents from the board." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAXgkteE3WOoXg2AAIz3NCzSpDt_IXW8LCoGxi3LJx0Nsv3wkO_ubnZhr2d7ByaU-Zdw5CufU254_xVmC9BfW5bMmZ0hDPDJZF7ALSiSkCdjWltxySSDmqQLT5BjNLCaEhIx2Y_xMUqkk7q9r-laFaDNJMeLbk87Sppg0M99VcDSmJluldYbyAKTdscm35pXrrnkB_gl-p_zGyNd_HG5dgxeyXvljuQLWEg_KDg-eWF6xoB97j8sfAmOowG9PK5qCD2ZvFqmowv-uI" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-on-primary font-code-label text-code-label px-3 py-1 rounded-full">IN STOCK</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square bg-surface-container-highest rounded-lg border border-outline-variant overflow-hidden cursor-pointer">
                  <img className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" data-alt="Detailed close-up of an Arduino Uno R3 micro-controller chip and circuit pathways, emphasizing the precision engineering and metallic textures under cool white clinical lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0n05hV2Phw-_qmlsQYm2Dgw6M3recQ1SI41ecdhvugBanREh1KK016YTYGLHIcwGhN6xyIKP3_D9QiAi8u3a31W5w-evQxZXu35fP8gUb-cuMzVkri4ZAm8eHBXsjp6gGtPO9-w0q5cet74jycg_blPzCFv9PlGaKH3z8QwyEnd0OwcWj0A3J5QW7RrjH_JUFiFmiVasy96X829BSTIlPXNv6yLl8jYSxX2xzc7Licc8K6QeZDvZlVVGlUM_L4gBpAdDvq4XGqs42" />
                </div>
                <div className="aspect-square bg-surface-container-highest rounded-lg border border-outline-variant overflow-hidden cursor-pointer">
                  <img className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" data-alt="A collection of electronic components including breadboards and sensors for the Pabon Maker starter kit, shot from a top-down view on a light gray technical background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF-IQf-hBj8KTAQBUZneQoh0-4rkI7KUWPEBxttBPwNG8zYT4sUzffRvdLOo4l-f_rh0dQlbkgMxPyb4Stc3lRtyBEPASgcgwVCyePwizWSasXD_7EgN335_4_--pPqTtHxI78_EX0IXnL4qWsUnmwF6qejy3zvXWHTQyc9jZOwHXossR_fT26mbZwLqHe69qF8UcylugMy5MbxHvVFMCsgOJvavEfHgLj_mLSFYZbMsdw-7rW---fuKrDvXerXBFCBnZEMTFCPHwh" />
                </div>
                <div className="aspect-square bg-surface-container-highest rounded-lg border border-outline-variant overflow-hidden cursor-pointer">
                  <img className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" data-alt="Action shot of a person using a jumper wire to connect an LED to an Arduino board, focusing on the precision of the hands and the hardware." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtajp4CeGZ1AQnyXvfBv-W3FL5M-xM8TEFlUx_D8beeXZicpp2WKEFgSRwzDU96BkCf7xO1FE5WsIeQg_-AKMm4B9kZWcqAh5wszmvEY9baloM2RCNPKkat_ndsXOXNZizBIi8_bxnVXWGAtO3X1ICcl-cKwgjBXzyQz-pC5KjAbchar580DbF3k5oa8htjSLrPyeudfAKR7SV2UbL_pCK5WOBg_snpcX887sN_ayC9Qiwvw5HFQIhx5z0WHu90yChU7M_HOJ3Lzqp" />
                </div>
                <div className="aspect-square bg-surface-container-highest rounded-lg border border-outline-variant overflow-hidden cursor-pointer flex items-center justify-center text-primary font-title-sm">
                  +4
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-xl shadow-sm">
              <h2 className="font-headline-md text-headline-md mb-6">Technical Specifications</h2>
              <div className="space-y-4">
                <div className="flex items-end">
                  <span className="font-code-label text-code-label text-on-surface-variant">Microcontroller</span>
                  <div className="dotted-connector"></div>
                  <span className="font-code-label text-code-label font-bold text-primary">ATmega328P</span>
                </div>
                <div className="flex items-end">
                  <span className="font-code-label text-code-label text-on-surface-variant">Operating Voltage</span>
                  <div className="dotted-connector"></div>
                  <span className="font-code-label text-code-label font-bold text-primary">5V</span>
                </div>
                <div className="flex items-end">
                  <span className="font-code-label text-code-label text-on-surface-variant">Input Voltage</span>
                  <div className="dotted-connector"></div>
                  <span className="font-code-label text-code-label font-bold text-primary">7-12V</span>
                </div>
                <div className="flex items-end">
                  <span className="font-code-label text-code-label text-on-surface-variant">Digital I/O Pins</span>
                  <div className="dotted-connector"></div>
                  <span className="font-code-label text-code-label font-bold text-primary">14 (6 PWM)</span>
                </div>
                <div className="flex items-end">
                  <span className="font-code-label text-code-label text-on-surface-variant">Analog Input Pins</span>
                  <div className="dotted-connector"></div>
                  <span className="font-code-label text-code-label font-bold text-primary">6</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div>
                <nav className="flex text-caption font-caption text-outline mb-2 gap-2 items-center">
                  <a className="hover:text-primary" href="#">Store</a>
                  <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                  <a className="hover:text-primary" href="#">Microcontrollers</a>
                </nav>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">Arduino Uno Starter Kit</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">The ultimate foundation for your electronic journey. Includes 100+ components and access to our exclusive learning hub.</p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">$49.99</span>
                <span className="text-on-surface-variant line-through text-lg">$64.99</span>
              </div>
              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="font-code-label text-code-label block uppercase text-outline">Edition</label>
                    <select className="w-full bg-surface-container border-outline-variant rounded-lg font-body-md p-3 focus:border-primary focus:ring-1 focus:ring-primary">
                      <option>Standard Maker Kit</option>
                      <option>Advanced Sensor Expansion</option>
                      <option>Education Institutional Pack</option>
                    </select>
                  </div>
                  <div className="w-24 space-y-2">
                    <label className="font-code-label text-code-label block uppercase text-outline">Qty</label>
                    <input className="w-full bg-surface-container border-outline-variant rounded-lg font-body-md p-3 focus:border-primary" min="1" type="number" defaultValue="1" />
                  </div>
                </div>
                <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all duration-200 flex items-center justify-center gap-2 group">
                  ADD TO PROJECT CART
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button className="w-full border border-primary text-primary py-4 rounded-lg font-bold hover:bg-surface-container transition-all duration-200">
                  DOWNLOAD DATASHEET (PDF)
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  <div>
                    <p className="font-title-sm text-[14px]">Free Global Shipping</p>
                    <p className="font-caption text-caption text-outline">On orders over $100</p>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <div>
                    <p className="font-title-sm text-[14px]">2-Year Warranty</p>
                    <p className="font-caption text-caption text-outline">Certified Reliability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 bg-surface-container py-24">
          <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="font-code-label text-code-label text-primary tracking-widest uppercase">The Circuit Academy</span>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mt-2">Learning Hub</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">Master the Arduino ecosystem with our structured laboratory curriculum. Go from blinking LEDs to complex IoT systems.</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-surface-container-highest p-3 rounded-lg border border-outline-variant hover:border-primary transition-colors">
                  <span className="material-symbols-outlined">west</span>
                </button>
                <button className="bg-primary text-on-primary p-3 rounded-lg hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 circuit-pattern pointer-events-none"></div>
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <h3 className="font-title-sm text-title-sm">Interactive Schematic: Project 01</h3>
                  <div className="flex gap-4">
                    <span className="bg-secondary-container text-on-secondary-container font-code-label text-caption px-2 py-1 rounded">2D VIEW</span>
                    <span className="text-outline font-code-label text-caption px-2 py-1 cursor-pointer hover:text-primary">BOM LIST</span>
                  </div>
                </div>
                <div className="aspect-[16/9] w-full rounded-lg bg-surface-container-high border border-outline-variant/50 relative flex items-center justify-center p-12">
                  <div className="w-full h-full relative">
                    <img className="w-full h-full object-contain" data-alt="A clean, minimalist 2D circuit schematic diagram for an LED blink project. The diagram shows an Arduino Uno connected to a breadboard via jumper wires, with a resistor and a blue LED. The background is a crisp white grid paper texture, with precise blue and grey lines following professional electrical engineering standards." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzkA3VAWaDSoBYgGtuH9-RgqKqKX8TQfodcngyOdMiGCj3wXE5-KVXEvO-e12AmkScsOu7fQJ4p5BZ5SoqVyXxKAuUeUbRy23T-J3Dkasg8xectIoyIzLGDcwsXe0eKAZRBo_17N2NyJ9XHU3RwayUKDsTfnUYdIVz7RKQBvrXTER6AKBWIMZ9ElKeR7O2BBubfo_0veDKALaG34uudGzqXmWKaK3aXAL0qu5XpTznVr8TJkSaC5gSugrx7LonpTZVbsZUFbL2Jk0m" />
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full animate-ping opacity-50"></div>
                    <div className="absolute bottom-1/2 right-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-gutter">
                <div className="glass-card p-6 rounded-xl flex-1 border border-outline-variant">
                  <h4 className="font-title-sm text-title-sm mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">build</span>
                    Required Tools
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                        <span className="material-symbols-outlined text-[20px]">usb</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">USB-B Cable</p>
                        <p className="text-caption text-outline">Included in Kit</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center group-hover:bg-primary-container transition-colors">
                        <span className="material-symbols-outlined text-[20px]">computer</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Arduino IDE 2.0</p>
                        <p className="text-caption text-outline">Software Required</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center group-hover:bg-primary-container transition-colors">
                        <span className="material-symbols-outlined text-[20px]">bolt</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Power Supply</p>
                        <p className="text-caption text-outline">9V Battery or USB</p>
                      </div>
                    </li>
                  </ul>
                  <button className="w-full mt-8 py-3 text-primary font-bold border border-primary/20 hover:bg-primary/5 rounded-lg transition-colors text-sm">
                    LAB SAFETY MANUAL
                  </button>
                </div>
              </div>
              <div className="lg:col-span-12 glass-card p-8 rounded-xl border border-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="font-headline-md text-headline-md mb-6">How It Works: PWM Control</h3>
                    <p className="text-on-surface-variant mb-6 text-body-lg">Pulse Width Modulation (PWM) is a technique used to encode a message into a pulsing signal. Although it's a digital signal, PWM can be used to simulate an analog voltage level by varying the percentage of time the signal is 'on' vs 'off'.</p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Digital Signal:</span> The Arduino sends a series of high and low pulses at a fixed frequency.</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Duty Cycle:</span> By changing the width of the 'high' pulse, we change the average energy delivered.</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Result:</span> Components like LEDs or Motors react to the average voltage, dimming or slowing down.</p>
                      </div>
                    </div>
                    <button className="mt-8 flex items-center gap-2 text-primary font-bold hover:underline">
                      VIEW FULL DOCUMENTATION
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </button>
                  </div>
                  <div className="aspect-video bg-surface-container rounded-lg border border-outline-variant overflow-hidden relative">
                    <img className="w-full h-full object-cover" data-alt="A sophisticated technical animation or high-detail graphic illustrating Pulse Width Modulation (PWM). The visual shows square wave signals of different widths (25%, 50%, 75%) with a corresponding LED brightness level next to each wave. The style is ultra-clean laboratory corporate modern, using the Pabon Maker primary electric blue for the signals against a dark technical interface background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXww--K893lqfW1rD0P_mJlqLGUnyi8RebtE3isPcNPcmtuiJbp08BHYpe8kwg_FFNDnagGVDgOmIe2QXztRO-RO3n2t0riLUzDO8Z35-anhGDiGW4Rubsz3vmr_jILZLDQp5ux0KDOjIRwwAM5MQbuXQJ0u0_dd6xQmeXsrhw2GGDDZjbKFD56cigX_VFb3f8u6kjLCtWDdNhv7i_byG0nX0rZN_oyuqWEOtAn2Mrk80BSiNqGCO8CCsC-KPcC23BLQkcn5hOrldB" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
