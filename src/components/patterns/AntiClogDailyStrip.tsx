import React from 'react';
import { ColorDefinition, StripDensity, StripLayout } from '../../types/printer';

interface AntiClogDailyStripProps {
  colors: ColorDefinition[];
  density: StripDensity;
  layout: StripLayout;
  printerModel: string;
  testDate: string;
}

export const AntiClogDailyStrip: React.FC<AntiClogDailyStripProps> = ({
  colors,
  density,
  layout,
  printerModel,
  testDate,
}) => {
  const getBandOpacity = () => {
    switch (density) {
      case 'eco':
        return 0.65;
      case 'heavy':
        return 1.0;
      case 'standard':
      default:
        return 0.9;
    }
  };

  const opacity = getBandOpacity();

  // Render a single anti-clog strip unit
  const renderStripUnit = (indexNumber?: number) => (
    <div className="py-1 space-y-2">
      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
        <span className="text-[9px] font-bold text-slate-800 font-mono">
          {indexNumber ? `#${indexNumber} · ` : ''}防堵贯通色带
        </span>
        <div className="text-[7.5px] font-mono text-slate-400">
          <span>{printerModel || 'PRINTER'}</span> · <span>{testDate}</span>
        </div>
      </div>

      {/* Full-width continuous color bars */}
      <div className="space-y-1">
        {colors.map((color) => (
          <div key={color.code} className="flex items-center gap-2">
            <span
              className="text-[8.5px] font-mono font-bold w-4 text-right shrink-0"
              style={{ color: color.hex === '#FFFF00' ? '#b59a00' : color.hex }}
            >
              {color.code}
            </span>

            {/* Continuous Full-Sweep Band */}
            <div className="flex-1 flex overflow-hidden h-4.5">
              {/* Solid section */}
              <div
                className="w-3/5 h-full relative"
                style={{
                  backgroundColor: color.hex,
                  opacity: opacity,
                }}
              >
                <svg className="w-full h-full block" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill={color.hex} fillOpacity={opacity} />
                </svg>
              </div>
              {/* Stepped exercise section */}
              <div
                className="w-1/5 h-full relative"
                style={{
                  backgroundColor: color.hex,
                  opacity: opacity * 0.7,
                }}
              >
                <svg className="w-full h-full block" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill={color.hex} fillOpacity={opacity * 0.7} />
                </svg>
              </div>
              {/* Fine micro-droplet section */}
              <div
                className="w-1/5 h-full relative"
                style={{
                  backgroundColor: color.hex,
                  opacity: opacity * 0.4,
                }}
              >
                <svg className="w-full h-full block" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill={color.hex} fillOpacity={opacity * 0.4} />
                </svg>
              </div>
            </div>

            <span className="text-[7px] font-mono text-slate-400 w-6 text-right shrink-0">
              100%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (layout === 'triple-strips') {
    return (
      <div className="space-y-5">
        <div className="text-center pb-1 text-[8px] font-mono text-slate-400 border-b border-slate-200">
          A4 三联防堵条 (可单张裁切使用)
        </div>
        {renderStripUnit(1)}
        <div className="border-t border-slate-200 relative my-2">
          <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 bg-white px-2 text-[7px] text-slate-400 font-mono">
            ✂️ 裁切线
          </span>
        </div>
        {renderStripUnit(2)}
        <div className="border-t border-slate-200 relative my-2">
          <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 bg-white px-2 text-[7px] text-slate-400 font-mono">
            ✂️ 裁切线
          </span>
        </div>
        {renderStripUnit(3)}
      </div>
    );
  }

  // Single full page purge mode
  return (
    <div className="space-y-4">
      {renderStripUnit()}

      {/* Expanded full coverage exercise bands for single full page */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2">
          <span className="text-[8.5px] font-bold font-mono text-slate-800">
            大墨量贯通冲刷区
          </span>
          <span className="text-[7.5px] font-mono text-slate-400">100% PURGE</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {colors.map((color) => (
            <div key={color.code} className="space-y-1">
              <div
                className="h-10 w-full relative overflow-hidden"
                style={{ backgroundColor: color.hex, opacity: opacity }}
              >
                <svg className="w-full h-full block" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill={color.hex} fillOpacity={opacity} />
                </svg>
              </div>
              <div className="flex justify-between items-center text-[7.5px] font-mono">
                <span className="font-bold text-slate-800">{color.name}</span>
                <span className="text-slate-400">{color.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
