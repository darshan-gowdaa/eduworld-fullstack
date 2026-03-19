import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Hourglass, XCircle, Eye, ArrowLeft } from 'lucide-react';
import api from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const StatusDisplay = ({ status }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-flex items-center gap-x-1.5 border";
  switch (status) {
    case 'approved':
      return (
        <span className={`${baseClasses} bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400`}>
          <CheckCircle className="w-3.5 h-3.5" />
          Approved
        </span>
      );
    case 'pending':
      return (
        <span className={`${baseClasses} bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400`}>
          <Hourglass className="w-3.5 h-3.5" />
          Pending
        </span>
      );
    case 'rejected':
      return (
        <span className={`${baseClasses} bg-destructive/10 text-destructive border-destructive/20`}>
          <XCircle className="w-3.5 h-3.5" />
          Rejected
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-secondary text-secondary-foreground border-border`}>
          <Hourglass className="w-3.5 h-3.5" />
          Unknown
        </span>
      );
  }
};

const mockApplications = [
  {
    _id: '1',
    personalInfo: {
      fullName: 'Siri Gowda',
      email: 'siri.gowda@email.com',
      phone: '+91 99000 11223'
    },
    courseSelected: 'Computer Science',
    status: 'approved',
    additionalInfo: 'Siri has excellent academic background and strong programming skills. She completed several coding bootcamps and has a portfolio of web development projects.',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '2',
    personalInfo: {
      fullName: 'Mahesh K',
      email: 'mahesh.k@email.com',
      phone: '+91 99000 11223'
    },
    courseSelected: 'Data Science',
    status: 'rejected',
    additionalInfo: 'Mahesh lacks the required mathematics background for the Data Science program. Recommended to complete prerequisite courses before reapplying.',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    _id: '3',
    personalInfo: {
      fullName: 'Rajesh K',
      email: 'rajesh.k@email.com',
      phone: '+91 99000 11223'
    },
    courseSelected: 'Business Administration',
    status: 'pending',
    additionalInfo: 'Rajesh shows strong leadership potential and has relevant work experience in retail management.',
    createdAt: '2024-01-16T09:15:00Z'
  },
  {
    _id: '4',
    personalInfo: {
      fullName: 'Dhanush M',
      email: 'dhanush.m@email.com',
      phone: '+91 99000 11223'
    },
    courseSelected: 'Computer Science',
    status: 'approved',
    additionalInfo: 'Dhanush has impressive coding skills demonstrated through his GitHub portfolio and previous internship experience.',
    createdAt: '2024-01-13T16:45:00Z'
  },
  {
    _id: '5',
    personalInfo: {
      fullName: 'Liya Joseph',
      email: 'liya.j@email.com',
      phone: '+91 99000 11223'
    },
    courseSelected: 'Psychology',
    status: 'rejected',
    additionalInfo: 'Liya\'s application was rejected due to incomplete documentation and missing prerequisite courses.',
    createdAt: '2024-01-12T11:30:00Z'
  },
  {
    _id: '6',
    personalInfo: {
      fullName: 'James Dzosua',
      email: 'james.d@email.com',
      phone: '+91 99000 11223'
    },
    courseSelected: 'Engineering',
    status: 'pending',
    additionalInfo: 'James has strong technical aptitude and relevant project experience in robotics.',
    createdAt: '2024-01-17T13:20:00Z'
  }
];

const FacultyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await api.get('/api/applications');
        
        const backendData = res.data || [];
        const combinedData = [...mockApplications, ...backendData];
        setApplications(combinedData);
      } catch (err) {
        setApplications(mockApplications);
        setError('Using demo data. API connection failed.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleView = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedApp(null), 300);
  };

  return (
    <div className="min-h-screen bg-background font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/faculty/dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border border-border text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Student Applications</h1>
            <p className="text-muted-foreground mt-1 text-sm">Review, approve, and manage submitted student applications.</p>
          </div>
        </header>

        {isLoading && (
          <div className="text-center p-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground font-medium">Loading applications...</p>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-600 dark:text-yellow-400 text-sm font-medium flex items-center">
            <Hourglass className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {!isLoading && (
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Info</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Program</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {applications.map((app, index) => (
                    <motion.tr 
                      key={app.id || app._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-muted/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-foreground">{app.personalInfo?.fullName || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-muted-foreground">{app.personalInfo?.email || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground/70 mt-0.5">{app.personalInfo?.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">{app.courseSelected || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusDisplay status={app.status || 'pending'} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="inline-flex items-center gap-x-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                          onClick={() => handleView(app)}
                        >
                          <Eye className="w-4 h-4" />
                          Review
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {applications.length === 0 && (
              <div className="text-center p-12 text-muted-foreground">
                No applications found.
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card w-full max-w-2xl rounded-2xl shadow-xl border border-border relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Application Details</h2>
                    <p className="text-sm text-muted-foreground mt-1">Submitted on {selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <button
                    className="text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-full p-2 transition-colors"
                    onClick={closeModal}
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-8 mt-6">
                  <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Applicant Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium text-foreground">{selectedApp.personalInfo?.fullName || '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Email Address</p>
                        <p className="font-medium text-foreground">{selectedApp.personalInfo?.email || '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Phone Number</p>
                        <p className="font-medium text-foreground">{selectedApp.personalInfo?.phone || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Enrollment Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Desired Program</p>
                        <p className="font-medium text-foreground">{selectedApp.courseSelected || '-'}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Current Status</p>
                        <div><StatusDisplay status={selectedApp.status || 'pending'} /></div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedApp.additionalInfo && (
                    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Admissions Note</h3>
                      <p className="text-sm text-foreground leading-relaxed bg-background p-4 rounded-lg border border-border/50">
                        {selectedApp.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-secondary/50 border-t border-border px-6 py-4 flex justify-end gap-3 shrink-0">
                <button
                  className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg hover:bg-accent transition-colors shadow-sm"
                  onClick={closeModal}
                >
                  Close Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FacultyApplications;