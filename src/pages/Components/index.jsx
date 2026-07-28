import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

export default function Components() {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-margin-desktop text-center">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">Components</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Content has been cleared as requested. Ready for new design.
        </p>
      </div>
    </MainLayout>
  );
}
