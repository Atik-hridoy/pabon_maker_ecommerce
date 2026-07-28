import React from 'react';

export default function ProductHero({ product }) {
  if (!product) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mb-16">
      {/* Left: Image Gallery */}
      <div className="lg:col-span-6 flex flex-col md:flex-row gap-4">
        <div className="flex md:flex-col order-2 md:order-1 gap-4 overflow-x-auto scrollbar-hide md:w-20">
          <button className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 border-secondary-container rounded-lg overflow-hidden bg-white p-2">
            <img className="w-full h-full object-contain" alt={product.title} src={product.image} />
          </button>
          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border border-outline-variant rounded-lg overflow-hidden bg-white hover:border-secondary-container transition-all cursor-pointer">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4OltapEz9aQPpJANGChIDgiXqwfph0QmapNAE06-oy8MQzNO8AmffqNpfWiVAGH4XLidaOziNks8Kb6dKeC96YJhiH8sSkWeFNZoPCOq0X8Bc8yJ60XNFbKD5dNHnWnla2hsXmAfRKK0Rp26XlvhWdl1o3hpoi44VYy7ik9A7Wf8mzXEFlpp0Y6xe4tSGbhFjO6EAUJv5PkFHFEQhGslnv9-W-GgcsLtkz0rd9ouyCLjE3kDRpTwwaA')" }}></div>
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border border-outline-variant rounded-lg overflow-hidden bg-white hover:border-secondary-container transition-all cursor-pointer">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDv-lIBmfghywO8A39jcwhuBZeE5-Eng7oFOlvwDiU2_Ld5DkQv9_O6j72IJFteRZu53m0gi1O0RbEvVwHsNmqt1EcAoetFL9-HmIMwrxgV-pnY8uA2cjs5CHFYB1GYVVwfo1qcEEC2PhlbIOKAxEwyFCjZ6gwOCR3Khge-7iVwJ7KQM0Bj2g92uE0IqCdCq-3CX9Pz6aCewFPc1i78UTo1KK7N6EpMZaZPQKJaFJiAutvJhWjaNVUKGg')" }}></div>
          </div>
        </div>
        <div className="flex-grow order-1 md:order-2 bg-white rounded-xl border border-outline-variant p-8 flex items-center justify-center part-shadow min-h-[400px]">
          <img className="max-w-full max-h-[500px] object-contain" alt={product.title} src={product.image} />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="font-label-caps text-secondary-container tracking-widest mb-2 block uppercase">{product.category}</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight mb-2">{product.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex text-secondary-container">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: i < product.rating ? "'FILL' 1" : "'FILL' 0"}}>
                  star
                </span>
              ))}
            </div>
            <span className="text-body-sm text-on-surface-variant font-medium">({product.reviews} reviews)</span>
            <span className="w-[1px] h-4 bg-outline-variant mx-2"></span>
            <span className="text-body-sm font-technical-data text-green-600 flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">check_circle</span> In Stock - Ready to Ship
            </span>
          </div>
        </div>
        
        <div className="bg-surface-container-low p-6 rounded-lg space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-headline-md font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-body-sm text-on-surface-variant">/ unit</span>
            {product.isSale && product.oldPrice && (
              <span className="text-outline line-through text-body-sm ml-2">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1">10+ UNITS</p>
              <p className="font-bold text-primary">${(product.price * 0.95).toFixed(2)} ea.</p>
            </div>
            <div className="bg-white p-3 rounded border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1">50+ UNITS</p>
              <p className="font-bold text-primary">${(product.price * 0.85).toFixed(2)} ea.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-body-base text-on-surface-variant">{product.description}</p>
          <ul className="grid grid-cols-2 gap-y-2 text-technical-data text-on-surface">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span> High Performance Core</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span> Extended Temp Range</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span> Industry Standard</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span> Multiple Interfaces</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-outline-variant">
          <div className="mb-4">
            <label className="font-label-caps text-on-surface-variant block mb-2">COLOR</label>
            <div className="flex gap-3">
              <button className="w-8 h-8 rounded-full bg-[#00504f] border-2 border-primary ring-2 ring-offset-2 ring-primary transition-all" title="Industrial Blue"></button>
              <button className="w-8 h-8 rounded-full bg-[#2b3137] border-2 border-outline-variant hover:border-primary transition-all" title="Deep Charcoal"></button>
              <button className="w-8 h-8 rounded-full bg-[#fe6b00] border-2 border-outline-variant hover:border-primary transition-all" title="Signal Orange"></button>
            </div>
          </div>
          <div>
            <label className="font-label-caps text-on-surface-variant block mb-2">HEADER TYPE</label>
            <div className="flex gap-3">
              <button className="px-6 py-2 border-2 border-primary bg-primary text-white font-semibold rounded transition-all">Pre-soldered</button>
              <button className="px-6 py-2 border-2 border-outline hover:border-primary font-semibold rounded transition-all">Unsoldered</button>
            </div>
          </div>
          <div className="flex gap-4 items-end pt-4">
            <div className="w-32">
              <label className="font-label-caps text-on-surface-variant block mb-2">QUANTITY</label>
              <div className="flex items-center border border-outline rounded bg-white">
                <button className="px-3 py-2 hover:bg-surface-variant">-</button>
                <input className="w-full text-center border-none focus:ring-0 text-body-base font-bold" type="number" defaultValue="1" />
                <button className="px-3 py-2 hover:bg-surface-variant">+</button>
              </div>
            </div>
            <button className="flex-grow bg-secondary-container hover:opacity-90 text-white font-bold py-4 rounded shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">shopping_cart</span>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
