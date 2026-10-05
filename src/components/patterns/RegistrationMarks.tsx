import React from 'react';

export const CornerMark: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  position,
}) => {
  return (
    <div
      className={`absolute w-6 h-6 pointer-events-none ${
        position === 'top-left'
          ? 'top-1 left-1'
          : position === 'top-right'
          ? 'top-1 right-1'
          : position === 'bottom-left'
          ? 'bottom-1 left-1'
          : 'bottom-1 right-1'
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full stroke-slate-400">
        <circle cx="12" cy="12" r="6" fill="none" strokeWidth="0.5" />
        <line x1="12" y1="0" x2="12" y2="24" strokeWidth="0.5" />
        <line x1="0" y1="12" x2="24" y2="12" strokeWidth="0.5" />
      </svg>
    </div>
  );
};
