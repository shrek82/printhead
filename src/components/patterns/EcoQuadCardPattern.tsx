import React from 'react';
import { ColorDefinition } from '../../types/printer';

interface EcoQuadCardPatternProps {
  colors: ColorDefinition[];
  printerModel: string;
  testDate: string;
}

export const EcoQuadCardPattern: React.FC<EcoQuadCardPatternProps> = ({
  colors,
  printerModel,
  testDate,
}) => {
  const renderMiniCard = (cardNumber: number) => (
    <div className="p-2 space-y-1.5 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-[8px] font-mono">
        <span className="font-bold text-slate-800">
          #{cardNumber} · 防堵维护卡
        </span>
        <span className="text-slate-400">{printerModel || 'PRINTER'}</span>
      </div>

      {/* Mini Color Exercise Bands */}
      <div className="space-y-1">
        {colors.map((c) => (
          <div key={c.code} className="flex items-center gap-1.5">
            <span
              className="text-[7.5px] font-mono font-bold w-3 text-right shrink-0"
              style={{ color: c.hex === '#FFFF00' ? '#b59a00' : c.hex }}
            >
              {c.code}
            </span>
            <div className="flex-1 h-3 relative overflow-hidden">
              <svg className="w-full h-full block" preserveAspectRatio="none">
                <rect width="100%" height="100%" fill={c.hex} />
              </svg>
            </div>
            <span className="text-[6.5px] font-mono text-slate-400 w-5 text-right">100%</span>
          </div>
        ))}
      </div>

      {/* Mini 16-Step Nozzle Ladder */}
      <div className="py-1">
        <div className="grid grid-cols-4 gap-1" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
          {colors.map((c) => (
            <svg key={c.code} viewBox="0 0 60 70" className="w-full h-10" style={{ shapeRendering: 'crispEdges' }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const y = 4 + i * 4;
                const x = 5 + (i % 4) * 10;
                return (
                  <line
                    key={i}
                    x1={x}
                    y1={y}
                    x2={x + 12}
                    y2={y}
                    stroke={c.hex}
                    strokeWidth="1.0"
                  />
                );
              })}
            </svg>
          ))}
        </div>
      </div>

      {/* Footer check */}
      <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[6.5px] font-mono text-slate-400">
        <span>{testDate}</span>
        <span>[ ] 正常  [ ] 断线</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-2 py-1">
      <div className="text-center text-[8px] font-mono text-slate-400 border-b border-slate-200 pb-1">
        A4 四联节能防堵卡 (单页可裁切4份，供整月定期打印)
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 border border-slate-200">
        <div>{renderMiniCard(1)}</div>
        <div>{renderMiniCard(2)}</div>
        <div>{renderMiniCard(3)}</div>
        <div>{renderMiniCard(4)}</div>
      </div>
    </div>
  );
};
