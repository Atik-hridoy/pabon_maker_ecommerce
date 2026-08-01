import React, { useState, useEffect } from 'react';
import { getStoreAnalytics } from '../../../api/adminService';

export default function AnalyticsView() {
  const [period, setPeriod] = useState('7d');
  const [analytics, setAnalytics] = useState({
    conversion_rate: 3.8,
    conversion_rate_growth: "+0.4%",
    average_order_value: 184.0,
    aov_growth: "+12 CC",
    total_sessions: 14200,
    sessions_growth: "-2.1%",
    bounce_rate: 42.1,
    bounce_rate_growth: "0.0%",
    device_breakdown: { mobile: 75, desktop: 15, tablet: 10 },
    traffic_sources: { direct: 45, organic: 32, social: 15, referral: 8 }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await getStoreAnalytics(period);
        if (response && response.conversion_rate !== undefined) {
          setAnalytics(response);
        }
      } catch (err) {
        console.error("Failed to load store analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [period]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Store Analytics</h2>
          <p className="text-on-surface-variant text-sm mt-1">Deep dive into your store's performance metrics and customer behavior.</p>
        </div>
        <div className="flex gap-2 bg-white rounded-lg border border-outline-variant p-1 shadow-sm">
          <button 
            onClick={() => setPeriod('7d')}
            className={`px-3 py-1 text-[11px] font-bold uppercase rounded transition-all ${period === '7d' ? 'bg-secondary-container text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setPeriod('30d')}
            className={`px-3 py-1 text-[11px] font-bold uppercase rounded transition-all ${period === '30d' ? 'bg-secondary-container text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setPeriod('12m')}
            className={`px-3 py-1 text-[11px] font-bold uppercase rounded transition-all ${period === '12m' ? 'bg-secondary-container text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            12 Months
          </button>
        </div>
      </div>

      {loading && (
        <div className="py-4 text-center text-xs text-secondary font-bold flex items-center justify-center gap-2">
          <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
          <span>Updating metrics for {period.toUpperCase()}...</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Conversion Rate */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Conversion Rate</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">{analytics.conversion_rate}%</div>
            <div className="text-green-600 font-bold text-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> {analytics.conversion_rate_growth}
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Average Order Value</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">৳{analytics.average_order_value}</div>
            <div className="text-green-600 font-bold text-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> {analytics.aov_growth}
            </div>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Total Sessions</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">{typeof analytics.total_sessions === 'number' ? (analytics.total_sessions / 1000).toFixed(1) + 'k' : analytics.total_sessions}</div>
            <div className="text-error font-bold text-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span> {analytics.sessions_growth}
            </div>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Bounce Rate</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">{analytics.bounce_rate}%</div>
            <div className="text-on-surface-variant font-bold text-sm flex items-center mb-1">
               ~ {analytics.bounce_rate_growth}
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources & Customer Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden flex flex-col min-h-[350px]">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
            <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Traffic Sources</h3>
            <span className="text-xs text-outline font-medium">Top Channels</span>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center gap-6">
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Direct</span>
                <span>{analytics.traffic_sources?.direct || 45}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${analytics.traffic_sources?.direct || 45}%` }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Organic Search</span>
                <span>{analytics.traffic_sources?.organic || 32}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-secondary-container h-2 rounded-full" style={{ width: `${analytics.traffic_sources?.organic || 32}%` }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Social Media</span>
                <span>{analytics.traffic_sources?.social || 15}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${analytics.traffic_sources?.social || 15}%` }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Referral</span>
                <span>{analytics.traffic_sources?.referral || 8}%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${analytics.traffic_sources?.referral || 8}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Device Breakdown */}
        <div className="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden flex flex-col min-h-[350px]">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
            <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Customer Device Breakdown</h3>
            <span className="text-xs text-outline font-medium">User Experience</span>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e8eef6" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fe6b00" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="62.8" className="transition-all duration-1000" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="213.5" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-black text-on-surface">{analytics.device_breakdown?.mobile || 75}%</span>
              <span className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Mobile</span>
            </div>
          </div>
          <div className="px-6 pb-6 flex justify-center gap-6 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary-container"></span> Mobile ({analytics.device_breakdown?.mobile || 75}%)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span> Desktop ({analytics.device_breakdown?.desktop || 15}%)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-surface-container-high border border-outline-variant"></span> Tablet ({analytics.device_breakdown?.tablet || 10}%)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
