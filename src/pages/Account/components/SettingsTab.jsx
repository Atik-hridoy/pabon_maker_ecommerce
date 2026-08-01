import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../../../api/client';
import { storage } from '../../../utils/localStorage';

export default function SettingsTab() {
  // Notification Preferences (persisted in localStorage for now, ready for backend)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('user_notification_prefs');
    return saved ? JSON.parse(saved) : {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      smsAlerts: false
    };
  });

  // Change Password
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Delete Account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  // Notification Save
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Refs for animation
  const successRef = useRef(null);

  // Save notification preferences
  useEffect(() => {
    localStorage.setItem('user_notification_prefs', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePrefs = () => {
    localStorage.setItem('user_notification_prefs', JSON.stringify(settings));
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 3000);
  };

  // Password Change Handler
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setPwError('');
    setPwSuccess('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (!passwordForm.currentPassword) {
      setPwError('Please enter your current password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPwError('New passwords do not match.');
      return;
    }

    setPwLoading(true);
    const token = storage.getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/change-password/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword,
          confirm_password: passwordForm.confirmPassword
        })
      });
      const data = await response.json();
      if (data.success) {
        setPwSuccess('Password changed successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPwSuccess(''), 5000);
      } else {
        const errorMsg = data.errors
          ? (typeof data.errors === 'string' ? data.errors : Object.values(data.errors).flat().join(' '))
          : data.message || 'Failed to change password.';
        setPwError(errorMsg);
      }
    } catch (err) {
      console.error('Password change failed:', err);
      setPwError('Network error. Please try again.');
    } finally {
      setPwLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { label: '', color: '', width: '0%' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 1) return { label: 'Weak', color: 'bg-red-500', width: '20%' };
    if (score <= 2) return { label: 'Fair', color: 'bg-orange-400', width: '40%' };
    if (score <= 3) return { label: 'Good', color: 'bg-yellow-400', width: '60%' };
    if (score <= 4) return { label: 'Strong', color: 'bg-emerald-400', width: '80%' };
    return { label: 'Excellent', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = getPasswordStrength(passwordForm.newPassword);

  const notificationItems = [
    {
      key: 'orderUpdates',
      icon: 'local_shipping',
      title: 'Order Updates',
      desc: 'Receive email notifications when your order status changes.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      key: 'promotions',
      icon: 'campaign',
      title: 'Promotional Emails',
      desc: 'Receive offers, discounts, and personalized recommendations.',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      key: 'newsletter',
      icon: 'newspaper',
      title: 'Newsletter',
      desc: 'Weekly digest of new hardware and engineering tutorials.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      key: 'smsAlerts',
      icon: 'sms',
      title: 'SMS Alerts',
      desc: 'Receive text messages for delivery tracking.',
      color: 'text-emerald-600 bg-emerald-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Communication Preferences */}
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">notifications</span>
          <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Communication Preferences</h3>
        </div>
        
        <div className="p-6 space-y-1">
          {notificationItems.map((item, idx) => (
            <div 
              key={item.key} 
              className={`flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors ${
                idx < notificationItems.length - 1 ? 'border-b border-outline-variant/50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle(item.key)}
                className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                  settings[item.key] 
                    ? 'bg-secondary shadow-inner' 
                    : 'bg-outline-variant'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  settings[item.key] ? 'left-6' : 'left-1'
                }`}></div>
              </button>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center justify-end gap-3">
            {prefsSaved && (
              <span className="text-emerald-600 font-bold text-xs flex items-center gap-1 animate-in fade-in">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> Preferences Saved
              </span>
            )}
            <button 
              onClick={handleSavePrefs}
              className="px-5 py-2.5 bg-secondary-container text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-secondary transition-colors shadow-sm"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
          <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Change Password</h3>
        </div>
        
        <form className="p-6" onSubmit={handlePasswordSubmit}>
          {pwError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div ref={successRef} className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              {pwSuccess}
            </div>
          )}

          <div className="space-y-4 max-w-lg">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showCurrentPw ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">New Password</label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showNewPw ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {/* Password Strength Bar */}
              {passwordForm.newPassword && (
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} rounded-full transition-all duration-500`} 
                      style={{ width: strength.width }} 
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                    Strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Re-enter new password"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium pr-12 ${
                    passwordForm.confirmPassword && passwordForm.confirmPassword !== passwordForm.newPassword
                      ? 'border-red-400'
                      : passwordForm.confirmPassword && passwordForm.confirmPassword === passwordForm.newPassword
                        ? 'border-emerald-400'
                        : 'border-outline-variant'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConfirmPw ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {passwordForm.confirmPassword && passwordForm.confirmPassword !== passwordForm.newPassword && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">Passwords do not match</p>
              )}
              {passwordForm.confirmPassword && passwordForm.confirmPassword === passwordForm.newPassword && (
                <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">check</span> Passwords match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pwLoading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
              className={`px-6 py-2.5 bg-secondary-container text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm ${
                pwLoading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-secondary hover:shadow-md'
              }`}
            >
              {pwLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Updating...
                </span>
              ) : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg border border-red-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-200 bg-red-50 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-500 text-[20px]">warning</span>
          <h3 className="text-xs text-red-700 font-bold uppercase tracking-wider">Danger Zone</h3>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-sm text-on-surface">Delete Account</h4>
              <p className="text-xs text-on-surface-variant mt-1 max-w-md">
                Once you delete your account, all your data including orders, saved addresses, payment methods, 
                and wishlist will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-2 bg-white border-2 border-red-300 text-red-600 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-red-50 hover:border-red-400 transition-all flex-shrink-0"
            >
              Delete Account
            </button>
          </div>
          
          {showDeleteConfirm && (
            <div className="mt-6 p-5 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-3 mb-4">
                <span className="material-symbols-outlined text-red-500 text-[24px] mt-0.5">error</span>
                <div>
                  <h4 className="text-sm font-bold text-red-800">Are you absolutely sure?</h4>
                  <p className="text-xs text-red-600 mt-1">
                    Type <strong className="font-mono bg-red-100 px-1.5 py-0.5 rounded">DELETE</strong> below to confirm permanent account deletion.
                  </p>
                </div>
              </div>
              <input
                type="text"
                value={deleteText}
                onChange={(e) => setDeleteText(e.target.value)}
                placeholder='Type "DELETE" to confirm'
                className="w-full px-4 py-2.5 border border-red-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-400 text-sm font-medium mb-3"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteText('');
                  }}
                  className="px-5 py-2 bg-white border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-surface-variant transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteText !== 'DELETE'}
                  className={`px-5 py-2 font-bold text-xs uppercase tracking-wider rounded-lg transition-all ${
                    deleteText === 'DELETE'
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                      : 'bg-red-200 text-red-400 cursor-not-allowed'
                  }`}
                >
                  Permanently Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
