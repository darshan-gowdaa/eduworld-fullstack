import { useEffect, useState } from 'react';
import { CheckCircle, Hourglass, XCircle, ArrowLeft } from 'lucide-react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatusCard = ({ status }) => {
  let icon, colorClass, bgClass, label, description;
  switch (status) {
    case 'approved':
      icon = <CheckCircle className="h-10 w-10 text-emerald-500" />;
      colorClass = 'text-emerald-600 dark:text-emerald-400';
      bgClass = 'bg-emerald-500/10 border-emerald-500/20';
      label = 'Approved';
      description = 'Congratulations! Your application has been approved. Please check your email for the next enrollment steps.';
      break;
    case 'pending':
      icon = <Hourglass className="h-10 w-10 text-yellow-500" />;
      colorClass = 'text-yellow-600 dark:text-yellow-400';
      bgClass = 'bg-yellow-500/10 border-yellow-500/20';
      label = 'Pending Review';
      description = 'Your application is currently under review by our admissions team. You will be notified once a decision is made.';
      break;
    case 'rejected':
      icon = <XCircle className="h-10 w-10 text-destructive" />;
      colorClass = 'text-destructive';
      bgClass = 'bg-destructive/10 border-destructive/20';
      label = 'Rejected';
      description = 'Unfortunately, we are unable to offer you admission at this time. We encourage you to review the program requirements and apply again in the future.';
      break;
    default:
      icon = <Hourglass className="h-10 w-10 text-muted-foreground" />;
      colorClass = 'text-foreground';
      bgClass = 'bg-secondary border-border';
      label = 'Not Applied';
      description = 'You have not submitted an application yet. Click the button below to start your application process.';
  }

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex flex-col items-center bg-card border rounded-2xl p-8 shadow-sm ${bgClass}`}
    >
      <div className={`p-4 rounded-full bg-background border shadow-sm mb-4 ${colorClass.split(' ')[0].replace('text-', 'border-')}`}>
         {icon}
      </div>
      <span className={`text-2xl font-bold tracking-tight mb-3 ${colorClass}`}>{label}</span>
      <p className="text-center text-muted-foreground leading-relaxed max-w-sm">
        {description}
      </p>
    </motion.div>
  );
};

const StudentStatus = () => {
  const [status, setStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await api.get('/api/applications/mine');
        setStatus(res.data.status || 'pending');
      } catch (err) {
        setError('Failed to fetch application status.');
        setStatus('not_applied'); // Fallback if no application found
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
            <Link
              to="/student/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border border-border text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
        </div>
        
        <div className="mb-8">
           <h1 className="text-3xl font-bold tracking-tight text-foreground">Application Status</h1>
           <p className="text-muted-foreground mt-2">Track the progress of your EduWorld university application.</p>
        </div>

        {isLoading ? (
          <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center justify-center">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
             <p className="text-muted-foreground font-medium">Checking your status...</p>
          </div>
        ) : (
          <div className="space-y-6">
             {error && status !== 'not_applied' && (
                <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-xl text-sm font-medium text-center">
                  {error}
                </div>
             )}
             <StatusCard status={status} />
             
             {status === 'not_applied' && (
               <div className="flex justify-center mt-6">
                 <Link to="/student/apply" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
                   Start Application
                 </Link>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentStatus;