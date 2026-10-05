import React from 'react';
import { ColorDefinition } from '../../types/printer';

interface NozzleCheckPatternProps {
  colors: ColorDefinition[];
}

export const NozzleCheckPattern: React.FC<NozzleCheckPatternProps> = ({ colors }) => {
  // Generate stair lines mimicking professional printer nozzle check patterns
  // Each color has a ladder of 48 stepped horizontal/diagonal ticks
  const stepsPerColor = 48;

  return (
    <div className="py-1">
      <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2 text-[9px] font-mono">
        <span className="font-bold text-slate-800">喷嘴断线检查 (48阶)</span>
        <span className="text-slate-400">NOZZLE CHECK</span>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${colors.length}, minmax(0, 1fr))` }}
      >
        {colors.map((color) => {
          return (
            <div key={color.code} className="flex flex-col">
              <div
                className="flex items-center justify-between text-[8.5px] font-mono font-bold mb-1"
                style={{ color: color.hex === '#FFFF00' ? '#b59a00' : color.hex }}
              >
                <span>{color.name} [{color.code}]</span>
              </div>

              {/* High-precision SVG staircase without container box */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 120 180"
                  className="w-full h-auto max-h-[135px]"
                  style={{ shapeRendering: 'crispEdges' }}
                >
                  {/* Subtle hairline guides */}
                  <line x1="8" y1="5" x2="8" y2="175" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="112" y1="5" x2="112" y2="175" stroke="#f1f5f9" strokeWidth="0.5" />
                  
                  {/* Stepped stair lines */}
                  {Array.from({ length: stepsPerColor }).map((_, i) => {
                    const y = 8 + i * 3.4;
                    const phase = i % 4;
                    const xStart = 15 + phase * 22;
                    const xEnd = xStart + 24;

                    return (
                      <g key={i}>
                        <line
                          x1={xStart}
                          y1={y}
                          x2={xEnd}
                          y2={y}
                          stroke={color.hex}
                          strokeWidth="0.9"
                        />
                        {i < stepsPerColor - 1 && (
                          <line
                            x1={xEnd}
                            y1={y}
                            x2={xEnd}
                            y2={y + 3.4}
                            stroke={color.hex}
                            strokeWidth="0.5"
                            opacity={0.4}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Deflection teeth line without border */}
              <div className="mt-1.5 flex items-end justify-between">
                <div className="h-3 flex items-end justify-between flex-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[1px] h-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
