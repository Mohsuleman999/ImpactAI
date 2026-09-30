import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface BeforeVsAfterProps {
  beforeVsAfter: {
    before: string[];
    after: string[];
  };
}

export const BeforeVsAfter: React.FC<BeforeVsAfterProps> = ({ beforeVsAfter }) => {
  const { before, after } = beforeVsAfter;

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Before vs After
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare current operational baseline against projected post-change execution.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* BEFORE CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-extrabold text-xs">
                  01
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-800">
                  Current State (Before)
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                Baseline
              </span>
            </div>

            <ul className="space-y-3.5">
              {before.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER CARD */}
          <div className="bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 rounded-3xl p-6 border-2 border-purple-200 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                  02
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-purple-950">
                  Proposed State (After)
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                Simulated
              </span>
            </div>

            <ul className="space-y-3.5">
              {after.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <span className="font-semibold leading-relaxed text-slate-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
