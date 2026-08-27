import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { useResourceFilter } from '../hooks/useResourceFilter';
import { ResourceFilterBar } from '../components/resources/ResourceFilterBar';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ResourceTable } from '../components/resources/ResourceTable';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { Cpu, PlusCircle, Sparkles } from 'lucide-react';

export function ResourcesPage({ onOpenAddModal }) {
  const { resources, bookmarks } = useResources();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filter state from URL query parameters if present
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSemester, setSelectedSemester] = useState(searchParams.get('semester') || 'all');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Update state if URL search query changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
    const sem = searchParams.get('semester');
    if (sem !== null && sem !== selectedSemester) {
      setSelectedSemester(sem);
    }
  }, [searchParams]);

  // Execute filtering via custom hook
  const { results, totalMatches, stats } = useResourceFilter(resources, {
    searchQuery,
    semester: selectedSemester,
    subjectId: selectedSubject,
    category: selectedCategory,
    format: selectedFormat,
    sortBy,
    bookmarks
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSemester('all');
    setSelectedSubject('all');
    setSelectedCategory('all');
    setSelectedFormat('all');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <Breadcrumb items={[{ label: 'Resources Explorer' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <Cpu className="w-6 h-6" />
            </div>
            <span>ECE Resource Explorer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search, filter, preview, and access lecture notes, PYQs, and laboratory materials
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={PlusCircle}
          onClick={onOpenAddModal}
          className="shadow-sm self-start sm:self-auto"
        >
          Add New Resource
        </Button>
      </div>

      {/* Multi-criteria filter bar */}
      <ResourceFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalMatches={totalMatches}
        onResetFilters={handleResetFilters}
      />

      {/* Resource Display: Grid vs Table */}
      {results.length === 0 ? (
        <EmptyState
          title="No matching resources found"
          description="We couldn't find any resources matching your active filters. Try resetting the filters or contributing a new resource!"
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <ResourceTable resources={results} />
      )}
    </div>
  );
}
