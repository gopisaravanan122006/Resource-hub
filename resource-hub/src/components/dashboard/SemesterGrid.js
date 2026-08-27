import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResources } from '../../context/ResourceContext';
import { Card } from '../common/Card';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

export function SemesterGrid({ onSelectSemester }) {
  const { subjects, resources } = useResources();
  const navigate = useNavigate();

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSemesterClick = (sem) => {
    if (onSelectSemester) {
      onSelectSemester(sem);
    } else {
      navigate(`/resources?semester=${sem}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Curriculum by Semester
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your semester to jump directly into curated notes, PYQs, and labs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {semesters.map((sem) => {
          // Calculate counts using filter and reduce
          const semSubjects = subjects.filter((s) => s.semester === sem);
          const semResources = resources.filter((r) => r.semester === sem);

          const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
          const roman = romanNumerals[sem - 1];

          return (
            <Card
              key={sem}
              hover
              onClick={() => handleSemesterClick(sem)}
              className="p-4 text-center group relative overflow-hidden transition-all duration-300 border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-500 to-circuit-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div>
                <div className="w-10 h-10 mx-auto rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-sm mb-2 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                  {roman}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  Sem {sem}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {semSubjects.length} {semSubjects.length === 1 ? 'Course' : 'Courses'}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center text-[11px] font-semibold text-brand-600 dark:text-brand-400 gap-1">
                <span>{semResources.length} items</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
