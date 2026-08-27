import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home, Search, Cpu } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in">
      <div className="w-24 h-24 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-4xl mb-6 ring-8 ring-brand-500/10 shadow-lg">
        404
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
        Page or Resource Not Found
      </h1>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
        The circuit path you are trying to reach seems to be disconnected. Return to the dashboard or explore our academic resources.
      </p>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" icon={Home}>
            Back to Dashboard
          </Button>
        </Link>
        <Link to="/resources">
          <Button variant="outline" size="md" icon={Search}>
            Browse Resources
          </Button>
        </Link>
      </div>
    </div>
  );
}
