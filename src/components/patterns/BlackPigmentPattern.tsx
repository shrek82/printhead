import React from 'react';

interface BlackPigmentPatternProps {
  printerModel: string;
  testDate: string;
}

export const BlackPigmentPattern: React.FC<BlackPigmentPatternProps> = ({
  printerModel,
  testDate,
}) => {
  return (
    <div className="space-y-3 py-1">
      {/* 64-step dense ladder for Black */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">黑色阶梯线 (64阶)</span>
          <span className="text-slate-400">BLACK LADDER</span>
        </div>

        <div className="flex justify-center py-0.5">
          <svg viewBox="0 0 500 120" className="w-full h-auto max-h-[125px]" style={{ shapeRendering: 'crispEdges' }}>
            {Array.from({ length: 64 }).map((_, i) => {
              const x = 12 + i * 7.4;
              const y = 10 + (i % 8) * 12;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x + 9} y2={y} stroke="#000000" strokeWidth="0.9" />
                  {i < 63 && (
                    <line x1={x + 9} y1={y} x2={x + 9} y2={y + 12} stroke="#000000" strokeWidth="0.4" opacity="0.4" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Solid Black Purge Block */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">黑色纯色冲刷 (100%)</span>
          <span className="text-slate-400">BLACK 100%</span>
        </div>
        <div className="h-10 w-full relative overflow-hidden">
          <svg className="w-full h-full block" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="#000000" />
          </svg>
        </div>
      </div>

      {/* Barcode & Fine Line Pitch */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
            <span className="font-bold text-slate-800">条码细线直度测试</span>
            <span className="text-[7px] text-slate-400">BARCODE</span>
          </div>
          <div className="h-8 flex items-center justify-between overflow-hidden">
            {[1, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 1].map((w, idx) => (
              <div
                key={idx}
                className="bg-black h-7"
                style={{ width: `${w * 1.5}px` }}
              />
            ))}
          </div>
        </div>

        {/* Parallel Fine Grids */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
            <span className="font-bold text-slate-800">平行极细线 (0.25pt/0.5pt)</span>
            <span className="text-[7px] text-slate-400">GRID</span>
          </div>
          <div className="h-8 flex flex-col justify-between py-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full h-[0.75px] bg-black" />
            ))}
          </div>
        </div>
      </div>

      {/* Micro-Typography Scale */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
          <span className="font-bold text-slate-800">字符极限锐度 (2pt~6pt)</span>
          <span className="text-[7px] text-slate-400">TYPOGRAPHY</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-black leading-tight">
          <div className="space-y-0.5">
            <div style={{ fontSize: '2pt' }} className="font-mono truncate">
              [2pt] BLACK PIGMENT NOZZLE PRECISION 0123456789
            </div>
            <div style={{ fontSize: '3.5pt' }} className="truncate">
              [3.5pt] 黑色喷头高解析度文字测试 ABCDEF
            </div>
            <div style={{ fontSize: '5pt' }} className="truncate">
              [5pt] 喷墨打印防堵测试 · 边缘无毛刺飞墨
            </div>
            <div style={{ fontSize: '6.5pt' }} className="font-medium truncate">
              [6.5pt] 颜料墨水清晰锐利 · 纯黑字符
            </div>
          </div>
          <div className="space-y-0.5 font-serif">
            <div style={{ fontSize: '2pt' }} className="truncate">
              [2pt] Quick brown fox jumps over lazy dog 0123456789
            </div>
            <div style={{ fontSize: '3.5pt' }} className="truncate">
              [3.5pt] 衬线字体测试：横平竖直笔锋分明
            </div>
            <div style={{ fontSize: '5pt' }} className="truncate">
              [5pt] 打印机喷头状态良好测试样张
            </div>
            <div style={{ fontSize: '6.5pt' }} className="font-medium truncate">
              [6.5pt] 黑色喷嘴完好 · 墨道流动通畅
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
