import React from 'react';
import { Star } from 'lucide-react';

export function Rating({
  value = 5,
  count,
  size = 'md', // 'sm' | 'md' | 'lg'
  interactive = false,
  onChange,
  className = ''
}) {
  const stars = [1, 2, 3, 4, 5];

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars.map((starIndex) => {
          const filled = starIndex <= Math.round(value);
          return (
            <button
              key={starIndex}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starIndex)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform p-0.5' : 'cursor-default'}`}
              title={`${starIndex} Star${starIndex > 1 ? 's' : ''}`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  filled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300 dark:text-slate-700'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {value !== undefined && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
          {Number(value).toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-slate-400 dark:text-slate-500">
          ({count})
        </span>
      )}
    </div>
  );
}
