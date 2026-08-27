import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Heart, Code2, GraduationCap, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Team */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                ECE Department Resource Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Developed by <strong className="text-slate-800 dark:text-slate-200">Group 4 – Pixel Pioneers</strong>. A unified, peer-driven academic repository designed for Electronics & Communication Engineering students.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-brand-600 dark:text-brand-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Semesters 1 through 8 · Notes, PYQs, Labs & Tools</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Dashboard Overview
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  All ECE Subjects (Sem 1-8)
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Browse All Resources
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Resistor & Pinout Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & External Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Academic Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://nptel.ac.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  NPTEL / SWAYAM
                </a>
              </li>
              <li>
                <a href="https://vlab.co.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  Virtual Labs (IITs)
                </a>
              </li>
              <li>
                <a href="https://ieeexplore.ieee.org" target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  IEEE Xplore Library
                </a>
              </li>
              <li>
                <a href="https://edaplayground.com" target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  EDA Playground
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} ECE Department · Pixel Pioneers (Group 4). All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>using React, React Router & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
