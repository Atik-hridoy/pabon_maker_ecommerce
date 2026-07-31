import React, { useState } from 'react';
import { toggleWishlist } from '../../../api/activityService';

const products = [
  {
    id: 1,
    title: "MK-Ultra V4.2 High-Speed Board",
    price: "$189.00",
    desc: "Advanced processing core for real-time robotics and AI-edge computing. Precision clocking for sub-microsecond latency.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0uNiY0MxeF2CjZfDzPekpXiqNGs2fA-4WDTAGjtjNhlZBcsomN8XgIekmbOf_eF7b87AuvgylulLGL507NaKq_uKEI8Xk3rHBRrGIr-BPeN2fDtGzv1TlWozrSFLAchAKE-Xcxqz2xIgInLtF-rvxEVx-y7GjJhsIRjyEDL6GB-0LhzoTGie2T0C07a8q8renqrYQEO34TxiFMCIbx7qIUFsGjH5BR4f5SgTrVKzZNSqigSzK7mDWXeW7gierC1UpxZuwtk99LiWF",
    badges: [
      { text: "HOT ITEM", type: "error" },
      { text: "4.9", type: "rating" }
    ],
    specs: [
      { label: "CPU Clock", value: "2.4 GHz Octa-Core" },
      { label: "Input Voltage", value: "3.3V - 12V DC" },
      { label: "I/O Ports", value: "48 GPIO Pins" },
      { label: "Memory", value: "8GB ECC RAM" }
    ]
  },
  {
    id: 2,
    title: "Nexus-7 Laser Rangefinder",
    price: "$124.50",
    desc: "Industrial-grade precision for spatial mapping and obstacle avoidance. Sapphire lens for maximum clarity.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBngh0xIswskKTd-zRBysaYcryYNxQm2GNGs-gu-ilKAMH26HFvll841KHrw9lbwn1BIjPRLXa-Ei7W00xb72GW1_pzrK73KG44ldUkTtwXbst5Yq0I_0YNKjheDySBT511ToEKfvZeh1DR2LOhtTQiX1diQvs3plRtsCqFXRXCHiCF8y9ntc1y8ZsJJN6wr3O1WergU2Pvahx_8onOYwTfRkTPGPh2OY924goGH8XS7JO_qarsg3VR8WxU6CchXGb4OMtYoB5AGmlC",
    badges: [
      { text: "BEST SELLER", type: "secondary" },
      { text: "4.8", type: "rating" }
    ],
    specs: [
      { label: "Range", value: "0.01m - 50m" },
      { label: "Accuracy", value: "±0.5mm" },
      { label: "Protocol", value: "UART / I2C / SPI" },
      { label: "Ref Rate", value: "1000 Hz" }
    ]
  },
  {
    id: 3,
    title: "Quantum DevKit: Pro Series",
    price: "$349.99",
    desc: "The ultimate starter for industrial IoT prototyping. Includes everything for full deployment.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9l2I16PKwbQCIHWCEM_sj-1JwaCbKMnf7K3aFXRyPNeHTdbg_MeeeMYb5x1QCY6GyPF3UwtfPk3ypi1wctG50eEhPfDwg4o6qrBR1WE-pwV_zcIRrlO8MG467U9l132rufFIdkloe9fpeaP47Lg4qQ4BWBbl60rkZfbe-wMGMY5RonT-KDzbWORnzYT8O0RZt8jzpkviTRvX3_dXeu_D98h3fChl4oLWeUMVeiPXYtkbx9itV8c7wcDeyn0wLwYuTIvYiZfamUOrI",
    badges: [
      { text: "LIMITED EDITION", type: "primary" },
      { text: "4.7", type: "rating" }
    ],
    specs: [
      { label: "Kit Contents", value: "42 Modular Parts" },
      { label: "Case Type", value: "IP67 Waterproof" }
    ]
  },
  {
    id: 4,
    title: "Vector-Drive Motor Controller",
    price: "$89.00",
    desc: "Dual-channel FOC motor control with thermal protection and integrated current sensing for heavy-duty robotics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwuzqRM66J3zfF05XYXf_zbVmV2nzUB8dFOrS5d0vNMCiel4EjQhASzQ0gSQPzk_czxFSLjkd1a_dKnbaGYZSIjGloBIvr_gsRnuzYYOFxqfFMAe8_NEmABNpZSDOddBWVO8mTkexAgcLegAJ656p7fZXtss0hD2nkZoq6TdtbEzDxZLT_OlNrSIUpEs8l7l1Yf68xt2N6iJc8Thr6O7mK_qvUq9dLgS19jotC-3LnEl6BgDCFyub_ge9rQVjFGAIvscvsYrxOd5rU",
    badges: [
      { text: "4.5", type: "rating" }
    ],
    specs: [
      { label: "Current", value: "60A Continuous" },
      { label: "Efficiency", value: "98.5% @ Peak" }
    ]
  }
];

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="part-card bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 bg-surface-container-low flex items-center justify-center p-8">
        <img className="max-h-full object-contain" src={product.image} alt={product.title} />
        <button 
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              await toggleWishlist(product.id);
              // For mock data, just toggle UI state
            } catch (err) {
              console.log('Failed to save to backend (likely mock data ID)', err);
            }
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-outline-variant hover:text-error transition-all shadow-sm z-10 flex items-center justify-center group/btn"
        >
          <span className="material-symbols-outlined text-[20px] group-hover/btn:text-error">favorite</span>
        </button>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badges.map((badge, idx) => {
            if (badge.type === 'rating') {
              return (
                <span key={idx} className="bg-surface-container-highest text-primary font-label-caps px-2 py-1 rounded flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {badge.text}
                </span>
              );
            }
            const colorClass = 
              badge.type === 'error' ? 'bg-error text-on-error' : 
              badge.type === 'secondary' ? 'bg-secondary-container text-on-primary' : 
              'bg-primary text-on-primary';
            return (
              <span key={idx} className={`${colorClass} font-label-caps px-2 py-1 rounded`}>
                {badge.text}
              </span>
            );
          })}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-primary">{product.title}</h3>
          <span className="font-headline-md text-secondary">{product.price}</span>
        </div>
        <p className="hidden md:block font-body-sm text-on-surface-variant mb-stack-md">{product.desc}</p>
        
        {/* Tech Specs Grid */}
        <div className="hidden md:grid grid-cols-2 gap-2 mb-stack-md">
          {product.specs.map((spec, idx) => (
            <div 
              key={idx} 
              className={`bg-surface-container-low p-2 border rounded flex flex-col transition-all duration-200 ${isHovered ? 'border-secondary-container/50 scale-[1.02]' : 'border-outline-variant scale-100'}`}
              style={{ transitionDelay: isHovered ? `${idx * 50}ms` : '0ms' }}
            >
              <span className="font-label-caps text-[10px] text-outline uppercase">{spec.label}</span>
              <span className="font-technical-data text-primary">{spec.value}</span>
            </div>
          ))}
        </div>
        <button className="hidden md:block mt-auto w-full bg-primary text-on-primary py-3 font-bold rounded group-hover:bg-secondary-container transition-colors">
          Add to Components List
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      
      {/* Sidebar Filters */}
      <aside className="md:col-span-3 space-y-stack-lg">
        <div>
          <h3 className="font-label-caps text-on-surface mb-stack-sm uppercase border-b border-outline-variant pb-2">Filter by Category</h3>
          <ul className="space-y-3 font-body-sm text-on-surface-variant">
            <li className="flex justify-between hover:text-secondary cursor-pointer"><span>MK-Series Boards</span><span className="bg-surface-container px-2 rounded">12</span></li>
            <li className="flex justify-between hover:text-secondary cursor-pointer"><span>Precision Sensors</span><span className="bg-surface-container px-2 rounded">24</span></li>
            <li className="flex justify-between hover:text-secondary cursor-pointer"><span>Development Kits</span><span className="bg-surface-container px-2 rounded">8</span></li>
            <li className="flex justify-between hover:text-secondary cursor-pointer"><span>Power Modules</span><span className="bg-surface-container px-2 rounded">15</span></li>
          </ul>
        </div>
        <div className="bg-primary-container p-6 rounded-lg text-on-primary">
          <span className="material-symbols-outlined text-secondary-container mb-2 text-4xl">verified_user</span>
          <h4 className="font-headline-md mb-2">Pabon Precision</h4>
          <p className="font-body-sm opacity-80">All best sellers undergo a 48-hour burn-in test in our specialized facility before shipping.</p>
        </div>
      </aside>

      {/* Product Cards Area */}
      <div className="md:col-span-9">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-gutter">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
