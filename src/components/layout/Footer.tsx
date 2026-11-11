import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border-border-secondary)] bg-[var(--background-bg-primary)] py-8 px-6 text-center">
      <div className="max-w-[1392px] mx-auto flex items-center justify-center">
        <p className="text-xs sm:text-sm text-[var(--text-text-gray-text-tertiary)] font-normal">
          &copy; 2026 Veloming. Platform Pelaporan Warga untuk Transparansi Publik.
        </p>
      </div>
    </footer>
  );
};
