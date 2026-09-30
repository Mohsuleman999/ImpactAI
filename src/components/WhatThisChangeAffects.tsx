import React, { useState } from 'react';
import { AffectedArea } from '../types/project';
import { 
  Truck, 
  Warehouse, 
  CreditCard, 
  Headphones, 
  FlaskConical, 
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert,
  FileText,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface WhatThisChangeAffectsProps {
  affectedAreas: AffectedArea[];
  onOpenArtefactDetails: (area: AffectedArea) => void;
}

const getIcon = (iconName: string) => {
  const map: Record<string, React.ElementType> = {
    Truck,
    Warehouse,
    CreditCard,
    Headphones,
    FlaskConical,
    Calendar,
    ShieldAlert,
  };
  return map[iconName] || Layers;
};

export const WhatThisChangeAffects: React.FC<WhatThisChangeAffectsProps> = ({
  affectedAreas,
  onOpenArtefactDetails,
}) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');

  const filtered = affectedAreas.filter((area) => {
    if (filter === 'high') return area.severity === 'High';
    if (filter === 'medium') return area.severity === 'Medium' || area.severity === 'Possible';
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'Possible':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                What this change affects
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Identified direct and secondary impact domains with supporting evidence.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({affectedAreas.length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'high'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High Impact
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'medium'
                  ? 'bg-white text-amber-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Medium & Possible
            </button>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((area) => {
            const Icon = getIcon(area.icon);
            const style = getSeverityBadge(area.severity);

            return (
              <div
                key={area.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base group-hover:text-purple-700 transition-colors">
                          {area.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 mt-0.5 rounded-full text-[10px] font-extrabold border ${style.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                          {area.severity} Impact
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Short Explanation */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                    {area.description}
                  </p>
                </div>

                {/* Card Footer: Evidence Badge & Artefacts */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    {area.isAiInferred ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        AI Inferred
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Project Evidence
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenArtefactDetails(area)}
                    className="font-bold text-slate-500 hover:text-purple-600 flex items-center gap-0.5 group-hover:underline transition-colors"
                  >
                    <span>View details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
