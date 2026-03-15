import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, GraduationCap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Shadcn components
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const defaultFields = {
  login: [
    { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: 'Email is required' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password', required: 'Password is required' },
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

  const handleFormSubmit = (data) => {
    const formData = { ...data, role: selectedUserType };
    onSubmit(formData);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
      {selectedUserType && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-secondary rounded-full px-4 py-1.5 border border-border">
            {selectedUserType === 'student' ? (
              <User className="h-4 w-4 text-primary" />
            ) : (
              <GraduationCap className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-medium text-foreground capitalize">
              {selectedUserType} {mode === 'login' ? 'Login' : 'Registration'}
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          {success}
        </div>
      )}

      {fields.map(field => {
        if (field.type === 'checkbox') {
          return (
            <div className="flex items-start pt-2" key={field.name}>
              <div className="flex h-5 items-center">
                <input
                  id={field.name}
                  name={field.name}
                  type="checkbox"
                  {...register(field.name, { required: field.required })}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={field.name} className="font-medium text-foreground">
                  {field.label}
                  {field.name === 'terms' && (
                    <a href="#" className="text-primary hover:underline ml-1 ml-1">Terms and Conditions</a>
                  )}
                </label>
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-destructive flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            </div>
          );
        }

        const isPasswordField = field.type === 'password';
        const isVisible = !!showPasswordFields[field.name];
        const inputType = isPasswordField ? (isVisible ? 'text' : 'password') : field.type;

        return (
          <div key={field.name} className="space-y-1.5">
            <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
              {field.label}
            </label>
            <div className="relative">
              <Input
                id={field.name}
                type={inputType}
                autoComplete={field.autoComplete}
                {...register(field.name, {
                  required: field.required,
                  minLength: field.minLength && { value: field.minLength, message: `${field.label} must be at least ${field.minLength} characters` },
                  pattern: field.pattern && { value: field.pattern, message: field.patternMessage },
                  validate: field.name === 'confirmPassword' ? value => value === password || 'Passwords do not match' : undefined
                })}
                className={`${errors[field.name] ? 'border-destructive focus-visible:ring-destructive/20' : ''} ${isPasswordField ? 'pr-10' : ''}`}
                placeholder={field.placeholder || (field.name === 'confirmPassword' ? 'Confirm your password' : `Enter your ${field.label.toLowerCase()}`)}
              />
              
              {isPasswordField && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPasswordFields(prev => ({ ...prev, [field.name]: !prev[field.name] }))}
                >
                  {isVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            {errors[field.name] && (
              <p className="text-xs text-destructive flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors[field.name].message}
              </p>
            )}
          </div>
        );
      })}

      {afterForm}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-base font-medium transition-all"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Processing...
            </div>
          ) : (
            submitText || 'Submit'
          )}
        </Button>
      </div>

      {linkText && linkTo && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link to={linkTo} className="font-medium text-primary hover:underline transition-all">
            {linkText}
          </Link>
        </p>
      )}
    </form>
  );
}