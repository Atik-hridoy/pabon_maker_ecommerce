import React from 'react';

export default function UsersView() {
  const users = [
    { id: 'USR-001', name: 'Aris Pabon', email: 'admin@pabonmaker.com', role: 'System Admin', status: 'Active', joined: 'Jan 15, 2026', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw', init: 'AP' },
    { id: 'USR-042', name: 'Jane Doe', email: 'jane.d@example.com', role: 'Customer', status: 'Active', joined: 'Mar 12, 2026', init: 'JD' },
    { id: 'USR-089', name: 'Mark Smith', email: 'msmith@circuit.io', role: 'Pro Member', status: 'Active', joined: 'Jul 28, 2026', init: 'MS' },
    { id: 'USR-104', name: 'Elena Lopez', email: 'elena.l@tech.co', role: 'Customer', status: 'Suspended', joined: 'Aug 04, 2026', init: 'EL' },
    { id: 'USR-112', name: 'David Kim', email: 'dkim@hw-lab.net', role: 'Moderator', status: 'Active', joined: 'Sep 10, 2026', init: 'DK' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">User Directory</h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage platform members, roles, and access permissions.</p>
        </div>
        <button className="px-4 py-2 bg-primary-container text-white font-label-caps text-[11px] uppercase rounded hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">person_add</span> Invite User
        </button>
      </div>

      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-secondary-container text-white text-[11px] font-bold uppercase rounded">All Users</button>
            <button className="px-3 py-1 bg-white border border-outline-variant text-on-surface-variant text-[11px] font-bold uppercase rounded hover:border-secondary transition-all">Admins Only</button>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-outline-variant w-64">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-xs font-medium text-on-surface w-full placeholder:text-outline-variant p-0" placeholder="Search users by name or email..." type="text" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full high-density-table min-w-[800px]">
            <thead>
              <tr>
                <th>User</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-technical-data">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                  <td>
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-outline-variant object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-primary-container flex items-center justify-center font-bold text-xs">
                          {user.init}
                        </div>
                      )}
                      <div>
                        <div className="font-bold cursor-pointer hover:text-secondary-container">{user.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-mono">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-on-surface-variant">{user.email}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${user.role.includes('Admin') || user.role.includes('Moderator') ? 'text-secondary-container' : 'text-on-surface'}`}>
                      {user.role.includes('Admin') && <span className="material-symbols-outlined text-[14px]">shield</span>}
                      {user.role}
                    </span>
                  </td>
                  <td className="text-on-surface-variant">{user.joined}</td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                      user.status === 'Active' ? 'text-green-600 border-green-500 bg-green-500/5' : 'text-error border-error bg-error/5'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1.5 hover:bg-surface-container rounded text-primary transition-colors tooltip-trigger" title="Edit User">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-error/10 rounded text-error transition-colors tooltip-trigger" title="Suspend User">
                        <span className="material-symbols-outlined text-[18px]">block</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
