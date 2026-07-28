import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

export default function CategoryBrowse() {
  return (
    <MainLayout>
      <div className="flex-grow flex flex-col md:flex-row max-w-max-width mx-auto w-full px-margin-desktop py-8 gap-gutter relative">
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <section>
            <h3 className="font-title-sm text-title-sm mb-4">Filters</h3>
            <div className="space-y-6">
              <div>
                <span className="font-code-label text-code-label uppercase text-outline mb-3 block">Difficulty Level</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-on-surface-variant group-hover:text-primary">Beginner</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-on-surface-variant group-hover:text-primary">Intermediate</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-on-surface-variant group-hover:text-primary">Advanced</span>
                  </label>
                </div>
              </div>

              <div>
                <span className="font-code-label text-code-label uppercase text-outline mb-3 block">Price Range</span>
                <div className="px-2">
                  <input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" type="range" />
                  <div className="flex justify-between mt-2 font-caption text-caption text-outline">
                    <span>$0</span>
                    <span>$500+</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-code-label text-code-label uppercase text-outline mb-3 block">Quick Filters</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-caption rounded-full hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors">Arduino</span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-caption rounded-full hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors">Raspberry Pi</span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-caption rounded-full hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors">IoT</span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-caption rounded-full hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors">ESP32</span>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section className="flex-grow">
          <header className="mb-8">
            <h1 className="font-display-lg text-display-lg text-primary mb-2">Category Browse</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Precision components for your next breakthrough. Explore our laboratory-grade categories curated for hobbyists and professional engineers.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bento-card group bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 relative overflow-hidden bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A professional studio product photography of a high-end microcontroller chip mounted on a sleek dark blue PCB circuit board. The lighting is crisp and surgical, highlighting the intricate gold and copper circuit traces. The background is a clean, neutral laboratory gray with a slight gradient. The overall aesthetic is professional, technical, and high-tech." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgCE6J-HfOGnlFEnbn1NUAX8_wgn55nSUv3XhepoewsO0VM4ESqE3nYOczZQB87_m2vma-RHH6adloz-k9HcQrnuPUMVlHERVQYG8WpJ8cfrZnBjR9yxzHVVswFGkgxzGkJgC9EnwvkB5zfsXxF2wMiB1ecIekIoQLeQVvrVMoFEhW-v3JI2H0-tbKpRBSlwy77xntXLZpk5r1nUahXsRk-3rgyeBebPSvYhffp4XojOQQWrKmCX_jh4iP4-BF30hj2uORtNR2PqKD" />
                <div className="absolute top-4 right-4 bg-primary text-on-primary font-code-label text-caption px-3 py-1 rounded-full">Essential</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-title-sm text-title-sm text-on-surface mb-2">Microcontrollers</h2>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow">The brain of your project. High-performance AVR, ARM, and ESP32 boards for rapid prototyping.</p>
                <div className="flex items-center justify-between">
                  <span className="font-code-label text-code-label text-primary">124 Items</span>
                  <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-caption hover:opacity-90 transition-opacity">
                    Learn &amp; Shop
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bento-card group bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 relative overflow-hidden bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A macro shot of professional environmental and optical sensors arranged in a precise grid layout on a clean white surface. The lighting is bright and even, casting soft shadows. Electric blue highlights reflect off the metallic surfaces of the sensors. The mood is scientific and meticulously organized, emphasizing precision engineering." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjTEKiY3rZ08kgrPEOlsalSaoWuvv_Igbm4mmJbU0r1ESCf23H6OnzrH-hVdf8zQWsElDzJcflFJpfapssW0LZ0HFsgyvubKWsjLa8N4BLkUDc6mn7FZ6wqQKJkjlgALcRvFlHG9RpjkscPNge--YUG3qVoOY2nIwgRNqNO7vg_dwWLdmu5Ngh4Nkmc5Eunlc_-btbZmMYCTnX0zSTWNCpWb-k1vr4lUEMcttbwivYuMwoma7O5vYb9R3SCwPislREvQ6OhOI7dffe" />
                <div className="absolute top-4 right-4 bg-secondary text-on-secondary font-code-label text-caption px-3 py-1 rounded-full">New Arrival</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-title-sm text-title-sm text-on-surface mb-2">Sensors</h2>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow">Capture the world. High-precision modules for motion, environment, light, and biometrics.</p>
                <div className="flex items-center justify-between">
                  <span className="font-code-label text-code-label text-primary">89 Items</span>
                  <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-caption hover:opacity-90 transition-opacity">
                    Learn &amp; Shop
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bento-card group bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 relative overflow-hidden bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A sophisticated robotic actuator arm assembly with precision machined aluminum parts and exposed silver wiring. The component sits on a sleek black reflective surface under high-key technical lighting. Minimalist electric blue circuit board lines are faintly visible in the background, reinforcing a high-tech corporate modern engineering brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvtwF-yBpM4A4_wV7vRl5d-yBWelwHcK_ExlSgF6cG20d8z0vuWcYtLlqtnEStzX9spCYdprLBYAs6w_g8lLB2_UI858AgUyj7dtWj7xtTHWbAc4SRpzBYE1vjoL2oX_aebpqX6YkHeRBM6LIt2cO9InJdDDy_iRXhPgtXwtXdHGUJNZ5zoKIeBPIvbOjCzRFHckAuo9GlzEOP3YhGHiJcFxDsT2ywdOT-U8Q2H0wT-75OlSzmZ8YkRKWrI1DGeP2vjzHB_3hkTFlM" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-title-sm text-title-sm text-on-surface mb-2">Robotics</h2>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow">Motion and mechanics. Servos, stepper motors, and mechanical frameworks for automation.</p>
                <div className="flex items-center justify-between">
                  <span className="font-code-label text-code-label text-primary">56 Items</span>
                  <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-caption hover:opacity-90 transition-opacity">
                    Learn &amp; Shop
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bento-card group bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 relative overflow-hidden bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Modern wireless communication modules and Wi-Fi chips with glowing blue LED indicators on a technical blueprint background. The shot is angled to show depth, with soft bokeh in the distance. The color palette is composed of cool blues and greys, representing connectivity and cloud-integrated electronics manufacturing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz-pLt2gGaP2amE54PBxufsoampQv1JbB8A0t0Z4K0ZEzwBLaEr0_Zgu_yhpz2-UsHMfXmg4n-SWRK1CM_D08SbYLZcs6K92238nkO3h2P8eGT9gY8NPWvM5zo5_Z7Izwy1wEhs_yfF4C1bixWTFMnt58xjUNtm6cWpXTZ_0r1pR8axVkguMNbcNyQ0uIDaDaq04-8Ewz71MI24rlWxyEicxE5GdXIszskY5ZiDP2d3bSrQFJyxS3FBV6bI-scduET5VStIPFdckCN" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-title-sm text-title-sm text-on-surface mb-2">Wireless &amp; IoT</h2>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow">Connect everything. LoRa, Bluetooth, and Wi-Fi modules for distributed systems.</p>
                <div className="flex items-center justify-between">
                  <span className="font-code-label text-code-label text-primary">74 Items</span>
                  <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-caption hover:opacity-90 transition-opacity">
                    Learn &amp; Shop
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bento-card group bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 relative overflow-hidden bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="High-quality industrial power supply modules and voltage regulators arranged elegantly. The hardware features thick copper coils and robust capacitors. The lighting is dramatic and technical, with a focus on reliability and industrial strength. The setting is a clean, modern electronics workshop with a primary blue and white theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0yQEAMUfaAMa7caEIDB6un-IzHj4_p0pyML8niDq_pmNrhZ3wGLFg9txh7GRj_S6Db5w_s_Fypk81DB0TgBmi_P55w_jbrfhnQzj8MKj6hXknH7zM_KRAp3MwRTn0yfX_Sc-6lsVeR6cv2YXvwtTc8q3o37xdbhr3dwnRx4E85VoGD_0TeZzfNIMZuI8NUIVZlG09DxSEGLY7ayzaDLG2OdhzscITTceKpoauM549nZS2gfCWx2l9tcbRDbbVMoNtdeoSu8_OETm7" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-title-sm text-title-sm text-on-surface mb-2">Power Systems</h2>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow">Reliable energy. LiPo chargers, voltage regulators, and industrial power supplies.</p>
                <div className="flex items-center justify-between">
                  <span className="font-code-label text-code-label text-primary">42 Items</span>
                  <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-caption hover:opacity-90 transition-opacity">
                    Learn &amp; Shop
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bento-card group bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 relative overflow-hidden bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A collection of professional breadboards, multicolored jumper wires, and precision soldering tools arranged artistically on a clean slate work surface. The composition is clean and technical, suggesting an environment of creative engineering. Subtle glassmorphic reflections dance across the smooth surfaces. The aesthetic is modern corporate with a focus on education." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8yLVXL69MbdVTCvhDvaWJJi5lt2eJLaB903V5puTcRI41hOyJEeuUT2UpCdxHT5LJUmIIYEPrWcyw1Zb8m0u9gP2LZhsRND6K2v3lGHiW-zukwclWfZlDM835IxsbdFkE5TIX6YYoHPRb5IVMUvgk5yopRi4Od9njaHEytRu48RPVdPTJWmK61cUJyttjqWTcf3_ZHZuobE0GQ6F_kZY9dvVsVLPgFm5rRr6r6cU4slBVQX3EB838HTjI5uwd0Lj6mvx-q641VtkE" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-title-sm text-title-sm text-on-surface mb-2">Prototyping Gear</h2>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow">From breadboards to PCBs. Everything you need to go from idea to hardware reality.</p>
                <div className="flex items-center justify-between">
                  <span className="font-code-label text-code-label text-primary">210 Items</span>
                  <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-caption hover:opacity-90 transition-opacity">
                    Learn &amp; Shop
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-primary py-12 mt-16 overflow-hidden relative">
        <div className="absolute inset-0 circuit-line opacity-10"></div>
        <div className="max-w-max-width mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center relative z-10 gap-8">
          <div className="text-on-primary">
            <h2 className="font-headline-md text-headline-md mb-2">Need a custom PCB?</h2>
            <p className="font-body-lg text-body-lg opacity-80">Our precision manufacturing lab can turn your schematics into professional hardware in 48 hours.</p>
          </div>
          <button className="bg-white text-primary px-8 py-4 rounded-full font-title-sm text-title-sm hover:bg-surface-container-lowest transition-colors shadow-lg">
            Get a Quote
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
