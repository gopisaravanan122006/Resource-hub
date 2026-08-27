import React from 'react';
import { Card } from '../common/Card';

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue', // 'blue' | 'emerald' | 'amber' | 'purple'
  className = ''
}) {
  const colorMap = {
    blue: {
      bg: 'bg-brand-50 dark:bg-brand-950/60',
      text: 'text-brand-600 dark:text-brand-400',
      border: 'border-brand-100 dark:border-brand-900/40',
      glow: 'group-hover:border-brand-500/30'
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900/40',
      glow: 'group-hover:border-emerald-500/30'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-100 dark:border-amber-900/40',
      glow: 'group-hover:border-amber-500/30'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/60',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-100 dark:border-purple-900/40',
      glow: 'group-hover:border-purple-500/30'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <Card className={`p-5 group transition-all duration-300 relative overflow-hidden ${scheme.glow} ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl ${scheme.bg} ${scheme.text} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {trend}
          </span>
          <span>from active curriculum</span>
        </div>
      )}
    </Card>
  );
}
