import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelatedProducts() {
  const navigate = useNavigate();
  return (
    <section className="mb-24">
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-1">
          <span className="font-label-caps text-on-surface-variant tracking-widest">SYSTEM COMPLEMENTS</span>
          <h2 className="font-headline-md text-headline-md text-primary">Frequently Bought Together</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-variant transition-all">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-variant transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* Related 1 */}
        <div onClick={() => navigate('/product/pc-01')} className="bg-white border border-outline-variant rounded-xl p-6 part-shadow part-shadow-hover transition-all group flex flex-col cursor-pointer">
          <div className="aspect-square bg-surface-container-low rounded-lg mb-4 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2yZ7OUXU1cthQdp1pNngFKRXS44RnWeOg71jFN4lZeT0mO-Kvf11Gju5a1euHJJP4FxBeEEDeNnZ9FC2Kf4n4PmiAPtZkAY1cFgVPWugqr8yPI1JgmDOFeOLGXw5rIxskKPC2jeqmOKH_dl2I5Y2T_AmLJ7-LBhkr0RokPVnVgHEN8w0HyLfMyjsyS8w1dKnOOJ1G8nQ7gy1p6dZTTMcbqVjHdwOPjzpcQII67CEk6OQogWVQwusLyQ')" }}></div>
            <span className="absolute top-3 left-3 bg-primary text-white font-label-caps px-2 py-1 text-[10px] rounded">ESSENTIAL</span>
          </div>
          <h4 className="font-bold text-primary group-hover:text-secondary-container transition-colors">Ceramic Cap Pro-Series</h4>
          <p className="hidden md:block text-body-sm text-on-surface-variant mb-4">High-stability 0.1uF bypass capacitors for MCU power decoupling.</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-primary">$0.45</span>
            <button className="hidden md:block p-2 bg-surface-container hover:bg-secondary-container hover:text-white rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
        </div>
        
        {/* Related 2 */}
        <div onClick={() => navigate('/product/mc-02')} className="bg-white border border-outline-variant rounded-xl p-6 part-shadow part-shadow-hover transition-all group flex flex-col cursor-pointer">
          <div className="aspect-square bg-surface-container-low rounded-lg mb-4 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3k8boZqT_RIZSqffusmEvZhgZ0JsEkLZfc1zzC3B0BhrlqQLZ6qgwfn8RrZazPNWxXR9fY6oaG5brvmDIFr9cAPUMbEpPXff4PirscPnl3R2QO-30edUk7ZKYdqpsj6iYVxIjKVfHaU3R_ETTR8YvhwgyShzA4CWkJ30shntIStj20vWgWhUDQl1r808lDm_14H26-e1b25bux-Rc6zkvFIsjqDegNOqpLOPZG5eEzmavl0L9exPIQ')" }}></div>
          </div>
          <h4 className="font-bold text-primary group-hover:text-secondary-container transition-colors">Fast-Gate Hex Inverter</h4>
          <p className="hidden md:block text-body-sm text-on-surface-variant mb-4">High-speed 74LVC series logic for signal conditioning and level shifting.</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-primary">$1.85</span>
            <button className="hidden md:block p-2 bg-surface-container hover:bg-secondary-container hover:text-white rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
        </div>
        
        {/* Related 3 */}
        <div onClick={() => navigate('/product/ps-02')} className="bg-white border border-outline-variant rounded-xl p-6 part-shadow part-shadow-hover transition-all group flex flex-col cursor-pointer">
          <div className="aspect-square bg-surface-container-low rounded-lg mb-4 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI1Ln5G3l1lM0tnYxg73-xoumoMfifGxErAHA0RreETaC2k_psOb3b2wE1TDoxwZIXTJL5BsYUlY9481U6O5UgVuGTfILU403U1eWf96XdaX6BC8jVGj6J51E_V30ph9JXmzpwI8bfNdhS2qSgpncLNsLlbxGjtgZgeFbWJZ2Di6ylgIua2mf4csMvCfyw0m8o_SBL5iLyLU6lpq2s941tqDEku4mw3BiDgeLHcurzhe2YRfDhbfWYqQ')" }}></div>
            <span className="absolute top-3 left-3 bg-secondary-container text-white font-label-caps px-2 py-1 text-[10px] rounded">POWER</span>
          </div>
          <h4 className="font-bold text-primary group-hover:text-secondary-container transition-colors">N-Channel Power FET</h4>
          <p className="hidden md:block text-body-sm text-on-surface-variant mb-4">30V 50A Logic-level gate drive optimized for MCU PWM control.</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-primary">$3.20</span>
            <button className="hidden md:block p-2 bg-surface-container hover:bg-secondary-container hover:text-white rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
