import React from 'react';
import { X, AlertTriangle, CheckCircle, Droplets, Clock, Flame, ShieldAlert } from 'lucide-react';

interface MaintenanceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAntiClogPreset: () => void;
}

export const MaintenanceGuideModal: React.FC<MaintenanceGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectAntiClogPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                喷墨打印机防堵与喷头养护秘笈
              </h2>
              <p className="text-xs text-slate-400">
                如何用不到1%的墨水成本彻底告别堵头、断线与废墨报警
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Core Tip 1: The Cost of Deep Clean vs Test Printing */}
          <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-4 flex gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-300">
                别再疯狂执行打印机的「强力清洗」！
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                打印机自带的「强力清洗 / 深度清洗」本质是用内置微型蠕动泵猛力抽取墨水，一次清洗往往消耗 <strong>15%~25% 的整盒墨水</strong>，且全部抽入机身底部的废墨收集垫。疯狂清洗不仅极其费墨，还会迅速触发「废墨收集垫已满」芯片锁死错误！
              </p>
            </div>
          </div>

          {/* Rule Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strategy 1 */}
            <div className="border border-slate-800 bg-slate-800/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <Clock className="w-4 h-4" />
                <span>1. 预防大于治疗：每周5~7天打一次</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                喷墨打印机的喷嘴孔径只有头发丝的几十分之一（几皮升微滴）。即使你平时没有打印需求，只要<strong>每周打印一张「日常防堵测试页」</strong>，让全颜色喷孔微动吐墨，墨水溶剂就不会在喷孔表面结皮干涸。
              </p>
            </div>

            {/* Strategy 2 */}
            <div className="border border-slate-800 bg-slate-800/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <Flame className="w-4 h-4" />
                <span>2. 绝对不能只打黑白文档</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                很多用户以为平时只打黑白文字就能省彩色墨水。殊不知，青、洋红、黄等彩色喷孔在打黑白时完全不工作，时间一长彩色喷孔彻底干死。一旦偶尔需要彩色打印，喷头已报废。
              </p>
            </div>

            {/* Strategy 3 */}
            <div className="border border-slate-800 bg-slate-800/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <ShieldAlert className="w-4 h-4" />
                <span>3. 关机必须按电源键</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                严禁通过拔掉插线板直接关机！正常按下电源键时，打印机会将打印头滑动回右侧或左侧的<strong>保湿墨垫密封停靠位（Capping Station）</strong>，形成橡胶密封腔阻止墨水挥发。强行断电停在半空中几个小时就可能干透。
              </p>
            </div>

            {/* Strategy 4 */}
            <div className="border border-slate-800 bg-slate-800/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <Droplets className="w-4 h-4" />
                <span>4. 染料墨水 vs 颜料墨水区别</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                普通彩色大多为水性染料墨水，干涸后遇温水或清洗液易重新溶解；而黑色或高档防水墨为颜料墨水，其成分类似微小树脂色粉颗粒，干涸后会结块析出，一旦堵死极难冲开，更需勤打印！
              </p>
            </div>
          </div>

          {/* Step by step recovery guide */}
          <div className="border border-slate-800 rounded-lg p-4 bg-slate-800/20 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>发现喷嘴轻微断线时的科学处理步骤</span>
            </h3>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>打印测试样张判定：</strong>仔细对比阶梯梯阶线，确认究竟是哪一个颜色断线，断了多少根。
              </li>
              <li>
                <strong>执行单次轻微标准清洗：</strong>只执行一次标准清洗，切勿连洗两三次。清洗时会产生微小气泡。
              </li>
              <li>
                <strong>静置 10~15 分钟（关键秘诀）：</strong>刚清洗完墨腔内有剧烈微气泡，立即打印反而会误判断线！静置十几分钟让墨水压力平衡并自然消泡。
              </li>
              <li>
                <strong>再次打印测试样张复验：</strong>如果大部分已恢复，打印一张「日常全色块贯通条」即可冲刷恢复正常。
              </li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            养成每周防堵打印好习惯 · 喷头长寿3~5年
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectAntiClogPreset();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
            >
              切换至日常防堵打印模式
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              完成并返回
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
