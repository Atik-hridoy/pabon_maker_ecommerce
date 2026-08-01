import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../api/client';
import { toggleWishlist, getWishlist } from '../../../api/activityService';
import { cartService } from '../../../utils/cartService';
import { storage } from '../../../utils/localStorage';

import ProductCard from '../../../components/ProductCard';

export default function CategoryProductGrid({ products }) {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
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

  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 bg-surface rounded-lg border border-outline-variant border-dashed">
        <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">search_off</span>
        <h3 className="font-bold text-lg text-on-surface mb-2">No products found</h3>
        <p className="text-sm text-on-surface-variant">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            initialWishlisted={wishlistIds.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
