import React from 'react';
import { Link } from 'react-router-dom';

export default function OrdersTab() {
  return (
    <>
      {/* Account Overview Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-outline-variant shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img alt="Aris Pabon" className="w-24 h-24 rounded-full border-4 border-surface-container shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-on-surface">Aris Pabon</h2>
            <p className="text-base text-on-surface-variant">aris.pabon@circuitworld.tech</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-primary-container text-white text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">stars</span> PRO MEMBER
              </span>
              <span className="px-3 py-1 bg-surface-container text-on-surface text-[10px] font-bold uppercase tracking-wider rounded-full border border-outline-variant">
                Since Oct 2022
              </span>
            </div>
          </div>
        </div>

        <div className="bg-primary-container p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-primary-fixed-dim uppercase mb-1 tracking-wider">Available Lab Credits</div>
            <div className="text-[32px] font-black text-white">2,450.00 CC</div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-medium text-on-primary-container">Next renewal: June 1st</span>
            <button className="text-secondary-fixed-dim font-bold text-sm hover:underline tracking-wider">RELOAD</button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: My Orders */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">My Recent Orders</h3>
              <select className="text-sm font-medium border-none bg-transparent focus:ring-0 text-secondary cursor-pointer">
                <option>Last 3 months</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Order #</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Order Date</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Status</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Items</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 border-b border-outline-variant font-bold">#ORD-28491</td>
                    <td className="py-3 px-4 border-b border-outline-variant">May 14, 2024</td>
                    <td className="py-3 px-4 border-b border-outline-variant">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-container/10 text-secondary font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                        IN TRANSIT
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-outline-variant text-on-surface-variant">Titan-X Shield (x1), Logic Array (x2)</td>
                    <td className="py-3 px-4 border-b border-outline-variant whitespace-nowrap">
                      <div className="flex gap-3">
                        <button className="text-secondary hover:underline font-bold text-xs tracking-wider">TRACK</button>
                        <button className="text-outline hover:text-on-surface font-bold text-xs tracking-wider">DETAILS</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 border-b border-outline-variant font-bold">#ORD-27902</td>
                    <td className="py-3 px-4 border-b border-outline-variant">May 02, 2024</td>
                    <td className="py-3 px-4 border-b border-outline-variant">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-green-700 font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        DELIVERED
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-outline-variant text-on-surface-variant">Precision Potentiometer Kit</td>
                    <td className="py-3 px-4 border-b border-outline-variant whitespace-nowrap">
                      <div className="flex gap-3">
                        <button className="text-secondary hover:underline font-bold text-xs tracking-wider">REORDER</button>
                        <button className="text-outline hover:text-on-surface font-bold text-xs tracking-wider">INVOICE</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 border-b border-outline-variant font-bold">#ORD-26554</td>
                    <td className="py-3 px-4 border-b border-outline-variant">Apr 18, 2024</td>
                    <td className="py-3 px-4 border-b border-outline-variant">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-green-700 font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        DELIVERED
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-outline-variant text-on-surface-variant">ARM Cortex-M4 Module</td>
                    <td className="py-3 px-4 border-b border-outline-variant whitespace-nowrap">
                      <div className="flex gap-3">
                        <button className="text-secondary hover:underline font-bold text-xs tracking-wider">REORDER</button>
                        <button className="text-outline hover:text-on-surface font-bold text-xs tracking-wider">INVOICE</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 border-b border-outline-variant font-bold">#ORD-25110</td>
                    <td className="py-3 px-4 border-b border-outline-variant">Mar 30, 2024</td>
                    <td className="py-3 px-4 border-b border-outline-variant">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-outline/10 text-on-surface-variant font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                        RETURNED
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-outline-variant text-on-surface-variant">XC-701 Micro-Controller (Defective)</td>
                    <td className="py-3 px-4 border-b border-outline-variant whitespace-nowrap">
                      <div className="flex gap-3">
                        <button className="text-outline hover:text-on-surface font-bold text-xs tracking-wider">SUPPORT</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-outline-variant bg-surface text-center">
              <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors tracking-wider">VIEW ALL PAST ORDERS</button>
            </div>
          </section>
        </div>

        {/* Right: Recently Viewed Items */}
        <div className="space-y-6">
          <section className="bg-white rounded-lg border border-outline-variant shadow-sm flex flex-col h-full">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
              <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Recently Viewed Items</h3>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[600px]">
              {/* Product Item */}
              <div className="flex gap-4 p-3 border border-outline-variant rounded hover:border-secondary hover:bg-surface transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary">memory</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface text-sm">XC-701 Micro-Controller</h4>
                  <div className="text-[11px] text-on-surface-variant">v4.2 | 48-Pin QFP</div>
                  <div className="mt-1 font-bold text-secondary text-sm">45.00 CC</div>
                </div>
              </div>
              {/* Product Item */}
              <div className="flex gap-4 p-3 border border-outline-variant rounded hover:border-secondary hover:bg-surface transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary">layers</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface text-sm">Logic Array Layout v1.9</h4>
                  <div className="text-[11px] text-on-surface-variant">4-Layer Stackup Module</div>
                  <div className="mt-1 font-bold text-secondary text-sm">120.00 CC</div>
                </div>
              </div>
              {/* Product Item */}
              <div className="flex gap-4 p-3 border border-outline-variant rounded hover:border-secondary hover:bg-surface transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary">developer_board</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface text-sm">ARM Cortex-M4 Module</h4>
                  <div className="text-[11px] text-on-surface-variant">High Speed dev kit</div>
                  <div className="mt-1 font-bold text-secondary text-sm">89.00 CC</div>
                </div>
              </div>
              {/* Shop more */}
              <div className="pt-2">
                <Link to="/" className="w-full py-3 border-2 border-dashed border-outline-variant rounded text-on-surface-variant hover:text-secondary hover:border-secondary font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">shopping_cart</span> BROWSE CATALOG
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
