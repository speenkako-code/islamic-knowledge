import React from 'react';

// Vintage Islamic ornate corner bracket (Arabesque corner piece)
export const OrnateCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = 'text-[#9c845f]', size = 36 }) => {
  const transforms: Record<string, string> = {
    'top-left': 'rotate(0deg)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: transforms[position],
      }}
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M4 44V16C4 9.37258 9.37258 4 16 4H44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 44V20C10 14.4772 14.4772 10 20 10H44"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M16 26C16 20.4772 20.4772 16 26 16C31.5228 16 36 20.4772 36 26"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="26" cy="26" r="3.5" fill="currentColor" />
        <path
          d="M4 4L12 12M4 14C8 10 10 8 14 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6" cy="6" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

// Ornate Islamic Divider with centered floral rosette
export const OrnateDivider: React.FC<{ className?: string; text?: string }> = ({
  className = 'my-4 text-[#9c845f]',
  text,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full select-none ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b89f74] to-[#8c7450]" />
      <span className="text-[#8c7450] text-xs sm:text-sm font-serif flex items-center gap-1.5 px-1">
        <span className="text-[#c99738]">✦</span>
        {text ? <span className="px-2 font-medium">{text}</span> : <span className="text-base">۞</span>}
        <span className="text-[#c99738]">✦</span>
      </span>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#b89f74] to-[#8c7450]" />
    </div>
  );
};

// Central Medallion / Rosette seal like underneath the hero frame
export const IslamicRosette: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = 'text-[#c99738]',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer rosette circles */}
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
        
        {/* 8-pointed star / Khatam */}
        <rect x="23" y="23" width="54" height="54" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 50 50)" />
        <rect x="23" y="23" width="54" height="54" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 50 50)" />
        
        {/* Inner floral star */}
        <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="7" fill="currentColor" />
        
        {/* Radial decorative dots */}
        <circle cx="50" cy="8" r="2" fill="currentColor" />
        <circle cx="50" cy="92" r="2" fill="currentColor" />
        <circle cx="8" cy="50" r="2" fill="currentColor" />
        <circle cx="92" cy="50" r="2" fill="currentColor" />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        <circle cx="80" cy="20" r="1.5" fill="currentColor" />
        <circle cx="20" cy="80" r="1.5" fill="currentColor" />
        <circle cx="80" cy="80" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Mosque Skyline Silhouette for Footer
export const MosqueSkyline: React.FC<{ className?: string }> = ({ className = 'text-[#d6cbba]' }) => {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-14 sm:h-20 opacity-70"
      >
        {/* Repeating Mosque silhouettes */}
        <path d="M0,120 L0,105 L20,105 L20,30 L23,30 L23,10 L25,0 L27,10 L27,30 L30,30 L30,105 L80,105 C80,85 95,70 120,65 C145,70 160,85 160,105 L210,105 L210,40 L213,40 L215,20 L217,40 L220,40 L220,105 L270,105 C270,75 295,50 330,45 C365,50 390,75 390,105 L440,105 L440,30 L443,30 L445,10 L447,30 L450,30 L450,105 L500,105 C500,85 515,70 540,65 C565,70 580,85 580,105 L630,105 L630,35 L633,35 L635,15 L637,35 L640,35 L640,105 L690,105 C690,75 715,50 750,45 C785,50 810,75 810,105 L860,105 L860,30 L863,30 L865,10 L867,30 L870,30 L870,105 L920,105 C920,85 935,70 960,65 C985,70 1000,85 1000,105 L1050,105 L1050,40 L1053,40 L1055,20 L1057,40 L1060,40 L1060,105 L1110,105 C1110,75 1135,50 1170,45 C1195,48 1200,60 1200,105 L1200,120 Z" />
      </svg>
    </div>
  );
};
