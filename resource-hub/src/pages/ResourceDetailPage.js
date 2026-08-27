import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Rating } from '../components/common/Rating';
import { CommentSection } from '../components/resources/CommentSection';
import { ResourceCard } from '../components/resources/ResourceCard';
import { EmptyState } from '../components/common/EmptyState';
import { getCategoryColor, getFormatBadgeClass, formatDate } from '../utils/formatters';
import {
  Download,
  Bookmark,
  ExternalLink,
  User,
  Calendar,
  Layers,
  FileText,
  Share2,
  Cpu,
  ArrowLeft,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export function ResourceDetailPage() {
  const { id } = useParams();
  const { resources, isBookmarked, toggleBookmark, incrementDownloads, showToast } = useResources();
  const navigate = useNavigate();

  // Find resource using find()
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="space-y-6 pb-12">
        <Breadcrumb items={[{ label: 'Resources', to: '/resources' }, { label: 'Not Found' }]} />
        <EmptyState
          title="Resource Not Found"
          description="The requested learning resource could not be found or has been removed."
          actionLabel="Return to Explorer"
          onAction={() => navigate('/resources')}
        />
      </div>
    );
  }

  const bookmarked = isBookmarked(resource.id);
  const categoryStyle = getCategoryColor(resource.category);
  const formatStyle = getFormatBadgeClass(resource.format);

  // Find related resources in the same subject using filter()
  const relatedResources = resources
    .filter((r) => r.subjectId === resource.subjectId && r.id !== resource.id)
    .slice(0, 3);

  const handleAccess = () => {
    incrementDownloads(resource.id);
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Page link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Breadcrumb
        items={[
          { label: 'Resources', to: '/resources' },
          { label: resource.subjectCode, to: `/subjects/${resource.subjectId}` },
          { label: resource.title }
        ]}
      />

      {/* Main Details Card */}
      <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        {/* Top Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${categoryStyle.bg}`}>
              {resource.category}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Semester {resource.semester}
            </span>
            <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${formatStyle}`}>
              {resource.format}
            </span>
            {resource.size && (
              <span className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-500 flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {resource.size}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Share2}
              onClick={handleShare}
            >
              Share
            </Button>
            <Button
              variant={bookmarked ? 'primary' : 'outline'}
              size="sm"
              icon={Bookmark}
              onClick={() => toggleBookmark(resource.id)}
              className={bookmarked ? 'bg-amber-500 hover:bg-amber-600 border-amber-500' : ''}
            >
              {bookmarked ? 'Bookmarked' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Title & Subject */}
        <div>
          <Link
            to={`/subjects/${resource.subjectId}`}
            className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 hover:underline mb-1 block"
          >
            {resource.subjectCode} · {resource.subjectName}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {resource.title}
          </h1>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Uploaded by</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {resource.author}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Date Added</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {formatDate(resource.uploadDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Rating value={resource.rating} size="sm" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">User Rating</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {resource.rating} / 5.0 ({resource.ratingCount || 0} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Downloads / Access</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {resource.downloads || 0} times
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Resource Overview & Summary
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {resource.description}
          </p>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Keywords & Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Big Access / Download Button */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Ready to study or download this file?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Direct access link hosted on secure academic drive / repository
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={Download}
            onClick={handleAccess}
            className="w-full sm:w-auto shadow-md"
          >
            Access / Download Material
          </Button>
        </div>
      </Card>

      {/* Student Reviews & Comments */}
      <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800">
        <CommentSection resource={resource} />
      </Card>

      {/* Related Resources in the same subject */}
      {relatedResources.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Related Materials for {resource.subjectCode}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
