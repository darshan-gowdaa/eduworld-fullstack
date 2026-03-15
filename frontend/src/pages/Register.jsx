import { useState } from 'react';
import AuthForm from '../components/forms/AuthForm';
import UserTypePopup from '../components/forms/UserTypePopup';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, GraduationCap, Loader2, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import { showToast } from '../components/ui/Toast';

const Register = ({ isAuthenticated, setIsAuthenticated, userRole, setUserRole, setUserName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showUserTypePopup, setShowUserTypePopup] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const payload = { ...data, name: data.fullName };
      delete payload.fullName;
      const res = await api.post('/api/auth/register', payload);
      
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUserRole(res.data.user.role);
      setUserName(res.data.user.name || '');
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name || '');
      
      setIsSuccess(true);
      showToast.success('Registration successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        if (res.data.user.role === 'student') {
          navigate('/student/dashboard');
        } else {
          navigate('/faculty/dashboard');
        }
      }, 2000);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed. Please try again.';
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

  const handleRegisterClick = () => {
    setShowUserTypePopup(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2rem] p-10 text-center shadow-xl border border-zinc-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mb-3">Registration Successful!</h2>
          <p className="text-zinc-600 mb-8">
            Your account has been created successfully. You will be automatically redirected to your dashboard.
          </p>
          <div className="flex items-center justify-center text-zinc-500 font-medium">
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Redirecting...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Create an account
            </h2>
            <p className="text-muted-foreground">
              Join EduWorld and unlock your potential
            </p>
          </div>

          <div className="mt-8">
            {selectedUserType ? (
              <AuthForm
                mode="register"
                selectedUserType={selectedUserType}
                onSubmit={handleRegister}
                isLoading={isLoading}
                error={error}
                submitText="Create account"
                linkText="Already have an account? Login"
                linkTo="/login"
              />
            ) : (
              <div className="text-center">
                <button
                  onClick={handleRegisterClick}
                  className="w-full py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-sm mb-6"
                >
                  Select Account Type to Register
                </button>
                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">Or</span>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-8">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-primary hover:underline transition-all">
                    Sign in instead
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
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/30 via-zinc-950/80 to-zinc-950 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1951&q=80')] bg-cover bg-center opacity-50 z-0" />
        
        <div className="relative z-20 max-w-2xl px-12 text-center text-white drop-shadow-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2.5 border border-white/20 mb-10 shadow-lg">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.5)]"></span>
            <span className="text-sm font-semibold tracking-wide uppercase">Join 50,000+ Students</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-balance leading-[1.1]">
            Discover a community of <span className="text-blue-400">innovators</span>.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 text-balance leading-relaxed mx-auto max-w-xl font-medium opacity-90">
            Register today to gain access to exclusive resources, world-class programs, and a network of professionals.
          </p>
        </div>
      </div>

      <UserTypePopup
        isOpen={showUserTypePopup}
        onClose={() => setShowUserTypePopup(false)}
        onUserTypeSelect={handleUserTypeSelect}
        mode="register"
      />
    </div>
  );
};

export default Register;