import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VelomingLogo } from '../common/VelomingLogo';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Lapor', path: '/report' },
    { label: 'Lacak laporan', path: '/track' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Scroll to hero section smoothly when on homepage, or navigate to '/'
  const handleScrollToHero = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="w-full bg-[var(--background-bg-primary)]/90 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--border-border-secondary)]">
      <div className="max-w-[1392px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo - clicks scroll to hero section */}
        <Link
          to="/"
          onClick={handleScrollToHero}
          className="inline-flex items-center transition hover:opacity-90 cursor-pointer"
          aria-label="Kembali ke Beranda"
        >
          <VelomingLogo variant="combination" size={36} animated={true} />
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-7 ml-auto text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => {
                if (link.path === '/') handleScrollToHero(e);
              }}
              className={`transition-colors font-medium ${
                isActive(link.path)
                  ? 'text-[var(--text-text-gray-text-primary)] font-semibold'
                  : 'text-[var(--text-text-gray-text-tertiary)] hover:text-[var(--background-bg-brand-solid)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile & Tablet Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--text-text-gray-text-primary)] hover:text-blue-600 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M7 16h13" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-border-secondary)] bg-[var(--background-bg-primary)] px-6 pt-3 pb-5 space-y-2 text-center shadow-lg transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (link.path === '/') handleScrollToHero(e);
              }}
              className={`block py-2.5 text-sm font-medium rounded-lg ${
                isActive(link.path)
                  ? 'text-[var(--text-text-gray-text-primary)] bg-[var(--background-bg-secondary)] font-semibold'
                  : 'text-[var(--text-text-gray-text-tertiary)] hover:text-[var(--background-bg-brand-solid)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
