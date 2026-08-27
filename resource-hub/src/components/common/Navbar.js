import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useResources } from '../../context/ResourceContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import {
  Cpu,
  BookOpen,
  Bookmark,
  Layers,
  Sparkles,
  Sun,
  Moon,
  PlusCircle,
  Menu,
  X,
  ExternalLink,
  Wrench,
  Search
} from 'lucide-react';

export function Navbar({ onOpenAddModal }) {
  const { bookmarks } = useResources();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/resources?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: Layers, end: true },
    { to: '/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/resources', label: 'Resources', icon: Cpu },
    { 
      to: '/bookmarks', 
      label: 'Bookmarks', 
      icon: Bookmark, 
      badge: bookmarks.length > 0 ? bookmarks.length : null 
    },
    { to: '/tools', label: 'Lab & Tools', icon: Wrench },
    { to: '/links', label: 'Important Links', icon: ExternalLink }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-circuit-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  ECE Resource Hub
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  v1.0
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block -mt-0.5">
                Group 4 · Pixel Pioneers
              </span>
            </div>
          </Link>

          {/* Search bar in header (hidden on small screens) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search notes, PYQs, labs..."
                className="w-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              />
            </div>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `
                  flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 relative
                  ${isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/60'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'}
                `}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand-600 text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Add Resource */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={onOpenAddModal}
              className="hidden sm:inline-flex shadow-sm"
            >
              Add Resource
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2 animate-fadeIn">
          {/* Quick search input on mobile */}
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search notes, PYQs..."
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200"
              />
            </div>
          </form>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors
                ${isActive
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
              `}
            >
              <div className="flex items-center gap-2.5">
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </div>
              {link.badge !== null && link.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-600 text-white">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="primary"
              size="md"
              icon={PlusCircle}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddModal();
              }}
              className="w-full justify-center"
            >
              Contribute / Add Resource
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
