import React, { useState } from 'react';

export default function AddBannerModal({ onClose, onSave }) {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Combine with existing images
    const newImages = [...images, ...files];
    
    if (newImages.length > 8) {
      setError('You can upload a maximum of 8 banner images.');
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
    
    if (images.length < 3) {
      setError('Please upload at least 3 banner images.');
      return;
    }

    if (images.length > 8) {
      setError('You can upload a maximum of 8 banner images.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      images.forEach((img) => {
        data.append(`images`, img);
      });

      await onSave(data);
    } catch (err) {
      console.error(err);
      setError('Failed to upload banners. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-2xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-on-surface">Manage Home Banners</h2>
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
          
          <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex gap-3 items-start border border-blue-100">
            <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
            <div>
              <p className="font-bold mb-1">Banner Upload Rules:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Upload minimum 3 and maximum 8 images.</li>
                <li>Recommended aspect ratio: 16:9 or similar wide format.</li>
                <li>These images will completely replace the current home page hero banner.</li>
              </ul>
            </div>
          </div>

          <form id="add-banner-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Images */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center justify-between">
                <span>Upload Banners (Min: 3, Max: 8) *</span>
                <span className="text-primary font-medium">{images.length}/8</span>
              </label>
              
              <div className="border-2 border-dashed border-outline-variant rounded-lg p-8 bg-surface-container-lowest text-center">
                <input 
                  type="file" 
                  id="banner-images"
                  multiple 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 8}
                />
                
                <label 
                  htmlFor="banner-images" 
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                    images.length >= 8 
                      ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' 
                      : 'bg-secondary text-white hover:bg-secondary-container cursor-pointer shadow-md active:scale-95'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                  {images.length >= 8 ? 'Max images reached' : 'Select Banner Images'}
                </label>
                <p className="text-xs text-on-surface-variant mt-3">Supports high quality JPEG, PNG, WEBP</p>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-outline-variant aspect-[21/9] bg-surface-container flex items-center justify-center">
                      <img src={src} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <button 
                          type="button" 
                          onClick={() => removeImage(idx)}
                          className="w-10 h-10 bg-error text-white rounded-full flex items-center justify-center hover:bg-red-700 shadow-lg transform hover:scale-110 transition-transform"
                          title="Remove Banner"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                        Banner {idx + 1}
                      </div>
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
            className="px-6 py-2.5 rounded-lg font-bold text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-banner-form"
            disabled={isSubmitting}
            className={`px-8 py-2.5 rounded-lg font-bold text-sm text-white flex items-center gap-2 transition-all shadow-md ${
              isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-container active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                Uploading...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">publish</span>
                Publish Banners
              </>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}
