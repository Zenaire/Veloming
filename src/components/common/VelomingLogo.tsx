import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type LogoVariant = 'combination' | 'combination-kanji' | 'icon' | 'wordmark';
export type LogoTheme = 'light' | 'dark' | 'auto';

interface VelomingLogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  animated?: boolean;
  className?: string;
}

export const VelomingLogo: React.FC<VelomingLogoProps> = ({
  variant = 'combination',
  theme = 'auto',
  size = 'md',
  animated = true,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Size mappings in px (height of container)
  const sizeMap: Record<string, number> = {
    sm: 32,
    md: 44,
    lg: 60,
    xl: 80,
  };

  const height = typeof size === 'number' ? size : sizeMap[size] || 44;
  const iconSize = Math.round(height * 0.75);

  // Theme-aware color styles
  const isDark = theme === 'dark';
  const textColorClass = isDark ? 'text-white' : 'text-gray-900';
  const iconFill = isDark ? '#F7F7F7' : '#181D27';

  // Rotation animation config with reduced motion support
  const rotateAnimation = shouldReduceMotion || !animated
    ? undefined
    : {
        rotate: [0, 90, 180, 270, 360],
        transition: {
          duration: 16,
          repeat: Infinity,
          ease: 'linear' as const,
        },
      };

  const hoverAnimation = shouldReduceMotion || !animated
    ? undefined
    : {
        rotate: 45,
        scale: 1.08,
        transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
      };

  const renderIcon = () => (
    <motion.div
      className="inline-flex items-center justify-center flex-shrink-0 cursor-pointer"
      whileHover={hoverAnimation}
      style={{ width: iconSize, height: iconSize }}
    >
      <motion.svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={rotateAnimation}
        className="w-full h-full transform-gpu"
        style={{ transformOrigin: 'center center' }}
      >
        <g clipPath="url(#veloming-icon-clip)">
          {/* Polygon 1 */}
          <path
            d="M5.57375 73.4559L26.4509 26.4508L52.5788 52.5787L5.57375 73.4559Z"
            fill={iconFill}
            fillOpacity={0.88}
          />
          {/* Polygon 2 */}
          <path
            d="M27.2584 27.2582L0.110912 14.8076L14.8078 0.11071L27.2584 27.2582Z"
            fill={iconFill}
            fillOpacity={0.75}
          />
          {/* Polygon 3 */}
          <path
            d="M73.456 5.57371L52.5789 52.5788L26.451 26.4509L73.456 5.57371Z"
            fill={iconFill}
            fillOpacity={0.95}
          />
          {/* Polygon 4 */}
          <path
            d="M95.1405 95.1405L24.6329 63.8247L63.8248 24.6329L95.1405 95.1405Z"
            fill={iconFill}
          />
        </g>
        <defs>
          <clipPath id="veloming-icon-clip">
            <rect width="96" height="96" fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </motion.div>
  );

  const renderWordmark = () => {
    const isKanji = variant === 'combination-kanji';
    return (
      <span
        className={`font-semibold tracking-tight leading-none ${textColorClass}`}
        style={{ fontSize: Math.round(height * 0.45) }}
      >
        {isKanji ? 'Velo明' : 'Veloming'}
      </span>
    );
  };

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{renderIcon()}</div>;
  }

  if (variant === 'wordmark') {
    return <div className={`inline-flex items-center ${className}`}>{renderWordmark()}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {renderIcon()}
      {renderWordmark()}
    </div>
  );
};
