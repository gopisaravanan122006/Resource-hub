import React from 'react';
import { useResources } from '../../context/ResourceContext';
import { Megaphone, Bell, Calendar, Sparkles } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export function AnnouncementBanner() {
  const { announcements } = useResources();

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white shadow-lg relative overflow-hidden">
      {/* Background circuit subtle shapes */}
      <div className="absolute right-0 top-0 -mt-8 -mr-8 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-300">
          <Megaphone className="w-4 h-4 animate-bounce" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
          Department Bulletins & Updates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                item.urgency === 'high'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : item.urgency === 'medium'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
              }`}>
                {item.type}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(item.date)}
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-100 line-clamp-1 mb-1">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-300/80 line-clamp-2 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
