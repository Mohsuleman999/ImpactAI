import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft, Loader2, RefreshCw } from 'lucide-react';
import { Project } from '../types/project';

interface HeroChangeInputProps {
  currentProject: Project;
  onAnalyse: (proposedChange: string) => Promise<void>;
  isAnalyzing: boolean;
}

export const HeroChangeInput: React.FC<HeroChangeInputProps> = ({
  currentProject,
  onAnalyse,
  isAnalyzing,
}) => {
  const [changeText, setChangeText] = useState(
    'Allow customers to cancel orders after shipment.'
  );

  const quickExamples = [
    {
      label: 'Delay a task',
      value: 'Delay courier webhook integration (TASK-004) by 10 days due to 3PL API sandbox delay.',
    },
    {
      label: 'Change a requirement',
      value: 'Allow customers to cancel orders after shipment and trigger immediate parcel recall.',
    },
    {
      label: 'Reduce budget',
      value: 'Reduce overall project development budget by 20% and trim QA testing scope.',
    },
    {
      label: 'Move a deadline',
      value: 'Pull forward the production go-live milestone by two weeks for Black Friday.',
    },
    {
      label: 'Change a process',
      value: 'Bypass manual depot barcode scanning and auto-approve customer returns on carrier drop-off.',
    },
    {
      label: 'Reduce team capacity',
      value: 'Reassign 2 backend engineers from fulfillment to checkout security patch.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeText.trim() || isAnalyzing) return;
    onAnalyse(changeText.trim());
  };

  return (
    <section className="pt-8 pb-4">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        
        {/* Large Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          What would you like to change?
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium">
          See what a project change could affect before you approve it.
        </p>

        {/* Input Card */}
        <form onSubmit={handleSubmit} className="mt-6 text-left">
          <div className="relative bg-white rounded-2xl p-2 sm:p-2.5 shadow-xl shadow-slate-200/60 border border-slate-200/90 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              
              <div className="relative flex-1">
                <input
                  type="text"
                  value={changeText}
                  onChange={(e) => setChangeText(e.target.value)}
                  placeholder="e.g., Allow customers to cancel orders after shipment..."
                  disabled={isAnalyzing}
                  className="w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg text-slate-900 placeholder:text-slate-400 bg-transparent rounded-xl focus:outline-hidden font-medium disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !changeText.trim()}
                className="px-6 py-3.5 sm:py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 text-sm sm:text-base tracking-wide uppercase"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Propagating Impact...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-purple-200 animate-pulse" />
                    <span>ANALYSE CHANGE</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Example Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">
            Quick examples:
          </span>
          {quickExamples.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setChangeText(ex.value);
              }}
              className="px-3 py-1.5 bg-white hover:bg-purple-50 hover:text-purple-700 text-slate-600 border border-slate-200/80 hover:border-purple-300 rounded-full font-semibold transition-all shadow-2xs hover:shadow-xs active:scale-95"
            >
              {ex.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
