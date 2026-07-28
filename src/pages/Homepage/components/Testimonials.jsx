import React from 'react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-md text-headline-md text-on-surface text-center mb-16">TRUSTED BY INDUSTRY PROFESSIONALS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-surface p-8 border border-outline-variant relative">
            <div className="flex text-secondary-container mb-4">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-body-base text-on-surface-variant italic mb-8">"The shipping speed to our lab was incredible. More importantly, the documentation and technical support for their IoT modules made integration seamless."</p>
            <div>
              <p className="font-bold text-on-surface">Dr. Elena Rodriguez</p>
              <p className="text-body-sm text-outline">Lead Systems Engineer, NexaLabs</p>
            </div>
          </div>
          
          <div className="bg-surface p-8 border border-outline-variant relative">
            <div className="flex text-secondary-container mb-4">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-body-base text-on-surface-variant italic mb-8">"CIRCUITWORLD has become our go-to source for high-precision sensors. The quality control is consistent, which is vital for our aerospace prototyping."</p>
            <div>
              <p className="font-bold text-on-surface">Mark J. Henderson</p>
              <p className="text-body-sm text-outline">Principal Architect, AeroSystems</p>
            </div>
          </div>
          
          <div className="bg-surface p-8 border border-outline-variant relative">
            <div className="flex text-secondary-container mb-4">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-body-base text-on-surface-variant italic mb-8">"Outstanding selection of microcontrollers. The prices are competitive, but the real value is in the reliability of every component we've ordered."</p>
            <div>
              <p className="font-bold text-on-surface">Sarah T. Chen</p>
              <p className="text-body-sm text-outline">Independent Robotics Designer</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
