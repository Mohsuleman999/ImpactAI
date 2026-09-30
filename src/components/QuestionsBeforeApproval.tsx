import React from 'react';
import { ApprovalQuestion } from '../types/project';
import { 
  HelpCircle, 
  Truck, 
  Coins, 
  ShieldAlert, 
  Clock, 
  AlertCircle,
  HelpCircle as QuestionIcon,
  CheckCircle
} from 'lucide-react';

interface QuestionsBeforeApprovalProps {
  questions: ApprovalQuestion[];
}

const getCategoryIcon = (iconName: string) => {
  const map: Record<string, React.ElementType> = {
    Truck,
    Coins,
    ShieldAlert,
    Clock,
    HelpCircle,
  };
  return map[iconName] || QuestionIcon;
};

export const QuestionsBeforeApproval: React.FC<QuestionsBeforeApprovalProps> = ({ questions }) => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Before approving this change...
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Key operational, financial, and contractual governance questions that require definitive answers.
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {questions.map((q, idx) => {
            const Icon = getCategoryIcon(q.icon);

            return (
              <div
                key={q.id || idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill & Clarification Flag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                      <Icon className="w-3.5 h-3.5 text-indigo-600" />
                      {q.category || 'Governance'}
                    </span>

                    {q.needsClarification && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                        <AlertCircle className="w-3 h-3 text-rose-500" />
                        Needs Clarification
                      </span>
                    )}
                  </div>

                  {/* Main Question */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-2">
                    {q.question}
                  </h4>

                  {/* Supporting Context Note */}
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {q.supportingNote}
                  </p>
                </div>

                {/* If document info is missing, show explicit reason */}
                {q.needsClarification && q.clarificationReason && (
                  <div className="mt-4 pt-3 border-t border-rose-100 bg-rose-50/50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                    <div className="flex items-start gap-2 text-xs text-rose-900">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Missing from project upload: </span>
                        <span className="font-medium text-rose-800">{q.clarificationReason}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
