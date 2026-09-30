import React, { useEffect } from 'react';
import { X, Clock, CalendarDays, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { TimelineBreakdown } from '../types/project';

interface TimelineDrawerProps {
  isOpen: boolean;
  timeline: TimelineBreakdown;
  onClose: () => void;
}

export const TimelineDrawer: React.FC<TimelineDrawerProps> = ({
  isOpen,
  timeline,
  onClose,
}) => {
  // Support closing with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Critical Path Analysis"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md uppercase tracking-wider w-fit mb-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Critical Path Analysis</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Timeline Variance Breakdown
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Propagating task dependencies along the critical release sequence.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close critical path analysis"
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Release Comparison Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
              Release Milestone Shift
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Original Target</span>
                <span className="text-lg sm:text-xl font-extrabold text-slate-100">
                  {timeline.originalDate}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[11px] font-extrabold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800">
                  +{timeline.delayDays} Days
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 mt-1" />
              </div>

              <div className="text-right">
                <span className="text-[11px] text-purple-300 font-medium block">Projected Target</span>
                <span className="text-lg sm:text-xl font-extrabold text-purple-200">
                  {timeline.projectedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Critical Path Explanation */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-purple-600" />
              <span>Schedule Propagation Logic</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {timeline.explanation}
            </p>
          </div>

          {/* Tasks on Critical Path Driving Delay */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Tasks Creating The Schedule Impact</span>
            </h4>

            <div className="space-y-2.5">
              {timeline.criticalPathTasks.map((taskName, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200 flex items-center justify-between text-xs font-bold text-purple-950"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-[10px]">
                      0{idx + 1}
                    </span>
                    <span>{taskName}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-rose-700 font-extrabold bg-rose-100 px-2 py-0.5 rounded-md">
                    Critical Path
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Close Timeline
          </button>
        </div>

      </div>
    </>
  );
};
