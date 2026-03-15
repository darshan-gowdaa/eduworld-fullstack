import { useState } from 'react';
import AuthForm from '../components/forms/AuthForm';
import UserTypePopup from '../components/forms/UserTypePopup';
import { CheckCircle, GraduationCap, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../components/ui/Toast';

const Login = ({ isAuthenticated, setIsAuthenticated, userRole, setUserRole, setUserName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showUserTypePopup, setShowUserTypePopup] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUserRole(res.data.user.role);
      setUserName(res.data.user.name || '');
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name || '');
      
      const successMsg = `Successfully logged in as ${res.data.user.name || 'User'}!`;
      setSuccess(successMsg);
      showToast.success(successMsg);
      
      setTimeout(() => {
        if (res.data.user.role === 'student') {
          navigate('/student/dashboard');
        } else {
          navigate('/faculty/dashboard');
        }
      }, 1500);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errMsg);
      showToast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    setShowUserTypePopup(false);
  };

  const handleLoginClick = () => {
    setShowUserTypePopup(true);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2rem] p-10 text-center shadow-xl border border-zinc-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mb-3">Welcome Back!</h2>
          <p className="text-zinc-600 mb-8">
            You are currently logged in as a <span className="font-semibold text-zinc-900 capitalize">{userRole}</span>.
          </p>
          <button 
            onClick={() => navigate(userRole === 'student' ? '/student/dashboard' : '/faculty/dashboard')}
            className="w-full bg-zinc-950 text-white rounded-xl py-3.5 font-medium hover:bg-zinc-800 transition-colors shadow-md"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans bg-zinc-950">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white mb-10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              Welcome back
            </h2>
            <p className="text-zinc-400 text-lg">
              Sign in to your EduWorld account to continue
            </p>
          </div>

          <div className="mt-8">
            {selectedUserType ? (
              <AuthForm
                mode="login"
                selectedUserType={selectedUserType}
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
                success={success}
                submitText="Sign In"
                linkText="Don't have an account? Register"
                linkTo="/register"
              />
            ) : (
              <div className="text-center">
                <button
                  onClick={handleLoginClick}
                  className="w-full py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-sm mb-6"
                >
                  Select Account Type to Sign In
                </button>
                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">Or</span>
                  </div>
                </div>
                <p className="text-center text-sm text-zinc-500 mt-8">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-all">
                    Register now
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Image/Decoration */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-950 overflow-hidden items-center justify-center">
        {/* Deep Overlay Grid for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-zinc-950/80 to-zinc-950 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-50 z-0" />
        
        <div className="relative z-20 max-w-2xl px-12 text-center text-white drop-shadow-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2.5 border border-white/20 mb-10 shadow-lg">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
            <span className="text-sm font-semibold tracking-wide uppercase">Admissions Open 2024</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-balance leading-[1.1]">
            Your journey to <span className="text-indigo-400">excellence</span> starts here.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 text-balance leading-relaxed mx-auto max-w-xl font-medium opacity-90">
            Access world-class education, connect with expert faculty, and join a global community of learners shaping the future.
          </p>
        </div>
      </div>

      <UserTypePopup
        isOpen={showUserTypePopup}
        onClose={() => setShowUserTypePopup(false)}
        onUserTypeSelect={handleUserTypeSelect}
        mode="login"
      />
    </div>
  );
};

export default Login;