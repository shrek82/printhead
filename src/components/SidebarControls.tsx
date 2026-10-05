import React from 'react';
import { 
  TestSheetConfig, 
  PresetType, 
  ColorMode, 
  ColorProfile, 
  PaperSize, 
  MarginType,
  StripDensity,
  StripLayout,
  SingleTargetColor
} from '../types/printer';
import { 
  Sliders, 
  ShieldCheck, 
  HelpCircle,
  Scissors,
  Download,
  Target,
  Sparkles,
  FileImage
} from 'lucide-react';
import { exportToSvg, exportToPng } from '../utils/exportImage';

interface SidebarControlsProps {
  config: TestSheetConfig;
  onChange: (newConfig: TestSheetConfig) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onOpenGuide: () => void;
  onShowToast: (msg: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SidebarControls: React.FC<SidebarControlsProps> = ({
  config,
  onChange,
  zoom,
  onZoomChange,
  onOpenGuide,
  onShowToast,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const updateConfig = (partial: Partial<TestSheetConfig>) => {
    onChange({ ...config, ...partial });
  };

  const updateModule = (key: keyof TestSheetConfig['modules'], val: boolean) => {
    onChange({
      ...config,
      modules: {
        ...config.modules,
        [key]: val,
      },
    });
  };

  const handleExportSvg = async () => {
    onShowToast('正在导出矢量 SVG，请稍候...');
    const success = await exportToSvg('printable-test-page', `喷墨打印机测试页-${config.preset}.svg`);
    if (success) {
      onShowToast('✓ 矢量无损 SVG 文件已下载');
    } else {
      onShowToast('❌ 导出 SVG 失败，请重试');
    }
  };

  const handleExportPng = async () => {
    onShowToast('正在渲染 300 DPI 超高清 PNG，请稍候...');
    const success = await exportToPng('printable-test-page', `喷墨打印机测试页-${config.preset}-300DPI.png`, 300);
    if (success) {
      onShowToast('✓ 300 DPI 超高清 PNG 文件已下载');
    } else {
      onShowToast('❌ 导出 PNG 失败，请重试');
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="no-print md:hidden fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs"
        />
      )}

      <aside
        className={`no-print ${
          isMobileOpen
            ? 'fixed inset-y-0 left-0 z-50 w-80 shadow-2xl animate-in slide-in-from-left duration-200'
            : 'hidden md:block w-80 shrink-0'
        } bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto space-y-5 text-xs text-slate-300`}
      >
        {/* Mobile Header Close */}
        {isMobileOpen && (
          <div className="md:hidden flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-white text-sm font-mono">配置面板</span>
            <button
              onClick={onCloseMobile}
              className="text-slate-400 hover:text-white p-1 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        )}

      {/* Export Section */}
      <div className="space-y-2 pb-2 border-b border-slate-800">
        <div className="flex items-center justify-between text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
          <span className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>无损图像导出 (Export)</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={handleExportSvg}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded text-center transition-colors font-mono cursor-pointer"
            title="导出矢量 SVG 文件，可在任意分辨率无损打印或排版"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>导出矢量 SVG</span>
          </button>
          <button
            onClick={handleExportPng}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded text-center transition-colors font-mono cursor-pointer"
            title="导出 300 DPI 印刷级高清无损 PNG"
          >
            <FileImage className="w-3.5 h-3.5 text-cyan-400" />
            <span>300DPI PNG</span>
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>测试模式 (Presets)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {[
            {
              id: 'full-diagnostic' as PresetType,
              title: '综合诊断页',
              desc: '48阶断线阶梯+100%纯色块+字号锐度+渐变',
            },
            {
              id: 'anti-clog-daily' as PresetType,
              title: '日常防堵色带',
              desc: '每周打一次，激活全喷嘴省墨防干涸',
              recommended: true,
            },
            {
              id: 'nozzle-check-stairs' as PresetType,
              title: '喷嘴阶梯检查',
              desc: '类似原厂阶梯，缺针断线一眼定位',
            },
            {
              id: 'heavy-purge' as PresetType,
              title: '强力冲头疏通',
              desc: '轻度干涸/气泡时满幅大墨量冲洗',
            },
            {
              id: 'black-pigment-text' as PresetType,
              title: '纯黑/颜料文本专用',
              desc: '黑色高密阶梯、条码与微距字号',
            },
            {
              id: 'single-color-target' as PresetType,
              title: '单色定向冲洗',
              desc: '指定某一堵塞颜色冲洗，不浪费其他墨水',
            },
            {
              id: 'photo-grayscale' as PresetType,
              title: '照片平滑渐变与灰阶',
              desc: '256级平滑色彩过渡与21阶中性灰',
            },
            {
              id: 'eco-quad-card' as PresetType,
              title: '节能四联防堵卡',
              desc: 'A4纸一裁为四，一个月仅耗一张纸',
            },
            {
              id: 'custom' as PresetType,
              title: '自定义组合',
              desc: '自由勾选所需检测模组',
            },
          ].map((item) => {
            const active = config.preset === item.id;
            return (
              <button
                key={item.id}
                onClick={() => updateConfig({ preset: item.id })}
                className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                  active
                    ? 'border-cyan-500 bg-cyan-950/40 text-white'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    {item.title}
                  </span>
                  {item.recommended && (
                    <span className="text-[10px] text-cyan-400 font-mono font-bold">
                      ★ 首选
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Color Target Selector */}
      {config.preset === 'single-color-target' && (
        <div className="border border-cyan-800/50 bg-cyan-950/20 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-cyan-400 font-mono font-bold text-[11px]">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>选择冲刷目标颜色</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { code: 'C' as SingleTargetColor, name: '青 (C)', hex: '#00FFFF' },
              { code: 'M' as SingleTargetColor, name: '洋红 (M)', hex: '#FF00FF' },
              { code: 'Y' as SingleTargetColor, name: '黄 (Y)', hex: '#FFFF00' },
              { code: 'K' as SingleTargetColor, name: '黑 (K)', hex: '#000000' },
              ...(config.colorMode === 'cmyk-photo' ? [
                { code: 'LC' as SingleTargetColor, name: '浅青 (LC)', hex: '#80FFFF' },
                { code: 'LM' as SingleTargetColor, name: '浅洋红 (LM)', hex: '#FF99EE' },
              ] : [])
            ].map((c) => (
              <button
                key={c.code}
                onClick={() => updateConfig({ targetColor: c.code })}
                className={`py-1.5 px-1 rounded border text-center font-mono transition-colors cursor-pointer ${
                  config.targetColor === c.code
                    ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-bold'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full border border-slate-400" style={{ backgroundColor: c.hex }} />
                  <span>{c.code}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Routine Anti-Clog Options (when preset is anti-clog-daily) */}
      {config.preset === 'anti-clog-daily' && (
        <div className="border border-cyan-800/50 bg-cyan-950/20 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between text-cyan-400 font-mono font-bold text-[11px]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>防堵专属配置</span>
            </span>
          </div>

          {/* Density selection */}
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px]">喷头出墨负荷:</span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'eco' as StripDensity, label: '省墨 65%' },
                { id: 'standard' as StripDensity, label: '标准 90%' },
                { id: 'heavy' as StripDensity, label: '冲刷 100%' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => updateConfig({ stripDensity: d.id })}
                  className={`py-1 text-[10px] rounded border font-mono transition-colors ${
                    config.stripDensity === d.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Triple-cut layout */}
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px]">排版节纸模式:</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => updateConfig({ stripLayout: 'single-full' })}
                className={`p-1.5 text-[10px] rounded border text-left transition-colors ${
                  config.stripLayout === 'single-full'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <div className="font-bold">单张完整幅宽</div>
                <div className="text-[9px] text-slate-400">大面积全孔激活</div>
              </button>
              <button
                onClick={() => updateConfig({ stripLayout: 'triple-strips' })}
                className={`p-1.5 text-[10px] rounded border text-left transition-colors ${
                  config.stripLayout === 'triple-strips'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <div className="font-bold flex items-center gap-1">
                  <Scissors className="w-2.5 h-2.5" />
                  <span>一纸三用</span>
                </div>
                <div className="text-[9px] text-slate-400">一张纸打3次</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Mode & Pure Driver Channel Toggle */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
          <span>墨路与色彩模式 (Color Engine)</span>
        </div>

        {/* 4-Color vs 6-Color */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => updateConfig({ colorMode: 'cmyk' })}
            className={`p-2 rounded border text-center font-mono font-medium transition-colors ${
              config.colorMode === 'cmyk'
                ? 'bg-white text-slate-900 border-white font-bold'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <div>4色标准 (CMYK)</div>
            <div className="text-[9px] opacity-75 font-normal">普通墨仓/墨盒机</div>
          </button>
          <button
            onClick={() => updateConfig({ colorMode: 'cmyk-photo' })}
            className={`p-2 rounded border text-center font-mono font-medium transition-colors ${
              config.colorMode === 'cmyk-photo'
                ? 'bg-white text-slate-900 border-white font-bold'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <div>6色照片 (+LC/LM)</div>
            <div className="text-[9px] opacity-75 font-normal">加浅青、浅洋红通道</div>
          </button>
        </div>

        {/* Pure Driver Profile vs ISO Press */}
        <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200">基色驱动通道:</span>
            <span className="text-[10px] text-cyan-400 font-mono">
              {config.colorProfile === 'pure-driver' ? '纯基色直通' : '标准印刷色'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => updateConfig({ colorProfile: 'pure-driver' })}
              className={`py-1 px-1.5 text-[10px] rounded border transition-colors ${
                config.colorProfile === 'pure-driver'
                  ? 'bg-cyan-600 text-white border-cyan-500 font-semibold'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              纯色直通 (防混墨)
            </button>
            <button
              onClick={() => updateConfig({ colorProfile: 'iso-press' })}
              className={`py-1 px-1.5 text-[10px] rounded border transition-colors ${
                config.colorProfile === 'iso-press'
                  ? 'bg-cyan-600 text-white border-cyan-500 font-semibold'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              标准视觉色 (ISO)
            </button>
          </div>
          <p className="text-[9.5px] text-slate-400 leading-normal">
            💡「纯色直通」采用纯R/G/B基色，强令打印机只驱动该通道喷嘴，绝不交叉混入其他颜色墨水。
          </p>
        </div>
      </div>

      {/* Paper Size & Margins */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
          <span>纸张与边距 (Paper & Margin)</span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {[
            { id: 'a4' as PaperSize, label: 'ISO A4' },
            { id: 'letter' as PaperSize, label: 'US Letter' },
            { id: 'a5' as PaperSize, label: 'ISO A5' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => updateConfig({ paperSize: p.id })}
              className={`py-1.5 text-center font-mono rounded border transition-colors ${
                config.paperSize === p.id
                  ? 'bg-white text-slate-900 border-white font-bold'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-400">打印留白边距:</span>
          <div className="flex gap-1">
            {[
              { id: '0' as MarginType, label: '0mm (满版)' },
              { id: '5' as MarginType, label: '5mm (窄)' },
              { id: '10' as MarginType, label: '10mm (标准)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => updateConfig({ marginMm: m.id })}
                className={`px-2 py-0.5 text-[10px] rounded border font-mono transition-colors ${
                  config.marginMm === m.id
                    ? 'bg-cyan-500 text-slate-900 border-cyan-400 font-bold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Printer Info & Custom Date */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
          <span>设备信息与记录 (Archive Info)</span>
        </div>

        <div className="space-y-1.5">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">打印机型号/品牌:</label>
            <input
              type="text"
              value={config.printerModel}
              onChange={(e) => updateConfig({ printerModel: e.target.value })}
              placeholder="如 Epson L3150 / Canon G3800"
              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">测试日期:</label>
            <input
              type="date"
              value={config.testDate}
              onChange={(e) => updateConfig({ testDate: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-slate-100 focus:outline-none focus:border-cyan-400 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Custom Module Toggles (Active in custom or full-diagnostic) */}
      {(config.preset === 'custom' || config.preset === 'full-diagnostic') && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
            <span>检测模组显隐 (Modules)</span>
          </div>

          <div className="grid grid-cols-1 gap-1 text-[11px]">
            {[
              { key: 'showNozzleCheck' as const, label: '喷嘴断线阶梯线 (48阶)' },
              { key: 'showSolidBlocks' as const, label: '100% 纯色平涂块 (白线横纹检)' },
              { key: 'showGradients' as const, label: '10阶半色调微滴过渡' },
              { key: 'showMicroText' as const, label: '2pt~9pt 微距字号锐度' },
              { key: 'showAlignmentTargets' as const, label: '双向垂直对准标尺 (±2)' },
              { key: 'showMixRgb' as const, label: 'RGB 二次混合互补色' },
              { key: 'showResolutionRuler' as const, label: '150mm 光学分辨率刻度尺' },
              { key: 'showMaintenanceLog' as const, label: '维护档案状态复核卡' },
              { key: 'showRegistrationMarks' as const, label: '四角套印定位十字' },
            ].map((m) => (
              <label
                key={m.key}
                className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-800/60 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={config.modules[m.key]}
                  onChange={(e) => updateModule(m.key, e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-800"
                />
                <span className={config.modules[m.key] ? 'text-slate-200' : 'text-slate-500'}>
                  {m.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Canvas View Controls */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between text-slate-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
          <span>预览视图控制 (Preview Zoom)</span>
          <span className="font-mono text-cyan-400">{Math.round(zoom * 100)}%</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.5"
            max="1.3"
            step="0.05"
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onZoomChange(0.85)}
            className="flex-1 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-center"
          >
            适应屏幕
          </button>
          <button
            onClick={() => onZoomChange(1.0)}
            className="flex-1 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono text-center"
          >
            100% 原始尺寸
          </button>
        </div>
      </div>

      {/* Bottom Knowledge Link */}
      <div className="pt-2 border-t border-slate-800">
        <button
          onClick={onOpenGuide}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-amber-300 bg-amber-950/30 hover:bg-amber-950/50 border border-amber-800/50 rounded-lg transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>查看喷墨防堵养护全攻略</span>
        </button>
      </div>
    </aside>
    </>
  );
};
