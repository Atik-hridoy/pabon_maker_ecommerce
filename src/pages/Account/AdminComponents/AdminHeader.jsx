import React from 'react';

export default function AdminHeader({
  siteName,
  setIsDrawerOpen,
  unreadCount,
  showNotifications,
  setShowNotifications,
  notificationsList,
  readNotifIds,
  markAllAsRead,
  handleNotificationClick,
  notifRef,
  globalSearchQuery,
  setGlobalSearchQuery,
  searchResults,
  isSearching,
  showSearchResults,
  setShowSearchResults,
  searchRef,
  handleSearchResultClick,
  handleTabClick
}) {
  return (
    <header className="h-16 glass-header flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 shadow-sm rounded-2xl mb-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsDrawerOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-surface-variant text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Live Telemetry Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 text-green-700 rounded-full text-xs font-bold shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span>Live Engine Connected 🇧🇩</span>
        </div>

        {/* Global Multi-Entity Search Bar (Backend Powered) */}
        <div className="relative hidden sm:block w-64 lg:w-96" ref={searchRef}>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 w-full focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white shadow-sm transition-all">
            <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-800 placeholder:text-slate-400 w-full outline-none" 
              placeholder="Search products, orders, users, vouchers..." 
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onFocus={() => { if (globalSearchQuery.trim()) setShowSearchResults(true); }}
            />
            {isSearching ? (
              <span className="material-symbols-outlined text-[16px] animate-spin text-orange-500">progress_activity</span>
            ) : globalSearchQuery ? (
              <button onClick={() => { setGlobalSearchQuery(''); setShowSearchResults(false); }} className="p-0.5 hover:bg-slate-100 rounded-full">
                <span className="material-symbols-outlined text-[16px] text-slate-400">close</span>
              </button>
            ) : null}
          </div>

          {/* Instant Multi-Entity Search Results Dropdown */}
          {showSearchResults && searchResults && (
            <div className="absolute left-0 top-11 w-full sm:w-[480px] bg-white rounded-2xl shadow-2xl border border-outline-variant z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[480px] flex flex-col">
              {/* Header */}
              <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
                <span className="text-[11px] font-bold text-on-surface-variant">
                  Global Search Results ({searchResults.total_count} items found)
                </span>
                <span className="text-[10px] font-technical-data text-outline">
                  Query: "{searchResults.query}"
                </span>
              </div>

              {/* Body */}
              <div className="overflow-y-auto divide-y divide-outline-variant/30 flex-1 p-2 space-y-3">
                {searchResults.total_count === 0 ? (
                  <div className="p-6 text-center text-on-surface-variant space-y-2">
                    <span className="material-symbols-outlined text-3xl text-outline-variant">search_off</span>
                    <p className="text-xs font-bold">No matching records found in database.</p>
                    <p className="text-[10px]">Try searching by product title, order #, email, or voucher code.</p>
                  </div>
                ) : (
                  <>
                    {/* Products Section */}
                    {searchResults.results.products.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 font-label-caps flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">inventory_2</span> Products ({searchResults.results.products.length})
                        </div>
                        {searchResults.results.products.map(item => (
                          <div key={`p-${item.id}`} onClick={() => handleSearchResultClick(item)} className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-on-surface">{item.title}</div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5">{item.subtitle}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badge_color}`}>{item.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Orders Section */}
                    {searchResults.results.orders.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 font-label-caps flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">shopping_cart</span> Orders ({searchResults.results.orders.length})
                        </div>
                        {searchResults.results.orders.map(item => (
                          <div key={`o-${item.id}`} onClick={() => handleSearchResultClick(item)} className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-on-surface">{item.title}</div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5">{item.subtitle}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badge_color}`}>{item.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Users Section */}
                    {searchResults.results.users.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700 font-label-caps flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">group</span> Users ({searchResults.results.users.length})
                        </div>
                        {searchResults.results.users.map(item => (
                          <div key={`u-${item.id}`} onClick={() => handleSearchResultClick(item)} className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-on-surface">{item.title}</div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5">{item.subtitle}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badge_color}`}>{item.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Vouchers Section */}
                    {searchResults.results.vouchers.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 font-label-caps flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">confirmation_number</span> Vouchers ({searchResults.results.vouchers.length})
                        </div>
                        {searchResults.results.vouchers.map(item => (
                          <div key={`v-${item.id}`} onClick={() => handleSearchResultClick(item)} className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-on-surface">{item.title}</div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5">{item.subtitle}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badge_color}`}>{item.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Audit Logs Section */}
                    {searchResults.results.audit_logs.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-label-caps flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">history</span> Audit Logs ({searchResults.results.audit_logs.length})
                        </div>
                        {searchResults.results.audit_logs.map(item => (
                          <div key={`a-${item.id}`} onClick={() => handleSearchResultClick(item)} className="p-2 hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-on-surface">{item.title}</div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5">{item.subtitle}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badge_color}`}>{item.badge}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notifications Bell with Popover */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors block focus:outline-none"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-outline-variant z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-on-surface text-sm">Notifications</h3>
                  {unreadCount > 0 ? (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                      {unreadCount} unread
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                      All caught up
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[11px] font-bold text-secondary hover:underline cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant/30">
                {notificationsList.length === 0 ? (
                  <div className="p-8 text-center text-on-surface-variant space-y-2">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">notifications_off</span>
                    <p className="text-xs font-bold">No notifications available</p>
                    <p className="text-[10px]">All system telemetry & inventory levels are normal.</p>
                  </div>
                ) : (
                  notificationsList.map((notif) => {
                    const isUnread = !readNotifIds.includes(notif.id);
                    let badgeBg = 'bg-blue-100 text-blue-700';
                    if (notif.type === 'warning') badgeBg = 'bg-amber-100 text-amber-800';
                    if (notif.type === 'danger') badgeBg = 'bg-red-100 text-red-700';
                    if (notif.type === 'success') badgeBg = 'bg-green-100 text-green-800';

                    return (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-surface-container-low ${
                          isUnread ? 'bg-primary-container/10 font-medium' : 'opacity-80'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${badgeBg}`}>
                          <span className="material-symbols-outlined text-[20px]">{notif.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-on-surface truncate">{notif.title}</h4>
                            {isUnread && (
                              <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug line-clamp-2">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-outline font-technical-data block mt-1">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Admin Profile */}
        <div 
          className="flex items-center gap-3 border-l border-slate-200/80 pl-4 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => handleTabClick('settings')}
        >
          <div className="text-right hidden md:block">
            <div className="text-xs font-black text-slate-800 leading-tight">Admin Terminal</div>
            <div className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">System Root</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#5846e0] text-white font-black flex items-center justify-center text-sm shadow-md">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
