import React from 'react';
import { Printer, HelpCircle, Calendar, Download } from 'lucide-react';
import { PresetType } from '../types/printer';

interface HeaderProps {
  currentPreset: PresetType;
  onSelectPreset: (preset: PresetType) => void;
  onOpenGuide: () => void;
  onPrint: () => void;
  onAddCalendar: () => void;
  onExportSvg?: () => void;
  onExportPng?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPreset,
  onSelectPreset,
  onOpenGuide,
  onPrint,
  onAddCalendar,
  onExportSvg,
  onExportPng,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="no-print bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono"
            title="展开配置选项"
          >
            ⚙️ 设置
          </button>
        )}
        <a href="/" className="text-sm md:text-base font-bold tracking-tight text-white font-mono flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>INKJET NOZZLE CALIBRATOR</span>
        </a>
      </div>

      {/* Zone 2: Clean single-line navigation links/tabs */}
      <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-400">
        <button
          onClick={() => onSelectPreset('full-diagnostic')}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'full-diagnostic' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          综合诊断页
        </button>
        <button
          onClick={() => onSelectPreset('anti-clog-daily')}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'anti-clog-daily' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          日常防堵色带
        </button>
        <button
          onClick={() => onSelectPreset('nozzle-check-stairs')}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'nozzle-check-stairs' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          喷嘴阶梯检查
        </button>
        <button
          onClick={() => onSelectPreset('heavy-purge')}
          className={`transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'heavy-purge' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          强力冲头疏通
        </button>
        <button
          onClick={() => onSelectPreset('black-pigment-text')}
          className={`hidden xl:inline-block transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'black-pigment-text' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          纯黑文本
        </button>
        <button
          onClick={() => onSelectPreset('single-color-target')}
          className={`hidden xl:inline-block transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'single-color-target' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          单色定向
        </button>
        <button
          onClick={() => onSelectPreset('photo-grayscale')}
          className={`hidden 2xl:inline-block transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'photo-grayscale' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          照片灰阶
        </button>
        <button
          onClick={() => onSelectPreset('eco-quad-card')}
          className={`hidden 2xl:inline-block transition-colors whitespace-nowrap cursor-pointer ${
            currentPreset === 'eco-quad-card' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          四联节能卡
        </button>
        <button
          onClick={onOpenGuide}
          className="hover:text-slate-200 transition-colors flex items-center gap-1 whitespace-nowrap text-amber-400/90 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>养护指南</span>
        </button>
      </nav>

      {/* Zone 3: Primary actions */}
      <div className="flex items-center gap-2">
        {onExportSvg && (
          <button
            onClick={onExportSvg}
            title="导出无损矢量 SVG 格式"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>导出SVG</span>
          </button>
        )}

        {onExportPng && (
          <button
            onClick={onExportPng}
            title="导出 300 DPI 超清 PNG 格式"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>300DPI PNG</span>
          </button>
        )}

        <button
          onClick={onAddCalendar}
          title="下载定期防堵打印日历提醒 (.ics)"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>周防堵提醒</span>
        </button>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm hover:shadow-cyan-400/20 transition-all whitespace-nowrap cursor-pointer active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>立即打印</span>
        </button>
      </div>
    </header>
  );
};
