import React, { useEffect } from 'react';
import { X, DollarSign, Calculator, Info, CheckCircle2 } from 'lucide-react';
import { CostBreakdownItem } from '../types/project';

interface CalculationDrawerProps {
  isOpen: boolean;
  costBreakdown: CostBreakdownItem[];
  totalCostDelta: number;
  onClose: () => void;
}

export const CalculationDrawer: React.FC<CalculationDrawerProps> = ({
  isOpen,
  costBreakdown,
  totalCostDelta,
  onClose,
}) => {
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
        aria-label="Cost Impact Calculation"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider w-fit mb-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Deterministic Cost Model</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Cost Impact Calculation
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Formulas derived strictly from project role hourly rates and fixed line items.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cost calculation"
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Total Sum Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Total Net Cost Variance
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
              +${totalCostDelta.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-100 mt-2 font-medium">
              Zero invented numbers. Sum of verified effort hours multiplied by approved contractual rates.
            </p>
          </div>

          {/* Core Formula Explainer */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
            <div className="font-extrabold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-purple-600" />
              <span>Financial Calculation Principle</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-slate-700 mt-2">
              Total Impact = ∑(Additional Workstream Hours × Hourly Rate) + Verified Fixed Integration Fees
            </div>
          </div>

          {/* Breakdown Items List */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Cost Item Breakdown
            </h4>

            <div className="space-y-3">
              {costBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {item.category}
                    </span>
                    <span className="font-black text-emerald-600 text-base shrink-0">
                      +${item.total.toLocaleString()}
                    </span>
                  </div>

                  {item.hours > 0 ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 mb-2">
                      <span>{item.hours} hrs</span>
                      <span className="text-slate-400">×</span>
                      <span>${item.rate}/hr</span>
                      <span className="text-slate-400">=</span>
                      <span className="text-slate-900">${(item.hours * item.rate).toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 mb-2">
                      Fixed Technical Fee: ${item.fixedCost?.toLocaleString() || 0}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {item.explanation}
                  </p>
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
            Close Calculation
          </button>
        </div>

      </div>
    </>
  );
};
