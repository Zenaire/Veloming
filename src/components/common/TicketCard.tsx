import React from 'react';
import { TicketStatus } from './TicketView';

export interface TicketCardProps {
  id: string;
  category: string;
  status: TicketStatus;
  device?: 'Desktop' | 'Tablet' | 'Phone' | 'auto';
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Ticket component based on Figma node 4151:21481
 * Variants:
 * - Desktop: 680x80, p-4, rounded-lg, ID: 14px/20px SemiBold, Cat: 12px/16px Regular, Badge: h-7 text-sm py-1 px-3 (14px)
 * - Tablet:  680x80, p-4, rounded-lg, ID: 14px/20px SemiBold, Cat: 12px/16px Regular, Badge: h-6 text-xs py-1 px-3 (12px)
 * - Phone:   Responsive (max-w-[346px] / w-full) x 80, p-4, rounded-lg, ID: 14px/20px SemiBold, Cat: 12px/16px Regular, Badge: h-6 text-xs py-1 px-3 (12px)
 */
export const TicketCard: React.FC<TicketCardProps> = ({
  id,
  category,
  status,
  device = 'auto',
  isSelected = false,
  onClick,
  className = '',
}) => {
  const getBadgeColor = (status: TicketStatus) => {
    switch (status) {
      case 'Diterima':
        return 'bg-[#F3F4F6] text-[#4B5563]';
      case 'Diproses':
        return 'bg-[var(--background-bg-brand-primary)] text-[var(--text-text-gray-text-brand-primary)]';
      case 'Selesai':
        return 'bg-[#DCFAEC] text-[#079455]';
      case 'Ditolak':
        return 'bg-[#FEF3F2] text-[#D92D21]';
    }
  };

  // Badge sizing based on device specification from Figma node 4151:21481
  const getBadgeSizeClass = () => {
    if (device === 'Desktop') {
      return 'h-7 text-sm leading-5';
    }
    if (device === 'Tablet' || device === 'Phone') {
      return 'h-6 text-xs leading-4';
    }
    // Auto: Phone & Tablet use h-6 text-xs, Desktop (lg+) uses h-7 text-sm
    return 'h-6 text-xs leading-4 lg:h-7 lg:text-sm lg:leading-5';
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`w-full h-20 bg-white border rounded-lg p-4 flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs select-none ${
        isSelected
          ? 'border-[var(--background-bg-brand-solid)] ring-1 ring-[var(--background-bg-brand-solid)]'
          : 'border-[var(--border-border-secondary)] hover:border-gray-300'
      } ${className}`}
    >
      {/* Left Column: ID and Category */}
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold text-[var(--text-text-gray-text-primary)] font-mono leading-5">
          {id}
        </span>
        <span className="text-xs text-[var(--text-text-gray-text-tertiary)] font-normal leading-4 mt-1">
          {category}
        </span>
      </div>

      {/* Right Column: Status Sign / Badge */}
      <span
        className={`inline-flex items-center justify-center px-3 rounded-full font-normal transition-colors ${getBadgeSizeClass()} ${getBadgeColor(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
};

