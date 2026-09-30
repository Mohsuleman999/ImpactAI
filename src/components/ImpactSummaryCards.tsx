import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Users, 
  FlaskConical, 
  Flag,
  ArrowUpRight,
  Calculator,
  CalendarDays
} from 'lucide-react';
import { ChangeImpactAssessment } from '../types/project';

interface ImpactSummaryCardsProps {
  assessment: ChangeImpactAssessment | null;
  onOpenCostDrawer: () => void;
  onOpenTimelineDrawer: () => void;
}

export const ImpactSummaryCards: React.FC<ImpactSummaryCardsProps> = ({
  assessment,
  onOpenCostDrawer,
  onOpenTimelineDrawer,
}) => {
  if (!assessment) return null;

  const { summary } = assessment;

  // Impact level badge styling
  const getImpactBadge = (level: string) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'Low':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const impactStyle = getImpactBadge(summary.overallImpact);

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Impact Summary
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Key operational metrics calculated from active project artefacts.
          </p>
        </div>

        {/* 6 Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* Card 1: OVERALL IMPACT */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>IMPACT</span>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border ${impactStyle.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${impactStyle.dot}`}></span>
                  {summary.overallImpact || 'Needs review'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium line-clamp-2" title={summary.overallReason}>
              {summary.overallReason || 'Evaluation across operational units.'}
            </p>
          </div>

          {/* Card 2: TIMELINE */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>TIMELINE</span>
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {summary.timelineLabel || (summary.timelineDeltaDays ? `+${summary.timelineDeltaDays} days` : 'Needs review')}
              </div>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={onOpenTimelineDrawer}
                className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group-hover:underline"
              >
                <span>View timeline details</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: COST */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>COST</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {summary.costLabel || (summary.costDelta ? `+$${summary.costDelta.toLocaleString()}` : 'Effort estimate required')}
              </div>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={onOpenCostDrawer}
                className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group-hover:underline"
              >
                <span>View calculation</span>
                <Calculator className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 4: TEAMS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>TEAMS</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {summary.teamsCount} affected
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium truncate" title={summary.teamsList?.join(', ')}>
              {summary.teamsList?.join(', ') || 'Cross-functional teams'}
            </p>
          </div>

          {/* Card 5: TESTS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>TESTS</span>
                <FlaskConical className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {summary.testsCount} affected
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium line-clamp-2" title={summary.testsNote}>
              {summary.testsNote || 'Test cases requiring updates'}
            </p>
          </div>

          {/* Card 6: MILESTONES */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>MILESTONES</span>
                <Flag className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {summary.milestonesCount} affected
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium line-clamp-2" title={summary.milestonesNote}>
              {summary.milestonesNote || 'Release schedule variances'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
