import React, { useState, useEffect } from 'react';
import { getProductReviews, submitProductReview } from '../../../api/productService';
import { storage } from '../../../utils/localStorage';

export default function ProductTabs({ product }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product?.id) return;
    
    const fetchReviews = async () => {
      try {
        const res = await getProductReviews(product.id);
        if (res.success && res.data) {
          setReviews(res.data);
        }
      } catch (e) {
        console.error("Failed to load reviews", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [product?.id]);

  if (!product) return null;

  const avgRating = product.average_rating || 0;
  const reviewCount = product.reviews_count || 0;

  return (
    <section className="mb-16">
      <h3 className="font-headline-md text-headline-md text-primary border-b border-outline-variant pb-4 mb-8">
        Reviews ({reviewCount})
      </h3>
      
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Rating Summary */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-outline-variant text-center">
              <p className="text-4xl font-bold text-primary">{avgRating.toFixed(1)}</p>
              <div className="flex justify-center text-secondary-container my-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: i < Math.round(avgRating) ? "'FILL' 1" : "'FILL' 0"}}>
                    star
                  </span>
                ))}
              </div>
              <p className="text-body-sm text-on-surface-variant">Based on {reviewCount} verified purchases</p>
            </div>
          </div>
          
          {/* Right Column: Review List */}
          <div className="md:col-span-2 space-y-6">
            {loading ? (
              <p className="text-on-surface-variant">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-on-surface-variant">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="border-b border-outline-variant pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{review.user_name || 'Anonymous User'}</span>
                    <span className="text-body-sm text-on-surface-variant italic">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex text-secondary-container mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0"}}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-body-sm text-on-surface-variant whitespace-pre-wrap">{review.comment}</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
