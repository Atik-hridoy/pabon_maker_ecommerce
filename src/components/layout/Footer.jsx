import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <a className="font-display-lg-mobile text-display-lg-mobile text-on-primary font-black tracking-tighter" href="#">
            <img src="https://lh3.googleusercontent.com/aida/AP1WRLtbjd3JvAlcFvA5h5MHPfo1G2ERzqVmwDwWoKK0FnfYfHrp5nIfWkoC7y1XHwbfPNKQIl63vHHYDx7NIqExKMBweOxsXgtH0XtL6gQMCOciQHm529whq9F8ySG5RrxNQCvlPjMFviBnQ5XHnRwTKo50zHK3s2d-R9PLFrVl33AkyhrfRGuMjbAeyV1Xz10JYGm3zbVbEZHnyD8XYbmpQsUasrXL8JEPy_6xNK42hcQ4dU3fTBHo2TaeAPc" alt="Pabon Maker Logo" className="h-8 md:h-10 w-auto object-contain" />
          </a>
          <p className="text-on-primary-container font-body-sm text-body-sm max-w-md">Precision Engineering for Pabon Maker. Global supplier of premium electronics components and development tools.</p>
          <div className="flex gap-4">
            <a className="text-on-primary-container hover:text-secondary-container transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-on-primary-container hover:text-secondary-container transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-widest">Shop</p>
          <ul className="space-y-2">
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Microcontrollers</a></li>
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Sensors</a></li>
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Robotics</a></li>
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Sale Items</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <p className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-widest">Support</p>
          <ul className="space-y-2">
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Datasheets</a></li>
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Shipping Policy</a></li>
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Expert Consultation</a></li>
            <li><a className="text-on-primary-container hover:text-secondary-container transition-colors font-body-sm text-body-sm" href="#">Help Center</a></li>
          </ul>
        </div>
      </div>
      
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
        <div className="max-w-md space-y-4">
          <p className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-widest">Newsletter</p>
          <p className="text-on-primary-container font-body-sm text-body-sm">Stay updated with new component releases.</p>
          <form className="flex">
            <input className="bg-surface-container-low/10 border border-outline-variant/30 text-white px-4 py-2 w-full focus:ring-1 focus:ring-secondary-container outline-none text-sm" placeholder="Email Address" type="email" />
            <button className="bg-secondary-container text-white px-4 py-2 font-bold hover:opacity-90 transition-opacity flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
      
      <div className="border-t border-outline-variant/10 py-6 text-center">
        <p className="text-on-primary-container font-body-sm text-body-sm px-margin-mobile">© 2024 Pabon Maker. All rights reserved. Precision Engineering for Makers.</p>
      </div>
    </footer>
  );
}
