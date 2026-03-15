import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, HelpCircle, GraduationCap, ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await api.get('/api/auth/me');

        setUserName(response.data.user.name);
      } catch (err) {
        // Fallback to localStorage if API fails
        const fallbackName = localStorage.getItem('userName');
        if (fallbackName) {
          setUserName(fallbackName);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground font-medium text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const actions = [
    {
      to: "/student/apply",
      title: "Apply Now",
      desc: "Submit a new application",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      to: "/student/status",
      title: "View Status",
      desc: "Track your progress",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    },
    {
      to: "/contact",
      title: "Send Enquiry",
      desc: "Get help & support",
      icon: <HelpCircle className="h-6 w-6" />,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Welcome back, {userName || 'Student'}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            This is your student dashboard. Browse programs, manage your applications, and track your admission status here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={action.to} 
                className="group block bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${action.color} transition-transform group-hover:scale-110`}>
                  {action.icon}
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-1">{action.title}</h3>
                <p className="text-muted-foreground text-sm">{action.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-secondary/50 border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">Recent Activity</h2>
          <div className="text-center py-10 border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No recent activity to show.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Submit an application to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;