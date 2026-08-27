import React from 'react';
import { useResources } from '../../context/ResourceContext';
import { CATEGORIES, FORMATS } from '../../data/initialData';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  Filter
} from 'lucide-react';

export function ResourceFilterBar({
  searchQuery,
  setSearchQuery,
  selectedSemester,
  setSelectedSemester,
  selectedSubject,
  setSelectedSubject,
  selectedCategory,
  setSelectedCategory,
  selectedFormat,
  setSelectedFormat,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalMatches,
  onResetFilters
}) {
  const { subjects } = useResources();

  // Filter subjects based on active semester if any
  const availableSubjects = selectedSemester === 'all'
    ? subjects
    : subjects.filter((s) => s.semester === Number(selectedSemester));

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSemester !== 'all' ||
    selectedSubject !== 'all' ||
    selectedCategory !== 'all' ||
    selectedFormat !== 'all' ||
    sortBy !== 'newest';

  const semesterOptions = [
    { value: 'all', label: 'All Semesters (1-8)' },
    { value: 1, label: 'Semester 1' },
    { value: 2, label: 'Semester 2' },
    { value: 3, label: 'Semester 3' },
    { value: 4, label: 'Semester 4' },
    { value: 5, label: 'Semester 5' },
    { value: 6, label: 'Semester 6' },
    { value: 7, label: 'Semester 7' },
    { value: 8, label: 'Semester 8' },
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    ...availableSubjects.map((s) => ({
      value: s.id,
      label: `${s.code} - ${s.name} (Sem ${s.semester})`
    }))
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      value: c.id,
      label: c.label
    }))
  ];

  const formatOptions = [
    { value: 'all', label: 'All Formats' },
    ...FORMATS.map((f) => ({ value: f, label: f }))
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest Uploads' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Downloaded' },
    { value: 'title', label: 'Title (A - Z)' },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm">
      {/* Primary search bar & View toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search by topic, keyword, subject code, or contributor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={onResetFilters}
              className="text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              Reset Filters
            </Button>
          )}

          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <Select
          label="Semester"
          options={semesterOptions}
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            // Reset subject filter if subject is not in that semester
            setSelectedSubject('all');
          }}
        />

        <Select
          label="Subject"
          options={subjectOptions}
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        />

        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        />
      </div>

      {/* Category Quick Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1 no-scrollbar">
        <span className="text-slate-400 font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider shrink-0 mr-1">
          <Filter className="w-3 h-3" />
          Filter:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected && cat.id !== 'all' ? 'all' : cat.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results counter text */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{totalMatches}</strong> resources
        </span>
        {hasActiveFilters && (
          <span className="text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Filtered View
          </span>
        )}
      </div>
    </div>
  );
}
