import React from 'react';
import { Project } from '../types/project';
import { 
  FolderOpen, 
  PlusCircle, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  activeProjectId: string;
  onOpenProject: (projectId: string) => void;
  onNewProject: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  activeProjectId,
  onOpenProject,
  onNewProject,
}) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Projects Portfolio
              </h1>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Manage your project repositories, flow models, and change simulations.
            </p>
          </div>

          <button
            type="button"
            onClick={onNewProject}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-extrabold shadow-lg shadow-purple-500/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const isActive = proj.id === activeProjectId;
            const lastAnalysis = proj.lastAnalysisDate
              ? new Date(proj.lastAnalysisDate).toLocaleDateString()
              : 'None yet';

            return (
              <div
                key={proj.id}
                className={`bg-white rounded-3xl p-6 border-2 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between ${
                  isActive
                    ? 'border-purple-600 ring-4 ring-purple-600/10'
                    : 'border-slate-200/90 hover:border-purple-300'
                }`}
              >
                <div>
                  {/* Top Status & Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {proj.status}
                    </span>

                    {isActive && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200">
                        Active Workspace
                      </span>
                    )}
                  </div>

                  {/* Project Name & Description */}
                  <h3 className="text-lg font-black text-slate-900 leading-snug line-clamp-1 mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Metadata Stats */}
                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        Target Completion
                      </span>
                      <span className="font-bold text-slate-800">
                        {proj.targetCompletionDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Last Analysis
                      </span>
                      <span className="font-bold text-slate-800">
                        {lastAnalysis}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <Sparkles className="w-3.5 h-3.5" />
                        Simulations Run
                      </span>
                      <span className="font-bold text-purple-600">
                        {proj.assessments.length} assessments
                      </span>
                    </div>
                  </div>

                  {/* Artefact Pills */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-semibold text-slate-500">
                    <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {proj.requirements.length} Reqs
                    </span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {proj.nodes.length} Nodes
                    </span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {proj.tasks.length} Tasks
                    </span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {proj.teams.length} Teams
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProject(proj.id)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20'
                        : 'bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-800'
                    }`}
                  >
                    <span>{isActive ? 'Current Project' : 'Open Project'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
