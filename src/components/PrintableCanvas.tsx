import React, { useRef } from 'react';
import { TestSheetConfig } from '../types/printer';
import { getColors } from '../utils/printerColors';
import { NozzleCheckPattern } from './patterns/NozzleCheckPattern';
import { ColorBlocksAndGradients } from './patterns/ColorBlocksAndGradients';
import { MicroTextAndAlignment } from './patterns/MicroTextAndAlignment';
import { AntiClogDailyStrip } from './patterns/AntiClogDailyStrip';
import { MaintenanceLogCard } from './patterns/MaintenanceLogCard';
import { CornerMark } from './patterns/RegistrationMarks';
import { BlackPigmentPattern } from './patterns/BlackPigmentPattern';
import { SingleColorTargetPattern } from './patterns/SingleColorTargetPattern';
import { PhotoGrayscalePattern } from './patterns/PhotoGrayscalePattern';
import { EcoQuadCardPattern } from './patterns/EcoQuadCardPattern';

interface PrintableCanvasProps {
  config: TestSheetConfig;
  zoom: number; // 0.6 to 1.5
}

export const PrintableCanvas: React.FC<PrintableCanvasProps> = ({
  config,
  zoom,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const colors = getColors(config.colorMode, config.colorProfile);
  const selectedTargetColor = colors.find((c) => c.code === config.targetColor) || colors[0];

  // Physical dimension styling for screen preview
  const getPaperDimensions = () => {
    switch (config.paperSize) {
      case 'letter':
        return { widthMm: 215.9, heightMm: 279.4, label: 'US Letter (8.5 × 11 in)' };
      case 'a5':
        return { widthMm: 148, heightMm: 210, label: 'ISO A5 (148 × 210 mm)' };
      case 'a4':
      default:
        return { widthMm: 210, heightMm: 297, label: 'ISO A4 (210 × 297 mm)' };
    }
  };

  const { widthMm, heightMm, label } = getPaperDimensions();
  const marginMm = parseInt(config.marginMm, 10);

  return (
    <div className="printable-sheet-container flex justify-center py-6 px-4 overflow-auto">
      {/* Scaled wrapper for interactive screen zoom without breaking print layout */}
      <div
        className="printable-zoom-wrapper"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          ref={sheetRef}
          id="printable-test-page"
          className="printable-sheet bg-white text-slate-900 shadow-2xl relative select-none"
          style={{
            width: `${widthMm}mm`,
            minHeight: `${heightMm}mm`,
            padding: `${marginMm}mm`,
            boxSizing: 'border-box',
          }}
        >
          {/* Registration Marks */}
          {config.modules.showRegistrationMarks && (
            <>
              <CornerMark position="top-left" />
              <CornerMark position="top-right" />
              <CornerMark position="bottom-left" />
              <CornerMark position="bottom-right" />
            </>
          )}

          {/* Header Banner on Sheet */}
          <div className="border-b border-slate-800 pb-1.5 mb-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold tracking-tight text-slate-900 font-mono">
                  喷墨测试与防堵维护样张
                </span>
                <span className="text-[8px] font-mono text-slate-500">
                  {config.colorMode === 'cmyk-photo' ? '6-Color' : 'CMYK 4-Color'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500">
                <span>{config.printerModel || 'PRINTER'}</span>
                <span>·</span>
                <span>{config.testDate}</span>
                <span>·</span>
                <span>{label}</span>
              </div>
            </div>
          </div>

          {/* Body Content based on preset or custom config */}
          <div className="space-y-3">
            {/* PRESET 1: Anti-Clog Daily Strip */}
            {config.preset === 'anti-clog-daily' && (
              <AntiClogDailyStrip
                colors={colors}
                density={config.stripDensity}
                layout={config.stripLayout}
                printerModel={config.printerModel}
                testDate={config.testDate}
              />
            )}

            {/* PRESET 2: Heavy Purge - Modern borderless full-saturation flow */}
            {config.preset === 'heavy-purge' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-[9px] font-mono">
                  <span className="font-bold text-slate-800">强力疏通冲刷 (100% 满幅墨道)</span>
                  <span className="text-slate-400">HEAVY PURGE</span>
                </div>

                <div className="space-y-2.5">
                  {colors.map((color) => (
                    <div key={color.code} className="space-y-1">
                      <div className="flex justify-between items-center text-[8.5px] font-mono">
                        <span
                          className="font-bold"
                          style={{ color: color.hex === '#FFFF00' ? '#b59a00' : color.hex }}
                        >
                          {color.name} [{color.code}] 100%
                        </span>
                        <span className="text-slate-400">全幅冲头</span>
                      </div>
                      <div
                        className="h-14 w-full relative overflow-hidden"
                        style={{ backgroundColor: color.hex }}
                      >
                        <svg className="w-full h-full block" preserveAspectRatio="none">
                          <rect width="100%" height="100%" fill={color.hex} />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 mb-1">
                    <span>快速确认色块</span>
                    <span>100%</span>
                  </div>
                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
                    {colors.map((c) => (
                      <div key={c.code} className="h-6 relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                        <svg className="w-full h-full block" preserveAspectRatio="none">
                          <rect width="100%" height="100%" fill={c.hex} />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PRESET 3: Nozzle Check Stairs Only */}
            {config.preset === 'nozzle-check-stairs' && (
              <div className="space-y-4">
                <NozzleCheckPattern colors={colors} />
                <ColorBlocksAndGradients
                  colors={colors}
                  showSolid={true}
                  showGradients={false}
                />
                <MaintenanceLogCard
                  printerModel={config.printerModel}
                  testDate={config.testDate}
                  notes={config.notes}
                />
              </div>
            )}

            {/* PRESET 4: Black Pigment / Text Precision */}
            {config.preset === 'black-pigment-text' && (
              <BlackPigmentPattern
                printerModel={config.printerModel}
                testDate={config.testDate}
              />
            )}

            {/* PRESET 5: Single Color Targeted Flush */}
            {config.preset === 'single-color-target' && (
              <SingleColorTargetPattern
                color={selectedTargetColor}
                printerModel={config.printerModel}
                testDate={config.testDate}
              />
            )}

            {/* PRESET 6: Photo Grayscale & Balance */}
            {config.preset === 'photo-grayscale' && (
              <PhotoGrayscalePattern colors={colors} />
            )}

            {/* PRESET 7: Eco Quad Card */}
            {config.preset === 'eco-quad-card' && (
              <EcoQuadCardPattern
                colors={colors}
                printerModel={config.printerModel}
                testDate={config.testDate}
              />
            )}

            {/* PRESET 4 & 5: Full Diagnostic & Custom Modules */}
            {(config.preset === 'full-diagnostic' || config.preset === 'custom') && (
              <>
                {/* Module 1: Nozzle Check Stairs */}
                {config.modules.showNozzleCheck && <NozzleCheckPattern colors={colors} />}

                {/* Module 2 & 3: Solid Blocks and Halftone Gradients */}
                {(config.modules.showSolidBlocks || config.modules.showGradients) && (
                  <ColorBlocksAndGradients
                    colors={colors}
                    showSolid={config.modules.showSolidBlocks}
                    showGradients={config.modules.showGradients}
                  />
                )}

                {/* Module 4, 5, 6, 7: Micro Text, Alignment Targets, RGB Mix, Ruler */}
                <MicroTextAndAlignment
                  colors={colors}
                  showMicroText={config.modules.showMicroText}
                  showAlignment={config.modules.showAlignmentTargets}
                  showMixRgb={config.modules.showMixRgb}
                  showResolutionRuler={config.modules.showResolutionRuler}
                />

                {/* Module 8: Maintenance Archive Log */}
                {config.modules.showMaintenanceLog && (
                  <MaintenanceLogCard
                    printerModel={config.printerModel}
                    testDate={config.testDate}
                    notes={config.notes}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer of Sheet */}
          <div className="border-t border-slate-300 pt-1.5 mt-3 flex items-center justify-between text-[7.5px] font-mono text-slate-400">
            <span>CMYK PRINTHEAD TEST PATTERN</span>
            <span>建议 5~7 天打印一次防堵</span>
          </div>
        </div>
      </div>
    </div>
  );
};
