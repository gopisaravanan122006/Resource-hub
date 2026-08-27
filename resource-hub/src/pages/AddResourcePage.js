import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, FORMATS } from '../data/initialData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Card } from '../components/common/Card';
import { Input, Textarea } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { ResourceCard } from '../components/resources/ResourceCard';
import { validateResourceForm } from '../utils/validators';
import {
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Eye,
  ArrowLeft,
  FileCheck
} from 'lucide-react';

export function AddResourcePage() {
  const { subjects, addResource } = useResources();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subjectId: subjects[0]?.id || '',
    semester: user?.semester ? String(user.semester) : '3',
    category: 'Notes',
    format: 'PDF',
    size: '4.5 MB',
    author: user ? `${user.name} (${user.role === 'Faculty' ? 'Faculty' : `ECE Sem ${user.semester || 4}`})` : '',
    url: '',
    description: '',
    tagsInput: '',
  });

  useEffect(() => {
    if (user && !formData.author) {
      setFormData((prev) => ({
        ...prev,
        author: `${user.name} (${user.role === 'Faculty' ? 'Faculty' : `ECE Sem ${user.semester || 4}`})`,
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSemesterChange = (newSemester) => {
    handleChange('semester', newSemester);
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

    const created = addResource(payload);
    setIsSubmitting(false);

    // Redirect to the newly created resource detail page
    navigate(`/resources/${created.id}`);
  };

  const selectedSubjectObj = subjects.find((s) => s.id === formData.subjectId) || {
    name: 'Selected Subject',
    code: 'ECE'
  };

  // Preview resource mock object
  const previewResource = {
    id: 'preview-temp',
    title: formData.title || 'Resource Title Preview',
    subjectCode: selectedSubjectObj.code,
    subjectName: selectedSubjectObj.name,
    semester: Number(formData.semester),
    category: formData.category,
    format: formData.format,
    size: formData.size || '4.5 MB',
    author: formData.author || 'Your Name',
    uploadDate: new Date().toISOString().split('T')[0],
    description: formData.description || 'This preview card updates dynamically as you type in the contribution form.',
    tags: formData.tagsInput ? formData.tagsInput.split(',').map((t) => t.trim()) : ['Preview', 'ECE'],
    rating: 5.0,
    ratingCount: 1,
    downloads: 0,
    url: formData.url || '#'
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

  const filteredSubjects = subjects.filter((s) => s.semester === Number(formData.semester));
  const subjectOptions = filteredSubjects.length > 0
    ? filteredSubjects.map((s) => ({ value: s.id, label: `${s.code} - ${s.name}` }))
    : subjects.map((s) => ({ value: s.id, label: `${s.code} - ${s.name}` }));

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <Breadcrumb items={[{ label: 'Contribute Resource' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <span>Contribute Academic Material</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Submit handwritten lecture notes, past exam questions with solutions, or lab simulation files
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Column (2 Cols) */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Resource Title"
                required
                placeholder="e.g. Unit 3 State Machine Design Notes & Solved Problems"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
              />

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
                  label="Subject / Course"
                  required
                  options={subjectOptions}
                  value={formData.subjectId}
                  onChange={(e) => handleChange('subjectId', e.target.value)}
                  error={errors.subjectId}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Category"
                  required
                  options={CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
                    value: c.id,
                    label: c.label
                  }))}
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  error={errors.category}
                />

                <Select
                  label="File Format"
                  required
                  options={FORMATS.map((f) => ({ value: f, label: f }))}
                  value={formData.format}
                  onChange={(e) => handleChange('format', e.target.value)}
                  error={errors.format}
                />

                <Input
                  label="Approx Size / Length"
                  placeholder="e.g. 12 MB or 40 pgs"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contributor Name & Batch"
                  required
                  placeholder="e.g. Rahul Sharma (ECE 3rd Yr)"
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
                  helperText="Hosted link on Google Drive, GitHub, or OneDrive"
                />
              </div>

              <Textarea
                label="Detailed Description & Syllabus Highlights"
                required
                rows={4}
                placeholder="Explain what topics are covered, key highlights, derivations, solved questions..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                error={errors.description}
              />

              <Input
                label="Keywords / Tags (comma separated)"
                placeholder="e.g. K-Maps, FSM, Verilog, Vivado, Midsem"
                value={formData.tagsInput}
                onChange={(e) => handleChange('tagsInput', e.target.value)}
              />

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/resources')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={UploadCloud}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish & Save Resource'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Live Preview Column (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Eye className="w-4 h-4 text-brand-500" />
            <span>Live Card Preview</span>
          </div>

          <ResourceCard resource={previewResource} />

          <Card className="p-4 bg-brand-50/50 dark:bg-brand-950/30 border-brand-200/50 dark:border-brand-900/40 text-xs space-y-2">
            <h4 className="font-bold text-brand-900 dark:text-brand-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contribution Guidelines</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-brand-800/80 dark:text-brand-300/80 leading-relaxed">
              <li>Ensure Google Drive links have general view access enabled.</li>
              <li>Include module/unit numbers in the title for better searchability.</li>
              <li>Handwritten notes should be clean and clearly legible.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
