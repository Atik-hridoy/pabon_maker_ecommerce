import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBestSellers } from '../../../api/productService';
import { getWishlist } from '../../../api/activityService';
import { HomeProductCard } from '../../Home/components/ProductDisplay';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wishlist in parallel
        const wishlistPromise = getWishlist().catch(() => []);
        
        const res = await getBestSellers(12);
        if (res.success && res.data) {
          setProducts(res.data);
        }

        const wishRes = await wishlistPromise;
        const wishData = Array.isArray(wishRes) ? wishRes : (wishRes.data || []);
        setWishlistIds(wishData.map(item => item.id));
      } catch (err) {
        console.error("Failed to load best sellers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="mb-8">
        <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-2 uppercase">
          Top Picks
        </p>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          BEST SELLING PRODUCTS
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Products ranked by actual customer orders and verified purchases.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant font-medium">
          <span className="material-symbols-outlined text-[48px] opacity-20 mb-2 block">inventory_2</span>
          <p>No best sellers data available yet.</p>
          <p className="text-sm mt-1">Products will appear here as customers place orders.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="relative">
              {/* Rank Badge */}
              {index < 3 && (
                <div className={`absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                }`}>
                  #{index + 1}
                </div>
              )}
              <HomeProductCard 
                product={product} 
                initialWishlisted={wishlistIds.includes(product.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
