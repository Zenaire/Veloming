import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { VelomingLogo } from '../common/VelomingLogo';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Lapor', path: '/report' },
    { label: 'Lacak Laporan', path: '/track' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Body scroll lock saat full-screen mobile menu terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Auto-close saat route berubah atau tombol Escape ditekan
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

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

  const handleMobileNavClick = (path: string, e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (path === '/') {
      handleScrollToHero(e);
    }
  };

  return (
    <>
      <header className="w-full bg-[var(--background-bg-primary)]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[var(--border-border-secondary)]">
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

          {/* Mobile & Tablet Burger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -mr-2 text-[var(--text-text-gray-text-primary)] hover:text-blue-600 focus:outline-none cursor-pointer"
              aria-label="Buka Menu Navigasi"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M7 16h13" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Overlay Menu (Apple / Vercel Style) */}
      {/* Diletakkan di luar <header> agar fixed inset-0 tidak terpotong backdrop-blur-md */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 min-h-screen h-[100dvh] w-full bg-[var(--background-bg-primary)] z-50 flex flex-col md:hidden overflow-y-auto font-['Inter',sans-serif]"
          >
            {/* Header Bar: Logo di kiri & Close (X) sejajar di kanan */}
            <div className="flex items-center justify-between px-6 py-4 h-16 border-b border-[var(--border-border-secondary)] shrink-0">
              <Link
                to="/"
                onClick={(e) => handleMobileNavClick('/', e)}
                className="inline-flex items-center transition hover:opacity-90 cursor-pointer"
                aria-label="Kembali ke Beranda"
              >
                <VelomingLogo variant="combination" size={36} animated={true} />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-[var(--text-text-gray-text-primary)] hover:text-[var(--background-bg-brand-solid)] focus:outline-none transition-colors cursor-pointer"
                aria-label="Tutup Menu Navigasi"
              >
                <X className="w-6 h-6 stroke-[2]" />
              </button>
            </div>

            {/* Menu List (Veloming Style + Vercel Layout: Inter, Left-Aligned, 14px Phone / 18px Tablet) */}
            <nav className="flex flex-col items-start text-left gap-4 sm:gap-5 px-6 pt-6 sm:pt-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.05 + index * 0.05 }}
                  className="w-full text-left"
                >
                  <Link
                    to={link.path}
                    onClick={(e) => handleMobileNavClick(link.path, e)}
                    className={`block w-full text-left py-1 text-[14px] sm:text-[18px] leading-6 tracking-normal transition-colors ${
                      isActive(link.path)
                        ? 'text-[var(--background-bg-brand-solid)] font-semibold'
                        : 'text-[var(--text-text-gray-text-primary)] font-medium hover:text-[var(--background-bg-brand-solid)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Tombol CTA (Mengikuti di atas tepat di bawah menu, tidak ditarik ke bawah layar) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.2 }}
              className="mt-6 sm:mt-8 px-6 pb-8 flex flex-col gap-3"
            >
              <Link
                to="/report"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full h-11 sm:h-12 text-sm sm:text-base font-semibold text-white bg-[var(--background-bg-brand-solid)] hover:bg-[var(--background-bg-brand-solid-hover)] active:scale-[0.98] rounded-full shadow-sm transition-all duration-150"
              >
                Lapor sekarang
              </Link>
              <Link
                to="/track"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full h-11 sm:h-12 text-sm sm:text-base font-semibold text-[var(--background-bg-brand-solid)] hover:bg-blue-50/70 border border-[#64A2E0] active:scale-[0.98] rounded-full bg-white transition-all duration-150"
              >
                Lacak laporan
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
