import React from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourceContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ArrowRight, BookOpen, Layers, User, Award } from 'lucide-react';

export function SubjectCard({ subject }) {
  const { resources } = useResources();

  // Find all resources for this subject using filter
  const subjectResources = resources.filter((r) => r.subjectId === subject.id);
  
  // Categorize resources count using reduce
  const categoryCounts = subjectResources.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card
      hover
      className="p-5 flex flex-col justify-between group transition-all duration-300 border-slate-200/90 dark:border-slate-800"
    >
      <div>
        {/* Header code and semester */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800">
            {subject.code}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              Sem {subject.semester}
            </span>
            <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
              {subject.credits} Credits
            </span>
          </div>
        </div>

        {/* Subject Name */}
        <Link
          to={`/subjects/${subject.id}`}
          className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
            {subject.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {subject.description}
        </p>

        {/* Faculty Lead */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{subject.leadFaculty}</span>
        </div>
      </div>

      {/* Footer: resource tally and link */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white">
            {subjectResources.length}
          </span>
          <span>{subjectResources.length === 1 ? 'Resource' : 'Resources'}</span>
        </div>

        <Link
          to={`/subjects/${subject.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Explore Syllabus & Files</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}
