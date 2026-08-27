import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ResourceTable } from '../components/resources/ResourceTable';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { EmptyState } from '../components/common/EmptyState';
import {
  Bookmark,
  Trash2,
  Download,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function BookmarksPage() {
  const { resources, bookmarks, clearAllBookmarks, showToast } = useResources();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  // Filter bookmarked resources using filter() and find()
  const bookmarkedResources = resources.filter((item) => bookmarks.includes(item.id));

  // Filter by search inside bookmarks
  const filteredBookmarks = bookmarkedResources.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subjectName.toLowerCase().includes(q) ||
      item.subjectCode.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  const handleExportBookmarks = () => {
    if (bookmarkedResources.length === 0) return;

    const exportData = bookmarkedResources.map((item) => ({
      title: item.title,
      subject: `${item.subjectCode} - ${item.subjectName}`,
      semester: item.semester,
      category: item.category,
      url: item.url,
      author: item.author
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ece-portal-saved-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Saved bookmarks exported as JSON file! 📥', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <Breadcrumb items={[{ label: 'Saved Bookmarks' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Bookmark className="w-6 h-6 fill-amber-500" />
            </div>
            <span>My Bookmarked Resources</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access your saved study notes, lab codes, and reference papers anytime (stored in your browser)
          </p>
        </div>

        {bookmarkedResources.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExportBookmarks}
            >
              Export JSON
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={clearAllBookmarks}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Bookmarks Search & View toggle bar */}
      {bookmarkedResources.length > 0 && (
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:max-w-md">
            <Input
              icon={Search}
              placeholder="Search in your bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">{filteredBookmarks.length}</strong> saved items
            </span>

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
      )}

      {/* Bookmarked items list or Empty state */}
      {bookmarkedResources.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarked resources yet"
          description="Click the bookmark icon on any note, PYQ, or lab manual across the portal to save it for quick reference here!"
          actionLabel="Explore All Resources"
          onAction={() => navigate('/resources')}
        />
      ) : filteredBookmarks.length === 0 ? (
        <EmptyState
          title="No saved bookmarks match your search"
          description="Try a different search query."
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBookmarks.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <ResourceTable resources={filteredBookmarks} />
      )}
    </div>
  );
}
