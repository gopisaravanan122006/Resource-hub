import React, { useState } from 'react';
import { useResources } from '../../context/ResourceContext';
import { CATEGORIES, FORMATS } from '../../data/initialData';
import { Modal } from '../common/Modal';
import { Input, Textarea } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { validateResourceForm } from '../../utils/validators';
import { UploadCloud, Check, PlusCircle, AlertCircle } from 'lucide-react';

export function ResourceFormModal({ isOpen, onClose }) {
  const { subjects, addResource } = useResources();

  const initialFormData = {
    title: '',
    subjectId: subjects[0]?.id || '',
    semester: '3',
    category: 'Notes',
    format: 'PDF',
    size: '5.0 MB',
    author: '',
    url: '',
    description: '',
    tagsInput: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSemesterChange = (newSemester) => {
    handleChange('semester', newSemester);
    // Auto-select first matching subject for that semester if possible
    const match = subjects.find((s) => s.semester === Number(newSemester));
    if (match) {
      handleChange('subjectId', match.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateResourceForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Process tags into array using split and map
    const tagsArray = formData.tagsInput
      ? formData.tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      : ['ECE', formData.category];

    const payload = {
      title: formData.title.trim(),
      subjectId: formData.subjectId,
      semester: Number(formData.semester),
      category: formData.category,
      format: formData.format,
      size: formData.size || '3.5 MB',
      author: formData.author.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      tags: tagsArray,
    };

    // Add to context (persisted in localStorage)
    addResource(payload);

    setIsSubmitting(false);
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  const semesterOptions = [
    { value: 1, label: 'Semester 1' },
    { value: 2, label: 'Semester 2' },
    { value: 3, label: 'Semester 3' },
    { value: 4, label: 'Semester 4' },
    { value: 5, label: 'Semester 5' },
    { value: 6, label: 'Semester 6' },
    { value: 7, label: 'Semester 7' },
    { value: 8, label: 'Semester 8' },
  ];

  // Subjects filtered by selected semester
  const filteredSubjects = subjects.filter(
    (s) => s.semester === Number(formData.semester)
  );

  const subjectOptions = filteredSubjects.length > 0
    ? filteredSubjects.map((s) => ({ value: s.id, label: `${s.code} - ${s.name}` }))
    : subjects.map((s) => ({ value: s.id, label: `${s.code} - ${s.name}` }));

  const categoryOptions = CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
    value: c.id,
    label: c.label,
  }));

  const formatOptions = FORMATS.map((f) => ({ value: f, label: f }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contribute ECE Academic Resource"
      subtitle="Share handwritten notes, solved papers, lab code, or schematics with your peers"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Resource Title"
          required
          placeholder="e.g. Unit 3 State Machine Design Notes & Solved Problems"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
        />

        {/* Semester and Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Semester"
            required
            options={semesterOptions}
            value={formData.semester}
            onChange={(e) => handleSemesterChange(e.target.value)}
            error={errors.semester}
          />

          <Select
            label="Course / Subject"
            required
            options={subjectOptions}
            value={formData.subjectId}
            onChange={(e) => handleChange('subjectId', e.target.value)}
            error={errors.subjectId}
          />
        </div>

        {/* Category, Format, Size */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Category"
            required
            options={categoryOptions}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            error={errors.category}
          />

          <Select
            label="Format"
            required
            options={formatOptions}
            value={formData.format}
            onChange={(e) => handleChange('format', e.target.value)}
            error={errors.format}
          />

          <Input
            label="Approx Size / Length"
            placeholder="e.g. 8.4 MB or 45 slides"
            value={formData.size}
            onChange={(e) => handleChange('size', e.target.value)}
          />
        </div>

        {/* Author / Contributor & URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Contributor Name / Faculty"
            required
            placeholder="e.g. Rahul Sharma (ECE 2026) / Dr. Rao"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            error={errors.author}
          />

          <Input
            label="Access / Download URL"
            required
            placeholder="https://drive.google.com/... or https://github.com/..."
            value={formData.url}
            onChange={(e) => handleChange('url', e.target.value)}
            error={errors.url}
            helperText="Direct Google Drive, GitHub repo, or Archive link"
          />
        </div>

        {/* Description */}
        <Textarea
          label="Detailed Description & Overview"
          required
          rows={3}
          placeholder="Briefly explain what topics are covered, key highlights, formulas, or prerequisite knowledge..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        {/* Tags */}
        <Input
          label="Tags / Keywords (comma-separated)"
          placeholder="e.g. K-Maps, FSM, Verilog, Vivado, Midsem"
          value={formData.tagsInput}
          onChange={(e) => handleChange('tagsInput', e.target.value)}
          helperText="Separate multiple keywords with commas"
        />

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={UploadCloud}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Upload & Publish Resource'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
