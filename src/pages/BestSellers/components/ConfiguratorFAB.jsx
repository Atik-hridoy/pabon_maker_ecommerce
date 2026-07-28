import React from 'react';

export default function ConfiguratorFAB() {
  return (
    <button className="fixed bottom-8 right-8 bg-secondary-container text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
      <span className="material-symbols-outlined text-3xl">build</span>
      <span className="absolute right-full mr-4 bg-primary text-on-primary px-3 py-1 rounded font-label-caps whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        SYSTEM CONFIGURATOR
      </span>
    </button>
  );
}
