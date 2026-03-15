import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, HelpCircle, GraduationCap, Users, Eye, Inbox, ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import { motion } from 'framer-motion';

const FacultyDashboard = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    applications: 0,
    enquiries: 0,
    students: 0,
    faculty: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const [userResponse, statsResponse] = await Promise.all([
          api.get('/api/auth/me'),
          api.get('/api/dashboard/stats')
        ]);

        setUserName(userResponse.data.user.name);
        setStats(statsResponse.data);
      } catch (err) {
        const fallbackName = localStorage.getItem('userName');
        if (fallbackName) {
          setUserName(fallbackName);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    { label: 'Applications', value: stats.applications, icon: <FileText className="h-6 w-6 text-primary" />, color: "bg-primary/10" },
    { label: 'Enquiries', value: stats.enquiries, icon: <HelpCircle className="h-6 w-6 text-yellow-500" />, color: "bg-yellow-500/10" },
    { label: 'Students', value: stats.students, icon: <GraduationCap className="h-6 w-6 text-emerald-500" />, color: "bg-emerald-500/10" },
    { label: 'Faculty', value: stats.faculty, icon: <Users className="h-6 w-6 text-purple-500" />, color: "bg-purple-500/10" }
  ];

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

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Welcome back, {userName || 'Faculty'}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            This is your faculty administration dashboard. Review incoming student applications and monitor general platform enquiries.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link
            to="/faculty/applications"
            className="group flex-1 flex items-center justify-between p-6 bg-card border border-border hover:border-primary/50 text-foreground rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Eye className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">View Applications</h3>
                <p className="text-sm text-muted-foreground">Manage incoming student applications</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/faculty/enquiries"
            className="group flex-1 flex items-center justify-between p-6 bg-card border border-border hover:border-yellow-500/50 text-foreground rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-xl">
                <Inbox className="h-6 w-6 text-yellow-500 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">View Enquiries</h3>
                <p className="text-sm text-muted-foreground">Respond to prospective students</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;