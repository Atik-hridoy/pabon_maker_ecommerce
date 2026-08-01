import React, { useState } from 'react';

export default function AddCategoryModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name) {
      setError('Category name is required.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      if (formData.description) {
        data.append('description', formData.description);
      }
      if (image) {
        data.append('image', image);
      }

      await onSave(data);
    } catch (err) {
      console.error(err);
      setError('Failed to create category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-lg rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-on-surface">Add New Category</h2>
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

          <form id="add-category-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm"
                placeholder="e.g. Cricket"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="3"
                className="w-full px-4 py-2 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm resize-none"
                placeholder="Category description..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category Image</label>
              
              {imagePreview ? (
                <div className="relative border-2 border-outline-variant border-dashed rounded-lg p-2 flex justify-center bg-surface-container-lowest">
                  <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded" />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-error text-on-error rounded-full flex items-center justify-center hover:bg-error/90 transition-colors shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              ) : (
                <label className="border-2 border-outline-variant border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-lowest transition-colors group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary">image</span>
                  </div>
                  <span className="text-sm font-medium text-on-surface mb-1">Click to upload image</span>
                  <span className="text-xs text-on-surface-variant">PNG, JPG, WEBP up to 2MB</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full font-bold text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="add-category-form"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-full font-bold text-sm bg-primary text-on-primary hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Save Category</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
