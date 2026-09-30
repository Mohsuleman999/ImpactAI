import React from 'react';
import { NextStepAction } from '../types/project';
import { CheckSquare, Square, FileDown, CheckCircle, ArrowRight, Printer } from 'lucide-react';

interface WhatShouldHappenNextProps {
  actions: NextStepAction[];
  onToggleAction: (actionId: string) => void;
  onOpenReportModal: () => void;
}

export const WhatShouldHappenNext: React.FC<WhatShouldHappenNextProps> = ({
  actions,
  onToggleAction,
  onOpenReportModal,
}) => {
  const completedCount = actions.filter((a) => a.completed).length;
  const progressPercent = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                What should happen next?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Actionable pre-flight checklist before formally submitting this change for stakeholder sign-off.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">
              {completedCount} of {actions.length} Completed
            </span>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
          {actions.map((act) => {
            const isDone = act.completed;

            return (
              <div
                key={act.id}
                onClick={() => onToggleAction(act.id)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-200 shadow-2xs'
                    : 'bg-white border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <button
                  type="button"
                  aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-hidden"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      Step {act.stepNumber}
                    </span>
                    <h4
                      className={`text-sm sm:text-base font-bold transition-all ${
                        isDone ? 'line-through text-slate-400 font-medium' : 'text-slate-900'
                      }`}
                    >
                      {act.title}
                    </h4>
                  </div>
                  <p
                    className={`mt-1.5 text-xs font-medium leading-relaxed ${
                      isDone ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {act.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CREATE IMPACT REPORT BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center sm:text-left">
            <span className="px-2.5 py-1 text-[11px] font-extrabold bg-purple-500/30 text-purple-200 rounded-md border border-purple-400/30 uppercase tracking-wider">
              Executive Deliverable
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold mt-2 tracking-tight">
              Ready to brief project steering or the change advisory board?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
              Generate a comprehensive audit-ready Executive Impact Report including timeline deltas, deterministic cost formulas, before/after analysis, and questions.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenReportModal}
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base uppercase tracking-wider shrink-0 cursor-pointer"
          >
            <FileDown className="w-5 h-5 text-purple-200" />
            <span>CREATE IMPACT REPORT</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
