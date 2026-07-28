import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      {/* Footer Shell */}
      <footer className="w-full mt-auto bg-surface-container border-t border-outline-variant">
        <div className="max-w-max-width mx-auto grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-desktop py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img alt="Pabon Maker Logo" className="h-6 w-auto grayscale brightness-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgL_7xFVQCCX3W-I5l43iXOdps6xHCVs4wmGpUOa8g7uLdCScskI1boxIBRdqthpbQkTnWwFUtAdKzswWQxN1-sY-aF0dGCijFkhP-sGzKlS5Uo4-rwOmnwWgRkWTXvG-fezQW5jp-w63y0oqU_1PZ6TfNCnMs3104YQRX4jWNsDKN0va6hptluaCQkgJOw7em-kPmcj0053HjdUG6fgdaEZ4zWFmZVUPyDgo86ep3XrIk5nF3-GFdk0ivQbGYY_YLeKeXenMbOMTp" />
              <span className="font-title-sm text-title-sm text-primary">Pabon Maker</span>
            </div>
            <p className="text-caption font-caption text-on-surface-variant mb-6">Precision engineering for the modern creator. From prototype to production.</p>
          </div>
          <div>
            <h5 className="font-title-sm text-on-surface mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><a className="font-caption text-caption text-on-surface-variant hover:text-secondary opacity-100 hover:opacity-80 transition-opacity" href="#">Community Forum</a></li>
              <li><a className="font-caption text-caption text-on-surface-variant hover:text-secondary opacity-100 hover:opacity-80 transition-opacity" href="#">Technical Documentation</a></li>
              <li><a className="font-caption text-caption text-on-surface-variant hover:text-secondary opacity-100 hover:opacity-80 transition-opacity" href="#">Support Center</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-title-sm text-on-surface mb-4">Account</h5>
            <ul className="space-y-2">
              <li><a className="font-caption text-caption text-on-surface-variant hover:text-secondary opacity-100 hover:opacity-80 transition-opacity" href="#">Order Tracking</a></li>
              <li><a className="font-caption text-caption text-on-surface-variant hover:text-secondary opacity-100 hover:opacity-80 transition-opacity" href="#">Careers</a></li>
              <li><a className="font-caption text-caption text-on-surface-variant hover:text-secondary opacity-100 hover:opacity-80 transition-opacity" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-title-sm text-on-surface mb-4">Follow Us</h5>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container/10 transition-colors">
                <span className="material-symbols-outlined text-body-md">share</span>
              </button>
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container/10 transition-colors">
                <span className="material-symbols-outlined text-body-md">hub</span>
              </button>
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container/10 transition-colors">
                <span className="material-symbols-outlined text-body-md">forum</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-max-width mx-auto px-margin-desktop py-6 border-t border-outline-variant/30 flex justify-between items-center">
          <span className="font-caption text-caption text-on-surface-variant">© 2024 Pabon Maker. Precision in Education.</span>
          <div className="flex gap-6">
            <span className="font-caption text-caption text-on-surface-variant">Terms of Service</span>
            <span className="font-caption text-caption text-on-surface-variant">Cookie Policy</span>
          </div>
        </div>
      </footer>
      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 group">
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">help</span>
        <div className="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-caption font-caption whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with an Engineer
        </div>
      </button>
    </>
  );
}
