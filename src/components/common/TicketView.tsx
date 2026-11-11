import React from 'react';
import { Star, Check, X } from 'lucide-react';
import { motion } from 'motion/react';

export type TicketStatus = 'Diterima' | 'Diproses' | 'Selesai' | 'Ditolak';

export interface TicketViewProps {
  id?: string;
  status?: TicketStatus;
  category?: string;
  location?: string;
  rejectionReason?: string;
  className?: string;
}

export const TicketView: React.FC<TicketViewProps> = ({
  id = 'VLM-2026-042',
  status = 'Diterima',
  category = 'Infrastruktur Jalan',
  location = 'Jl. Margonda Raya',
  rejectionReason = 'Laporan tidak valid (spam). Mohon kirim laporan yang relevan dengan fasilitas publik.',
  className = '',
}) => {
  const isDitolak = status === 'Ditolak';

  // Badge configurations
  const getBadgeStyle = () => {
    switch (status) {
      case 'Diterima':
        return 'bg-[var(--background-bg-tertiary)] text-[var(--text-text-gray-text-tertiary)]';
      case 'Diproses':
        return 'bg-[var(--background-bg-brand-primary)] text-[var(--text-text-gray-text-brand-primary)]';
      case 'Selesai':
        return 'bg-[#DCFAEC] text-[#079455]';
      case 'Ditolak':
        return 'bg-[#FEF3F2] text-[#D92D21]';
    }
  };

  return (
    <div
      className={`bg-[var(--background-bg-secondary)] rounded-[20px] border border-[var(--border-border-secondary)] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] p-5 sm:p-6 text-left transition-all ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. HEADER (Sign Icon, Laporan Aktif, ID Laporan, Status Badge)           */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pb-5 border-b border-[var(--border-border-secondary)]">
        <div className="flex items-center gap-3">
          {/* Icon Badge */}
          {isDitolak ? (
            <div className="w-10 h-10 rounded-full bg-[#FEF3F2] flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 text-[#D92D21] stroke-[2.2]" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--background-bg-brand-primary)] flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-[var(--background-bg-brand-solid)] fill-[var(--background-bg-brand-solid)]" />
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold text-[var(--text-text-gray-text-primary)] leading-tight">
              Laporan Aktif
            </h2>
            <p className="text-xs text-[var(--text-text-gray-text-tertiary)] font-mono mt-0.5">
              {id}
            </p>
          </div>
        </div>

        {/* Status Tag Badge */}
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${getBadgeStyle()}`}
        >
          {status}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 2. STEPPER PROGRESS BAR (Diterima -> Diproses -> Selesai)                 */}
      {/* ========================================================================= */}
      <div className="py-6 px-1 sm:px-3">
        <div className="relative flex items-center justify-between">
          {/* Connecting Track Line: Step 1 to Step 2 */}
          <div className="absolute top-4 left-[16%] right-[50%] h-[2px] bg-[#E9EAEB] z-0">
            {status === 'Diterima' && (
              <div className="h-full bg-[var(--background-bg-brand-solid)] w-1/2"></div>
            )}
            {(status === 'Diproses' || status === 'Selesai') && (
              <div className="h-full bg-[var(--background-bg-brand-solid)] w-full"></div>
            )}
          </div>

          {/* Connecting Track Line: Step 2 to Step 3 */}
          <div className="absolute top-4 left-[50%] right-[16%] h-[2px] bg-[#E9EAEB] z-0">
            {status === 'Diproses' && (
              <div className="h-full bg-[var(--background-bg-brand-solid)] w-1/2"></div>
            )}
            {status === 'Selesai' && (
              <div className="h-full bg-[var(--background-bg-brand-solid)] w-full"></div>
            )}
          </div>

          {/* Step 1: Diterima */}
          <div className="relative z-10 flex flex-col items-center w-24">
            {isDitolak ? (
              <div className="w-8 h-8 rounded-full bg-[#D92D21] flex items-center justify-center text-white shadow-xs">
                <X className="w-4 h-4 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[var(--background-bg-brand-solid)] flex items-center justify-center text-white shadow-xs">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            )}
            <span
              className={`mt-2 text-xs font-normal ${
                isDitolak
                  ? 'text-[#D92D21] font-medium'
                  : 'text-[var(--text-text-gray-text-primary)]'
              }`}
            >
              Diterima
            </span>
          </div>

          {/* Step 2: Diproses */}
          <div className="relative z-10 flex flex-col items-center w-24">
            {status === 'Selesai' ? (
              <div className="w-8 h-8 rounded-full bg-[var(--background-bg-brand-solid)] flex items-center justify-center text-white shadow-xs">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            ) : status === 'Diproses' ? (
              <div className="w-8 h-8 rounded-full bg-[var(--background-bg-brand-solid)] flex items-center justify-center text-white shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-white border border-[#E9EAEB] flex items-center justify-center text-xs text-[var(--text-text-gray-text-tertiary)] shadow-2xs">
                2
              </div>
            )}
            <span
              className={`mt-2 text-xs font-normal ${
                status === 'Diproses'
                  ? 'text-[var(--text-text-gray-text-primary)] font-medium'
                  : 'text-[var(--text-text-gray-text-tertiary)]'
              }`}
            >
              Diproses
            </span>
          </div>

          {/* Step 3: Selesai */}
          <div className="relative z-10 flex flex-col items-center w-24">
            {status === 'Selesai' ? (
              <div className="w-8 h-8 rounded-full bg-[var(--background-bg-brand-solid)] flex items-center justify-center text-white shadow-xs">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-white border border-[#E9EAEB] flex items-center justify-center text-xs text-[var(--text-text-gray-text-tertiary)] shadow-2xs">
                3
              </div>
            )}
            <span
              className={`mt-2 text-xs font-normal ${
                status === 'Selesai'
                  ? 'text-[var(--text-text-gray-text-primary)] font-medium'
                  : 'text-[var(--text-text-gray-text-tertiary)]'
              }`}
            >
              Selesai
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DETAILS (Kategori & Lokasi)                                            */}
      {/* ========================================================================= */}
      <div className="pt-4 border-t border-[var(--border-border-secondary)] space-y-3">
        <div>
          <span className="text-xs text-[var(--text-text-gray-text-tertiary)] block font-normal leading-4">
            Kategori
          </span>
          <p className="text-sm text-[var(--text-text-gray-text-primary)] font-normal mt-0.5">
            {category}
          </p>
        </div>

        <div>
          <span className="text-xs text-[var(--text-text-gray-text-tertiary)] block font-normal leading-4">
            Lokasi
          </span>
          <p className="text-sm text-[var(--text-text-gray-text-primary)] font-normal mt-0.5">
            {location}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ALASAN PENOLAKAN (Khusus status 'Ditolak' - Figma Node 4127:17424)     */}
      {/* ========================================================================= */}
      {isDitolak && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25 }}
          className="mt-4 p-4 rounded-lg bg-[#FEF3F2] border border-[#FDA29B] text-left"
        >
          <h4 className="text-sm font-semibold text-[#D92D21] leading-5">
            Alasan Penolakan
          </h4>
          <p className="text-sm text-[#D92D21] font-normal leading-relaxed mt-1">
            {rejectionReason}
          </p>
        </motion.div>
      )}
    </div>
  );
};

