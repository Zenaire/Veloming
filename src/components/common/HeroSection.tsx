import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TicketView } from './TicketView';
import knifeLogo from '../../assets/knife-logo.png';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative bg-white pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 w-full px-6 max-w-[1392px] mx-auto text-center flex flex-col items-center">
      {/* 1. Eyebrow: Platform Pelaporan Warga (Figma Standard: Title Case & Normal Font) */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-normal text-[var(--text-text-gray-text-tertiary)] mb-4 tracking-normal"
      >
        Platform Pelaporan Warga
      </motion.p>

      {/* 2. Hero Art: Gambar Pisau Lebih Besar & Pulsing Glow Halus (Brand 50 - 200) */}
      <div className="relative flex justify-center items-center mb-8 sm:mb-10 isolate">
        {/* Glow Effect Berdenyut Lembut (Rentang Brand 50 [#E1EDFA] s.d. Brand 200 [#96C0EB]) */}
        <motion.div
          animate={{
            backgroundColor: ['#E1EDFA', '#96C0EB', '#E1EDFA'],
            opacity: [0.35, 0.65, 0.35],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] blur-[70px] md:blur-[90px] rounded-full pointer-events-none -z-10"
        />

        {/* Gambar Pisau (Lebih Besar: w-48 sm:w-56 md:w-64, Rotasi 20s, Pause pada Hover) */}
        <img
          src={knifeLogo}
          alt="Veloming"
          className="relative z-10 w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl animate-[spin_20s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer"
        />
      </div>

      {/* 3. Judul H1 */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-[56px] font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight leading-[1.18] sm:leading-[1.15] max-w-3xl"
      >
        Suara Anda,<br />Tindak Lanjut Nyata.
      </motion.h1>

      {/* 4. Sub-judul */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[20px] text-[var(--text-text-gray-text-tertiary)] max-w-[580px] leading-relaxed"
      >
        Laporkan masalah fasilitas publik dalam hitungan detik. Lacak progresnya secara transparan dengan ID Laporan.
      </motion.p>

      {/* 5. Tombol CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-7 sm:mt-8 flex flex-row items-center justify-center gap-4 w-full"
      >
        <Link
          to="/report"
          className="inline-flex items-center justify-center w-40 sm:w-44 h-12 text-sm sm:text-base font-semibold text-white bg-[var(--background-bg-brand-solid)] hover:bg-[var(--background-bg-brand-solid-hover)] active:scale-95 rounded-full shadow-sm hover:shadow transition-all duration-150"
        >
          Lapor sekarang
        </Link>
        <Link
          to="/track"
          className="inline-flex items-center justify-center w-40 sm:w-44 h-12 text-sm sm:text-base font-semibold text-[var(--background-bg-brand-solid)] hover:bg-blue-50/70 border border-[#64A2E0] active:scale-95 rounded-full transition-all duration-150 bg-white"
        >
          Lacak laporan
        </Link>
      </motion.div>

      {/* 6. Card Laporan Aktif (TicketView) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 sm:mt-14 w-full max-w-[580px]"
      >
        <TicketView
          id="VLM-2026-042"
          status="Diterima"
          category="Infrastruktur Jalan"
          location="Jl. Margonda Raya"
        />
      </motion.div>
    </section>
  );
};
