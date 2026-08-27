import React from 'react';
import { Card } from '../common/Card';
import { ExternalLink, GraduationCap, FlaskConical, BookOpen, Activity, Binary, Layers, Cpu, FileSpreadsheet } from 'lucide-react';

const iconMap = {
  GraduationCap,
  FlaskConical,
  BookOpen,
  Activity,
  Binary,
  Layers,
  Cpu,
  FileSpreadsheet
};

export function QuickLinkCard({ link }) {
  const IconComponent = iconMap[link.icon] || ExternalLink;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card hover className="p-4 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-sm">
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {link.badge}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1 mb-1">
            {link.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {link.description}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
          <span>{link.category}</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Card>
    </a>
  );
}
