import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  options = [],
  error,
  helperText,
  className = '',
  id,
  required,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          required={required}
          className={`
            w-full rounded-xl text-sm transition-all duration-200 appearance-none
            bg-slate-50 dark:bg-slate-900/90
            border text-slate-900 dark:text-slate-100
            focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900
            pl-3.5 pr-10 py-2.5 cursor-pointer
            ${error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20'}
            ${className}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt.id ?? opt} value={opt.value ?? opt.id ?? opt}>
              {opt.label ?? opt.name ?? opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
}
