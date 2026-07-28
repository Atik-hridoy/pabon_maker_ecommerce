import React from 'react';

export default function SupportCTA() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
      <div className="bg-primary-container rounded-lg p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="z-10 text-center md:text-left">
          <h2 className="font-headline-md text-headline-md text-on-primary mb-2">Can't find a specific component?</h2>
          <p className="text-on-primary-container font-body-base text-body-base max-w-lg">
            Our engineering team can source custom hardware and volume-order components for enterprise projects.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
          <button className="bg-secondary-container text-white px-8 py-3 font-bold rounded active:scale-95 transition-all font-body-base text-body-base whitespace-nowrap hover:opacity-90">
            REQUEST QUOTE
          </button>
          <button className="border border-outline-variant text-on-primary px-8 py-3 font-bold rounded hover:bg-on-primary/10 transition-all font-body-base text-body-base whitespace-nowrap">
            CONTACT SUPPORT
          </button>
        </div>
      </div>
    </section>
  );
}
