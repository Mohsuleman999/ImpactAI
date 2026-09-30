import React from 'react';
import { 
  Project, 
  ProjectNode, 
  ImpactLevel 
} from '../types/project';
import { 
  ShoppingCart, 
  CreditCard, 
  Warehouse, 
  Truck, 
  PackageCheck, 
  RotateCcw, 
  Receipt,
  FileCheck,
  Cpu,
  ShieldCheck,
  Calendar,
  Database,
  Video,
  Coins,
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

interface ProjectFlowMapProps {
  project: Project;
  nodeImpacts: Record<string, { impactType: ImpactLevel; reason: string; badgeText?: string }>;
  selectedNode: ProjectNode | null;
  onSelectNode: (node: ProjectNode) => void;
  isSimulating: boolean;
}

// Icon helper
const getIconComponent = (iconName: string) => {
  const map: Record<string, React.ElementType> = {
    ShoppingCart,
    CreditCard,
    Warehouse,
    Truck,
    PackageCheck,
    RotateCcw,
    Receipt,
    FileCheck,
    Cpu,
    ShieldCheck,
    Calendar,
    Database,
    Video,
    Coins,
  };
  return map[iconName] || Layers;
};

export const ProjectFlowMap: React.FC<ProjectFlowMapProps> = ({
  project,
  nodeImpacts,
  selectedNode,
  onSelectNode,
  isSimulating,
}) => {
  const nodes = project.nodes || [];

  const getImpactBadgeConfig = (level: ImpactLevel) => {
    switch (level) {
      case 'direct':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-400/80',
          text: 'text-rose-700',
          badgeBg: 'bg-rose-500 text-white',
          label: 'Direct Impact',
          ring: 'ring-rose-500/20 shadow-rose-200/50',
          pulse: 'animate-pulse',
        };
      case 'downstream':
        return {
          bg: 'bg-amber-50/70',
          border: 'border-amber-400/80',
          text: 'text-amber-800',
          badgeBg: 'bg-amber-500 text-white',
          label: 'Downstream',
          ring: 'ring-amber-500/20 shadow-amber-200/50',
          pulse: '',
        };
      case 'possible':
        return {
          bg: 'bg-blue-50/70',
          border: 'border-blue-400/70',
          text: 'text-blue-700',
          badgeBg: 'bg-blue-500 text-white',
          label: 'Possible Impact',
          ring: 'ring-blue-500/20 shadow-blue-200/50',
          pulse: '',
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-slate-200',
          text: 'text-slate-600',
          badgeBg: 'bg-slate-200 text-slate-600',
          label: 'Not Impacted',
          ring: 'shadow-slate-100',
          pulse: '',
        };
    }
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-600"></span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Project Flow & Impact Map
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Click any node to inspect owner, connections, requirements and risks.
            </p>
          </div>

          {/* Impact Level Legend */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Direct Impact
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Downstream
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Possible
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Not Impacted
            </div>
          </div>
        </div>

        {/* Visual Flow Container */}
        <div className="relative bg-gradient-to-b from-white via-slate-50/50 to-white rounded-3xl border border-slate-200 shadow-xl p-4 sm:p-6 lg:p-8 overflow-hidden">
          
          {/* Background subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Simulation animated indicator banner */}
          {isSimulating && (
            <div className="mb-6 p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md animate-pulse">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>Propagating impact across project dependency graph...</span>
              </div>
              <span className="text-purple-200 text-xs">Simulating ripple effect</span>
            </div>
          )}

          {/* Flow Nodes (Responsive Horizontal / Stacking Layout) */}
          <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300">
            <div className="flex items-center min-w-max gap-3 sm:gap-4 py-2">
              {nodes.map((node, index) => {
                const impactInfo = nodeImpacts[node.id];
                const impactLevel: ImpactLevel = impactInfo?.impactType || 'none';
                const styleConfig = getImpactBadgeConfig(impactLevel);
                const isSelected = selectedNode?.id === node.id;
                const IconComponent = getIconComponent(node.icon);
                const hasNext = index < nodes.length - 1;

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Card */}
                    <div
                      onClick={() => onSelectNode(node)}
                      className={`relative group w-48 sm:w-56 cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                        styleConfig.bg
                      } ${styleConfig.border} ${
                        isSelected
                          ? 'ring-4 ring-purple-600/30 scale-102 border-purple-600'
                          : 'hover:border-purple-400'
                      }`}
                    >
                      {/* Top Header inside Node */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Impact Pill */}
                        {impactLevel !== 'none' && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${styleConfig.badgeBg}`}
                          >
                            {impactInfo?.badgeText || styleConfig.label}
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mb-3">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                          {node.label}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {node.subtitle || node.owner}
                        </p>
                      </div>

                      {/* Artefact Summary Counters */}
                      <div className="pt-2.5 border-t border-slate-200/70 grid grid-cols-2 gap-1 text-[11px] text-slate-600 font-semibold">
                        <span className="truncate">
                          📦 {node.relatedRequirementsCount} Reqs
                        </span>
                        <span className="truncate">
                          ⚙️ {node.relatedTasksCount} Tasks
                        </span>
                        <span className="truncate">
                          🧪 {node.relatedTestsCount} Tests
                        </span>
                        <span className="truncate text-rose-600">
                          ⚠️ {node.potentialRisksCount} Risks
                        </span>
                      </div>

                      {/* Highlight Pulse Ripple when Direct Impact */}
                      {impactLevel === 'direct' && (
                        <div className="absolute -inset-0.5 rounded-2xl bg-rose-500/20 blur-xs -z-10 animate-pulse pointer-events-none" />
                      )}
                    </div>

                    {/* Connecting Arrow */}
                    {hasNext && (
                      <div className="flex items-center justify-center text-slate-400 px-0.5 group">
                        <div className="flex items-center">
                          <div className={`h-0.5 w-4 sm:w-6 transition-colors ${
                            isSimulating ? 'bg-gradient-to-r from-purple-500 to-indigo-600 animate-pulse' : 'bg-slate-300'
                          }`} />
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center -ml-1 text-slate-500 shadow-2xs">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                          <div className={`h-0.5 w-4 sm:w-6 transition-colors ${
                            isSimulating ? 'bg-gradient-to-r from-indigo-600 to-purple-500 animate-pulse' : 'bg-slate-300'
                          }`} />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Quick instructions bar */}
          <div className="mt-4 pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-purple-600 shrink-0" />
              <span>
                Default map shows high-level process steps. Click any card to drill into specific Artefact IDs (REQ, TASK, TEST).
              </span>
            </div>
            <div className="font-semibold text-slate-700">
              Total Workflow Nodes: {nodes.length}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
