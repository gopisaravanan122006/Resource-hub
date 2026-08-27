import { useMemo } from 'react';

/**
 * Custom hook to filter, search, and sort resources using map, filter, reduce, find
 */
export function useResourceFilter(resources, {
  searchQuery = '',
  semester = 'all',
  subjectId = 'all',
  category = 'all',
  format = 'all',
  sortBy = 'newest', // 'newest', 'rating', 'popular', 'title'
  bookmarkedOnly = false,
  bookmarks = []
}) {
  return useMemo(() => {
    // 1. FILTER: Apply multi-criteria filtering
    const filtered = resources.filter((item) => {
      // Semester filter
      if (semester !== 'all' && item.semester !== Number(semester)) {
        return false;
      }

      // Subject filter
      if (subjectId !== 'all' && item.subjectId !== subjectId) {
        return false;
      }

      // Category filter
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // Format filter
      if (format !== 'all' && item.format !== format) {
        return false;
      }

      // Bookmarked only filter
      if (bookmarkedOnly && !bookmarks.includes(item.id)) {
        return false;
      }

      // Search Query filter (matches title, subject, tags, author, description)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubject = item.subjectName.toLowerCase().includes(query) || (item.subjectCode && item.subjectCode.toLowerCase().includes(query));
        const matchesAuthor = item.author.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags && item.tags.some(tag => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSubject && !matchesAuthor && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    // 2. SORT: Apply sorting algorithm
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'popular') {
        return (b.downloads || 0) - (a.downloads || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    // 3. REDUCE: Compute summary analytics for current filtered selection
    const stats = filtered.reduce(
      (acc, curr) => {
        acc.totalCount += 1;
        acc.totalDownloads += (curr.downloads || 0);
        acc.categories[curr.category] = (acc.categories[curr.category] || 0) + 1;
        acc.semesters[curr.semester] = (acc.semesters[curr.semester] || 0) + 1;
        acc.sumRating += (curr.rating || 0);
        return acc;
      },
      {
        totalCount: 0,
        totalDownloads: 0,
        categories: {},
        semesters: {},
        sumRating: 0
      }
    );

    const averageRating = stats.totalCount > 0 ? (stats.sumRating / stats.totalCount).toFixed(1) : '0.0';

    return {
      results: sorted,
      totalMatches: sorted.length,
      stats: {
        ...stats,
        averageRating
      }
    };
  }, [resources, searchQuery, semester, subjectId, category, format, sortBy, bookmarkedOnly, bookmarks]);
}
