import React, { useState, useEffect, useRef } from 'react';
import { getRecommendations, getWishlist } from '../../../api/activityService';
import { HomeProductCard } from './ProductDisplay';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".rec-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true
        },
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  if (loading) return null;
  if (!products || products.length === 0) return null;

  return (
    <section ref={containerRef} className="py-6 md:py-12 bg-surface-container-lowest border-t border-outline-variant/30 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-4 md:mb-8 flex items-center justify-between">
          <div>
            <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-1 uppercase">
              Based on your activity
            </p>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              RECOMMENDED FOR YOU
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <div key={product.id} className="rec-card">
              <HomeProductCard 
                product={product} 
                initialWishlisted={wishlistIds.includes(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
