import React, { useState, useEffect } from 'react';
import { getRecommendations, getWishlist } from '../../../api/activityService';
import { HomeProductCard } from './ProductDisplay';

export default function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recRes, wishRes] = await Promise.all([
          getRecommendations(),
          getWishlist()
        ]);
        
        if (Array.isArray(recRes)) {
          setProducts(recRes);
        } else if (recRes.data && Array.isArray(recRes.data)) {
          setProducts(recRes.data);
        }
        
        const wishData = Array.isArray(wishRes) ? wishRes : (wishRes.data || []);
        setWishlistIds(wishData.map(item => item.id));
      } catch (err) {
        console.error("Failed to load recommendations", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return null;
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-2 uppercase">
              Based on your activity
            </p>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              RECOMMENDED FOR YOU
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <HomeProductCard 
              key={product.id} 
              product={product} 
              initialWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
