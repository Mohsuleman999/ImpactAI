import React, { useState } from 'react';
import { Project, ChangeImpactAssessment } from '../types/project';
import { 
  X, 
  Printer, 
  Copy, 
  Download, 
  Check, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface CreateImpactReportModalProps {
  isOpen: boolean;
  project: Project;
  assessment: ChangeImpactAssessment | null;
  onClose: () => void;
}

export const CreateImpactReportModal: React.FC<CreateImpactReportModalProps> = ({
  isOpen,
  project,
  assessment,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !assessment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ImpactLens AI - Executive Change Impact Report

**Project:** ${project.name}  
**Proposed Change:** "${assessment.proposedChange}"  
**Analysis Date:** ${new Date(assessment.analyzedAt).toLocaleDateString()}  
**Analyzed By:** ${assessment.analyzedBy}  

---

## 1. Executive Summary
- **Overall Impact Level:** ${assessment.summary.overallImpact}
- **Impact Summary:** ${assessment.summary.overallReason}
- **Schedule Variance:** ${assessment.summary.timelineLabel} (${assessment.timelineBreakdown.explanation})
- **Cost Variance:** ${assessment.summary.costLabel} (${assessment.summary.costNote})
- **Teams Impacted:** ${assessment.summary.teamsCount} (${assessment.summary.teamsList?.join(', ')})
- **Tests Impacted:** ${assessment.summary.testsCount}

---

## 2. Before vs After
### Before (Baseline)
${assessment.beforeVsAfter.before.map((b) => `- ${b}`).join('\n')}

### After (Proposed State)
${assessment.beforeVsAfter.after.map((a) => `- ${a}`).join('\n')}

---

## 3. Cost & Timeline Breakdown
- **Projected Delay:** +${assessment.timelineBreakdown.delayDays} days (Original: ${assessment.timelineBreakdown.originalDate} -> Projected: ${assessment.timelineBreakdown.projectedDate})
- **Critical Path Tasks:** ${assessment.timelineBreakdown.criticalPathTasks.join(', ')}
- **Cost Items:**
${assessment.costBreakdown.map((c) => `  * ${c.category}: $${c.total.toLocaleString()} (${c.explanation})`).join('\n')}

---

## 4. Key Questions Before Approval
${assessment.questionsBeforeApproval.map((q, idx) => `${idx + 1}. **${q.question}** [${q.category}]\n   - Context: ${q.supportingNote}${q.needsClarification ? `\n   - *Needs Clarification:* ${q.clarificationReason}` : ''}`).join('\n\n')}

---

## 5. Recommended Next Steps
${assessment.nextSteps.map((s) => `- [${s.completed ? 'x' : ' '}] Step ${s.stepNumber}: ${s.title} - ${s.description}`).join('\n')}

---

## 6. Document Evidence vs AI Inference
${assessment.evidence.map((e) => `- **${e.claim}** (${e.type})\n  Source: ${e.sourceSection} -> "${e.sourceText}"`).join('\n\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assessment, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `impact-report-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div
          className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Executive Impact Report
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {project.name} · Generated {new Date(assessment.analyzedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadJson}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Report Document Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 print:p-0">
            
            {/* Report Header Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between text-xs text-purple-300 font-bold uppercase tracking-wider mb-2">
                <span>Change Advisory Board Briefing</span>
                <span>ImpactLens AI Certified</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                "{assessment.proposedChange}"
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-4 pt-4 border-t border-slate-800">
                <span><strong>Target Project:</strong> {project.name}</span>
                <span><strong>Overall Impact:</strong> <span className="text-rose-400 font-bold">{assessment.summary.overallImpact}</span></span>
                <span><strong>Timeline Shift:</strong> <span className="text-purple-300 font-bold">{assessment.summary.timelineLabel}</span></span>
                <span><strong>Cost Variance:</strong> <span className="text-emerald-400 font-bold">{assessment.summary.costLabel}</span></span>
              </div>
            </div>

            {/* Key Metrics Section */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                1. Executive Impact Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Schedule Variance</span>
                  <span className="text-xl font-black text-slate-900">{assessment.summary.timelineLabel}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Critical path shift</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Cost Variance</span>
                  <span className="text-xl font-black text-emerald-600">{assessment.summary.costLabel}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Deterministic rate sum</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Teams Affected</span>
                  <span className="text-xl font-black text-slate-900">{assessment.summary.teamsCount} Units</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Cross-functional</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Tests to Update</span>
                  <span className="text-xl font-black text-slate-900">{assessment.summary.testsCount} Suites</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Regression scope</span>
                </div>
              </div>
            </div>

            {/* Before vs After */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                2. Operational Transformation (Before vs After)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs font-extrabold uppercase text-slate-600 mb-2 block">Before (Baseline)</span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {assessment.beforeVsAfter.before.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-200">
                  <span className="text-xs font-extrabold uppercase text-purple-900 mb-2 block">After (Proposed)</span>
                  <ul className="space-y-2 text-xs text-slate-800">
                    {assessment.beforeVsAfter.after.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 font-semibold">
                        <span className="text-purple-600 font-bold">→</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Questions Before Approval */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                3. Questions Before Approving This Change
              </h4>
              <div className="space-y-3">
                {assessment.questionsBeforeApproval.map((q, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {q.category}
                      </span>
                      {q.needsClarification && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                          Needs Clarification
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {q.question}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {q.supportingNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                4. Recommended Action Checklist
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assessment.nextSteps.map((step) => (
                  <div key={step.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs">
                    <span className="font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md">
                      0{step.stepNumber}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{step.title}</div>
                      <div className="text-slate-500 mt-0.5">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Evidence vs AI Inference */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                5. Audit Trail & Evidence
              </h4>
              <div className="space-y-2">
                {assessment.evidence.map((ev, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        ev.type === 'Project evidence'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {ev.type}
                      </span>
                      <span className="font-bold text-slate-700">{ev.claim}</span>
                    </div>
                    <p className="text-slate-600 font-mono text-[11px] bg-slate-50 p-2 rounded-lg mt-1 border border-slate-100">
                      "{ev.sourceText}"
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Source Section: {ev.sourceSection}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Generated deterministically by ImpactLens AI Simulation Engine
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
