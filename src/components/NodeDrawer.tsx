import React, { useState } from 'react';
import { ProjectNode, Project } from '../types/project';
import { 
  X, 
  Layers, 
  User, 
  Network, 
  FileText, 
  CheckSquare, 
  FlaskConical, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NodeDrawerProps {
  node: ProjectNode | null;
  project: Project;
  onClose: () => void;
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({ node, project, onClose }) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  if (!node) return null;

  // Find connected node objects
  const connectedNodes = project.nodes.filter((n) => node.connectedTo.includes(n.id));

  // Find detailed requirements, tasks, tests, risks
  const relatedReqs = project.requirements.filter((r) =>
    node.technicalDetails?.requirements?.some((tReq) => tReq.includes(r.id))
  );
  const relatedTasks = project.tasks.filter((t) =>
    node.technicalDetails?.tasks?.some((tTask) => tTask.includes(t.id))
  );
  const relatedTests = project.tests.filter((test) =>
    node.technicalDetails?.tests?.some((tTest) => tTest.includes(test.id))
  );
  const relatedRisks = project.risks.filter((risk) =>
    node.technicalDetails?.risks?.some((tRisk) => tRisk.includes(risk.id))
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700">
                Workflow Element
              </span>
              {node.impact !== 'none' && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                  node.impact === 'direct'
                    ? 'bg-rose-100 text-rose-700'
                    : node.impact === 'downstream'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {node.impact} Impact
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {node.label}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {node.subtitle || 'Operational Node'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Owner & Department */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Owner / Business Function
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <User className="w-4 h-4 text-purple-600" />
              <span>{node.owner}</span>
            </div>
          </div>

          {/* Connected Processes */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-slate-500" />
              <span>Connected Processes & Hand-offs</span>
            </div>
            {connectedNodes.length > 0 ? (
              <div className="space-y-2">
                {connectedNodes.map((cn) => (
                  <div
                    key={cn.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800"
                  >
                    <span>{cn.label}</span>
                    <span className="text-slate-400 text-[11px] font-normal">
                      Owner: {cn.owner}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                Terminal process node (no downstream dependencies within this scope).
              </p>
            )}
          </div>

          {/* High-level Counts (Plain English for layperson) */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Related Project Elements
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Requirements</span>
                <span className="text-lg font-black text-slate-900">{node.relatedRequirementsCount}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Active Tasks</span>
                <span className="text-lg font-black text-slate-900">{node.relatedTasksCount}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Test Cases</span>
                <span className="text-lg font-black text-slate-900">{node.relatedTestsCount}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Potential Risks</span>
                <span className="text-lg font-black text-rose-600">{node.potentialRisksCount}</span>
              </div>
            </div>
          </div>

          {/* Technical Details Toggle Button */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>{showTechnicalDetails ? 'Hide technical details' : 'View technical details'}</span>
              {showTechnicalDetails ? (
                <ChevronDown className="w-4 h-4 text-slate-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Technical Details Content (Artefact IDs belong here) */}
            {showTechnicalDetails && (
              <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Requirements list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Associated Requirements</span>
                  </h4>
                  <div className="space-y-2">
                    {node.technicalDetails?.requirements?.map((reqStr, idx) => (
                      <div key={idx} className="p-2.5 bg-purple-50/50 rounded-lg border border-purple-100 text-xs font-medium text-purple-950">
                        <code>{reqStr}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Associated Project Tasks</span>
                  </h4>
                  <div className="space-y-2">
                    {node.technicalDetails?.tasks?.map((taskStr, idx) => (
                      <div key={idx} className="p-2.5 bg-indigo-50/50 rounded-lg border border-indigo-100 text-xs font-medium text-indigo-950">
                        <code>{taskStr}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tests list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Validation & Test Cases</span>
                  </h4>
                  <div className="space-y-2">
                    {node.technicalDetails?.tests?.map((testStr, idx) => (
                      <div key={idx} className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs font-medium text-emerald-950">
                        <code>{testStr}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Identified Risk Factors</span>
                  </h4>
                  <div className="space-y-2">
                    {node.technicalDetails?.risks?.map((riskStr, idx) => (
                      <div key={idx} className="p-2.5 bg-rose-50/50 rounded-lg border border-rose-100 text-xs font-medium text-rose-950">
                        <code>{riskStr}</code>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
};
