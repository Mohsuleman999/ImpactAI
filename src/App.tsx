import React, { useState, useEffect } from 'react';
import { 
  Project, 
  ChangeImpactAssessment, 
  ProjectNode, 
  AffectedArea,
  ImpactLevel 
} from './types/project';
import { sampleProjects, initialAssessment } from './data/seedData';
import { Header } from './components/Header';
import { HeroChangeInput } from './components/HeroChangeInput';
import { ProjectFlowMap } from './components/ProjectFlowMap';
import { ImpactSummaryCards } from './components/ImpactSummaryCards';
import { WhatThisChangeAffects } from './components/WhatThisChangeAffects';
import { BeforeVsAfter } from './components/BeforeVsAfter';
import { QuestionsBeforeApproval } from './components/QuestionsBeforeApproval';
import { WhatShouldHappenNext } from './components/WhatShouldHappenNext';
import { NodeDrawer } from './components/NodeDrawer';
import { CalculationDrawer } from './components/CalculationDrawer';
import { TimelineDrawer } from './components/TimelineDrawer';
import { UploadProjectModal } from './components/UploadProjectModal';
import { CreateImpactReportModal } from './components/CreateImpactReportModal';
import { ProjectsView } from './components/ProjectsView';
import { AssessmentsView } from './components/AssessmentsView';
import { ProjectSettingsDrawer } from './components/ProjectSettingsDrawer';

export default function App() {
  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('impactlens_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved projects', e);
    }
    return sampleProjects;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    return projects[0]?.id || sampleProjects[0].id;
  });

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0] || sampleProjects[0];

  // Active Assessment State
  const [currentAssessment, setCurrentAssessment] = useState<ChangeImpactAssessment | null>(() => {
    return currentProject.assessments?.[0] || initialAssessment;
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'assessments'>('dashboard');

  // Simulation & Drawer States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ProjectNode | null>(null);
  const [isCostDrawerOpen, setIsCostDrawerOpen] = useState(false);
  const [isTimelineDrawerOpen, setIsTimelineDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('impactlens_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [projects]);

  // Update current assessment when active project switches
  useEffect(() => {
    if (currentProject.assessments?.length > 0) {
      setCurrentAssessment(currentProject.assessments[0]);
    } else {
      setCurrentAssessment(initialAssessment);
    }
  }, [activeProjectId]);

  // Handle Analyzing a Proposed Change
  const handleAnalyseChange = async (proposedChange: string) => {
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/analyze-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: currentProject,
          proposedChange,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const assessmentResult: ChangeImpactAssessment = await res.json();
      
      // Update assessment & project assessment history
      setCurrentAssessment(assessmentResult);

      const updatedProject: Project = {
        ...currentProject,
        lastAnalysisDate: new Date().toISOString(),
        assessments: [assessmentResult, ...(currentProject.assessments || []).filter(a => a.id !== assessmentResult.id)],
      };

      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    } catch (err) {
      console.warn('API simulation failed, updating with deterministic client simulation', err);
      // Fallback update
      const fallbackAssessment: ChangeImpactAssessment = {
        ...initialAssessment,
        id: 'asmt-' + Date.now(),
        projectId: currentProject.id,
        proposedChange,
        analyzedAt: new Date().toISOString(),
      };

      setCurrentAssessment(fallbackAssessment);
      const updatedProject: Project = {
        ...currentProject,
        lastAnalysisDate: new Date().toISOString(),
        assessments: [fallbackAssessment, ...(currentProject.assessments || [])],
      };
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle checklist item
  const handleToggleNextStep = (stepId: string) => {
    if (!currentAssessment) return;
    const updatedSteps = currentAssessment.nextSteps.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    const updatedAssessment = {
      ...currentAssessment,
      nextSteps: updatedSteps,
    };
    setCurrentAssessment(updatedAssessment);

    // Save in project history
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === currentProject.id) {
          return {
            ...p,
            assessments: p.assessments.map((a) => (a.id === updatedAssessment.id ? updatedAssessment : a)),
          };
        }
        return p;
      })
    );
  };

  // Project Created Handler
  const handleProjectCreated = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setActiveProjectId(newProject.id);
    if (newProject.assessments?.length > 0) {
      setCurrentAssessment(newProject.assessments[0]);
    } else {
      setCurrentAssessment(initialAssessment);
    }
    setActiveTab('dashboard');
  };

  // Update Project Model Handler
  const handleUpdateProject = (updated: Project) => {
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Select Assessment from History
  const handleSelectHistoricalAssessment = (asmt: ChangeImpactAssessment) => {
    setCurrentAssessment(asmt);
    setActiveTab('dashboard');
  };

  const nodeImpacts = currentAssessment?.nodeImpactMap || {};

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation & Project Switcher */}
      <Header
        currentProject={currentProject}
        allProjects={projects}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSelectProject={(id) => {
          setActiveProjectId(id);
          setActiveTab('dashboard');
        }}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* 1. PRIMARY CHANGE INPUT (PRD Section 8) */}
            <HeroChangeInput
              currentProject={currentProject}
              onAnalyse={handleAnalyseChange}
              isAnalyzing={isAnalyzing}
            />

            {/* 2. PROJECT FLOW & IMPACT MAP (PRD Section 9 & 13) */}
            <ProjectFlowMap
              project={currentProject}
              nodeImpacts={nodeImpacts}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
              isSimulating={isAnalyzing}
            />

            {/* 3. IMPACT SUMMARY 6 CARDS (PRD Section 14) */}
            <ImpactSummaryCards
              assessment={currentAssessment}
              onOpenCostDrawer={() => setIsCostDrawerOpen(true)}
              onOpenTimelineDrawer={() => setIsTimelineDrawerOpen(true)}
            />

            {/* 4. WHAT THIS CHANGE AFFECTS (PRD Section 16) */}
            {currentAssessment && (
              <WhatThisChangeAffects
                affectedAreas={currentAssessment.affectedAreas}
                onOpenArtefactDetails={(area) => {
                  // Find a relevant node to inspect
                  const matchingNode = currentProject.nodes.find(
                    (n) => n.label.toLowerCase().includes(area.title.toLowerCase()) || area.title.toLowerCase().includes(n.label.toLowerCase())
                  );
                  setSelectedNode(matchingNode || currentProject.nodes[0]);
                }}
              />
            )}

            {/* 5. BEFORE VS AFTER (PRD Section 17) */}
            {currentAssessment && (
              <BeforeVsAfter beforeVsAfter={currentAssessment.beforeVsAfter} />
            )}

            {/* 6. BEFORE APPROVING THIS CHANGE... (PRD Section 18) */}
            {currentAssessment && (
              <QuestionsBeforeApproval
                questions={currentAssessment.questionsBeforeApproval}
              />
            )}

            {/* 7. WHAT SHOULD HAPPEN NEXT? & CREATE REPORT CTA (PRD Section 19 & 28) */}
            {currentAssessment && (
              <WhatShouldHappenNext
                actions={currentAssessment.nextSteps}
                onToggleAction={handleToggleNextStep}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            )}

          </div>
        )}

        {/* PROJECTS VIEW (PRD Section 26) */}
        {activeTab === 'projects' && (
          <ProjectsView
            projects={projects}
            activeProjectId={activeProjectId}
            onOpenProject={(id) => {
              setActiveProjectId(id);
              setActiveTab('dashboard');
            }}
            onNewProject={() => setIsUploadModalOpen(true)}
          />
        )}

        {/* ASSESSMENTS HISTORY VIEW (PRD Section 27) */}
        {activeTab === 'assessments' && (
          <AssessmentsView
            currentProject={currentProject}
            assessments={currentProject.assessments || []}
            onSelectAssessment={handleSelectHistoricalAssessment}
            onGoToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Interactive Drawers & Modals */}
      <NodeDrawer
        node={selectedNode}
        project={currentProject}
        onClose={() => setSelectedNode(null)}
      />

      {currentAssessment && (
        <>
          <CalculationDrawer
            isOpen={isCostDrawerOpen}
            costBreakdown={currentAssessment.costBreakdown}
            totalCostDelta={currentAssessment.summary.costDelta}
            onClose={() => setIsCostDrawerOpen(false)}
          />

          <TimelineDrawer
            isOpen={isTimelineDrawerOpen}
            timeline={currentAssessment.timelineBreakdown}
            onClose={() => setIsTimelineDrawerOpen(false)}
          />

          <CreateImpactReportModal
            isOpen={isReportModalOpen}
            project={currentProject}
            assessment={currentAssessment}
            onClose={() => setIsReportModalOpen(false)}
          />
        </>
      )}

      <UploadProjectModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      <ProjectSettingsDrawer
        project={currentProject}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateProject={handleUpdateProject}
      />
    </div>
  );
}
