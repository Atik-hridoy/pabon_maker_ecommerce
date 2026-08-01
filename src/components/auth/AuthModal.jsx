import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { getStoreConfig } from '../../api/adminService';
import { storage } from '../../utils/localStorage';

export default function AuthModal({ isOpen, onClose, redirectPath, redirectState }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Terms & Privacy Policy States
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsContent, setTermsContent] = useState({ terms: '', privacy: '' });
  const [loadingTerms, setLoadingTerms] = useState(false);

  const navigate = useNavigate();

  const handleOpenTermsModal = async (e) => {
    if (e) e.preventDefault();
    setShowTermsModal(true);
    setLoadingTerms(true);
    try {
      const config = await getStoreConfig();
      if (config) {
        setTermsContent({
          terms: config.terms_and_conditions || 'Welcome to Pabon Maker. By using our website, you agree to abide by the Bangladeshi Consumer Protection Act and store policies.',
          privacy: config.privacy_policy || 'We respect your privacy and protect all account information according to Digital Security guidelines in Bangladesh.'
        });
      }
    } catch (err) {
      console.error("Failed to fetch Terms & Conditions", err);
    } finally {
      setLoadingTerms(false);
    }
  };

  const handleAgreeTerms = () => {
    setTermsAgreed(true);
    setShowTermsModal(false);
    setErrorMsg(null);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (activeTab === 'signin') {
      setLoading(true);
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
        navigate(redirectPath || '/account', { state: redirectState });
      } catch (err) {
        setLoading(false);
        if (err.data && err.data.errors && err.data.errors.detail) {
           setErrorMsg(err.data.errors.detail);
        } else {
           setErrorMsg('Invalid email or password.');
        }
      }
    } else {
      if (!termsAgreed) {
        setErrorMsg('You must agree to the Terms of Service & Privacy Policy to join.');
        return;
      }

      setLoading(true);
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
        // Clear any old/expired auth tokens first
        storage.clearAuth();

        await authService.register({ email, full_name, phonenumber, password, re_type_password, agreed_terms: termsAgreed });
        
        // Auto-login to obtain fresh JWT Access token from backend
        const loginRes = await authService.login(email, password);
        if (loginRes && loginRes.data && loginRes.data.access) {
          storage.setToken(loginRes.data.access);
          storage.setLoggedIn('true');
          storage.setAdmin(loginRes.data.is_admin ? 'true' : 'false');
        }

        setLoading(false);
        onClose();
        // Redirect directly to user profile tab
        navigate('/account', { state: { tab: 'profile' } });
        window.dispatchEvent(new CustomEvent('user_logged_in'));
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
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-[1100px] h-[85vh] min-h-[580px] bg-white rounded-3xl shadow-2xl flex overflow-hidden z-10 border border-slate-100">

        {/* Left Side: Hero Image */}
        <section className="hidden lg:block relative w-1/2 h-full">
          <img
            alt="High performance electronics"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AP1WRLuqdbixQloheVo2M60HV0mmezbpeZ2hCNeM9J7ghxObutkrVRAUqgBWQ0-roCbjv8qjbOg5sVCZXmDmt659fxr9X8BD9xwM51nLEqk2T_Usj1yVtsdpyaC8yOZiYtBOLC8RNlynwBaElNk7Y1WZW3ZRETFh2kWeaTd72CZrC9kWd9H5RLA-fEjMmVFLlTrBwy0fo3XzaXUgv-5F11-KoFbIrnYva95j2w1-Se5DaKSLKoZu_vgeOOJVr57G"
          />
          <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-lg">
            <span className="text-white font-black tracking-tight text-xl">Pabon Maker</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
        </section>

        {/* Right Side: Auth Form */}
        <section className="w-full lg:w-1/2 h-full flex flex-col bg-white overflow-y-auto">
          {/* Header */}
          <header className="p-6 flex justify-between items-center border-b border-slate-100 lg:border-none">
            <div className="text-xl font-black text-slate-900 lg:hidden">Pabon Maker</div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors ml-auto font-bold text-xs"
            >
              <span>CLOSE</span>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </header>

          <div className="flex-grow flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md space-y-6">

              {/* Title */}
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {activeTab === 'signin' ? 'Welcome Back' : 'Join the Makers'}
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {activeTab === 'signin'
                    ? 'Access your professional hardware projects & account.'
                    : 'Create an account to unlock components & order status.'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-slate-200">
                <button
                  className={`pb-3 font-bold text-xs transition-all uppercase tracking-wider ${activeTab === 'signin' ? 'text-[#5846e0] border-b-2 border-[#5846e0]' : 'text-slate-400 hover:text-slate-700'}`}
                  onClick={() => { setActiveTab('signin'); setErrorMsg(null); }}
                >
                  SIGN IN
                </button>
                <button
                  className={`pb-3 font-bold text-xs transition-all uppercase tracking-wider ${activeTab === 'signup' ? 'text-[#5846e0] border-b-2 border-[#5846e0]' : 'text-slate-400 hover:text-slate-700'}`}
                  onClick={() => { setActiveTab('signup'); setErrorMsg(null); }}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              {/* Auth Forms */}
              <div className="space-y-5">

                {errorMsg && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold animate-in fade-in flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Sign In View */}
                {activeTab === 'signin' && (
                  <form className="space-y-4" onSubmit={handleAuth}>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">EMAIL</label>
                      <input name="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#5846e0] focus:bg-white text-xs font-bold text-slate-800 transition-all" placeholder="engineer@pabonmaker.com" type="email" required />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">PASSWORD</label>
                        <a className="text-[11px] font-bold text-[#5846e0] hover:underline" href="#" onClick={(e) => { e.preventDefault(); alert("Please contact support to reset your password."); }}>FORGOT?</a>
                      </div>
                      <input name="password" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#5846e0] focus:bg-white text-xs font-bold text-slate-800 transition-all" placeholder="••••••••" type="password" required />
                    </div>
                    <button disabled={loading} className="w-full bg-[#5846e0] text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-[#4b3eef] active:scale-[0.98] transition-all shadow-md disabled:opacity-60 mt-2" type="submit">
                      {loading ? 'SIGNING IN...' : 'SIGN IN'}
                    </button>
                  </form>
                )}

                {/* Sign Up View */}
                {activeTab === 'signup' && (
                  <form className="space-y-3.5" onSubmit={handleAuth}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">FULL NAME</label>
                      <input name="name" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#5846e0] focus:bg-white text-xs font-bold text-slate-800 transition-all" placeholder="Alex Rivera" type="text" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">EMAIL</label>
                      <input name="email" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#5846e0] focus:bg-white text-xs font-bold text-slate-800 transition-all" placeholder="dev@circuit.io" type="email" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider">PHONE NUMBER</label>
                      <div className="flex border border-slate-200 rounded-xl bg-slate-50/50 focus-within:ring-2 focus-within:ring-[#5846e0] transition-all overflow-hidden">
                        <span className="flex items-center px-3.5 bg-slate-100 text-slate-600 border-r border-slate-200 font-bold text-xs">
                          +88
                        </span>
                        <input name="phone" className="w-full px-3.5 py-2.5 bg-transparent focus:outline-none text-xs font-bold text-slate-800" placeholder="017XXXXXXXX" type="tel" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 block uppercase tracking-wider">PASSWORD</label>
                        <input name="password" className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#5846e0] text-xs font-bold text-slate-800 transition-all" placeholder="Min. 6 chars" type="password" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 block uppercase tracking-wider">RE-TYPE PASSWORD</label>
                        <input name="re_type_password" className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#5846e0] text-xs font-bold text-slate-800 transition-all" placeholder="Retype password" type="password" required />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-2 pt-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <input 
                        className="mt-0.5 rounded border-slate-300 text-[#5846e0] focus:ring-[#5846e0] w-4 h-4 cursor-pointer shrink-0" 
                        id="terms" 
                        type="checkbox" 
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                      />
                      <label className="text-xs text-slate-600 leading-relaxed cursor-pointer" htmlFor="terms">
                        I agree to the{' '}
                        <button 
                          type="button"
                          onClick={handleOpenTermsModal}
                          className="text-[#5846e0] font-bold underline hover:text-[#4b3eef]"
                        >
                          Terms of Service & Privacy Policy
                        </button>
                        {' '}for hardware ordering.
                      </label>
                    </div>

                    <button 
                      disabled={loading || !termsAgreed} 
                      className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                        !termsAgreed 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-[#5846e0] text-white hover:bg-[#4b3eef] active:scale-[0.98]'
                      }`} 
                      type="submit"
                    >
                      {loading ? 'CREATING ACCOUNT...' : 'JOIN PABON MAKER'}
                    </button>
                  </form>
                )}

              </div>

              <footer className="pt-4 text-center border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400">
                  Precision Engineered for Technical Mastery.
                </p>
              </footer>

            </div>
          </div>
        </section>
      </div>

      {/* Terms of Service Backend Data Popup Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[85vh] flex flex-col border border-slate-100">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#5846e0]/10 text-[#5846e0] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Terms of Service & Privacy Policy</h3>
                  <p className="text-xs text-slate-500 font-medium">Store legal policies & Consumer Protection Standards</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body: Fetched Backend Content */}
            <div className="overflow-y-auto flex-1 space-y-6 pr-2 font-sans text-xs text-slate-700 leading-relaxed divide-y divide-slate-100">
              {loadingTerms ? (
                <div className="py-12 text-center text-[#5846e0] font-bold flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
                  <span>Fetching Terms of Service from server...</span>
                </div>
              ) : (
                <>
                  {/* Terms Section */}
                  <div className="space-y-2 pt-2">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#5846e0]">verified_user</span>
                      Terms and Conditions (শর্তাবলী)
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 whitespace-pre-wrap font-medium">
                      {termsContent.terms}
                    </div>
                  </div>

                  {/* Privacy Section */}
                  <div className="space-y-2 pt-4">
                    <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#5846e0]">lock</span>
                      Privacy Policy (গোপনীয়তা নীতি)
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 whitespace-pre-wrap font-medium">
                      {termsContent.privacy}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer: I Agree Button */}
            <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={handleAgreeTerms}
                className="px-6 py-3 rounded-xl bg-[#5846e0] hover:bg-[#4b3eef] text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>I AGREE (আমি সম্মত)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
