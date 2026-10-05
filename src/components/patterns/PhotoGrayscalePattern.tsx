import React from 'react';
import { ColorDefinition } from '../../types/printer';

interface PhotoGrayscalePatternProps {
  colors: ColorDefinition[];
}

export const PhotoGrayscalePattern: React.FC<PhotoGrayscalePatternProps> = ({ colors }) => {
  const graySteps = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  const highlights = [1, 2, 3, 4, 5];
  const shadows = [95, 96, 97, 98, 99];

  return (
    <div className="space-y-3 py-1">
      {/* 256-Level Continuous Gradients */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">
            平滑色彩渐变 (256级无阶差)
          </span>
          <span className="text-slate-400">SMOOTH GRADIENTS</span>
        </div>

        <div className="space-y-1.5">
          {colors.map((color) => (
            <div key={color.code} className="flex items-center gap-2">
              <span
                className="w-4 text-[8.5px] font-mono font-bold text-right shrink-0"
                style={{ color: color.hex === '#FFFF00' ? '#b59a00' : color.hex }}
              >
                {color.code}
              </span>
              <div className="flex-1 h-4.5 relative overflow-hidden">
                <svg className="w-full h-full block" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`grad-${color.code}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor={color.hex} />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grad-${color.code})`} />
                </svg>
              </div>
              <span className="text-[7px] font-mono text-slate-400 w-10 text-right shrink-0">
                0→100%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 21-Step Neutral Gray Wedge */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">
            中性灰色阶 (0%~100%)
          </span>
          <span className="text-slate-400">NEUTRAL GRAY</span>
        </div>

        <div className="grid grid-cols-21 divide-x divide-white/40 overflow-hidden" style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}>
          {graySteps.map((pct) => {
            const grayVal = Math.round(255 * (1 - pct / 100));
            const rgbStr = `rgb(${grayVal}, ${grayVal}, ${grayVal})`;
            return (
              <div key={pct} className="flex flex-col items-center">
                <div className="h-8 w-full relative overflow-hidden">
                  <svg className="w-full h-full block" preserveAspectRatio="none">
                    <rect width="100%" height="100%" fill={rgbStr} />
                  </svg>
                </div>
                <span className="text-[5.5px] font-mono text-slate-400 py-0.5 w-full text-center">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highlight and Shadow Detail Separation */}
      <div className="grid grid-cols-2 gap-3">
        {/* Highlights: 1% to 5% */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
            <span className="font-bold text-slate-800">极亮部高光 (1%~5%)</span>
            <span className="text-[7px] text-slate-400">HIGHLIGHT</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {highlights.map((h) => {
              const val = Math.round(255 * (1 - h / 100));
              return (
                <div key={h} className="flex flex-col items-center">
                  <div className="h-7 w-full border border-slate-200" style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }} />
                  <span className="text-[6.5px] font-mono text-slate-500 mt-0.5">{h}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shadows: 95% to 99% */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
            <span className="font-bold text-slate-800">极暗部暗阶 (95%~99%)</span>
            <span className="text-[7px] text-slate-400">SHADOW</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {shadows.map((s) => {
              const val = Math.round(255 * (1 - s / 100));
              return (
                <div key={s} className="flex flex-col items-center">
                  <div className="h-7 w-full" style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }} />
                  <span className="text-[6.5px] font-mono text-slate-500 mt-0.5">{s}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
