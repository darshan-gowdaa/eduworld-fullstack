import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { User, GraduationCap, BookOpen, CheckCircle, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';
import { showToast } from '../ui/Toast';

const steps = [
  { label: 'Personal Info', icon: <User /> },
  { label: 'Academic Details', icon: <GraduationCap /> },
  { label: 'Course Selection', icon: <BookOpen /> }
];

const ApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const methods = useForm({ mode: 'onSubmit' });
  const { register, handleSubmit, formState: { errors }, trigger } = methods;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      await api.post('/api/applications', data);
      setIsSubmitted(true);
      showToast.success('Application submitted successfully! We will review and notify you soon.');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit application. Please try again.';
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    // Only validate current step fields when moving to next step
    const currentStepFields = getCurrentStepFields(step);
    const isValid = await trigger(currentStepFields);
    
    if (isValid) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const getCurrentStepFields = (currentStep) => {
    switch (currentStep) {
      case 0:
        return ['personalInfo.fullName', 'personalInfo.email', 'personalInfo.phone', 'personalInfo.dob'];
      case 1:
        return ['academicInfo.qualification', 'academicInfo.institution', 'academicInfo.year', 'academicInfo.score'];
      case 2:
        return ['courseSelected', 'intake'];
      default:
        return [];
    }
  };

  const handleFormSubmit = async (data) => {
    setHasAttemptedSubmit(true);
    await onSubmit(data);
  };

  // Only show errors if form has been submitted or if we're validating during step navigation
  const shouldShowErrors = (fieldName) => {
    if (hasAttemptedSubmit) return true;
    
    const currentStepFields = getCurrentStepFields(step);
    return currentStepFields.includes(fieldName);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-sm mx-auto bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg text-center py-8 border border-green-200">
        <div className="bg-green-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
        <p className="text-gray-700 text-sm leading-relaxed">Thank you for applying. We will review your application and notify you by email.</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
        {/* Enhanced Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex-1 flex flex-col items-center relative">
              <div
                className={`rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold border-3 transition-all duration-300 cursor-pointer
                  ${i === step 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 shadow-md scale-105' 
                    : i < step 
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-sm' 
                      : 'bg-gray-100 text-gray-400 border-gray-300 hover:border-gray-400'
                  }
                  hover:scale-105 transform`}
                onClick={() => setStep(i)}
                aria-label={`Step ${i + 1}: ${s.label}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setStep(i); }}
              >
                {s.icon}
              </div>
              <span className={`mt-2 text-xs font-semibold select-none transition-colors duration-300
                ${i <= step ? 'text-blue-700' : 'text-gray-400'}`}>
                {s.label}
              </span>
              {/* Enhanced Connector line */}
              {i < steps.length - 1 && (
                <div
                  className={`absolute top-6 right-0 w-full h-1 transform translate-x-1/2 -z-10 rounded-full transition-all duration-300
                    ${i < step ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'}`}
                  style={{ left: 'calc(100% + 0.5rem)', right: '-50%' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-center shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Enhanced Step Content */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', name: 'personalInfo.fullName', type: 'text', placeholder: 'Enter your full name', required: 'Full name is required' },
              { label: 'Email', name: 'personalInfo.email', type: 'email', placeholder: 'Enter your email', required: 'Email is required' },
              { label: 'Phone', name: 'personalInfo.phone', type: 'tel', placeholder: 'Enter your phone number', required: 'Phone is required' },
              { label: 'Date of Birth', name: 'personalInfo.dob', type: 'date', required: 'Date of birth is required' }
            ].map(({ label, name, type, placeholder, required }) => (
              <div key={name} className="group">
                <label className="block text-xs font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(name, { required })}
                  className={`w-full px-3 py-2.5 border rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm
                    ${shouldShowErrors(name) && errors?.personalInfo?.[name.split('.')[1]] ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
                />
                {shouldShowErrors(name) && errors.personalInfo?.[name.split('.')[1]] && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                    {errors.personalInfo[name.split('.')[1]].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Highest Qualification', name: 'academicInfo.qualification', placeholder: 'e.g. High School, Bachelors', required: 'Qualification is required' },
              { label: 'Institution Name', name: 'academicInfo.institution', placeholder: 'Enter institution name', required: 'Institution is required' },
              { label: 'Year of Passing', name: 'academicInfo.year', type: 'number', placeholder: 'e.g. 2023', required: 'Year is required' },
              { label: 'Percentage / GPA', name: 'academicInfo.score', placeholder: 'e.g. 85% or 3.8 GPA', required: 'Score is required' }
            ].map(({ label, name, placeholder, required, type = 'text' }) => (
              <div key={name} className="group">
                <label className="block text-xs font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(name, { required })}
                  className={`w-full px-3 py-2.5 border rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm
                    ${shouldShowErrors(name) && errors?.academicInfo?.[name.split('.')[1]] ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
                />
                {shouldShowErrors(name) && errors.academicInfo?.[name.split('.')[1]] && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                    {errors.academicInfo[name.split('.')[1]].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">Select Course</label>
              <select
                {...register('courseSelected', { required: 'Please select a course' })}
                className={`w-full px-3 py-2.5 border rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm pr-10
                  ${shouldShowErrors('courseSelected') && errors.courseSelected ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
              >
                <option value="">Select a course</option>
                <option value="bcs">Bachelor of Computer Science</option>
                <option value="mba">Master of Business Administration</option>
                <option value="bme">Bachelor of Mechanical Engineering</option>
                <option value="ba-english">Bachelor of Arts in English</option>
                <option value="bsc-biology">Bachelor of Science in Biology</option>
                <option value="mds">Master of Data Science</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </span>
              {shouldShowErrors('courseSelected') && errors.courseSelected && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.courseSelected.message}
                </p>
              )}
            </div>
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">Preferred Intake</label>
              <select
                {...register('intake', { required: 'Please select an intake' })}
                className={`w-full px-3 py-2.5 border rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 appearance-none bg-white text-sm
                  ${shouldShowErrors('intake') && errors.intake ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2rem' }}
              >
                <option value="">Select intake</option>
                <option value="fall">January</option>
                <option value="spring">June</option>
                <option value="summer">September</option>
              </select>
              {shouldShowErrors('intake') && errors.intake && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.intake.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0 || isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-gray-300 text-sm"
          >
            <ArrowLeft className="text-sm" /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm"
            >
              Next <ArrowRight className="text-sm" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Application'
              )}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ApplicationForm; 