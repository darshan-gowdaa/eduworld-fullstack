import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const courses = [
  'Bachelor of Computer Science',
  'Master of Business Administration',
  'Bachelor of Mechanical Engineering',
  'Bachelor of Arts in English',
  'Bachelor of Science in Biology',
  'Master of Data Science'
];

const EnquiryForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      await api.post('/api/enquiries', {
        ...data,
        date: new Date().toISOString().slice(0, 10)
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      setError('Failed to submit enquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border">
      <div className="mb-8">
        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">Have a Question?</h3>
        <p className="text-muted-foreground text-sm">Fill out the form below and our admissions team will get back to you shortly.</p>
      </div>

      {isSubmitted && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium">
          <CheckCircle className="mr-2 h-5 w-5 shrink-0" />
          Thank you! Your enquiry has been submitted. We will contact you soon.
        </div>
      )}
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium">
          <AlertCircle className="mr-2 h-5 w-5 shrink-0" />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Full Name</label>
            <Input 
              {...register('name', { required: 'Name is required' })} 
              className={errors.name ? 'border-destructive focus-visible:ring-destructive/20' : ''} 
              placeholder="e.g. Jane Doe" 
            />
            {errors.name && <p className="text-destructive text-xs mt-1 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.name.message}</p>}
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Email Address</label>
            <Input 
              type="email"
              {...register('email', { required: 'Email is required' })} 
              className={errors.email ? 'border-destructive focus-visible:ring-destructive/20' : ''} 
              placeholder="jane@example.com" 
            />
            {errors.email && <p className="text-destructive text-xs mt-1 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.email.message}</p>}
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Phone Number</label>
            <Input 
              type="tel"
              {...register('phone', { required: 'Phone is required' })} 
              className={errors.phone ? 'border-destructive focus-visible:ring-destructive/20' : ''} 
              placeholder="+1 (555) 000-0000" 
            />
            {errors.phone && <p className="text-destructive text-xs mt-1 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.phone.message}</p>}
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Program of Interest</label>
            <select 
              {...register('course', { required: 'Please select a program' })} 
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${errors.course ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'}`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem', paddingRight: '2.5rem' }}
            >
              <option value="" disabled selected hidden>Select a program</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.course && <p className="text-destructive text-xs mt-1 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.course.message}</p>}
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Your Message</label>
          <textarea 
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })} 
            rows={4} 
            className={`flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input'}`} 
            placeholder="How can we help you?" 
          />
          {errors.message && <p className="text-destructive text-xs mt-1 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors.message.message}</p>}
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full text-base font-medium transition-all h-11"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Submitting...
              </div>
            ) : (
              'Submit Enquiry'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;