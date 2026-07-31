import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import ProductHero from './components/ProductHero';
import ProductTabs from './components/ProductTabs';
import ProductFeatures from './components/ProductFeatures';
import RelatedProducts from './components/RelatedProducts';
import { getProduct } from '../../api/productService';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProduct(id);
        if (response.success && response.data) {
          setProduct(response.data);
          window.scrollTo(0, 0); // Scroll to top on navigation
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center">
          <h1 className="text-display-lg text-primary mb-4">Product Not Found</h1>
          <p className="text-on-surface-variant mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="text-secondary hover:underline font-bold">Return to Home</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-body-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/components" className="hover:text-primary transition-colors">Components</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-semibold">{product.category_name}</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-semibold">{product.name}</span>
        </nav>

        <ProductHero product={product} />
        <ProductTabs />
        <ProductFeatures />
        <RelatedProducts />
      </main>
    </MainLayout>
  );
}
