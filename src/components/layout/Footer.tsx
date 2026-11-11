import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-white pt-16 pb-8 border-t border-[#E9EAEB]">
      {/* 3 Columns Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 mb-12">
        {/* Kolom 1: Brand & Deskripsi */}
        <div className="flex flex-col text-left">
          <h3 className="text-xl font-bold text-[var(--text-text-gray-text-primary)] mb-3">
            Veloming
          </h3>
          <p className="text-sm text-[#717680] leading-relaxed max-w-sm">
            Platform pelaporan fasilitas publik untuk mendorong transparansi di Kota Depok.
          </p>
        </div>

        {/* Kolom 2: Navigasi */}
        <div className="flex flex-col text-left">
          <h4 className="text-sm font-semibold text-[var(--text-text-gray-text-primary)] mb-4">
            Navigasi
          </h4>
          <ul className="space-y-2.5 text-sm text-[#717680]">
            <li>
              <Link to="/" className="hover:text-[var(--background-bg-brand-solid)] transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/report" className="hover:text-[var(--background-bg-brand-solid)] transition-colors">
                Lapor
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-[var(--background-bg-brand-solid)] transition-colors">
                Lacak Laporan
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Informasi */}
        <div className="flex flex-col text-left">
          <h4 className="text-sm font-semibold text-[var(--text-text-gray-text-primary)] mb-4">
            Informasi
          </h4>
          <div className="space-y-2.5 text-sm text-[#717680]">
            <p>
              Email:{' '}
              <a
                href="mailto:battleship2952@gmail.com"
                className="hover:text-[var(--background-bg-brand-solid)] hover:underline transition-colors"
              >
                battleship2952@gmail.com
              </a>
            </p>
            <p>Lokasi: Depok, Indonesia</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-[#717680] relative z-10 mt-8">
        &copy; 2026 Veloming. Platform Pelaporan Warga untuk Transparansi Publik.
      </div>

      {/* Giant Watermark */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[120px] md:text-[180px] font-bold text-[#181D28] opacity-[0.03] pointer-events-none select-none whitespace-nowrap z-0">
        VELOMING
      </div>
    </footer>
  );
};
