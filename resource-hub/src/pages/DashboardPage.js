import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { StatCard } from '../components/dashboard/StatCard';
import { SemesterGrid } from '../components/dashboard/SemesterGrid';
import { AnnouncementBanner } from '../components/dashboard/AnnouncementBanner';
import { QuickLinkCard } from '../components/dashboard/QuickLinkCard';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  BookOpen,
  Cpu,
  Bookmark,
  Download,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  GraduationCap,
  HelpCircle,
  PlusCircle
} from 'lucide-react';

export function DashboardPage({ onOpenAddModal }) {
  const { stats, resources, importantLinks } = useResources();
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/resources?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/resources');
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl">
        {/* Background ambient glowing circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-circuit-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Group 4 · Pixel Pioneers Academic Repository</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Electronics & Communication Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-circuit-cyan">
              Resource Portal
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Centralized hub for verified lecture notes, lab manuals, past exam papers (PYQs), simulation scripts, and academic links organized across all 8 semesters.
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-2 max-w-2xl pt-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search by topic, e.g. K-Maps, Fourier, ARM Cortex, LTspice..."
                className="w-full bg-white/10 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-slate-900/90 transition-all shadow-inner"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 px-6 shadow-md shadow-brand-500/30"
            >
              Explore Hub
            </Button>
          </form>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Quick jumps:</span>
            {['Sem 3 Digital Logic', 'Sem 5 ARM & 8086', 'Sem 6 VLSI Design', 'Lab Manuals', 'Formula Sheets'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/resources?search=${encodeURIComponent(tag)}`)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors text-[11px] font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Resources"
          value={stats.totalResources}
          subtitle="Notes, PYQs, Labs & Books"
          icon={Cpu}
          color="blue"
          trend="8 Semesters"
        />
        <StatCard
          title="Core ECE Subjects"
          value={stats.totalSubjects}
          subtitle="Complete Curriculum Track"
          icon={BookOpen}
          color="purple"
          trend="Sem 1 to 8"
        />
        <StatCard
          title="Saved Bookmarks"
          value={stats.totalBookmarks}
          subtitle="Personalized Saved List"
          icon={Bookmark}
          color="amber"
          trend="Local Sync"
        />
        <StatCard
          title="Total Downloads"
          value={stats.totalDownloads}
          subtitle="Accessed by ECE Batches"
          icon={Download}
          color="emerald"
          trend="High Demand"
        />
      </div>

      {/* Department Announcements */}
      <AnnouncementBanner />

      {/* Curriculum by Semester */}
      <SemesterGrid />

      {/* Featured & Top Rated Resources */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Featured & High-Yield Resources</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Top rated lecture notes and lab guides rated 4.8+ by students
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>View All {resources.length} Materials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.topRated.slice(0, 3).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Important Academic Hubs & Simulators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <span>Essential Academic & Simulator Portals</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              One-click access to NPTEL, Virtual Labs, IEEE Xplore, and online EDA tools
            </p>
          </div>
          <Link
            to="/links"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            See All Links
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {importantLinks.slice(0, 4).map((link) => (
            <QuickLinkCard key={link.id} link={link} />
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <Card className="p-8 bg-gradient-to-r from-brand-600 to-indigo-700 text-white rounded-3xl shadow-lg border-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">
              Have Notes, Lab Code or Solved Papers?
            </h3>
            <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
              Help your batchmates by sharing your clean handwritten notes, project codes, or exam solutions. All contributions are credited to you!
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            icon={PlusCircle}
            onClick={onOpenAddModal}
            className="bg-white text-brand-700 hover:bg-brand-50 font-bold shrink-0 shadow-md"
          >
            Contribute Resource
          </Button>
        </div>
      </Card>
    </div>
  );
}
