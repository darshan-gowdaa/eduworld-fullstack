import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, AlertCircle, GraduationCap, ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { showToast } from '../components/ui/Toast';

// ─── tiny helpers ────────────────────────────────────────────
const ROLES = [
  {
    id: 'student',
    label: 'Student',
    sub: 'Apply, track & manage your journey',
    icon: BookOpen,
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.25)',
  },
  {
    id: 'faculty',
    label: 'Faculty',
    sub: 'Review applications & analytics',
    icon: Award,
    accent: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.25)',
  },
];

const STATS = [
  { value: '50k+', label: 'Active Students' },
  { value: '94%', label: 'Placement Rate' },
  { value: '200+', label: 'Expert Faculty' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Input component ─────────────────────────────────────────
const AuthInput = ({ label, error, rightEl, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
      {label}
    </label>
    <div className="relative">
      <input
        {...props}
        className={`w-full h-12 px-4 pr-11 rounded-xl border text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/60 placeholder:text-zinc-400 outline-none transition-all duration-200
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

// ─── Role selector card ───────────────────────────────────────
const RoleCard = ({ role, selected, onSelect }) => {
  const Icon = role.icon;
  const active = selected === role.id;
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(role.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: active ? role.bg : 'transparent',
        borderColor: active ? role.accent : undefined,
        boxShadow: active ? `0 0 0 1px ${role.accent}` : undefined,
      }}
      className="flex-1 flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-left transition-all duration-200 cursor-pointer"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
        style={{ background: active ? role.bg : 'rgba(0,0,0,0.04)', color: active ? role.accent : '#71717a' }}
      >
        <Icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">{role.label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">{role.sub}</p>
      </div>
      <div
        className="ml-auto w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors"
        style={{ borderColor: active ? role.accent : '#d4d4d8' }}
      >
        {active && <div className="w-2 h-2 rounded-full" style={{ background: role.accent }} />}
      </div>
    </motion.button>
  );
};

// ═══════════════════════════════════════════════════════════
export default function Login({ isAuthenticated, setIsAuthenticated, userRole, setUserRole, setUserName }) {
  const [showPass, setShowPass]         = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading]       = useState(false);
  const [serverError, setServerError]   = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // redirect if already logged in
  if (isAuthenticated) {
    navigate(userRole === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
    return null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      const res = await api.post('/api/auth/login', { ...data, role: selectedRole });
      localStorage.setItem('token',    res.data.token);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name ?? '');
      setIsAuthenticated(true);
      setUserRole(res.data.user.role);
      setUserName(res.data.user.name ?? '');
      showToast.success(`Welcome back, ${res.data.user.name ?? 'there'}! 🎉`);
      setTimeout(() => {
        navigate(res.data.user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
      }, 800);
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Login failed. Please try again.';
      setServerError(msg);
      showToast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ══ LEFT — visual panel ══════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[54%] xl:w-[58%] relative overflow-hidden flex-col">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2070&q=80')` }}
        />
        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29]/90 via-[#302b63]/75 to-[#24243e]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        {/* content */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* logo */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">EduWorld</span>
          </motion.div>

          {/* center copy */}
          <div className="flex-1 flex flex-col justify-center max-w-md mt-16">
            <motion.div {...fadeUp(0.15)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Admissions Open 2025
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.25)}
              className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your journey to excellence{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                starts here.
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.35)} className="text-white/65 text-base leading-relaxed mb-10">
              Join 50,000+ students from across India who are building world-class careers with EduWorld.
            </motion.p>

            {/* stats row */}
            <motion.div {...fadeUp(0.45)} className="flex gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* bottom testimonial card */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-auto rounded-2xl bg-white/8 backdrop-blur-md border border-white/12 p-5"
          >
            <p className="text-white/85 text-sm leading-relaxed italic mb-4">
              "EduWorld gave me more than a degree — it gave me a career roadmap, an incredible network, and the confidence to aim higher."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
                alt="Priya"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="text-white text-sm font-semibold">Priya Rajan</p>
                <p className="text-white/50 text-xs">MBA Graduate · Now at Deloitte</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══ RIGHT — form panel ═══════════════════════════════ */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-12 bg-white dark:bg-zinc-950 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">

          {/* mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
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
              Welcome back
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
              Sign in to your EduWorld account to continue.{' '}
              <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </motion.div>

          {/* role selector */}
          <motion.div {...fadeUp(0.1)} className="mb-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2.5">
              Sign in as
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
                className="mb-5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2.5 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div {...fadeUp(0.15)}>
              <AuthInput
                label="Email address"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <AuthInput
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                autoComplete="current-password"
                error={errors.password?.message}
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                {...register('password', { required: 'Password is required' })}
              />
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-600 accent-indigo-600" />
                Remember me
              </label>
              <button type="button" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                Forgot password?
              </button>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* divider */}
          <motion.div {...fadeUp(0.35)} className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400">or continue with</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </motion.div>

          {/* social buttons (decorative / future use) */}
          <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 gap-3">
            {[
              {
                name: 'Google',
                logo: 'https://www.svgrepo.com/show/475656/google-color.svg',
              },
              {
                name: 'Microsoft',
                logo: 'https://www.svgrepo.com/show/452228/microsoft.svg',
              },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                className="h-11 flex items-center justify-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                <img src={p.logo} alt={p.name} className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                {p.name}
              </button>
            ))}
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="text-center text-xs text-zinc-400 mt-8">
            By signing in, you agree to our{' '}
            <Link to="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">Terms</Link>
            {' '}and{' '}
            <Link to="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">Privacy Policy</Link>.
          </motion.p>
        </div>
      </div>
    </div>
  );
}