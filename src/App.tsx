/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TestSheetConfig, PresetType } from './types/printer';
import { Header } from './components/Header';
import { SidebarControls } from './components/SidebarControls';
import { PrintableCanvas } from './components/PrintableCanvas';
import { MaintenanceGuideModal } from './components/MaintenanceGuideModal';
import { generateIcsCalendar } from './utils/calendarReminder';
import { exportToSvg, exportToPng } from './utils/exportImage';

export default function App() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [config, setConfig] = useState<TestSheetConfig>({
    preset: 'full-diagnostic',
    colorMode: 'cmyk',
    colorProfile: 'pure-driver',
    paperSize: 'a4',
    marginMm: '5',
    printerModel: 'Epson / Canon / HP / Brother',
    testDate: todayStr,
    notes: '喷头日常检视与抗干涸保养',
    stripDensity: 'standard',
    stripLayout: 'single-full',
    targetColor: 'C',
    modules: {
      showSolidBlocks: true,
      showGradients: true,
      showNozzleCheck: true,
      showMicroText: true,
      showAlignmentTargets: true,
      showMixRgb: true,
      showMaintenanceLog: true,
      showRegistrationMarks: true,
      showResolutionRuler: true,
    },
  });

  const [zoom, setZoom] = useState<number>(0.85);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddCalendar = () => {
    generateIcsCalendar(config.printerModel);
    showToast('已生成并下载「每周防堵打印提醒.ics」日历文件，导入手机/系统日历即可定期提醒！');
  };

  const handleExportSvg = () => {
    const success = exportToSvg('printable-test-page', `喷墨打印机测试页-${config.preset}.svg`);
    if (success) {
      showToast('✓ 矢量无损 SVG 文件已下载');
    } else {
      showToast('❌ 导出 SVG 失败，请重试');
    }
  };

  const handleExportPng = async () => {
    showToast('正在渲染 300 DPI 超高清 PNG，请稍候...');
    const success = await exportToPng('printable-test-page', `喷墨打印机测试页-${config.preset}-300DPI.png`, 300);
    if (success) {
      showToast('✓ 300 DPI 超高清 PNG 文件已下载');
    } else {
      showToast('❌ 导出 PNG 失败，请重试');
    }
  };

  const handleSelectPreset = (preset: PresetType) => {
    setConfig((prev) => ({
      ...prev,
      preset,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {notification && (
        <div className="no-print fixed top-16 right-6 z-50 bg-cyan-900 border border-cyan-500 text-cyan-100 text-xs px-4 py-2.5 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
          <span>✓</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar adhering to Top Bar Contract */}
      <Header
        currentPreset={config.preset}
        onSelectPreset={handleSelectPreset}
        onOpenGuide={() => setIsGuideOpen(true)}
        onPrint={handlePrint}
        onAddCalendar={handleAddCalendar}
        onExportSvg={handleExportSvg}
        onExportPng={handleExportPng}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Workspace Stage */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Parameter & Configuration Panel */}
        <SidebarControls
          config={config}
          onChange={setConfig}
          zoom={zoom}
          onZoomChange={setZoom}
          onOpenGuide={() => setIsGuideOpen(true)}
          onShowToast={showToast}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Printable Paper Preview Viewport */}
        <main className="flex-1 bg-slate-950 flex flex-col overflow-hidden relative">
          {/* Top Quick Status Ribbon */}
          <div className="no-print h-9 border-b border-slate-800/80 bg-slate-900/40 px-6 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-semibold">100% 矢量精密渲染</span>
              </span>
              <span>·</span>
              <span>纸张: {config.paperSize.toUpperCase()} ({config.marginMm}mm 边距)</span>
              <span>·</span>
              <span>通道: {config.colorMode === 'cmyk-photo' ? '6色 (CMYK+LC+LM)' : '4色 (CMYK)'}</span>
              <span>·</span>
              <span className="text-cyan-400">
                {config.colorProfile === 'pure-driver' ? '基色直通直驱 (防混墨)' : '标准印刷色'}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-slate-500">
              <span>快捷提示: 浏览器打印窗口中勾选「背景图形」效果更佳</span>
              <button
                onClick={handlePrint}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer font-medium"
              >
                立即发送至打印机 (Ctrl+P)
              </button>
            </div>
          </div>

          {/* Canvas Scroll Area */}
          <div className="flex-1 overflow-auto bg-slate-950 relative flex flex-col items-center">
            {/* Actual Printable Document Paper */}
            <PrintableCanvas
              config={config}
              zoom={zoom}
            />
          </div>
        </main>
      </div>

      {/* Maintenance Guide Knowledge Base Modal */}
      <MaintenanceGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSelectAntiClogPreset={() => handleSelectPreset('anti-clog-daily')}
      />
    </div>
  );
}
