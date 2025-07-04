import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, GraduationCap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultFields = {
  login: [
    { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: 'Email is required' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password', required: 'Password is required' },
    { name: 'rememberMe', label: 'Keep me signed in', type: 'checkbox' }
  ],
  register: [
    { name: 'fullName', label: 'Full Name', type: 'text', autoComplete: 'name', required: 'Full name is required', minLength: 2 },
    { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: 'Email is required' },
    { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel', required: 'Phone number is required' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', required: 'Password is required', minLength: 8 },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', autoComplete: 'new-password', required: 'Please confirm your password', match: 'password' },
    { name: 'terms', label: 'I agree to the Terms and Conditions', type: 'checkbox', required: 'You must accept the terms and conditions' }
  ]
};

export default function AuthForm({
  mode = 'login',
  selectedUserType,
  onSubmit,
  isLoading,
  error,
  success,
  fields = defaultFields[mode],
  submitText,
  linkText,
  linkTo,
  afterForm,
}) {
  const [showPasswordFields, setShowPasswordFields] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const password = watch('password');

  // Add role to form data when submitting
  const handleFormSubmit = (data) => {
    const formData = { ...data, role: selectedUserType };
    onSubmit(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* User Type Header */}
      {selectedUserType && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            {selectedUserType === 'student' ? (
              <User className="h-5 w-5 text-blue-300" />
            ) : (
              <GraduationCap className="h-5 w-5 text-green-300" />
            )}
            <span className="text-white font-medium capitalize">
              {selectedUserType} {mode === 'login' ? 'Login' : 'Registration'}
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-300/30 text-red-100 px-4 py-3 rounded-lg flex items-center backdrop-blur-sm">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-300/30 text-green-100 px-4 py-3 rounded-lg flex items-center backdrop-blur-sm">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          {success}
        </div>
      )}
      {fields.map(field => {
        if (field.type === 'checkbox') {
          return (
            <div className="flex items-center" key={field.name}>
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
                {...register(field.name, { required: field.required })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded bg-white/20 backdrop-blur-sm"
              />
              <label htmlFor={field.name} className="ml-2 block text-sm text-white/90">
                {field.label}
                {field.name === 'terms' && (
                  <a href="#" className="text-blue-300 hover:text-blue-200 transition duration-200 ml-1">Terms and Conditions</a>
                )}
              </label>
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-300 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors[field.name].message}
                </p>
              )}
            </div>
          );
        }
        if (field.type === 'password') {
          const isVisible = !!showPasswordFields[field.name];
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-white/90">
                {field.label}
              </label>
              <div className="mt-1 relative">
                <input
                  id={field.name}
                  type={isVisible ? 'text' : 'password'}
                  autoComplete={field.autoComplete}
                  {...register(field.name, {
                    required: field.required,
                    minLength: field.minLength && { value: field.minLength, message: `${field.label} must be at least ${field.minLength} characters` },
                    validate: field.name === 'confirmPassword' ? value => value === password || 'Passwords do not match' : undefined
                  })}
                  className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent sm:text-sm transition duration-200 bg-white/20 backdrop-blur-sm text-white ${
                    errors[field.name] ? 'border-red-300/50 bg-red-500/20' : 'border-white/30'
                  }`}
                  placeholder={field.placeholder || (field.name === 'confirmPassword' ? 'Confirm your password' : 'Enter your password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-300 transition duration-200"
                  onClick={() => setShowPasswordFields(prev => ({ ...prev, [field.name]: !prev[field.name] }))}
                >
                  {isVisible ? (
                    <EyeOff className="h-5 w-5 text-white/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/60" />
                  )}
                </button>
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-300 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            </div>
          );
        }
        // Default input
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-white/90">
              {field.label}
            </label>
            <div className="mt-1">
              <input
                id={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                {...register(field.name, {
                  required: field.required,
                  minLength: field.minLength && { value: field.minLength, message: `${field.label} must be at least ${field.minLength} characters` },
                  pattern: field.pattern && { value: field.pattern, message: field.patternMessage }
                })}
                className={`appearance-none block w-full px-3 py-2 border rounded-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent sm:text-sm transition duration-200 bg-white/20 backdrop-blur-sm text-white ${
                  errors[field.name] ? 'border-red-300/50 bg-red-500/20' : 'border-white/30'
                }`}
                placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}`}
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-300 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors[field.name].message}
                </p>
              )}
            </div>
          </div>
        );
      })}
      {afterForm}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600/80 to-blue-700/80 backdrop-blur-sm hover:from-blue-700/90 hover:to-blue-800/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              {submitText || 'Submit'}
            </div>
          ) : (
            submitText || 'Submit'
          )}
        </button>
      </div>
      {linkText && linkTo && (
        <p className="text-center text-sm text-blue-200 mt-4">
          <Link to={linkTo} className="font-medium text-blue-300 hover:text-blue-200 transition duration-200">
            {linkText}
          </Link>
        </p>
      )}
    </form>
  );
} 