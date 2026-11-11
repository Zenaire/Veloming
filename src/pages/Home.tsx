import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Check } from 'lucide-react';
import { HeroSection } from '../components/common/HeroSection';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[var(--background-bg-primary)] text-[var(--text-text-gray-text-primary)]">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <HeroSection />

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
