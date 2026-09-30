import React, { useState } from 'react';
import { Project, Requirement, Task, ProjectRisk, ProcessStep } from '../types/project';
import { 
  X, 
  SlidersHorizontal, 
  Layers, 
  CheckSquare, 
  AlertTriangle, 
  Users, 
  Network, 
  Calendar, 
  DollarSign,
  Plus,
  Save,
  Trash2
} from 'lucide-react';

interface ProjectSettingsDrawerProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (updated: Project) => void;
}

export const ProjectSettingsDrawer: React.FC<ProjectSettingsDrawerProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateProject,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'requirements' | 'tasks' | 'processes' | 'risks'>('info');

  // Local state for editing
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [budget, setBudget] = useState(project.budget);
  const [targetDate, setTargetDate] = useState(project.targetCompletionDate);
  const [requirements, setRequirements] = useState<Requirement[]>(project.requirements || []);
  const [tasks, setTasks] = useState<Task[]>(project.tasks || []);
  const [risks, setRisks] = useState<ProjectRisk[]>(project.risks || []);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated: Project = {
      ...project,
      name,
      description,
      budget: Number(budget),
      targetCompletionDate: targetDate,
      requirements,
      tasks,
      risks,
    };
    onUpdateProject(updated);
    onClose();
  };

  const handleAddRequirement = () => {
    const newReq: Requirement = {
      id: `REQ-${String(requirements.length + 1).padStart(3, '0')}`,
      description: 'New verified business requirement',
      type: 'Functional',
      priority: 'High',
      criticality: 'Medium',
      owner: 'Business Analyst',
      status: 'Approved',
    };
    setRequirements([...requirements, newReq]);
  };

  const handleDeleteRequirement = (id: string) => {
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" />
              <span>Project Baseline Model</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Project Details & Artefacts
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Review and calibrate underlying requirements, tasks, and risk registers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview & Budget
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'requirements'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Requirements ({requirements.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'tasks'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'risks'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Risks ({risks.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Tab 1: Info & Baseline */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-purple-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Executive Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-purple-500 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Total Budget ($ USD)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold">Project Sponsor:</span>
                  <span className="font-bold text-slate-900">{project.sponsor || 'Executive Board'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold">Project Manager:</span>
                  <span className="font-bold text-slate-900">{project.projectManager || 'Technical PM'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold">Business Analyst:</span>
                  <span className="font-bold text-slate-900">{project.businessAnalyst || 'Senior BA'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Requirements */}
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Requirements Baseline
                </span>
                <button
                  type="button"
                  onClick={handleAddRequirement}
                  className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Requirement
                </button>
              </div>

              <div className="space-y-2.5">
                {requirements.map((req, idx) => (
                  <div
                    key={req.id || idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="font-bold text-purple-700 bg-purple-100/60 px-1.5 py-0.5 rounded-md">
                          {req.id}
                        </code>
                        <span className="font-bold text-slate-500 uppercase text-[10px]">
                          {req.type}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                          {req.priority} Priority
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium mt-1">
                        {req.description}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Owner: {req.owner}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteRequirement(req.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Tasks */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Work Breakdown Structure (WBS)
              </span>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                          {task.id}
                        </code>
                        <span className="font-bold text-slate-900">{task.title}</span>
                      </div>
                      <div className="text-slate-500 mt-1 text-[11px]">
                        Owner: {task.owner} · Duration: {task.durationDays} days · {task.estimatedHours}h @ ${task.hourlyRate}/hr
                      </div>
                    </div>

                    {task.onCriticalPath && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 shrink-0">
                        Critical Path
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Risks */}
          {activeTab === 'risks' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Project Risk Register
              </span>
              <div className="space-y-2">
                {risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <code className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md">
                          {risk.id}
                        </code>
                        <span className="font-bold text-slate-900">{risk.risk}</span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                        {risk.impact} Impact
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 text-[11px]">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </>
  );
};
