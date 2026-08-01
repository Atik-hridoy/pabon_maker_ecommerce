import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { getPublicProducts } from '../../../api/productService';
import { toggleWishlist, getWishlist } from '../../../api/activityService';
import { BASE_URL, getImageUrl } from '../../../api/client';
import { cartService } from '../../../utils/cartService';
import { storage } from '../../../utils/localStorage';

export function HomeProductCard({ product, initialWishlisted = false }) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const coverImage = product.images?.find(img => img.is_cover)?.image || product.images?.[0]?.image;
  
  useEffect(() => {
    setIsWishlisted(initialWishlisted);
  }, [initialWishlisted]);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!storage.isLoggedIn()) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }
    try {
      await toggleWishlist(product.id);
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Failed to toggle wishlist', error);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setIsAddingToCart(true);
    cartService.addToCart(product, 1);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card-hover group border border-outline-variant p-4 transition-all bg-white relative block cursor-pointer rounded-lg flex flex-col"
    >
      {/* Product Image */}
      <div className="relative h-32 mb-4 overflow-hidden flex items-center justify-center p-2 bg-surface-container-lowest rounded">
        {coverImage ? (
          <img 
            src={getImageUrl(coverImage)}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
        )}
        
        <button 
          onClick={handleWishlistClick}
          className="absolute top-1 right-1 p-1.5 rounded-full bg-white/80 hover:bg-white text-outline-variant hover:text-error transition-all shadow-sm z-10 flex items-center justify-center"
        >
          <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'text-error fill-current font-variation-fill' : ''}`} style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}>
            favorite
          </span>
        </button>
      </div>

      {/* Product Details */}
      <div className="space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-on-surface line-clamp-2">{product.name}</h3>
          <p className="hidden md:block text-xs text-on-surface-variant line-clamp-1">{product.description}</p>
        </div>
        
        {/* Price & Cart */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm text-on-surface">
              ৳ {product.price}
            </span>
          </div>
          <button 
            disabled={isAddingToCart}
            className={`flex p-1.5 rounded-lg transition-all items-center justify-center active:scale-95 ${isAddingToCart ? 'bg-green-600 text-white' : 'bg-surface-container text-on-surface hover:bg-secondary-container hover:text-white'}`}
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">{isAddingToCart ? 'check_circle' : 'shopping_cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDisplay({ selectedCategory }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
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

  // Reset when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (loading || !hasMore) return;
      
      try {
        setLoading(true);
        const response = await getPublicProducts(page, selectedCategory);
        if (response.success && response.data) {
          const newProducts = response.data.results || [];
          setProducts(prev => {
            // Avoid duplicates by checking IDs
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));
            return [...prev, ...uniqueNew];
          });
          setHasMore(response.data.next !== null);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory]);

  const gridRef = useRef(null);

  useEffect(() => {
    if (products.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-grid-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          once: true,
        },
        y: 20,
        opacity: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: "power2.out"
      });
    }, gridRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section className="py-6 md:py-12 bg-white min-h-[300px] overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="mb-4 md:mb-8">
          <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-1 uppercase">
            {selectedCategory ? 'Filtered Products' : 'All Products'}
          </p>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {selectedCategory || 'FEATURED COMPONENTS'}
          </h2>
        </div>

        {products.length === 0 && !loading ? (
          <div className="text-center py-20 text-on-surface-variant font-medium">
            No products found for this category.
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {products.map((product) => (
              <div key={product.id} className="product-grid-card">
                <HomeProductCard 
                  product={product} 
                  initialWishlisted={wishlistIds.includes(product.id)}
                />
              </div>
            ))}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          </div>
        )}

        {!loading && hasMore && products.length > 0 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setPage(prev => prev + 1)}
              className="px-6 py-3 border border-outline-variant text-on-surface font-label-caps tracking-widest text-[12px] uppercase rounded-full hover:bg-surface transition-all hover:border-secondary"
            >
              Load More
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
}
