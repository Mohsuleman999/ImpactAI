import React from 'react';
import { ChangeImpactAssessment, Project } from '../types/project';
import { 
  History, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  Clock, 
  Users, 
  AlertTriangle,
  FileText
} from 'lucide-react';

interface AssessmentsViewProps {
  currentProject: Project;
  assessments: ChangeImpactAssessment[];
  onSelectAssessment: (assessment: ChangeImpactAssessment) => void;
  onGoToDashboard: () => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  currentProject,
  assessments,
  onSelectAssessment,
  onGoToDashboard,
}) => {
  const getImpactBadge = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Assessment History
              </h1>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Simulation archives and impact assessments conducted for <strong className="text-slate-900">{currentProject.name}</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoToDashboard}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:border-purple-300 text-slate-800 rounded-xl text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>New Simulation</span>
          </button>
        </div>

        {/* Assessment Cards */}
        {assessments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No simulations saved yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
              Enter a change request on the dashboard and click "Analyse Change" to generate an assessment.
            </p>
            <button
              onClick={onGoToDashboard}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((asmt) => {
              const dateStr = new Date(asmt.analyzedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={asmt.id}
                  onClick={() => onSelectAssessment(asmt)}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getImpactBadge(asmt.summary.overallImpact)}`}>
                        {asmt.summary.overallImpact} Impact
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {dateStr}
                      </span>
                      <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                        {asmt.analyzedBy}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                      "{asmt.proposedChange}"
                    </h3>

                    <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
                      {asmt.summary.overallReason}
                    </p>
                  </div>

                  {/* Metrics summary */}
                  <div className="flex items-center flex-wrap gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 shrink-0">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Timeline
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {asmt.summary.timelineLabel}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Cost Impact
                      </span>
                      <span className="text-sm font-extrabold text-emerald-600">
                        {asmt.summary.costLabel}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Teams Affected
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {asmt.summary.teamsCount} Teams
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-purple-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all ml-2">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
