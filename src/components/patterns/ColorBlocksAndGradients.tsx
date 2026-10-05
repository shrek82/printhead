import React from 'react';
import { ColorDefinition } from '../../types/printer';
import { GRADIENT_STEPS } from '../../utils/printerColors';

interface ColorBlocksAndGradientsProps {
  colors: ColorDefinition[];
  showSolid: boolean;
  showGradients: boolean;
}

export const ColorBlocksAndGradients: React.FC<ColorBlocksAndGradientsProps> = ({
  colors,
  showSolid,
  showGradients,
}) => {
  return (
    <div className="space-y-3 py-1">
      {/* 100% Solid Blocks */}
      {showSolid && (
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[9px] font-mono">
            <span className="font-bold text-slate-800">纯色平涂块 (100%)</span>
            <span className="text-slate-400">SOLID BLOCKS</span>
          </div>

          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${colors.length}, minmax(0, 1fr))` }}
          >
            {colors.map((color) => (
              <div key={color.code} className="flex flex-col">
                {/* Solid Block */}
                <div
                  className="h-11 w-full relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  <svg className="w-full h-full block" preserveAspectRatio="none">
                    <rect width="100%" height="100%" fill={color.hex} />
                  </svg>
                </div>
                <div className="pt-1 text-[8px] font-mono flex justify-between items-center text-slate-700">
                  <span className="font-bold">{color.code}</span>
                  <span className="text-slate-400">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10-Step Halftone Gradient Ramps */}
      {showGradients && (
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[9px] font-mono">
            <span className="font-bold text-slate-800">阶梯色阶 (10%~100%)</span>
            <span className="text-slate-400">GRADIENT RAMPS</span>
          </div>

          <div className="space-y-1.5">
            {colors.map((color) => (
              <div key={color.code} className="flex items-center gap-2">
                <span
                  className="w-5 text-[9px] font-mono font-bold text-right shrink-0"
                  style={{ color: color.hex === '#FFFF00' ? '#b59a00' : color.hex }}
                >
                  {color.code}
                </span>

                <div className="flex-1 grid grid-cols-10 divide-x divide-white/40 overflow-hidden">
                  {GRADIENT_STEPS.map((step) => {
                    const opacity = step / 100;
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className="h-5 w-full relative overflow-hidden"
                          style={{
                            backgroundColor: color.hex,
                            opacity: opacity,
                          }}
                        >
                          <svg className="w-full h-full block" preserveAspectRatio="none">
                            <rect width="100%" height="100%" fill={color.hex} fillOpacity={opacity} />
                          </svg>
                        </div>
                        <span className="text-[6.5px] font-mono text-slate-400 py-0.5 w-full text-center">
                          {step}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
