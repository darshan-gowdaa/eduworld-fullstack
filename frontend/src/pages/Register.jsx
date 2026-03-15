import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Eye, EyeOff, Loader2, AlertCircle, CheckCircle2,
  GraduationCap, ArrowRight, BookOpen, Award, Check,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { showToast } from '../components/ui/Toast';

// ─── constants ───────────────────────────────────────────────
const ROLES = [
  {
    id: 'student',
    label: 'Student',
    sub: 'Apply for programs & track status',
    icon: BookOpen,
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    id: 'faculty',
    label: 'Faculty',
    sub: 'Manage applications & insights',
    icon: Award,
    accent: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
];

const FEATURES = [
  { icon: '🎓', text: 'Access to 20+ UGC-approved programs' },
  { icon: '💰', text: 'Scholarships up to 70% fee waiver' },
  { icon: '💼', text: '94% placement record with 180+ companies' },
  { icon: '🏫', text: '50-acre campus in the heart of Bengaluru' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Password strength ────────────────────────────────────────
const getStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8)            score++;
  if (/[A-Z]/.test(pw))          score++;
  if (/[0-9]/.test(pw))          score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;
  return score;
};
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

// ─── Shared input ─────────────────────────────────────────────
const AuthInput = ({ label, error, rightEl, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
      {label}
    </label>
    <div className="relative">
      <input
        {...props}
        className={`w-full h-11 px-4 pr-11 rounded-xl border text-sm text-zinc-900 dark:text-zinc-100
          bg-zinc-50 dark:bg-zinc-800/60 placeholder:text-zinc-400 outline-none transition-all duration-200
          ${error
            ? 'border-red-400 focus:ring-2 focus:ring-red-300/40'
            : 'border-zinc-200 dark:border-zinc-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/30'
          }`}
      />
      {rightEl && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>
      )}
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-red-500">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
      </p>
    )}
  </div>
);

// ─── Role card ────────────────────────────────────────────────
const RoleCard = ({ role, selected, onSelect }) => {
  const Icon  = role.icon;
  const active = selected === role.id;
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(role.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background:   active ? role.bg   : 'transparent',
        borderColor:  active ? role.accent : undefined,
        boxShadow:    active ? `0 0 0 1px ${role.accent}` : undefined,
      }}
      className="flex-1 flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-left transition-all cursor-pointer"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
        style={{ background: active ? role.bg : 'rgba(0,0,0,0.04)', color: active ? role.accent : '#71717a' }}
      >
        <Icon style={{ width: 18, height: 18 }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">{role.label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5 truncate">{role.sub}</p>
      </div>
      <div
        className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors"
        style={{ borderColor: active ? role.accent : '#d4d4d8' }}
      >
        {active && <div className="w-2 h-2 rounded-full" style={{ background: role.accent }} />}
      </div>
    </motion.button>
  );
};

// ═══════════════════════════════════════════════════════════
export default function Register({ isAuthenticated, setIsAuthenticated, setUserRole, setUserName }) {
  const [showPass, setShowPass]           = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [selectedRole, setSelectedRole]   = useState('student');
  const [isLoading, setIsLoading]         = useState(false);
  const [serverError, setServerError]     = useState('');
  const [isSuccess, setIsSuccess]         = useState(false);
  const navigate = useNavigate();

  const {
    register, handleSubmit, watch,
    formState: { errors },
  } = useForm();

  const passwordVal = watch('password', '');
  const strength    = getStrength(passwordVal);

  if (isAuthenticated) {
    navigate('/student/dashboard');
    return null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      const payload = {
        name:     data.fullName,
        email:    data.email,
        password: data.password,
        role:     selectedRole,
      };
      const res = await api.post('/api/auth/register', payload);
      localStorage.setItem('token',    res.data.token);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name ?? '');
      setIsAuthenticated(true);
      setUserRole(res.data.user.role);
      setUserName(res.data.user.name ?? '');
      setIsSuccess(true);
      showToast.success('Account created! Welcome to EduWorld 🎉');
      setTimeout(() => {
        navigate(res.data.user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
      }, 1800);
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Registration failed. Please try again.';
      setServerError(msg);
      showToast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-10 text-center max-w-sm w-full shadow-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h2
            className="text-2xl font-bold text-zinc-900 dark:text-white mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            You're in!
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
            Your EduWorld account is ready. Redirecting you to your dashboard…
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
            Setting things up…
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main layout ────────────────────────────────────────────
  return (
    <div className="min-h-screen flex">

      {/* ══ LEFT — visual panel ══════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] relative overflow-hidden flex-col">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=2070&q=80')` }}
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/92 via-[#0f2444]/80 to-[#1a1a2e]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* content */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-12">
          {/* logo */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">EduWorld</span>
          </motion.div>

          {/* heading */}
          <div className="flex-1 flex flex-col justify-center mt-16 max-w-sm">
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Join 50,000+ Students
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-4xl xl:text-[2.75rem] font-bold text-white leading-[1.2] tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Discover a community of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">
                innovators.
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="text-white/60 text-sm leading-relaxed mb-8">
              Register today and unlock exclusive resources, world-class programs, and a network of professionals shaping tomorrow.
            </motion.p>

            {/* features list */}
            <motion.div {...fadeUp(0.4)} className="space-y-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-base">
                    {f.icon}
                  </div>
                  <p className="text-white/75 text-sm">{f.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* bottom badge row */}
          <motion.div {...fadeUp(0.6)} className="mt-auto flex flex-wrap gap-2">
            {['UGC Approved', 'NAAC Accredited', 'NBA Certified', 'ISO 9001:2015'].map((b) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-medium"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══ RIGHT — form panel ═══════════════════════════════ */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-12 bg-white dark:bg-zinc-950 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">

          {/* mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-white">EduWorld</span>
          </div>

          <motion.div {...fadeUp(0)}>
            <h2
              className="text-3xl xl:text-4xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Create your account
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-7">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>

          {/* role selector */}
          <motion.div {...fadeUp(0.08)} className="mb-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2.5">
              I am a
            </p>
            <div className="flex gap-3">
              {ROLES.map((r) => (
                <RoleCard key={r.id} role={r} selected={selectedRole} onSelect={setSelectedRole} />
              ))}
            </div>
          </motion.div>

          {/* server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2.5 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div {...fadeUp(0.12)}>
              <AuthInput
                label="Full Name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                error={errors.fullName?.message}
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Must be at least 2 characters' },
                })}
              />
            </motion.div>

            <motion.div {...fadeUp(0.17)}>
              <AuthInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
            </motion.div>

            <motion.div {...fadeUp(0.22)}>
              <AuthInput
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register('phone', { required: 'Phone number is required' })}
              />
            </motion.div>

            {/* Password + strength */}
            <motion.div {...fadeUp(0.27)} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className={`w-full h-11 px-4 pr-11 rounded-xl border text-sm text-zinc-900 dark:text-zinc-100
                    bg-zinc-50 dark:bg-zinc-800/60 placeholder:text-zinc-400 outline-none transition-all duration-200
                    ${errors.password
                      ? 'border-red-400 focus:ring-2 focus:ring-red-300/40'
                      : 'border-zinc-200 dark:border-zinc-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/30'
                    }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'At least 8 characters required' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* strength bar */}
              {passwordVal && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? STRENGTH_COLORS[strength] : '#e4e4e7' }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: STRENGTH_COLORS[strength] }}>
                    {STRENGTH_LABELS[strength]} password
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />{errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.div {...fadeUp(0.32)}>
              <AuthInput
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat your password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (v) => v === passwordVal || 'Passwords do not match',
                })}
              />
            </motion.div>

            {/* Terms */}
            <motion.div {...fadeUp(0.37)} className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 accent-indigo-600"
                {...register('terms', { required: 'You must accept the terms' })}
              />
              <label htmlFor="terms" className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed cursor-pointer">
                I agree to EduWorld's{' '}
                <Link to="#" className="text-indigo-600 dark:text-indigo-400 underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" className="text-indigo-600 dark:text-indigo-400 underline">Privacy Policy</Link>.
              </label>
            </motion.div>
            {errors.terms && (
              <p className="flex items-center gap-1.5 text-xs text-red-500 -mt-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />{errors.terms.message}
              </p>
            )}

            <motion.div {...fadeUp(0.4)} className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 hover:shadow-lg hover:shadow-indigo-500/25"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* trust badges */}
          <motion.div {...fadeUp(0.45)} className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {['🔒 SSL Secured', '✅ GDPR Compliant', '🛡️ Data Protected'].map((b) => (
              <span key={b} className="text-xs text-zinc-400 flex items-center gap-1">{b}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}