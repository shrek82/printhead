import React from 'react';

interface MaintenanceLogCardProps {
  printerModel: string;
  testDate: string;
  notes?: string;
}

export const MaintenanceLogCard: React.FC<MaintenanceLogCardProps> = ({
  printerModel,
  testDate,
}) => {
  return (
    <div className="py-1">
      <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[8.5px] font-mono">
        <span className="font-bold text-slate-800">
          状态记录
        </span>
        <span className="text-slate-400">LOG</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-[7.5px] font-mono text-slate-700 py-0.5">
        <div>
          <span className="text-slate-400">设备: </span>
          <span className="font-bold text-slate-900">{printerModel || 'PRINTER'}</span>
        </div>
        <div>
          <span className="text-slate-400">日期: </span>
          <span>{testDate}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400">状态: </span>
          <span>[ ] 正常</span>
          <span>[ ] 轻微断线</span>
          <span>[ ] 需清洗</span>
        </div>
      </div>
    </div>
  );
};
