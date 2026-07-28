import React, { useState } from 'react';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <section className="mb-16">
      <div className="flex border-b border-outline-variant mb-8 overflow-x-auto scrollbar-hide">
        <button 
          className={`px-8 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'description' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={`px-8 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'specs' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
          onClick={() => setActiveTab('specs')}
        >
          Technical Specifications
        </button>
        <button 
          className={`px-8 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (128)
        </button>
      </div>

      {/* Tab Content: Description */}
      {activeTab === 'description' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn">
          <div className="space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary">Advanced Computational Performance</h3>
            <p className="text-body-base text-on-surface-variant">
              The P-Core X4-G2 Series is designed for engineers who refuse to compromise on speed or reliability. By integrating a dedicated Floating Point Unit (FPU) and Digital Signal Processing (DSP) instructions, this microcontroller excels in real-time sensor fusion, audio processing, and motor control.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-outline-variant rounded-lg part-shadow">
                <span className="material-symbols-outlined text-secondary-container mb-2">bolt</span>
                <h4 className="font-bold text-primary mb-1">Ultra-Low Power</h4>
                <p className="text-body-sm text-on-surface-variant">Dynamic voltage scaling for optimal efficiency.</p>
              </div>
              <div className="p-4 bg-white border border-outline-variant rounded-lg part-shadow">
                <span className="material-symbols-outlined text-secondary-container mb-2">security</span>
                <h4 className="font-bold text-primary mb-1">Hardened Security</h4>
                <p className="text-body-sm text-on-surface-variant">Hardware encryption engine for AES/DES/HMAC.</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video border border-outline-variant">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC63rS2ciTfUamEwueBqTXz9KjYWQRaw3Ou59fXr7bx49gVsPvm4y3wxgVaTfid8hTTJt79V1cWGSxhy8d9quTPFOD4SclibFs5bYNdb901onrdLnG6Uw0-t7XKueUdAEbISTqEgeE1YXs5DWU63on7GzH2jpnCDne-sjy4xhLqIZk7iaxN2ehqZa0DA4Ylp3SO6guBvhO68G-Ov6L4AkDEaW84_rQGtfnG2ZyVjy_uFd-5g3jGJDykBw')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
              <p className="text-white font-technical-data italic">Factory-tested for extreme thermal stability (-40°C to +85°C)</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Specs */}
      {activeTab === 'specs' && (
        <div className="animate-fadeIn">
          <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-outline-variant">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant">PARAMETER</th>
                  <th className="px-6 py-4 font-label-caps text-on-surface-variant">VALUE</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-outline-variant">
                  <td className="px-6 py-4 font-technical-data font-bold">Architecture</td>
                  <td className="px-6 py-4 text-on-surface-variant">ARM Cortex-M4 (32-bit)</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="px-6 py-4 font-technical-data font-bold">Clock Speed</td>
                  <td className="px-6 py-4 text-on-surface-variant">Up to 168 MHz</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="px-6 py-4 font-technical-data font-bold">Operating Voltage</td>
                  <td className="px-6 py-4 text-on-surface-variant">1.8V - 3.6V</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="px-6 py-4 font-technical-data font-bold">I/O Pins</td>
                  <td className="px-6 py-4 text-on-surface-variant">42 General Purpose (GPIO)</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="px-6 py-4 font-technical-data font-bold">ADC Channels</td>
                  <td className="px-6 py-4 text-on-surface-variant">16x 12-bit Channels</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-technical-data font-bold">Interface Support</td>
                  <td className="px-6 py-4 text-on-surface-variant">UART (5), SPI (3), I2C (3), CAN (2), USB OTG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Reviews */}
      {activeTab === 'reviews' && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border border-outline-variant text-center">
                <p className="text-4xl font-bold text-primary">4.9</p>
                <div className="flex justify-center text-secondary-container my-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <p className="text-body-sm text-on-surface-variant">Based on 128 verified purchases</p>
              </div>
              <button className="w-full py-3 border-2 border-primary font-bold rounded hover:bg-primary hover:text-white transition-all">Write a Review</button>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="border-b border-outline-variant pb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">Engr. Alex M.</span>
                  <span className="text-body-sm text-on-surface-variant italic">2 weeks ago</span>
                </div>
                <div className="flex text-secondary-container mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <p className="text-body-base text-on-surface-variant font-medium mb-1">Exceptional clock stability.</p>
                <p className="text-body-sm text-on-surface-variant">Using this for a custom flight controller. The DSP instructions made the PID loops much cleaner to implement. Rock solid performance even at higher temps.</p>
              </div>
              <div className="border-b border-outline-variant pb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">HardwareHacker88</span>
                  <span className="text-body-sm text-on-surface-variant italic">1 month ago</span>
                </div>
                <div className="flex text-secondary-container mb-2">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                  <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 0"}}>star</span>
                </div>
                <p className="text-body-base text-on-surface-variant font-medium mb-1">Solid for the price.</p>
                <p className="text-body-sm text-on-surface-variant">Documentation is thorough. The chip runs cool. Only wish the breakout pins were spaced slightly differently for my specific shield, but that's a minor gripe.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
