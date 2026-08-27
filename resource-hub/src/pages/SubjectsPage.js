import React, { useState } from 'react';
import { useResources } from '../context/ResourceContext';
import { SubjectCard } from '../components/subjects/SubjectCard';
import { Input } from '../components/common/Input';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EmptyState } from '../components/common/EmptyState';
import { BookOpen, Search, Filter, Layers } from 'lucide-react';

export function SubjectsPage() {
  const { subjects } = useResources();
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter subjects using JavaScript filter method
  const filteredSubjects = subjects.filter((subject) => {
    if (selectedSemester !== 'all' && subject.semester !== Number(selectedSemester)) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchName = subject.name.toLowerCase().includes(q);
      const matchCode = subject.code.toLowerCase().includes(q);
      const matchFaculty = subject.leadFaculty.toLowerCase().includes(q);
      const matchDesc = subject.description.toLowerCase().includes(q);
      return matchName || matchCode || matchFaculty || matchDesc;
    }
    return true;
  });

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <Breadcrumb items={[{ label: 'Subjects & Curriculum' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <span>ECE Curriculum & Subjects</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse all course structures, syllabus modules, faculty leads, and linked study materials
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="w-full sm:max-w-md">
            <Input
              icon={Search}
              placeholder="Search course by name, code (e.g. EC301), or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredSubjects.length}</strong> of {subjects.length} subjects
          </span>
        </div>

        {/* Semester selector tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedSemester('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 border ${
              selectedSemester === 'all'
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            All Semesters (1-8)
          </button>
          {semesters.map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 border ${
                selectedSemester === sem
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              Semester {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Grid */}
      {filteredSubjects.length === 0 ? (
        <EmptyState
          title="No subjects match your criteria"
          description="Try changing the semester selector or search keywords."
          actionLabel="Reset Filters"
          onAction={() => {
            setSelectedSemester('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}
