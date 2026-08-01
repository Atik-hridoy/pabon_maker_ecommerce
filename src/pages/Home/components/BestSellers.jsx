import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import { getPublicProducts } from '../../../api/productService';
import { getWishlist } from '../../../api/activityService';
import { storage } from '../../../utils/localStorage';

export default function BestSellers() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getPublicProducts(1);
        if (response.success && response.data) {
          // Take first 6 products
          setProducts(response.data.results.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to fetch best sellers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!storage.isLoggedIn()) return;
      try {
        const res = await getWishlist();
        const data = Array.isArray(res) ? res : (res.data || []);
        setWishlistIds(data.map(item => item.id));
      } catch (e) {
        console.error("Failed to fetch wishlist", e);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-2 uppercase">Trending Hardware</p>
            <h2 className="font-headline-md text-headline-md text-on-surface">BEST SELLERS</h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 border border-outline-variant flex items-center justify-center rounded hover:border-secondary transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="w-10 h-10 border border-outline-variant flex items-center justify-center rounded hover:border-secondary transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
             <span className="material-symbols-outlined animate-spin text-[32px] text-secondary">progress_activity</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                initialWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
