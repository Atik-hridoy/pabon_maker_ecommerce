import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { storage } from '../../utils/localStorage';

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (activeTab === 'signin') {
      const email = e.target.elements.email?.value;
      const password = e.target.elements.password?.value;

      try {
        const response = await authService.login(email, password);
        const { access } = response.data;
        
        storage.setToken(access);
        storage.setLoggedIn('true');
        
        if (response.data.is_admin || response.data.is_staff) {
          storage.setAdmin('true');
        } else {
          storage.setAdmin('false');
        }
        
        setLoading(false);
        onClose();
        navigate('/account');
      } catch (err) {
        setLoading(false);
        if (err.data && err.data.errors && err.data.errors.detail) {
           setErrorMsg(err.data.errors.detail);
        } else {
           setErrorMsg('Invalid email or password.');
        }
      }
    } else {
      const email = e.target.elements.email?.value;
      const full_name = e.target.elements.name?.value;
      const password = e.target.elements.password?.value;
      const re_type_password = e.target.elements.re_type_password?.value;
      const rawPhone = e.target.elements.phone?.value;
      const phonenumber = rawPhone ? `+88${rawPhone}` : '';

      if (password !== re_type_password) {
        setErrorMsg('Passwords do not match.');
        setLoading(false);
        return;
      }

      try {
        await authService.register({ email, full_name, phonenumber, password, re_type_password });
        storage.setLoggedIn('true');
        storage.setAdmin('false'); // Ensure new users are not admins
        setLoading(false);
        onClose();
        navigate('/account');
      } catch (err) {
        setLoading(false);
        if (err.data) {
          const firstError = Object.values(err.data)[0];
          setErrorMsg(Array.isArray(firstError) ? firstError[0] : (typeof firstError === 'string' ? firstError : 'Registration failed.'));
        } else {
          setErrorMsg('An unexpected error occurred during registration.');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
      {/* Click outside to close - optional, but nice for modals */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-[1200px] h-[90vh] min-h-[600px] bg-surface-container-lowest rounded-2xl shadow-2xl flex overflow-hidden z-10">

        {/* Left Side: Hero Image */}
        <section className="hidden lg:block relative w-1/2 h-full">
          <img
            alt="High performance electronics macro"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AP1WRLuqdbixQloheVo2M60HV0mmezbpeZ2hCNeM9J7ghxObutkrVRAUqgBWQ0-roCbjv8qjbOg5sVCZXmDmt659fxr9X8BD9xwM51nLEqk2T_Usj1yVtsdpyaC8yOZiYtBOLC8RNlynwBaElNk7Y1WZW3ZRETFh2kWeaTd72CZrC9kWd9H5RLA-fEjMmVFLlTrBwy0fo3XzaXUgv-5F11-KoFbIrnYva95j2w1-Se5DaKSLKoZu_vgeOOJVr57G"
          />
          {/* Watermark */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
            <span className="text-white/70 font-bold tracking-tight text-lg">Pabon Maker</span>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
        </section>

        {/* Right Side: Auth Form */}
        <section className="w-full lg:w-1/2 h-full flex flex-col bg-surface-container-lowest overflow-y-auto">
          {/* Header */}
          <header className="p-6 flex justify-between items-center border-b border-outline-variant lg:border-none">
            <div className="font-headline-md text-headline-md font-bold text-on-surface lg:hidden">Pabon Maker</div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors ml-auto"
            >
              <span className="font-label-caps">CLOSE</span>
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <div className="flex-grow flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-md space-y-8">

              {/* Branding/Title */}
              <div className="text-left">
                <h1 className="text-display-lg-mobile md:text-[40px] font-bold text-primary tracking-tight leading-tight">
                  {activeTab === 'signin' ? 'Welcome Back' : 'Join the Makers'}
                </h1>
                <p className="text-on-surface-variant mt-2">
                  {activeTab === 'signin'
                    ? 'Access your professional hardware projects and technical assets.'
                    : 'Unlock high-precision components and engineering tools.'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-outline-variant">
                <button
                  className={`pb-4 font-label-caps transition-all ${activeTab === 'signin' ? 'text-secondary border-b-2 border-secondary font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
                  onClick={() => setActiveTab('signin')}
                >
                  SIGN IN
                </button>
                <button
                  className={`pb-4 font-label-caps transition-all ${activeTab === 'signup' ? 'text-secondary border-b-2 border-secondary font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
                  onClick={() => setActiveTab('signup')}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              {/* Auth Forms Container */}
              <div className="space-y-6">

                {errorMsg && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm font-bold animate-in fade-in">
                    {errorMsg}
                  </div>
                )}

                {/* Sign In View */}
                {activeTab === 'signin' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <form className="space-y-4" onSubmit={handleAuth}>
                      <div className="space-y-2">
                        <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">EMAIL</label>
                        <input name="email" className="w-full px-4 py-3.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-blue-500 font-technical-data transition-all" placeholder="engineer@pabonmaker.com" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">PASSWORD</label>
                          <a className="font-label-caps text-xs text-secondary hover:underline" href="#">FORGOT?</a>
                        </div>
                        <input name="password" className="w-full px-4 py-3.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-blue-500 font-technical-data transition-all" placeholder="••••••••" type="password" required />
                      </div>
                      <button disabled={loading} className="w-full bg-secondary-container text-white py-4 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg text-lg disabled:opacity-70" type="submit">
                        {loading ? 'SIGNING IN...' : 'SIGN IN'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Sign Up View */}
                {activeTab === 'signup' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <form className="space-y-4" onSubmit={handleAuth}>
                      <div className="space-y-2">
                        <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">FULL NAME</label>
                        <input name="name" className="w-full px-4 py-3.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-blue-500 font-technical-data transition-all" placeholder="Alex Rivera" type="text" required />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">EMAIL</label>
                        <input name="email" className="w-full px-4 py-3.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-blue-500 font-technical-data transition-all" placeholder="dev@circuit.io" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">PHONE NUMBER</label>
                        <div className="flex border border-outline-variant rounded-lg bg-surface focus-within:ring-2 focus-within:ring-blue-500 transition-all overflow-hidden">
                          <span className="flex items-center px-4 bg-surface-container text-on-surface-variant border-r border-outline-variant font-technical-data font-medium">
                            +88
                          </span>
                          <input name="phone" className="w-full px-4 py-3.5 bg-transparent focus:outline-none font-technical-data" placeholder="017XXXXXXXX" type="tel" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">PASSWORD</label>
                        <input name="password" className="w-full px-4 py-3.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-blue-500 font-technical-data transition-all" placeholder="Min. 6 characters" type="password" required />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">RE-TYPE PASSWORD</label>
                        <input name="re_type_password" className="w-full px-4 py-3.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-blue-500 font-technical-data transition-all" placeholder="Retype your password" type="password" required />
                      </div>
                      <div className="flex items-start gap-2 pt-2">
                        <input className="mt-1 rounded border-outline-variant text-secondary focus:ring-secondary w-4 h-4" id="terms" type="checkbox" required />
                        <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                          I agree to the <a className="text-secondary underline hover:text-secondary-container" href="#">Terms of Service</a> for professional hardware sourcing.
                        </label>
                      </div>
                      <button disabled={loading} className="w-full bg-secondary-container text-white py-4 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg text-lg disabled:opacity-70" type="submit">
                        {loading ? 'CREATING ACCOUNT...' : 'JOIN PABON MAKER'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Social Login */}
                <div className="space-y-4">
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-outline-variant"></div>
                    <span className="flex-shrink mx-4 font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">TECHNICAL AUTHENTICATION</span>
                    <div className="flex-grow border-t border-outline-variant"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-3 border border-outline-variant py-3.5 rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] bg-white">
                      <span className="material-symbols-outlined text-[20px]">terminal</span>
                      <span className="font-semibold text-on-surface">Continue with GitHub</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 border border-outline-variant py-3.5 rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] bg-white">
                      <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAngcjdBSCnkpwFBY8sqpkH8kXQ8qwd4Uqkoy3QIqhv8ESXEQ3v7857mLQwn84N73wiKrUen-1Ic5slDv_ZsA3oTMB4PbpTs2oHxStl97E4HKKaU72wiO_HgPvDNpahPCEJn5phSL1SfQexHawbj_ytuuRnAJKXM-JMN4mO4y1MeVHrPbZWfRtr1Ynt2iKvSam2C60tWBc1dDeptj2t7LnOMaJnVBeS0r21YJPyTQBRGveDwB9V3bZ8Pw" />
                      <span className="font-semibold text-on-surface">Continue with Google</span>
                    </button>
                  </div>
                </div>

              </div>

              <footer className="pt-8 text-center border-t border-outline-variant mt-8">
                <p className="text-sm text-on-surface-variant">
                  Precision Engineered for Technical Mastery.
                </p>
              </footer>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
