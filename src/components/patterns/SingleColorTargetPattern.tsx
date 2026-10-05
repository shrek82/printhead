import React from 'react';
import { ColorDefinition, SingleTargetColor } from '../../types/printer';
import { GRADIENT_STEPS } from '../../utils/printerColors';

interface SingleColorTargetPatternProps {
  color: ColorDefinition;
  printerModel: string;
  testDate: string;
}

export const SingleColorTargetPattern: React.FC<SingleColorTargetPatternProps> = ({
  color,
  printerModel,
  testDate,
}) => {
  return (
    <div className="space-y-3 py-1">
      {/* Large Area 100% Solid Purge Pad */}
      <div>
        <div className="flex items-center justify-between text-[8.5px] font-mono border-b border-slate-200 pb-1 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: color.hex }} />
            <span className="font-bold text-slate-800">
              {color.name} [{color.code}] 100% 纯色定向冲刷
            </span>
          </div>
          <span className="text-slate-400 font-mono">100% FLUSH</span>
        </div>
        <div className="h-20 w-full relative overflow-hidden">
          <svg className="w-full h-full block" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill={color.hex} />
          </svg>
        </div>
      </div>

      {/* 64-step dense ladder for this color */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">喷嘴阶梯检查 (64阶)</span>
          <span className="text-slate-400">{color.code} LADDER</span>
        </div>

        <div className="flex justify-center py-0.5">
          <svg viewBox="0 0 500 120" className="w-full h-auto max-h-[115px]" style={{ shapeRendering: 'crispEdges' }}>
            {Array.from({ length: 64 }).map((_, i) => {
              const x = 10 + i * 7.5;
              const y = 8 + (i % 8) * 13;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x + 9} y2={y} stroke={color.hex} strokeWidth="1.0" />
                  {i < 63 && (
                    <line x1={x + 9} y1={y} x2={x + 9} y2={y + 13} stroke={color.hex} strokeWidth="0.5" opacity="0.4" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 10-step Gradient Ramp */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">阶梯色阶过渡 (10%~100%)</span>
          <span className="text-slate-400">GRADIENT</span>
        </div>

        <div className="grid grid-cols-10 divide-x divide-white/40 overflow-hidden">
          {GRADIENT_STEPS.map((step) => {
            const opacity = step / 100;
            return (
              <div key={step} className="flex flex-col items-center">
                <div className="h-6 w-full relative overflow-hidden">
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

      {/* Parallel Fine Grid */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">偏针与细线测试 (0.3mm)</span>
          <span className="text-slate-400">PITCH</span>
        </div>
        <div className="h-6 flex flex-col justify-between py-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full h-[0.75px]" style={{ backgroundColor: color.hex }} />
          ))}
        </div>
      </div>
    </div>
  );
};
