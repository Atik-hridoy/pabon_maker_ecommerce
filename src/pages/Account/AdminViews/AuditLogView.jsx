import React, { useState, useRef, useEffect } from 'react';
import { getAuditLogs, getAuditLogDetails } from '../../../api/billingService';
import { toast } from '../../../components/ToastContainer';

export default function AuditLogView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loadingDiff, setLoadingDiff] = useState(null); // id of log being loaded

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAuditLogs();
        // Pagination data check: if the API is paginated, it returns { results: [...] }
        setLogs(data.results || data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch audit logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const handleOpenDiff = async (log) => {
    setLoadingDiff(log.id);
    try {
      const details = await getAuditLogDetails(log.id);
      setSelectedLog({
        ...log,
        user: log.user_email || log.user,
        ip: log.ip_address || log.ip,
        diff: {
          summary: details.summary?.join(' | ') || 'No summary available',
          oldValue: JSON.stringify(details.old_value, null, 2),
          newValue: JSON.stringify(details.new_value, null, 2)
        }
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to load log details.', 'Log Error');
    } finally {
      setLoadingDiff(null);
    }
  };

  // Sync scroll refs
  const leftScrollRef = useRef(null);
  const rightScrollRef = useRef(null);
  const isSyncingLeft = useRef(false);
  const isSyncingRight = useRef(false);

  const handleLeftScroll = (e) => {
    if (!isSyncingLeft.current && rightScrollRef.current) {
      isSyncingRight.current = true;
      rightScrollRef.current.scrollTop = e.target.scrollTop;
      rightScrollRef.current.scrollLeft = e.target.scrollLeft;
    }
    isSyncingLeft.current = false;
  };

  const handleRightScroll = (e) => {
    if (!isSyncingRight.current && leftScrollRef.current) {
      isSyncingLeft.current = true;
      leftScrollRef.current.scrollTop = e.target.scrollTop;
      leftScrollRef.current.scrollLeft = e.target.scrollLeft;
    }
    isSyncingRight.current = false;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl">shield</span>
          Audit & Activity History Logs
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">Track system configurations, user activities, and data mutations.</p>
      </div>

      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        {error && (
          <div className="p-4 bg-error/10 border-b border-error/20 text-error flex items-center gap-2 text-sm font-bold">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant bg-surface-container-low flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
            <input type="text" placeholder="Search Admin/IP..." className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded bg-white focus:ring-1 focus:ring-secondary text-sm" />
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <select className="flex-1 md:flex-none py-2 px-3 border border-outline-variant rounded bg-white text-sm text-on-surface focus:ring-1 focus:ring-secondary">
              <option>Filter Module: Billing & Charges</option>
              <option>Filter Module: Inventory</option>
              <option>Filter Module: Users</option>
              <option>All Modules</option>
            </select>
            <select className="flex-1 md:flex-none py-2 px-3 border border-outline-variant rounded bg-white text-sm text-on-surface focus:ring-1 focus:ring-secondary">
              <option>Range: 7 Days</option>
              <option>Range: 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-on-surface-variant">
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined animate-spin text-4xl text-secondary">refresh</span>
                <p className="font-bold text-sm tracking-wider uppercase font-label-caps">Loading Logs...</p>
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface text-on-surface-variant text-xs uppercase font-bold border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Admin User</th>
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Action / Event</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-on-surface-variant">No audit logs found.</td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id} className="hover:bg-surface-container-low transition-colors text-on-surface">
                      <td className="px-6 py-4 font-technical-data">
                        {new Date(log.created_at || log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-bold">{log.user_email || log.user}</td>
                      <td className="px-6 py-4">{log.module}</td>
                      <td className="px-6 py-4">{log.action}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleOpenDiff(log)}
                          disabled={loadingDiff === log.id}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-container/10 text-secondary-container hover:bg-secondary-container hover:text-white rounded font-bold transition-colors text-xs uppercase tracking-wider disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {loadingDiff === log.id ? 'sync' : 'difference'}
                          </span>
                          {loadingDiff === log.id ? 'Loading...' : 'Diff'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Diff Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLog(null)}></div>
          
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl z-10 flex flex-col max-h-[90vh] border border-outline-variant">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low rounded-t-lg">
              <h3 className="font-bold text-primary flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined">search</span>
                Audit Log Details ({selectedLog.id})
              </h3>
              <button onClick={() => setSelectedLog(null)} className="p-1 hover:bg-surface-variant rounded text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Meta Data */}
            <div className="p-4 bg-surface text-sm flex flex-wrap gap-x-8 gap-y-2 border-b border-outline-variant font-technical-data text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span>👤</span> <span className="font-bold">Changed By:</span> {selectedLog.user}
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span> <span className="font-bold">Date:</span> {selectedLog.timestamp}
              </div>
              <div className="flex items-center gap-2">
                <span>🌐</span> <span className="font-bold">IP:</span> {selectedLog.ip}
              </div>
              <div className="flex items-center gap-2">
                <span>🖥️</span> <span className="font-bold">Module:</span> {selectedLog.module}
              </div>
            </div>

            {/* Side-by-Side JSON Diff */}
            <div className="flex-1 overflow-hidden flex flex-col p-6 bg-surface-container-lowest">
              <div className="grid grid-cols-2 gap-4 flex-1 min-h-[300px]">
                
                {/* Old Values Panel */}
                <div className="flex flex-col border border-error/30 rounded overflow-hidden shadow-sm">
                  <div className="bg-error/10 px-4 py-2 border-b border-error/20 flex items-center gap-2 font-bold text-error text-xs uppercase tracking-wider">
                    🔴 OLD VALUES (Before Update)
                  </div>
                  <div 
                    className="flex-1 p-4 overflow-auto font-technical-data text-sm bg-[#FFEBEE]"
                    ref={leftScrollRef}
                    onScroll={handleLeftScroll}
                  >
                    <pre className="m-0 text-error/80 line-through decoration-error/50">{selectedLog.diff.oldValue}</pre>
                  </div>
                </div>

                {/* New Values Panel */}
                <div className="flex flex-col border border-green-500/30 rounded overflow-hidden shadow-sm">
                  <div className="bg-green-500/10 px-4 py-2 border-b border-green-500/20 flex items-center gap-2 font-bold text-green-700 text-xs uppercase tracking-wider">
                    🟢 NEW VALUES (After Update)
                  </div>
                  <div 
                    className="flex-1 p-4 overflow-auto font-technical-data text-sm bg-[#E8F5E9]"
                    ref={rightScrollRef}
                    onScroll={handleRightScroll}
                  >
                    <pre className="m-0 text-green-800 font-bold">{selectedLog.diff.newValue}</pre>
                  </div>
                </div>

              </div>

              {/* Change Highlight Summary */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm flex items-start gap-3 shadow-sm">
                <span className="material-symbols-outlined text-yellow-600">warning</span>
                <div>
                  <span className="font-bold block mb-1">Summary of Changes:</span>
                  <ul className="list-disc pl-5">
                    <li>{selectedLog.diff.summary}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-outline-variant bg-surface-container-low rounded-b-lg flex justify-end">
              <button onClick={() => setSelectedLog(null)} className="px-6 py-2 border border-outline-variant font-bold text-on-surface rounded hover:bg-surface-variant transition-colors">
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
