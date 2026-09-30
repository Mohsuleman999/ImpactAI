import React, { useState } from 'react';
import { Project } from '../types/project';
import { 
  Compass, 
  ChevronDown, 
  PlusCircle, 
  SlidersHorizontal, 
  FileText, 
  Layers, 
  History, 
  Sparkles,
  Check
} from 'lucide-react';

interface HeaderProps {
  currentProject: Project;
  allProjects: Project[];
  activeTab: 'dashboard' | 'projects' | 'assessments';
  onSelectTab: (tab: 'dashboard' | 'projects' | 'assessments') => void;
  onSelectProject: (projectId: string) => void;
  onOpenUploadModal: () => void;
  onOpenSettingsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProject,
  allProjects,
  activeTab,
  onSelectTab,
  onSelectProject,
  onOpenUploadModal,
  onOpenSettingsModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white">
                  <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 bg-clip-text text-transparent">
                    ImpactLens AI
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-md uppercase tracking-wider">
                    Core
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block font-medium">
                  See what a small project change will actually affect
                </p>
              </div>
            </button>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-slate-200">
              <button
                onClick={() => onSelectTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                Dashboard
              </button>
              <button
                onClick={() => onSelectTab('projects')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'projects'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Layers className="w-4 h-4 text-slate-400" />
                Projects ({allProjects.length})
              </button>
              <button
                onClick={() => onSelectTab('assessments')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'assessments'
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <History className="w-4 h-4 text-slate-400" />
                Assessments
              </button>
            </nav>
          </div>

          {/* Right Action / Project Selector */}
          <div className="flex items-center gap-3">
            {/* Project Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 bg-slate-100/80 hover:bg-slate-200/70 rounded-xl text-left border border-slate-200/90 transition-all text-sm font-medium group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider hidden lg:inline">
                  Project:
                </span>
                <span className="max-w-[140px] sm:max-w-[210px] truncate text-slate-900 font-semibold text-xs sm:text-sm">
                  {currentProject.name}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-200" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Switch Project
                      </span>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenUploadModal();
                        }}
                        className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        New Project
                      </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto py-1">
                      {allProjects.map((p) => {
                        const isCurrent = p.id === currentProject.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              onSelectProject(p.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors ${
                              isCurrent
                                ? 'bg-purple-50/70 text-purple-900 font-medium'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="text-sm font-semibold truncate">
                                {p.name}
                              </div>
                              <div className="text-xs text-slate-400 truncate">
                                {p.requirements.length} Reqs · {p.nodes.length} Nodes · {p.assessments.length} Runs
                              </div>
                            </div>
                            {isCurrent && (
                              <Check className="w-4 h-4 text-purple-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onSelectTab('projects');
                        }}
                        className="w-full text-center py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
                      >
                        Manage All Projects ({allProjects.length}) →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Upload Button */}
            <button
              onClick={onOpenUploadModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Upload Project
            </button>

            {/* Project Settings / Details */}
            <button
              onClick={onOpenSettingsModal}
              title="Project Details & Artefacts"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`py-1 font-semibold flex items-center gap-1 ${
              activeTab === 'dashboard' ? 'text-purple-600' : 'text-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('projects')}
            className={`py-1 font-semibold flex items-center gap-1 ${
              activeTab === 'projects' ? 'text-purple-600' : 'text-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Projects ({allProjects.length})
          </button>
          <button
            onClick={() => onSelectTab('assessments')}
            className={`py-1 font-semibold flex items-center gap-1 ${
              activeTab === 'assessments' ? 'text-purple-600' : 'text-slate-500'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Assessments
          </button>
          <button
            onClick={onOpenUploadModal}
            className="py-1 font-semibold text-purple-600 flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Upload
          </button>
        </div>
      </div>
    </header>
  );
};
