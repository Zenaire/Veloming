import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Search, Check } from 'lucide-react';
import { TicketView } from '../components/common/TicketView';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[var(--background-bg-primary)] text-[var(--text-text-gray-text-primary)]">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* Figma Frame: [4032:49] Container:margin (1440x889)                        */}
      {/* ========================================================================= */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 w-full px-6 max-w-[1392px] mx-auto text-center flex flex-col items-center">
        {/* Eyebrow: Platform Pelaporan Warga */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-normal text-[var(--text-text-gray-text-tertiary)] mb-3 tracking-normal"
        >
          Platform Pelaporan Warga
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-[56px] font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight leading-[1.18] sm:leading-[1.15] max-w-3xl"
        >
          Suara Anda,<br />Tindak Lanjut Nyata.
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[20px] text-[var(--text-text-gray-text-tertiary)] max-w-[580px] leading-relaxed"
        >
          Laporkan masalah fasilitas publik dalam hitungan detik. Lacak progresnya secara transparan dengan ID Laporan.
        </motion.p>

        {/* CTA Buttons */}
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

        {/* ========================================================================= */}
        {/* HERO FLOATING STATUS CARD (TicketView - Figma Node 4127:17424)           */}
        {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* SECTION 2: THREE STEPS SECTION                                            */}
      {/* Figma Frame: [4032:89] Container:margin (1440x525)                        */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 w-full px-6 max-w-[1392px] mx-auto text-center border-t border-[var(--border-border-secondary)]">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight">
            Cepat. Transparan. Akuntabel.
          </h2>
          <p className="mt-2 sm:mt-2.5 text-sm sm:text-base text-[var(--text-text-gray-text-tertiary)]">
            Tiga langkah sederhana untuk memastikan suara Anda didengar.
          </p>
        </div>

        {/* Steps Grid: Desktop (3 columns) / Tablet & Mobile (Vertical Stack) */}
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[var(--background-bg-brand-secondary)] text-[var(--background-bg-brand-solid)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
              <Plus className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-text-gray-text-tertiary)] uppercase tracking-wider">
              Langkah 01
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-text-gray-text-primary)] mt-1.5">
              Lapor
            </h3>
            <p className="mt-1.5 text-sm text-[var(--text-text-gray-text-tertiary)] leading-relaxed max-w-[240px]">
              Isi formulir singkat dengan detail masalah yang Anda temukan. Hanya butuh 30 detik.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[var(--background-bg-brand-secondary)] text-[var(--background-bg-brand-solid)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
              <Search className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-text-gray-text-tertiary)] uppercase tracking-wider">
              Langkah 02
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-text-gray-text-primary)] mt-1.5">
              Lacak
            </h3>
            <p className="mt-1.5 text-sm text-[var(--text-text-gray-text-tertiary)] leading-relaxed max-w-[240px]">
              Gunakan ID Laporan untuk memantau progres laporan Anda secara real-time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[var(--background-bg-brand-secondary)] text-[var(--background-bg-brand-solid)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
              <Check className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-text-gray-text-tertiary)] uppercase tracking-wider">
              Langkah 03
            </span>
            <h3 className="text-lg font-semibold text-[var(--text-text-gray-text-primary)] mt-1.5">
              Selesai
            </h3>
            <p className="mt-1.5 text-sm text-[var(--text-text-gray-text-tertiary)] leading-relaxed max-w-[240px]">
              Instansi terkait menindaklanjuti dan Anda mendapat notifikasi saat masalah teratasi.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: STATISTICS SECTION                                             */}
      {/* Figma Frame: [4032:132] Container:margin (1440x565)                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 w-full px-6 max-w-[1392px] mx-auto text-center border-t border-[var(--border-border-secondary)]">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight mb-8 sm:mb-10">
          Transparansi dalam Angka
        </h2>

        {/* 3 Stat Cards: Desktop (3 columns) / Tablet & Mobile (Vertical Stack) */}
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-[18px] border border-[var(--border-border-secondary)] py-8 px-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl sm:text-4xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight">
              12.847
            </p>
            <p className="text-sm font-semibold text-[var(--text-text-gray-text-tertiary)] mt-2">
              Laporan Diterima
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[18px] border border-[var(--border-border-secondary)] py-8 px-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl sm:text-4xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight">
              89%
            </p>
            <p className="text-sm font-semibold text-[var(--text-text-gray-text-tertiary)] mt-2">
              Tingkat Respon
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[18px] border border-[var(--border-border-secondary)] py-8 px-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl sm:text-4xl font-semibold text-[var(--text-text-gray-text-primary)] tracking-tight">
              6.214
            </p>
            <p className="text-sm font-semibold text-[var(--text-text-gray-text-tertiary)] mt-2">
              Masalah Terselesaikan
            </p>
          </div>
        </div>

        {/* Bottom Note & CTA Button */}
        <p className="mt-10 sm:mt-12 text-sm sm:text-base text-[var(--text-text-gray-text-tertiary)]">
          Bergabunglah dengan ribuan warga yang telah menggunakan Veloming.
        </p>

        <div className="mt-4 flex justify-center">
          <Link
            to="/report"
            className="inline-flex items-center justify-center w-40 sm:w-44 h-12 text-sm sm:text-base font-semibold text-white bg-[var(--background-bg-brand-solid)] hover:bg-[var(--background-bg-brand-solid-hover)] active:scale-95 rounded-full shadow-sm hover:shadow transition-all duration-150"
          >
            Lapor sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};
