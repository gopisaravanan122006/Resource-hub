import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { INITIAL_RESOURCES, SUBJECTS, IMPORTANT_LINKS, ANNOUNCEMENTS } from '../data/initialData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import confetti from 'canvas-confetti';

const ResourceContext = createContext();

export function ResourceProvider({ children }) {
  // Store resources in localStorage, fallback to INITIAL_RESOURCES
  const [resources, setResources] = useLocalStorage('ece_portal_resources', INITIAL_RESOURCES);
  
  // Store bookmarked resource IDs in localStorage
  const [bookmarks, setBookmarks] = useLocalStorage('ece_portal_bookmarks', ['res-1', 'res-4', 'res-10']);
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Trigger toast alert
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle bookmark with confetti effect when added
  const toggleBookmark = useCallback((resourceId) => {
    setBookmarks((prev) => {
      const exists = prev.includes(resourceId);
      if (exists) {
        showToast('Resource removed from bookmarks', 'info');
        return prev.filter((id) => id !== resourceId);
      } else {
        // Fire confetti animation
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
          });
        } catch {
          // ignore if canvas-confetti is not available
        }
        showToast('Resource added to bookmarks! ⭐', 'success');
        return [...prev, resourceId];
      }
    });
  }, [showToast, setBookmarks]);

  const isBookmarked = useCallback((resourceId) => {
    return bookmarks.includes(resourceId);
  }, [bookmarks]);

  // Add new contributed resource
  const addResource = useCallback((resourceData) => {
    const newId = `res-${Date.now()}`;
    const subject = SUBJECTS.find((s) => s.id === resourceData.subjectId) || {
      name: 'General ECE',
      code: 'ECE'
    };

    const newResource = {
      ...resourceData,
      id: newId,
      subjectName: subject.name,
      subjectCode: subject.code,
      uploadDate: new Date().toISOString().split('T')[0],
      isFeatured: false,
      rating: 5.0,
      ratingCount: 1,
      downloads: 0,
      comments: [
        {
          id: `c-${Date.now()}`,
          user: resourceData.author,
          text: 'Uploaded by contributor. Verified resource material.',
          rating: 5,
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };

    setResources((prev) => [newResource, ...prev]);
    showToast('New resource contributed successfully! 🎉', 'success');
    return newResource;
  }, [setResources, showToast]);

  // Add a review/comment to a resource
  const addComment = useCallback((resourceId, commentData) => {
    setResources((prev) => {
      return prev.map((item) => {
        if (item.id !== resourceId) return item;

        const newComment = {
          id: `c-${Date.now()}`,
          user: commentData.user,
          text: commentData.text,
          rating: Number(commentData.rating),
          date: new Date().toISOString().split('T')[0]
        };

        const updatedComments = [newComment, ...(item.comments || [])];
        const newRatingCount = (item.ratingCount || 0) + 1;
        
        // Calculate new average rating using reduce
        const totalRatingSum = updatedComments.reduce((sum, c) => sum + (c.rating || 5), 0);
        const newAvgRating = Number((totalRatingSum / updatedComments.length).toFixed(1));

        return {
          ...item,
          rating: newAvgRating,
          ratingCount: newRatingCount,
          comments: updatedComments
        };
      });
    });

    showToast('Your review and rating were submitted! ⭐', 'success');
  }, [setResources, showToast]);

  // Increment download simulation
  const incrementDownloads = useCallback((resourceId) => {
    setResources((prev) => {
      return prev.map((item) => {
        if (item.id === resourceId) {
          return { ...item, downloads: (item.downloads || 0) + 1 };
        }
        return item;
      });
    });
  }, [setResources]);

  // Clear all bookmarks
  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
    showToast('All bookmarks cleared', 'info');
  }, [setBookmarks, showToast]);

  // Summary statistics calculated with reduce and map
  const stats = useMemo(() => {
    const totalResources = resources.length;
    const totalSubjects = SUBJECTS.length;
    const totalBookmarks = bookmarks.length;
    
    const totalDownloads = resources.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
    
    // Category distribution map
    const categoryCounts = resources.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    // Semester distribution map
    const semesterCounts = resources.reduce((acc, curr) => {
      acc[curr.semester] = (acc[curr.semester] || 0) + 1;
      return acc;
    }, {});

    // Top rated resources (rating >= 4.8)
    const topRated = [...resources]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);

    // Featured resources
    const featured = resources.filter((r) => r.isFeatured);

    // Recent uploads
    const recentUploads = [...resources]
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
      .slice(0, 4);

    return {
      totalResources,
      totalSubjects,
      totalBookmarks,
      totalDownloads,
      categoryCounts,
      semesterCounts,
      topRated,
      featured,
      recentUploads
    };
  }, [resources, bookmarks]);

  return (
    <ResourceContext.Provider
      value={{
        resources,
        subjects: SUBJECTS,
        importantLinks: IMPORTANT_LINKS,
        announcements: ANNOUNCEMENTS,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        clearAllBookmarks,
        addResource,
        addComment,
        incrementDownloads,
        toasts,
        showToast,
        removeToast,
        stats
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
}
