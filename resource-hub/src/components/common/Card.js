import React from 'react';

export function Card({
  children,
  className = '',
  hover = false,
  glass = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border transition-all duration-200
        ${glass 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 shadow-sm' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 shadow-sm'}
        ${hover ? 'hover:shadow-md hover:border-brand-500/40 dark:hover:border-brand-500/40 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-5 pb-3 border-b border-slate-100 dark:border-slate-800/60 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-2xl ${className}`}>{children}</div>;
}
