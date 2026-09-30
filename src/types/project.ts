export type ImpactLevel = 'direct' | 'downstream' | 'possible' | 'none';
export type SeverityLevel = 'High' | 'Medium' | 'Low' | 'Possible';

export interface ProjectNode {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  category: 'main' | 'sub';
  parentId?: string;
  connectedTo: string[];
  owner: string;
  impact: ImpactLevel;
  impactReason?: string;
  relatedRequirementsCount: number;
  relatedTasksCount: number;
  relatedTestsCount: number;
  potentialRisksCount: number;
  technicalDetails: {
    requirements: string[];
    tasks: string[];
    tests: string[];
    risks: string[];
  };
}

export interface Requirement {
  id: string;
  description: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  criticality: string;
  owner: string;
  status: string;
  sourceText?: string;
}

export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  previousStep?: string;
  nextStep?: string;
  owner: string;
  system: string;
  input: string;
  output: string;
}

export interface Task {
  id: string;
  title: string;
  owner: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  dependencies: string[];
  criticality: 'High' | 'Medium' | 'Low';
  estimatedHours: number;
  hourlyRate: number;
  estimatedCost: number;
  onCriticalPath?: boolean;
}

export interface TeamStakeholder {
  team: string;
  role: string;
  responsibility: string;
  dependencies: string;
}

export interface ProjectSystem {
  name: string;
  role: string;
  integration: string;
  processSupported: string;
}

export interface TestCase {
  id: string;
  name: string;
  requirementTested: string;
  expectedResult: string;
  owner: string;
  status: 'Passed' | 'Ready' | 'Needs Update';
}

export interface ProjectRisk {
  id: string;
  risk: string;
  likelihood: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  mitigation: string;
  owner: string;
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  responsibleTeam: string;
  dependentTasks: string[];
  status: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  ruleOrPolicy: string;
  status: 'Approved' | 'Proposed' | 'Under Review';
}

export interface Dependency {
  fromType: 'Requirement' | 'Process' | 'Task' | 'System' | 'Team' | 'Milestone' | 'Risk' | 'Test';
  fromId: string;
  toType: 'Requirement' | 'Process' | 'Task' | 'System' | 'Team' | 'Milestone' | 'Risk' | 'Test';
  toId: string;
  isAiInferred: boolean;
  notes?: string;
}

export interface CostBreakdownItem {
  category: string;
  hours: number;
  rate: number;
  fixedCost?: number;
  total: number;
  explanation: string;
}

export interface TimelineBreakdown {
  originalDate: string;
  projectedDate: string;
  delayDays: number;
  criticalPathTasks: string[];
  explanation: string;
}

export interface AffectedArea {
  id: string;
  title: string;
  severity: SeverityLevel;
  description: string;
  icon: string;
  evidence: string;
  isAiInferred: boolean;
  affectedArtefacts: string[];
}

export interface ApprovalQuestion {
  id: string;
  question: string;
  supportingNote: string;
  category: string;
  icon: string;
  needsClarification: boolean;
  clarificationReason?: string;
}

export interface NextStepAction {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface EvidenceItem {
  claim: string;
  sourceText: string;
  sourceSection: string;
  type: 'Project evidence' | 'AI inferred';
}

export interface ChangeImpactAssessment {
  id: string;
  projectId: string;
  proposedChange: string;
  analyzedAt: string;
  analyzedBy: string;
  summary: {
    overallImpact: 'High' | 'Medium' | 'Low';
    overallReason: string;
    timelineDeltaDays: number;
    timelineLabel: string;
    timelineNote: string;
    costDelta: number;
    costLabel: string;
    costNote: string;
    teamsCount: number;
    teamsList: string[];
    testsCount: number;
    testsNote: string;
    milestonesCount: number;
    milestonesNote: string;
  };
  costBreakdown: CostBreakdownItem[];
  timelineBreakdown: TimelineBreakdown;
  affectedAreas: AffectedArea[];
  beforeVsAfter: {
    before: string[];
    after: string[];
  };
  questionsBeforeApproval: ApprovalQuestion[];
  nextSteps: NextStepAction[];
  nodeImpactMap: Record<string, {
    impactType: ImpactLevel;
    reason: string;
    badgeText?: string;
  }>;
  evidence: EvidenceItem[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  businessObjective: string;
  scope: string;
  status: 'Planning' | 'In Progress' | 'Under Review' | 'Active';
  startDate: string;
  targetCompletionDate: string;
  budget: number;
  sponsor: string;
  projectManager: string;
  businessAnalyst: string;
  nodes: ProjectNode[];
  requirements: Requirement[];
  processes: ProcessStep[];
  tasks: Task[];
  teams: TeamStakeholder[];
  systems: ProjectSystem[];
  tests: TestCase[];
  risks: ProjectRisk[];
  milestones: Milestone[];
  decisions: ProjectDecision[];
  dependencies: Dependency[];
  lastAnalysisDate?: string;
  assessments: ChangeImpactAssessment[];
}
