import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ResourceTable } from '../components/resources/ResourceTable';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import {
  BookOpen,
  User,
  GraduationCap,
  Calendar,
  Layers,
  FileText,
  PlusCircle,
  LayoutGrid,
  List,
  CheckCircle2
} from 'lucide-react';

export function SubjectDetailPage({ onOpenAddModal }) {
  const { id } = useParams();
  const { subjects, resources } = useResources();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Find subject using JavaScript find method
  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <div className="space-y-6 pb-12">
        <Breadcrumb items={[{ label: 'Subjects', to: '/subjects' }, { label: 'Not Found' }]} />
        <EmptyState
          title="Subject Not Found"
          description="The requested ECE subject could not be located."
          actionLabel="Back to All Subjects"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  // Filter resources for this subject using JavaScript filter method
  const subjectResources = resources.filter((r) => {
    const matchSubject = r.subjectId === subject.id;
    const matchCategory = activeCategory === 'all' || r.category === activeCategory;
    return matchSubject && matchCategory;
  });

  const categories = ['all', 'Notes', 'PYQ', 'Lab Manual', 'Simulation', 'Video Lecture', 'Reference Book'];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Breadcrumb
        items={[
          { label: 'Subjects', to: '/subjects' },
          { label: `${subject.code}: ${subject.name}` }
        ]}
      />

      {/* Subject Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-brand-500 text-white">
              {subject.code}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/10 text-brand-200 border border-white/10">
              Semester {subject.semester}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {subject.credits} Academic Credits
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {subject.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {subject.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-400" />
              <span>Lead Faculty: <strong>{subject.leadFaculty}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-400" />
              <span>Department: <strong>{subject.department}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Syllabus Breakdown */}
      {subject.modules && subject.modules.length > 0 && (
        <Card className="p-6 border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Course Syllabus Modules</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subject.modules.map((mod, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {mod}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Resources for this subject */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Subject Study Materials & Files
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subjectResources.length} available resources for {subject.code}
            </p>
          </div>

          {/* Category Tabs & View Switcher */}
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={onOpenAddModal}
            >
              Add Material
            </Button>

            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-all border ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Materials' : cat}
            </button>
          ))}
        </div>

        {/* Resource Display */}
        {subjectResources.length === 0 ? (
          <EmptyState
            title="No materials in this category yet"
            description={`Be the first to upload ${activeCategory} for ${subject.name}!`}
            actionLabel="Contribute Material"
            onAction={onOpenAddModal}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjectResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <ResourceTable resources={subjectResources} />
        )}
      </div>
    </div>
  );
}
