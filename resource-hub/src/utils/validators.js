// Validation utility functions for resource upload and review forms

export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateResourceForm = (formData) => {
  const errors = {};

  if (!formData.title || formData.title.trim().length < 5) {
    errors.title = 'Resource title must be at least 5 characters long.';
  }

  if (!formData.subjectId) {
    errors.subjectId = 'Please select a subject.';
  }

  if (!formData.semester || Number(formData.semester) < 1 || Number(formData.semester) > 8) {
    errors.semester = 'Please select a valid semester (1 to 8).';
  }

  if (!formData.category) {
    errors.category = 'Please choose a resource category.';
  }

  if (!formData.format) {
    errors.format = 'Please select a file format.';
  }

  if (!formData.author || formData.author.trim().length < 2) {
    errors.author = 'Contributor / Author name is required.';
  }

  if (!formData.url || !isValidUrl(formData.url.trim())) {
    errors.url = 'Please provide a valid web URL (starting with http:// or https://).';
  }

  if (!formData.description || formData.description.trim().length < 15) {
    errors.description = 'Please write a descriptive summary (at least 15 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateCommentForm = (commentData) => {
  const errors = {};

  if (!commentData.user || commentData.user.trim().length < 2) {
    errors.user = 'Your name is required.';
  }

  if (!commentData.text || commentData.text.trim().length < 5) {
    errors.text = 'Review text must be at least 5 characters.';
  }

  if (!commentData.rating || commentData.rating < 1 || commentData.rating > 5) {
    errors.rating = 'Please choose a star rating (1 to 5).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
