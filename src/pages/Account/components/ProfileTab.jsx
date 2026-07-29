import React, { useState } from 'react';

export default function ProfileTab() {
  const [formData, setFormData] = useState({
    firstName: 'Aris',
    lastName: 'Pabon',
    email: 'aris.pabon@circuitworld.tech',
    phone: '+1 (555) 123-4567',
    company: 'Pabon Maker',
    role: 'Hardware Engineer'
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
            <img alt="Aris Pabon" className="w-32 h-32 rounded-full border-4 border-surface-container shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw" />
            <button className="px-4 py-2 bg-surface-container text-on-surface font-bold text-xs uppercase tracking-wider rounded border border-outline-variant hover:bg-surface-variant transition-colors">
              Change Avatar
            </button>
          </div>
          
          <form className="flex-1 space-y-6" onSubmit={handleSubmit}>
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Company</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-outline-variant rounded bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Role / Title</label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
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
                className="px-6 py-3 bg-secondary-container text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-secondary transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
