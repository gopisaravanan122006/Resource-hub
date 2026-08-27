import React from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourceContext';
import { Rating } from '../common/Rating';
import { Button } from '../common/Button';
import { getCategoryColor, getFormatBadgeClass, formatDate } from '../../utils/formatters';
import { Bookmark, Download, ExternalLink, ArrowRight, FileText } from 'lucide-react';

export function ResourceTable({ resources }) {
  const { isBookmarked, toggleBookmark, incrementDownloads } = useResources();

  if (!resources || resources.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th className="py-3.5 px-4">Bookmark</th>
            <th className="py-3.5 px-4">Title & Subject</th>
            <th className="py-3.5 px-4">Semester</th>
            <th className="py-3.5 px-4">Category</th>
            <th className="py-3.5 px-4">Format</th>
            <th className="py-3.5 px-4">Rating</th>
            <th className="py-3.5 px-4">Author</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
          {resources.map((item) => {
            const bookmarked = isBookmarked(item.id);
            const categoryStyle = getCategoryColor(item.category);
            const formatStyle = getFormatBadgeClass(item.format);

            return (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
              >
                {/* Bookmark Action */}
                <td className="py-3.5 px-4">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      bookmarked
                        ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                        : 'bg-transparent text-slate-400 hover:text-amber-500 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                </td>

                {/* Title & Subject */}
                <td className="py-3.5 px-4 max-w-xs">
                  <Link
                    to={`/resources/${item.id}`}
                    className="font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 block line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 block">
                    {item.subjectCode} · {item.subjectName}
                  </span>
                </td>

                {/* Semester */}
                <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  Sem {item.semester}
                </td>

                {/* Category */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-md font-semibold border ${categoryStyle.bg}`}>
                    {item.category}
                  </span>
                </td>

                {/* Format */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${formatStyle}`}>
                    {item.format}
                  </span>
                </td>

                {/* Rating */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <Rating value={item.rating} count={item.ratingCount} size="sm" />
                </td>

                {/* Author */}
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap truncate max-w-[120px]">
                  {item.author}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      to={`/resources/${item.id}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        incrementDownloads(item.id);
                        if (item.url) window.open(item.url, '_blank');
                      }}
                      className="p-1.5 rounded-lg text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 transition-colors"
                      title="Direct Access / Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
