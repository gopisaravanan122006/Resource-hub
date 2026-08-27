import React, { useState } from 'react';
import { useResources } from '../context/ResourceContext';
import { QuickLinkCard } from '../components/dashboard/QuickLinkCard';
import { ResistorCalculator } from '../components/tools/ResistorCalculator';
import { PinoutViewer } from '../components/tools/PinoutViewer';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  ExternalLink,
  Wrench,
  Layers,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Zap
} from 'lucide-react';

export function ImportantLinksPage() {
  const { importantLinks } = useResources();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'links' | 'tools'
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'Online Learning', 'Virtual Labs', 'Research & Papers', 'Simulation Tools', 'EDA / VLSI', 'Reference & Community', 'Hardware & Chips', 'Datasheets'];

  const filteredLinks = importantLinks.filter((link) => {
    if (categoryFilter === 'all') return true;
    return link.category === categoryFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Breadcrumb items={[{ label: 'Lab & Important Links' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <ExternalLink className="w-6 h-6" />
            </div>
            <span>Important Links & Interactive Lab Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Curated repository of academic platforms, circuit simulators, and interactive engineering tools
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Portals & Tools
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'tools'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Interactive Tools
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'links'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Curated Links
          </button>
        </div>
      </div>

      {/* Interactive Tools Section */}
      {(activeTab === 'all' || activeTab === 'tools') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Wrench className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Embedded Engineering Calculators & Pinout References
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResistorCalculator />
            <PinoutViewer />
          </div>
        </div>
      )}

      {/* Curated External Links Section */}
      {(activeTab === 'all' || activeTab === 'links') && (
        <div className="space-y-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-400">
                <ExternalLink className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Curated Academic & Industry Links
              </h2>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                    categoryFilter === cat
                      ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'All Links' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredLinks.map((link) => (
              <QuickLinkCard key={link.id} link={link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
