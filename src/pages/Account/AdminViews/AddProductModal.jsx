import React, { useState, useEffect } from 'react';
import { getCategories } from '../../../api/productService';

export default function AddProductModal({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category?.id || initialData?.category || '',
    price: initialData?.price || '',
    stock: initialData?.stock_count || initialData?.stock || '',
    description: initialData?.description || ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category?.id || initialData.category || '',
        price: initialData.price || '',
        stock: initialData.stock_count || initialData.stock || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCats();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Combine with existing images
    const newImages = [...images, ...files];
    
    if (newImages.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }
    
    setError('');
    setImages(newImages);
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    
    const updatedPreviews = [...imagePreviews];
    URL.revokeObjectURL(updatedPreviews[index]); // Free memory
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (images.length < 2) {
      setError('Please upload at least 2 images.');
      return;
    }

    if (images.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }

    if (!formData.category) {
      setError('Please select a category.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData to send both text and files
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('description', formData.description);
      
      images.forEach((img, idx) => {
        data.append(`images`, img);
      });

      // Pass the form data back to parent
      await onSave(data, formData, imagePreviews[0]);
    } catch (err) {
      console.error(err);
      setError('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-2xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-on-surface">Add New Product</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {error && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container rounded border border-error/20 text-sm font-medium">
              {error}
            </div>
          )}

          <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm"
                  placeholder="e.g. 1000W Pure Sine Wave IPS"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category *</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => {
                    const catValue = typeof cat === 'object' ? (cat.id || cat.name) : cat;
                    const catLabel = typeof cat === 'object' ? (cat.name || cat.title || cat) : cat;
                    return (
                      <option key={idx} value={catValue}>{catLabel}</option>
                    );
                  })}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Price (৳) *</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm"
                  placeholder="e.g. 5500"
                />
              </div>

              {/* Stock Count */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Stock Count *</label>
                <input 
                  type="number" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleChange} 
                  required
                  min="0"
                  step="1"
                  className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm"
                  placeholder="e.g. 100"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Description *</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required
                rows="4"
                className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm resize-y"
                placeholder="Detailed product features and specifications..."
              ></textarea>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center justify-between">
                <span>Product Images * (Min: 2, Max: 5)</span>
                <span className="text-primary font-medium">{images.length}/5</span>
              </label>
              
              <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 bg-surface-container-lowest text-center">
                <input 
                  type="file" 
                  id="product-images"
                  multiple 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 5}
                />
                
                <label 
                  htmlFor="product-images" 
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    images.length >= 5 
                      ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' 
                      : 'bg-secondary text-white hover:bg-secondary-container cursor-pointer'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">upload</span>
                  {images.length >= 5 ? 'Max images reached' : 'Browse Images'}
                </label>
                <p className="text-xs text-on-surface-variant mt-3">Upload high quality images (JPEG, PNG). First image will be the cover.</p>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-md overflow-hidden border border-outline-variant aspect-square bg-white">
                      <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button" 
                          onClick={() => removeImage(idx)}
                          className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:bg-red-700"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      {idx === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-secondary/90 text-white text-[9px] font-bold text-center py-0.5 uppercase tracking-wider">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low flex justify-end gap-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded font-bold text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-product-form"
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded font-bold text-sm text-white flex items-center gap-2 transition-colors ${
              isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-container'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                Create Product
              </>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}
