import React, { useState, useEffect } from 'react';
import { storage } from '../../../utils/localStorage';

export default function ProfileTab() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingAddress: ''
  });
  const [avatarPreview, setAvatarPreview] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = storage.getToken();
      if (!token) return;
      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success && data.data) {
          setFormData({
            firstName: data.data.first_name || '',
            lastName: data.data.last_name || '',
            email: data.data.email || '',
            phone: data.data.phone_number || '',
            shippingAddress: data.data.shipping_address || ''
          });
          if (data.data.avatar) {
            setAvatarPreview(data.data.avatar);
          }
        } else if (data.errors && data.errors.code === 'token_not_valid') {
          storage.clearAuth();
          alert("Session expired. Please login first.");
          window.location.reload();
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const token = storage.getToken();
      if (!token) {
        alert("Please login first.");
        return;
      }
      const uploadData = new FormData();
      uploadData.append('avatar', file);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: uploadData
        });
        
        const data = await response.json();
        if (!data.success) {
            if (data.errors && data.errors.code === 'token_not_valid') {
              storage.clearAuth();
              alert("Session expired. Please login first.");
              window.location.reload();
            } else {
              console.error("Backend Rejected Avatar Upload:", data);
              alert("Failed to upload avatar: " + JSON.stringify(data.errors));
            }
        } else {
            console.log("Avatar uploaded successfully!", data);
            if (data.data.avatar) {
                setAvatarPreview(data.data.avatar);
            }
        }
      } catch (err) {
        console.error("Failed to upload avatar", err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const token = storage.getToken();
    if (!token) {
      setErrorMsg("You are not logged in or session expired.");
      return;
    }
    
    setIsSaving(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone
        })
      });
      const data = await response.json();
      if (data.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        if (data.errors && data.errors.code === 'token_not_valid') {
          storage.clearAuth();
          alert("Session expired. Please login first.");
          window.location.reload();
        } else {
          setErrorMsg(data.message || "Failed to update profile.");
        }
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      setErrorMsg("Network error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary text-[20px]">person</span>
        <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Profile Information</h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center gap-4">
            <img alt="Aris Pabon" className="w-32 h-32 rounded-full border-4 border-surface-container shadow-inner object-cover" src={avatarPreview} />
            <label className="px-4 py-2 bg-surface-container text-on-surface font-bold text-xs uppercase tracking-wider rounded border border-outline-variant hover:bg-surface-variant transition-colors cursor-pointer text-center">
              Change Avatar
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          
          <form className="flex-1 space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm font-bold animate-in fade-in">
                {errorMsg}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-outline-variant rounded bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-outline-variant rounded bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-outline-variant rounded bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-outline-variant rounded bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
              {isSaved ? (
                <span className="text-green-600 font-bold text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span> Changes Saved
                </span>
              ) : (
                <div></div>
              )}
              <button 
                type="submit"
                disabled={isSaving}
                className={`px-6 py-3 bg-secondary-container text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary'}`}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
