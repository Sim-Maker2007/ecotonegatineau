import React from 'react';

export const EcotoneLogo = ({ variant = 'dark', size = 'normal' }) => {
  const isDark = variant === 'dark';
  const scale = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

  return (
    <svg width={180 * scale} height={50 * scale} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(5, 5)">
        <rect x="17" y="28" width="6" height="12" fill={isDark ? "#2D5016" : "#8BC34A"} />
        <polygon points="20,2 35,18 28,18 38,28 5,28 15,18 5,18" fill={isDark ? "#3D6B1E" : "#8BC34A"} />
        <polygon points="20,8 30,18 25,18 33,26 7,26 15,18 10,18" fill={isDark ? "#4A7F24" : "#A5D660"} />
      </g>
      <text x="50" y="28" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="22" fontWeight="700" letterSpacing="3" fill={isDark ? "#1a1a1a" : "#ffffff"}>
        ECOTONE
      </text>
      <text x="50" y="42" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="11" fontWeight="500" letterSpacing="4" fill={isDark ? "#4A7F24" : "#8BC34A"}>
        GATINEAU
      </text>
    </svg>
  );
};
