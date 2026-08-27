import React from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourceContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Rating } from '../common/Rating';
import { Button } from '../common/Button';
import { getCategoryColor, getFormatBadgeClass, formatDate } from '../../utils/formatters';
import {
  Bookmark,
  Download,
  ExternalLink,
  Calendar,
  User,
  ArrowRight,
  FileText,
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';

export function ResourceCard({ resource }) {
  const { isBookmarked, toggleBookmark, incrementDownloads } = useResources();
  const bookmarked = isBookmarked(resource.id);

  const handleDownload = (e) => {
    e.stopPropagation();
    incrementDownloads(resource.id);
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const categoryStyle = getCategoryColor(resource.category);
  const formatStyle = getFormatBadgeClass(resource.format);

  return (
    <Card
      hover
      className="p-5 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border-slate-200/90 dark:border-slate-800"
    >
      {/* Top row: Category, Semester, Bookmark */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${categoryStyle.bg}`}>
              {resource.category}
            </span>
            <span className="px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              Sem {resource.semester}
            </span>
            <span className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold ${formatStyle}`}>
              {resource.format}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark(resource.id);
            }}
            className={`p-2 rounded-xl border transition-all duration-200 ${
              bookmarked
                ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 border-slate-200 dark:border-slate-700'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Subject code & Name */}
        <div className="mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {resource.subjectCode} · {resource.subjectName}
          </span>
        </div>

        {/* Title */}
        <Link to={`/resources/${resource.id}`} className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug">
            {resource.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {resource.description}
        </p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Metadata & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 truncate max-w-[150px]">
            <User className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{resource.author}</span>
          </div>
          <Rating value={resource.rating} count={resource.ratingCount} size="sm" />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/resources/${resource.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleDownload}
            className="px-3"
            title={`Download or Open (${resource.downloads || 0} downloads)`}
          >
            Access
          </Button>
        </div>
      </div>
    </Card>
  );
}
