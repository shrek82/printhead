import React from 'react';
import { ColorDefinition } from '../../types/printer';
import { COMPOSITE_COLORS } from '../../utils/printerColors';

interface MicroTextAndAlignmentProps {
  colors: ColorDefinition[];
  showMicroText: boolean;
  showAlignment: boolean;
  showMixRgb: boolean;
  showResolutionRuler: boolean;
}

export const MicroTextAndAlignment: React.FC<MicroTextAndAlignmentProps> = ({
  colors,
  showMicroText,
  showAlignment,
  showMixRgb,
  showResolutionRuler,
}) => {
  return (
    <div className="space-y-3 py-1">
      {/* Micro-Text Sharpness & Bleed Section */}
      {showMicroText && (
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[9px] font-mono">
            <span className="font-bold text-slate-800">微距文字锐度 (3pt~6pt)</span>
            <span className="text-slate-400">RESOLUTION</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {colors.slice(0, 4).map((color) => {
              const textColor = color.hex === '#FFFF00' ? '#998000' : color.hex;
              return (
                <div key={color.code} className="space-y-0.5">
                  <div className="text-[7.5px] font-mono font-bold" style={{ color: textColor }}>
                    {color.name} [{color.code}]
                  </div>
                  <div className="leading-tight space-y-0.5" style={{ color: textColor }}>
                    <div style={{ fontSize: '3pt' }} className="font-mono truncate">
                      [3pt] 0123456789 ABCDEF · PRINTHEAD SHARPNESS
                    </div>
                    <div style={{ fontSize: '4.5pt' }} className="truncate">
                      [4.5pt] 喷嘴高精锐度文字测试样张
                    </div>
                    <div style={{ fontSize: '6pt' }} className="font-semibold truncate">
                      [6pt] 喷孔通畅 · 边缘平滑无毛刺
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alignment & Composite Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Bidirectional Alignment */}
        {showAlignment && (
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[9px] font-mono">
              <span className="font-bold text-slate-800">双向对齐标尺 (±2)</span>
              <span className="text-slate-400">ALIGNMENT</span>
            </div>

            {/* Vernier scale */}
            <div className="space-y-1.5 py-0.5">
              {['K', 'C', 'M'].map((code) => {
                const cHex = code === 'K' ? '#000000' : code === 'C' ? '#00A0E9' : '#E4007F';
                return (
                  <div key={code} className="flex items-center gap-2">
                    <span className="text-[7.5px] font-mono font-bold w-3 text-slate-700">{code}</span>
                    <div className="flex-1 flex justify-between items-center px-1">
                      {[-2, -1, 0, 1, 2].map((num) => (
                        <div key={num} className="flex flex-col items-center">
                          <div className="w-[1px] h-3" style={{ backgroundColor: cHex }} />
                          <span className="text-[6px] font-mono text-slate-400 mt-0.5">{num}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Registration Crosshairs */}
            <div className="flex items-center justify-around pt-1">
              {[0, 1, 2, 3].map((i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 30 30" className="stroke-slate-900">
                  <circle cx="15" cy="15" r="9" fill="none" strokeWidth="0.8" />
                  <circle cx="15" cy="15" r="4" fill="none" strokeWidth="0.6" />
                  <line x1="15" y1="2" x2="15" y2="28" strokeWidth="0.6" />
                  <line x1="2" y1="15" x2="28" y2="15" strokeWidth="0.6" />
                </svg>
              ))}
            </div>
          </div>
        )}

        {/* Composite RGB */}
        {showMixRgb && (
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[9px] font-mono">
              <span className="font-bold text-slate-800">二次混色 (CMY/RGB)</span>
              <span className="text-slate-400">COMPOSITE</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {COMPOSITE_COLORS.map((comp) => (
                <div key={comp.name} className="flex flex-col">
                  <div className="h-7 w-full relative overflow-hidden" style={{ backgroundColor: comp.hex }}>
                    <svg className="w-full h-full block" preserveAspectRatio="none">
                      <rect width="100%" height="100%" fill={comp.hex} />
                    </svg>
                  </div>
                  <div className="pt-0.5 text-center">
                    <div className="text-[7px] font-bold text-slate-800 truncate">{comp.name.split(' ')[0]}</div>
                    <div className="text-[6px] font-mono text-slate-400">{comp.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution Optical Ruler */}
      {showResolutionRuler && (
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1 text-[8.5px] font-mono">
            <span className="font-bold text-slate-800">150mm 物理标尺</span>
            <span className="text-slate-400">150mm</span>
          </div>

          <div className="relative h-5 border-b border-slate-900 flex items-end">
            {/* Millimeter ticks */}
            {Array.from({ length: 151 }).map((_, i) => {
              const isCm = i % 10 === 0;
              const isHalfCm = i % 5 === 0 && !isCm;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <div
                    className="w-[1px] bg-slate-900"
                    style={{
                      height: isCm ? '14px' : isHalfCm ? '9px' : '4px',
                    }}
                  />
                  {isCm && (
                    <span className="text-[6px] font-mono text-slate-700 absolute -bottom-3">
                      {i / 10}cm
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
