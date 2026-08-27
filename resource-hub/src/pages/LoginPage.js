import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResources } from '../context/ResourceContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  Cpu,
  Lock,
  Mail,
  User,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

export function LoginPage() {
  const { login, register, loginAsDemo, isAuthenticated, user, logout } = useAuth();
  const { showToast } = useResources();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [role, setRole] = useState('Student'); // 'Student' | 'Faculty'
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    semester: '5',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid academic/institutional email.';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (isRegisterMode) {
      if (!formData.name || formData.name.trim().length < 2) {
        newErrors.name = 'Full name is required.';
      }
      if (!formData.rollNo || formData.rollNo.trim().length < 3) {
        newErrors.rollNo = role === 'Faculty' ? 'Employee ID is required.' : 'Student Roll Number is required.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      if (isRegisterMode) {
        register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          rollNo: formData.rollNo.trim(),
          semester: formData.semester,
          password: formData.password,
          role,
        });
        showToast(`Welcome to ECE Portal, ${formData.name}! 🎉`, 'success');
      } else {
        login({
          email: formData.email.trim(),
          password: formData.password,
          role,
          name: formData.email.split('@')[0],
          semester: formData.semester,
        });
        showToast(`Welcome back! Logged in successfully ⭐`, 'success');
      }

      setIsLoading(false);
      navigate(from, { replace: true });
    }, 400);
  };

  const handleQuickDemoLogin = (demoType) => {
    setIsLoading(true);
    setTimeout(() => {
      const loggedUser = loginAsDemo(demoType);
      showToast(`Logged in as ${loggedUser.name} (${loggedUser.role}) 🚀`, 'success');
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 250);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setForgotModalOpen(false);
    showToast(`Password reset link sent to ${forgotEmail}`, 'info');
    setForgotEmail('');
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

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 animate-fade-in pb-16">
      <Breadcrumb items={[{ label: isRegisterMode ? 'Register' : 'Student & Faculty Login' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Branding & Benefits Showcase */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/80 text-xs font-bold text-brand-700 dark:text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>ECE Academic Single Sign-On</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Access the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-circuit-cyan">
                Department Portal
              </span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Log in to sync your saved bookmarks, contribute verified notes and simulation codes, leave course reviews, and access exclusive lab materials.
            </p>
          </div>

          {/* Feature Badges List */}
          <div className="space-y-3 pt-2">
            {[
              {
                title: 'Semester-Synced Resources',
                desc: 'Instant access to Sem 1 through Sem 8 curated materials',
                icon: Cpu,
              },
              {
                title: 'Peer Review & Rating',
                desc: 'Upvote high-yield notes and leave question solutions',
                icon: CheckCircle2,
              },
              {
                title: 'Contribute & Get Credited',
                desc: 'Upload your notes with your name and batch attribution',
                icon: GraduationCap,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm"
              >
                <div className="p-2 rounded-xl bg-brand-100/80 dark:bg-brand-950 text-brand-600 dark:text-brand-400 shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Demo Access Bar */}
          <Card className="p-4 bg-gradient-to-br from-slate-900 to-brand-950 text-white border-0 shadow-md space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-300 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Evaluator Demo Access</span>
            </div>
            <p className="text-xs text-slate-300">
              Test all portal capabilities instantly with 1-click preset credentials:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <Button
                variant="secondary"
                size="sm"
                icon={User}
                onClick={() => handleQuickDemoLogin('student')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs w-full justify-center"
              >
                Student Demo
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={GraduationCap}
                onClick={() => handleQuickDemoLogin('faculty')}
                className="bg-brand-500/30 hover:bg-brand-500/40 text-brand-200 border border-brand-400/30 text-xs w-full justify-center"
              >
                Faculty Demo
              </Button>
            </div>
          </Card>
        </div>

        {/* Right column: Login / Register Form Card */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden">
            {/* Top tab switcher: Sign In vs Sign Up */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(false);
                  setErrors({});
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  !isRegisterMode
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(true);
                  setErrors({});
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isRegisterMode
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role switcher: Student vs Faculty */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                I am signing in as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('Student')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    role === 'Student'
                      ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>ECE Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('Faculty')}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    role === 'Faculty'
                      ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Faculty / Staff</span>
                </button>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegisterMode && (
                <>
                  <Input
                    label="Full Name"
                    required
                    icon={User}
                    placeholder="e.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label={role === 'Faculty' ? 'Faculty ID' : 'Roll Number / USN'}
                      required
                      placeholder={role === 'Faculty' ? 'e.g. FAC-EC-08' : 'e.g. 22ECE104'}
                      value={formData.rollNo}
                      onChange={(e) => handleInputChange('rollNo', e.target.value)}
                      error={errors.rollNo}
                    />

                    {role === 'Student' ? (
                      <Select
                        label="Current Semester"
                        required
                        options={semesterOptions}
                        value={formData.semester}
                        onChange={(e) => handleInputChange('semester', e.target.value)}
                      />
                    ) : (
                      <Input
                        label="Designation / Dept"
                        defaultValue="Associate Professor"
                        disabled
                        className="opacity-75"
                      />
                    )}
                  </div>
                </>
              )}

              {/* Email */}
              <Input
                label="Institutional Email"
                type="email"
                required
                icon={Mail}
                placeholder={role === 'Faculty' ? 'faculty@ece.edu' : 'student@ece.edu'}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                helperText="Use your department or college email address"
              />

              {/* Password */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full rounded-xl text-sm transition-all duration-200 bg-slate-50 dark:bg-slate-900/90 border text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 pl-10 pr-10 py-2.5 ${
                      errors.password
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.password}</p>}
              </div>

              {/* Confirm password (only in Register mode) */}
              {isRegisterMode && (
                <div className="w-full">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full rounded-xl text-sm transition-all duration-200 bg-slate-50 dark:bg-slate-900/90 border text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-900 pl-10 pr-3.5 py-2.5 ${
                        errors.confirmPassword
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Remember me & agreement */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember my session</span>
                </label>

                {isRegisterMode && (
                  <span className="text-[11px] text-slate-500">
                    By signing up, you agree to portal guidelines.
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full justify-center shadow-md shadow-brand-500/20 font-bold py-3 mt-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : isRegisterMode ? (
                  <span>Create ECE Portal Account</span>
                ) : (
                  <span>Sign In to Resource Hub</span>
                )}
              </Button>
            </form>

            {/* Bottom link toggle */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
              {isRegisterMode ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsRegisterMode(false);
                      setErrors({});
                    }}
                    className="font-bold text-brand-600 dark:text-brand-400 hover:underline ml-1"
                  >
                    Sign in here
                  </button>
                </p>
              ) : (
                <p>
                  New to the department portal?{' '}
                  <button
                    onClick={() => {
                      setIsRegisterMode(true);
                      setErrors({});
                    }}
                    className="font-bold text-brand-600 dark:text-brand-400 hover:underline ml-1"
                  >
                    Create student account
                  </button>
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Portal Password"
        subtitle="Enter your registered academic email address to receive password reset instructions"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            icon={Mail}
            placeholder="student@ece.edu"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setForgotModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
