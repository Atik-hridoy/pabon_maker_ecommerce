import React from 'react';

export default function ComparisonTable() {
  return (
    <section className="mt-stack-lg border border-outline-variant rounded-xl overflow-hidden bg-surface shadow-sm">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center">
        <h2 className="font-headline-md">Side-by-Side Specifications</h2>
        <button className="text-secondary font-label-caps flex items-center gap-2">
          FULL DATA SHEET <span className="material-symbols-outlined text-sm">open_in_new</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-sm">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant uppercase font-label-caps tracking-tighter text-[11px]">
              <th className="p-4 border-b border-outline-variant">Component</th>
              <th className="p-4 border-b border-outline-variant">Architecture</th>
              <th className="p-4 border-b border-outline-variant">Max Voltage</th>
              <th className="p-4 border-b border-outline-variant">Response Time</th>
              <th className="p-4 border-b border-outline-variant">Rating</th>
            </tr>
          </thead>
          <tbody className="text-on-surface">
            <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
              <td className="p-4 font-bold">MK-Ultra V4.2</td>
              <td className="p-4 font-technical-data text-[12px]">ARM Cortex-M7</td>
              <td className="p-4 font-technical-data text-[12px]">12V DC</td>
              <td className="p-4 font-technical-data text-[12px]">&lt; 10ms</td>
              <td className="p-4"><span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded text-[11px] font-bold">4.9/5.0</span></td>
            </tr>
            <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
              <td className="p-4 font-bold">Nexus-7 Sensor</td>
              <td className="p-4 font-technical-data text-[12px]">ToF Laser Optics</td>
              <td className="p-4 font-technical-data text-[12px]">5V DC</td>
              <td className="p-4 font-technical-data text-[12px]">1ms</td>
              <td className="p-4"><span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded text-[11px] font-bold">4.8/5.0</span></td>
            </tr>
            <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
              <td className="p-4 font-bold">Vector-Drive 60</td>
              <td className="p-4 font-technical-data text-[12px]">FOC MOSFET Array</td>
              <td className="p-4 font-technical-data text-[12px]">48V DC</td>
              <td className="p-4 font-technical-data text-[12px]">0.5ms</td>
              <td className="p-4"><span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded text-[11px] font-bold">4.5/5.0</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
